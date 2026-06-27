import logging
import asyncio
import time
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from data_loader import get_college_details
from agent.gemini_agent import ask_gemini

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    reply: str

app = FastAPI(title="EduAssist AI Backend")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup_event():
    """Log startup information and verify configuration."""
    logger.info("=" * 60)
    logger.info("EduAssist AI Backend Starting Up")
    logger.info("=" * 60)
    
    from config.settings import GEMINI_API_KEY, MODEL_NAME
    
    if GEMINI_API_KEY:
        logger.info(f"✓ GEMINI_API_KEY is configured (length: {len(GEMINI_API_KEY)})")
    else:
        logger.error("✗ GEMINI_API_KEY is NOT configured!")
    
    logger.info(f"✓ Model: {MODEL_NAME}")
    logger.info(f"✓ CORS enabled for all origins")
    logger.info(f"✓ Endpoints: /, /chat, /college, /webhook")
    logger.info("=" * 60)

@app.get("/")
def home():
    logger.info("[GET /] Home endpoint called")
    return {"message": "EduAssist AI Backend Running"}


@app.post("/chat")
async def chat(request: ChatRequest):
    """
    Chat endpoint that accepts a message and returns a Gemini response.
    
    POST /chat
    Request:  { "message": "..." }
    Response: { "reply": "..." }
    """
    request_id = f"{int(time.time() * 1000)}"
    start_time = time.time()
    
    logger.info(f"[{request_id}] [POST /chat] Request received")
    logger.info(f"[{request_id}] Message: {request.message[:100]}...")
    
    try:
        # Log that we're about to call Gemini
        logger.info(f"[{request_id}] Preparing to call Gemini API (timeout: 25s)")
        
        # Run the blocking Gemini call in a thread pool with timeout
        # Using asyncio.to_thread() to prevent blocking the event loop
        try:
            reply = await asyncio.wait_for(
                asyncio.to_thread(ask_gemini, request.message),
                timeout=25.0  # 25-second timeout (frontend has 30s)
            )
            logger.info(f"[{request_id}] Gemini API call succeeded")
            logger.info(f"[{request_id}] Response: {reply[:100]}...")
            
        except asyncio.TimeoutError:
            error_msg = "Gemini API call timed out after 25 seconds"
            logger.error(f"[{request_id}] {error_msg}")
            reply = f"Error: {error_msg}. The backend may be overloaded or Gemini API is slow."
        
        elapsed = time.time() - start_time
        logger.info(f"[{request_id}] Response prepared in {elapsed:.2f}s")
        logger.info(f"[{request_id}] Returning response to client")
        
        return ChatResponse(reply=reply)
        
    except Exception as e:
        elapsed = time.time() - start_time
        error_msg = f"{type(e).__name__}: {str(e)}"
        logger.error(f"[{request_id}] Exception in /chat endpoint: {error_msg}")
        logger.error(f"[{request_id}] Request failed after {elapsed:.2f}s")
        
        response = ChatResponse(
            reply=f"Error: {error_msg}. Please check the backend logs."
        )
        logger.info(f"[{request_id}] Returning error response")
        return response


@app.get("/college")
def search_college(name: str):
    logger.info(f"[GET /college] Searching for college: {name}")
    
    try:
        result = get_college_details(name)
        
        if result is None:
            logger.info(f"[GET /college] College not found: {name}")
            return {
                "status": "error",
                "message": "College not found"
            }
        
        logger.info(f"[GET /college] Found college: {result['College Name']}")
        return {
            "status": "success",
            "college_name": result["College Name"],
            "city": result["City"],
            "state": result["State"],
            "country": result["Country"],
            "college_type": result["College Type"],
            "fees": result["Average Fees"],
            "rating": result["Rating"],
            "university": result["University"],
            "courses": result["Courses"],
            "facilities": result["Facilities"],
            "established": result["Established Year"],
            "campus_size": result["Campus Size"],
            "students": result["Total Student Enrollments"],
            "faculty": result["Total Faculty"]
        }
    except Exception as e:
        logger.error(f"[GET /college] Error: {str(e)}")
        return {
            "status": "error",
            "message": f"Error: {str(e)}"
        }


@app.post("/webhook")
async def webhook(request: Request):
    logger.info(f"[POST /webhook] Webhook received")
    
    try:
        body = await request.json()
        logger.debug(f"[POST /webhook] Request body: {str(body)[:200]}...")
        
        try:
            college_name = body["sessionInfo"]["parameters"]["college"]
        except Exception as e:
            logger.debug(f"[POST /webhook] Could not extract college name: {str(e)}")
            college_name = ""
        
        logger.info(f"[POST /webhook] College query: {college_name}")
        result = get_college_details(college_name)
        
        if result is None:
            message = (
                f"Sorry, I couldn't find information about {college_name}. "
                "Please check the spelling or try another college."
            )
            logger.info(f"[POST /webhook] College not found for: {college_name}")
        else:
            message = (
                f"{result['College Name']} is located in "
                f"{result['City']}, {result['State']}. "
                f"It is a {result['College Type']} college established in "
                f"{result['Established Year']}. "
                f"It has a rating of {result['Rating']} and the average fees are "
                f"₹{result['Average Fees']}."
            )
            logger.info(f"[POST /webhook] Found college: {result['College Name']}")
        
        logger.info(f"[POST /webhook] Returning response")
        return {
            "fulfillment_response": {
                "messages": [
                    {
                        "text": {
                            "text": [
                                message
                            ]
                        }
                    }
                ]
            }
        }
    except Exception as e:
        logger.error(f"[POST /webhook] Exception: {str(e)}")
        return {
            "fulfillment_response": {
                "messages": [
                    {
                        "text": {
                            "text": [
                                f"Error processing webhook: {str(e)}"
                            ]
                        }
                    }
                ]
            }
        }