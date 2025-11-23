# 🚀 Quick Start Guide

## Step 1: Install Dependencies

### Windows (PowerShell):
```powershell
# Install frontend dependencies
cd frontend
npm install
cd ..

# Install backend dependencies
cd backend
python -m pip install -r requirements.txt
cd ..

# Install document service dependencies
cd services/document
python -m pip install -r requirements.txt
cd ../..

# Install AI service dependencies
cd services/ai
python -m pip install -r requirements.txt
cd ../..
```

### Linux/Mac:
```bash
# Install frontend dependencies
cd frontend && npm install && cd ..

# Install backend dependencies
cd backend && pip install -r requirements.txt && cd ..

# Install service dependencies
cd services/document && pip install -r requirements.txt && cd ../..
cd services/ai && pip install -r requirements.txt && cd ../..
```

## Step 2: Set Up Environment Variables

Create a `.env` file in the root directory with:

```env
GEMINI_API_KEY=your_gemini_api_key_here
DATABASE_URL=sqlite:///./study_assistant.db
VECTOR_DB_PATH=./vector_db
STORAGE_PATH=./uploads
FRONTEND_URL=http://localhost:3000
BACKEND_URL=http://localhost:8000
DOCUMENT_SERVICE_URL=http://localhost:8001
AI_SERVICE_URL=http://localhost:8002
CORS_ORIGINS=http://localhost:3000
```

**Important**: Replace `your_gemini_api_key_here` with your actual Google Gemini API key.
You can get one at: https://makersuite.google.com/app/apikey

## Step 3: Start the Services

You need **4 terminal windows** open:

### Terminal 1: Backend Gateway
```bash
cd backend
uvicorn main:app --reload --port 8000
```
✅ Should show: `Uvicorn running on http://0.0.0.0:8000`

### Terminal 2: Document Service
```bash
cd services/document
uvicorn main:app --reload --port 8001
```
✅ Should show: `Uvicorn running on http://0.0.0.0:8001`

### Terminal 3: AI Service
```bash
cd services/ai
uvicorn main:app --reload --port 8002
```
✅ Should show: `Uvicorn running on http://0.0.0.0:8002`

### Terminal 4: Frontend
```bash
cd frontend
npm run dev
```
✅ Should show: `Local: http://localhost:3000`

## Step 4: Access the Application

Open your web browser and go to:

### 🌐 Main Application
**http://localhost:3000**

### 📚 API Documentation
- Backend API: http://localhost:8000/docs
- Document Service: http://localhost:8001/docs
- AI Service: http://localhost:8002/docs

## 🎯 What You'll See

1. **Homepage** with Lumio the Owl mascot
2. **Upload Tab**: Drag & drop documents (PDF, DOCX, images)
3. **Materials Tab**: View uploaded documents and generate study materials
4. **Chat Tab**: Ask questions about your documents
5. **Study Plan Tab**: Create personalized study plans

## ⚠️ Troubleshooting

### Port Already in Use
If you get "port already in use" errors:
- Check if services are already running
- Change ports in `.env` file
- Kill processes using those ports

### Module Not Found Errors
- Make sure you installed all dependencies
- Check Python version (needs 3.10+)
- Check Node.js version (needs 18+)

### Gemini API Errors
- Verify your API key is correct in `.env`
- Check API quota/limits
- Ensure internet connection

### Frontend Won't Connect to Backend
- Verify all backend services are running
- Check CORS settings in `.env`
- Verify `NEXT_PUBLIC_API_URL` matches backend URL

## 🐳 Alternative: Docker (Coming Soon)

If you prefer Docker:
```bash
docker-compose up
```

This will start all services automatically.

## 📝 Next Steps

1. Upload a PDF or document
2. Wait for processing
3. Generate summaries, flashcards, or quizzes
4. Try the AI chat feature
5. Create a study plan

Enjoy studying with Lumio! 🦉

