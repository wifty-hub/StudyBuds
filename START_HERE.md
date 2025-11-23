# 🚀 Start StudyBudds - Quick Guide

## ✅ Step 1: Add Your API Key

1. Open `.env` file in the root directory
2. Replace `your_gemini_api_key_here` with your actual Gemini API key
3. Save the file

## 🎯 Step 2: Start All Services

### Easy Way (Recommended):

Run the startup script:
```powershell
.\scripts\start-backend.ps1
```

This will open 3 PowerShell windows for the backend services.

Then in another terminal, start the frontend:
```powershell
cd frontend
npm run dev
```

### Manual Way:

Open **4 separate terminal windows**:

**Terminal 1 - Backend Gateway:**
```powershell
cd backend
uvicorn main:app --reload --port 8000
```

**Terminal 2 - Document Service:**
```powershell
cd services/document
uvicorn main:app --reload --port 8001
```

**Terminal 3 - AI Service:**
```powershell
cd services/ai
uvicorn main:app --reload --port 8002
```

**Terminal 4 - Frontend:**
```powershell
cd frontend
npm run dev
```

## 🌐 Step 3: Access the Application

Once all services are running:
- **Frontend**: http://localhost:3000
- **Backend API Docs**: http://localhost:8000/docs
- **Document Service**: http://localhost:8001/docs
- **AI Service**: http://localhost:8002/docs

## ✅ Verify Everything Works

1. Open http://localhost:3000
2. You should see StudyBudds with Lumio the Owl
3. Try uploading a document
4. Generate summaries, flashcards, or quizzes

## 🛑 To Stop Services

- Close the PowerShell/terminal windows
- Or press `Ctrl+C` in each terminal

---

**Need help?** Check the logs in each terminal window for errors.

