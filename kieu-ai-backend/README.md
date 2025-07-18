# KieuAI Backend

A Flask backend for the KieuAI project.

## Features

- Contact form endpoint
- Newsletter subscription endpoint
- Chat demo endpoint
- CORS enabled for frontend integration

## Local Development

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Run the development server:
```bash
python main.py
```

3. The API will be available at `http://localhost:8000`

## API Endpoints

- `GET /` - Health check
- `GET /health` - Health check
- `POST /contact` - Submit contact form
- `POST /newsletter` - Subscribe to newsletter
- `POST /chat-demo` - Chat demo endpoint

## Deployment on Render

1. Push your code to GitHub
2. Connect your GitHub repository to Render
3. Create a new Web Service
4. Configure the following settings:
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `python main.py`
   - **Environment**: Python 3.11

## Environment Variables

- `PORT` - Automatically set by Render

## API Usage

All endpoints expect JSON data:

### Contact Form
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Hello!"
}
```

### Newsletter
```json
{
  "email": "john@example.com"
}
```

### Chat Demo
```json
{
  "message": "Hello AI!"
}
``` 