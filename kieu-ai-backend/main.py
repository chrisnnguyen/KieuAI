from fastapi import FastAPI, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# Allow CORS for local frontend dev
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ContactForm(BaseModel):
    name: str
    email: str
    message: str

class NewsletterForm(BaseModel):
    email: str

class ChatRequest(BaseModel):
    message: str

@app.post("/contact")
async def contact(form: ContactForm):
    # Here you would handle sending an email or storing the message
    return {"success": True, "message": "Liên hệ của bạn đã được gửi!"}

@app.post("/newsletter")
async def newsletter(form: NewsletterForm):
    # Here you would add the email to your newsletter list
    return {"success": True, "message": "Đăng ký nhận tin thành công!"}

@app.post("/chat-demo")
async def chat_demo(req: ChatRequest):
    # Mock AI response
    return {"reply": f"Bạn vừa nói: {req.message}"} 