# 🚀 Render Manual Setup (No Docker, No Credit Card)

**Important**: When creating services manually on Render, you MUST explicitly choose Python/Node environment, NOT Docker!

## Step-by-Step: Create Each Service

### 1. Backend Gateway

1. Go to https://dashboard.render.com
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repo: `wifty-hub/StudyBuds`
4. **CRITICAL SETTINGS**:
   - **Name**: `studybudds-backend`
   - **Environment**: Select **"Python 3"** (NOT Docker!)
   - **Root Directory**: `backend`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
   - **Plan**: Free
5. Click **"Create Web Service"**
6. **After deployment**, go to **Environment** tab and add:
   - `DOCUMENT_SERVICE_URL` = (will set after document service deploys)
   - `AI_SERVICE_URL` = (will set after AI service deploys)
   - `GEMINI_API_KEY` = your key
   - `CORS_ORIGINS` = your frontend URL

### 2. Document Service

1. **"New +"** → **"Web Service"**
2. Connect same GitHub repo
3. **Settings**:
   - **Name**: `studybudds-document`
   - **Environment**: **"Python 3"** (NOT Docker!)
   - **Root Directory**: `services/document`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
   - **Plan**: Free
4. Click **"Create Web Service"**

### 3. AI Service

1. **"New +"** → **"Web Service"**
2. Connect same GitHub repo
3. **Settings**:
   - **Name**: `studybudds-ai`
   - **Environment**: **"Python 3"** (NOT Docker!)
   - **Root Directory**: `services/ai`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
   - **Plan**: Free
4. Click **"Create Web Service"**
5. **After deployment**, add environment variable:
   - `GEMINI_API_KEY` = your key

### 4. Frontend

1. **"New +"** → **"Web Service"**
2. Connect same GitHub repo
3. **Settings**:
   - **Name**: `studybudds-frontend`
   - **Environment**: **"Node"** (NOT Docker!)
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Plan**: Free
4. Click **"Create Web Service"**
5. **After deployment**, add environment variable:
   - `NEXT_PUBLIC_API_URL` = your backend gateway URL (e.g., `https://studybudds-backend.onrender.com`)

## ⚠️ Common Mistakes

1. **Don't select "Docker"** - Always choose "Python 3" or "Node"
2. **Don't leave Root Directory empty** - Must specify the folder
3. **Don't forget Build Command** - Required for Python/Node services
4. **Set environment variables AFTER deployment** - URLs won't exist until services are deployed

## 🔄 After All Services Deploy

1. Copy each service's URL from Render dashboard
2. Update environment variables:
   - Backend Gateway: Set `DOCUMENT_SERVICE_URL` and `AI_SERVICE_URL`
   - Frontend: Set `NEXT_PUBLIC_API_URL`
3. Redeploy services after setting environment variables

## ✅ Verification

- Backend Gateway: `https://your-backend.onrender.com/docs`
- Document Service: `https://your-document.onrender.com/health`
- AI Service: `https://your-ai.onrender.com/docs`
- Frontend: `https://your-frontend.onrender.com`

All should work without Docker! 🎉

