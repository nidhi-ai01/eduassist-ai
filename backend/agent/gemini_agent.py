import logging
from google import genai

from config.settings import GEMINI_API_KEY, MODEL_NAME

logger = logging.getLogger(__name__)

# Create Gemini client
if GEMINI_API_KEY:
    client = genai.Client(api_key=GEMINI_API_KEY)
    logger.info(f"Gemini client initialized with model: {MODEL_NAME}")
else:
    client = None
    logger.error("GEMINI_API_KEY not found in environment variables!")


def ask_gemini(prompt: str) -> str:
    """
    Sends a prompt to Gemini and returns the response.
    
    Args:
        prompt: The user message to send to Gemini
        
    Returns:
        The response text from Gemini
        
    Raises:
        ValueError: If Gemini client is not initialized
        Exception: If the API call fails
    """
    logger.info(f"[Gemini] Request received: {len(prompt)} characters")
    
    if not client:
        error_msg = "Gemini client not initialized. Check GEMINI_API_KEY."
        logger.error(f"[Gemini] {error_msg}")
        raise ValueError(error_msg)
    
    try:
        logger.debug(f"[Gemini] Sending request to {MODEL_NAME}")
        response = client.models.generate_content(
            model=MODEL_NAME,
            contents=prompt
        )
        logger.info(f"[Gemini] Response received: {len(response.text)} characters")
        logger.debug(f"[Gemini] Response text (first 100 chars): {response.text[:100]}...")
        
        return response.text
        
    except Exception as e:
        error_msg = f"Gemini API error: {type(e).__name__}: {str(e)}"
        logger.error(f"[Gemini] {error_msg}")
        raise