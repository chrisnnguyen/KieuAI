from flask import Flask, request, jsonify
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

@app.route("/")
def root():
    return jsonify({"message": "KieuAI Backend is running!"})

@app.route("/health")
def health_check():
    return jsonify({"status": "healthy"})

@app.route("/contact", methods=["POST"])
def contact():
    data = request.get_json()
    name = data.get("name")
    email = data.get("email")
    message = data.get("message")
    
    # Here you would handle sending an email or storing the message
    return jsonify({"success": True, "message": "Liên hệ của bạn đã được gửi!"})

@app.route("/newsletter", methods=["POST"])
def newsletter():
    data = request.get_json()
    email = data.get("email")
    
    # Here you would add the email to your newsletter list
    return jsonify({"success": True, "message": "Đăng ký nhận tin thành công!"})

@app.route("/chat-demo", methods=["POST"])
def chat_demo():
    data = request.get_json()
    message = data.get("message")
    
    # Mock AI response
    return jsonify({"reply": f"Bạn vừa nói: {message}"})

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    app.run(host="0.0.0.0", port=port) 