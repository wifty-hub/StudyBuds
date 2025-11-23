# 🚀 Quick Backend Setup Guide

## Step 1: Install Python Dependencies

Run these commands in PowerShell:

```powershell
# Install backend gateway dependencies
cd backend
python -m pip install -r requirements.txt

# Install document service dependencies
cd ..\services\document
python -m pip install -r requirements.txt

# Install AI service dependencies
cd ..\ai
python -m pip install -r requirements.txt
```

## Step 2: Set Up Environment Variables

Create a `.env` file in the root directory with:

```env
GEMINI_API_KEY=your_gemini_api_key_here
DOCUMENT_SERVICE_URL=http://localhost:8001
AI_SERVICE_URL=http://localhost:8002
CORS_ORIGINS=http://localhost:3000
```

**Important:** Replace `your_gemini_api_key_here` with your actual Gemini API key!

## Step 3: Start Backend Services

### Option A: Use the Script (Easiest)

```powershell
.\scripts\start-backend.ps1
```

This will open 3 PowerShell windows, one for each service.

### Option B: Manual Start

Open **3 separate PowerShell windows**:

**Window 1 - Backend Gateway:**
```powershell
cd C:\Users\notpe\GeminiStudy\backend
uvicorn main:app --reload --port 8000
```

**Window 2 - Document Service:**
```powershell
cd C:\Users\notpe\GeminiStudy\services\document
uvicorn main:app --reload --port 8001
```

**Window 3 - AI Service:**
```powershell
cd C:\Users\notpe\GeminiStudy\services\ai
uvicorn main:app --reload --port 8002
```

## Step 4: Verify Services Are Running

Check these URLs in your browser:
- Backend Gateway: http://localhost:8000/docs
- Document Service: http://localhost:8001/docs
- AI Service: http://localhost:8002/docs

You should see FastAPI documentation pages.

## Step 5: Start Frontend

In a new terminal:
```powershell
cd C:\Users\notpe\GeminiStudy\frontend
npm run dev
```

Then visit: http://localhost:3000

The "Backend Not Connected" message should disappear once all services are running!

## Troubleshooting

### Port Already in Use
If you get "port already in use" errors:
- Close any existing services using those ports
- Or change the port numbers in the commands

### Missing Dependencies
If you get import errors:
- Make sure you installed all requirements.txt files
- Try: `python -m pip install --upgrade -r requirements.txt`

### API Key Error
If AI service fails:
- Make sure `.env` file exists in root directory
- Make sure `GEMINI_API_KEY` is set correctly
- Restart the AI service after adding the key

