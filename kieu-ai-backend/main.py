# # FASTAPI BACKEND
# Backend API server for Kieu AI landing page
# Handles contact forms, newsletter signups, and chat demo functionality

from fastapi import FastAPI, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# # APP INITIALIZATION
# Create FastAPI application instance
app = FastAPI()

# # CORS CONFIGURATION
# Allow cross-origin requests for local frontend development
# Configured to allow all origins for development purposes
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# # DATA MODELS
# Pydantic models for request/response validation

class ContactForm(BaseModel):
    """Contact form data model"""
    name: str
    email: str
    message: str

class NewsletterForm(BaseModel):
    """Newsletter signup data model"""
    email: str

class ChatRequest(BaseModel):
    """Chat demo request data model"""
    message: str

# # API ENDPOINTS
# REST API endpoints for the frontend to interact with

@app.post("/contact")
async def contact(form: ContactForm):
    """Handle contact form submissions"""
    # Here you would handle sending an email or storing the message
    # Currently returns a mock success response
    return {"success": True, "message": "Liên hệ của bạn đã được gửi!"}

@app.post("/newsletter")
async def newsletter(form: NewsletterForm):
    """Handle newsletter signup submissions"""
    # Here you would add the email to your newsletter list
    # Currently returns a mock success response
    return {"success": True, "message": "Đăng ký nhận tin thành công!"}

@app.post("/chat-demo")
async def chat_demo(req: ChatRequest):
    """Handle chat demo requests"""
    # Mock AI response - in production this would connect to an AI service
    return {"reply": f"Bạn vừa nói: {req.message}"} 