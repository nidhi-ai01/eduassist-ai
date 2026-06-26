from google import genai

from config.settings import GEMINI_API_KEY, MODEL_NAME

# Create Gemini client
client = genai.Client(api_key=GEMINI_API_KEY)


def ask_gemini(prompt: str) -> str:
    """
    Sends a prompt to Gemini and returns the response.
    """

    response = client.models.generate_content(
        model=MODEL_NAME,
        contents=prompt
    )

    return response.text