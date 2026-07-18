import os
import requests
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize FastAPI app
app = FastAPI()

# --- CORS MIDDLEWARE ---
# This allows your HTML frontend to talk to this Python backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- GROQ CONFIGURATION ---
API_KEY = os.getenv("GROQ_API_KEY")
BASE_URL = "https://api.groq.com/openai/v1/chat/completions"
# Using Llama 3.3 70B for incredibly fast, high-quality responses
MODEL_NAME = "llama-3.3-70b-versatile"

# --- REQUEST MODEL ---
class ChatRequest(BaseModel):
    message: str

# --- API ENDPOINTS ---
@app.get("/")
async def root():
    return {
        "message": "NOVA AI Backend is online!",
        "status": "success",
        "endpoints": {"POST": "/chat"}
    }

@app.post("/chat")
async def chat_endpoint(request: ChatRequest):
    """Main chat endpoint to process user messages"""
    user_input = request.message
    
    print(f"\n[User]: {user_input}")
    
    try:
        # Prepare the OpenAI-compatible JSON payload
        payload = {
            "model": MODEL_NAME,
            "messages": [
                {"role": "user", "content": user_input}
            ]
        }

        # Prepare headers
        headers = {
            "Authorization": f"Bearer {API_KEY}",
            "Content-Type": "application/json"
        }
        
        # Send the request to Groq
        response = requests.post(BASE_URL, json=payload, headers=headers)
        response.raise_for_status()

        data = response.json()
        
        # Extract the text from the OpenAI-compatible response
        reply = data['choices'][0]['message']['content']
        
        print(f"[Assistant]: {reply}")
        return {"reply": reply}
        
    except requests.exceptions.RequestException as e:
        print(f"ERROR OCCURRED: {e}")
        error_detail = e.response.json() if e.response else str(e)
        return {"reply": f"API Error: {error_detail}"}
    except Exception as e:
        print(f"ERROR OCCURRED: {e}")
        return {"reply": f"An error occurred on the server: {str(e)}"}

# --- RUN COMMAND ---
"""if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=5000)"""