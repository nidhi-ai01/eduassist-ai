from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from data_loader import get_college_details

app = FastAPI(title="EduAssist AI Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {"message": "EduAssist AI Backend Running"}


@app.get("/college")
def search_college(name: str):
    result = get_college_details(name)

    if result is None:
        return {
            "status": "error",
            "message": "College not found"
        }

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


@app.post("/webhook")
async def webhook(request: Request):

    body = await request.json()

    print(body)

    try:
        college_name = body["sessionInfo"]["parameters"]["college"]
    except Exception:
        college_name = ""

    result = get_college_details(college_name)

    if result is None:
        message = (
            f"Sorry, I couldn't find information about {college_name}. "
            "Please check the spelling or try another college."
        )
    else:
        message = (
            f"{result['College Name']} is located in "
            f"{result['City']}, {result['State']}. "
            f"It is a {result['College Type']} college established in "
            f"{result['Established Year']}. "
            f"It has a rating of {result['Rating']} and the average fees are "
            f"₹{result['Average Fees']}."
        )

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