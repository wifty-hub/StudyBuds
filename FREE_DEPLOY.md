# 🆓 Free Deployment Options (No Credit Card Required)

**Note**: Render's **Blueprint** feature requires a credit card, but you can deploy individual services manually without one!

## 🎯 Render Manual Deployment (No Credit Card for Individual Services)

You can deploy services manually on Render without using Blueprint:

### Deploy Backend Gateway:
1. Go to https://dashboard.render.com
2. Click "New +" → **"Web Service"** (NOT Blueprint)
3. Connect your GitHub repo
4. **Settings**:
   - **Name**: `studybudds-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
5. **Environment Variables**:
   - `DOCUMENT_SERVICE_URL` = (set after deploying document service)
   - `AI_SERVICE_URL` = (set after deploying AI service)
   - `GEMINI_API_KEY` = your key
   - `CORS_ORIGINS` = your frontend URL

### Deploy Document Service:
1. "New +" → "Web Service"
2. **Root Directory**: `services/document`
3. **Build Command**: `pip install -r requirements.txt`
4. **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`

### Deploy AI Service:
1. "New +" → "Web Service"
2. **Root Directory**: `services/ai`
3. **Build Command**: `pip install -r requirements.txt`
4. **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
5. **Environment Variables**:
   - `GEMINI_API_KEY` = your key

### Deploy Frontend:
1. "New +" → "Web Service"
2. **Root Directory**: `frontend`
3. **Environment**: `Node`
4. **Build Command**: `npm install && npm run build`
5. **Start Command**: `npm start`
6. **Environment Variables**:
   - `NEXT_PUBLIC_API_URL` = your backend gateway URL

---

## 🆓 Alternative Free Options (No Credit Card Required)

## 🚂 Option 1: Railway (Recommended - No Credit Card)

Railway offers a **free tier** with $5 credit/month, no credit card required initially.

### Deploy Backend Services:

1. **Sign up**: https://railway.app (use GitHub)
2. **Create New Project** → "Deploy from GitHub repo"
3. **Select your repo**: `wifty-hub/StudyBuds`

#### Deploy Backend Gateway:
- **Root Directory**: `backend`
- **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
- **Environment Variables**:
  - `DOCUMENT_SERVICE_URL` = (set after deploying document service)
  - `AI_SERVICE_URL` = (set after deploying AI service)
  - `GEMINI_API_KEY` = your key
  - `CORS_ORIGINS` = your frontend URL

#### Deploy Document Service:
- **Root Directory**: `services/document`
- **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`

#### Deploy AI Service:
- **Root Directory**: `services/ai`
- **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
- **Environment Variables**:
  - `GEMINI_API_KEY` = your key

### Deploy Frontend:

**Option A: Vercel (Free, No Credit Card)**
1. Go to https://vercel.com
2. Sign up with GitHub
3. Import your repository
4. **Root Directory**: `frontend`
5. **Build Command**: `npm run build`
6. **Output Directory**: `.next`
7. **Environment Variable**: `NEXT_PUBLIC_API_URL` = your backend gateway URL

**Option B: Netlify (Free, No Credit Card)**
1. Go to https://netlify.com
2. Sign up with GitHub
3. "Add new site" → "Import from Git"
4. Select your repo
5. **Base directory**: `frontend`
6. **Build command**: `npm run build`
7. **Publish directory**: `frontend/.next`
8. **Environment Variable**: `NEXT_PUBLIC_API_URL` = your backend gateway URL

---

## ✈️ Option 2: Fly.io (Free Tier, No Credit Card)

Fly.io offers **free tier** with 3 shared-cpu VMs, no credit card required.

### Setup:

1. **Install Fly CLI**:
   ```powershell
   # Windows
   iwr https://fly.io/install.ps1 -useb | iex
   ```

2. **Sign up**: https://fly.io (use GitHub)

3. **Login**:
   ```powershell
   fly auth login
   ```

### Deploy Each Service:

**Backend Gateway:**
```powershell
cd backend
fly launch --name studybudds-backend
# Follow prompts, then:
fly secrets set DOCUMENT_SERVICE_URL=https://studybudds-document.fly.dev
fly secrets set AI_SERVICE_URL=https://studybudds-ai.fly.dev
fly secrets set GEMINI_API_KEY=your_key
fly deploy
```

**Document Service:**
```powershell
cd services/document
fly launch --name studybudds-document
fly deploy
```

**AI Service:**
```powershell
cd services/ai
fly launch --name studybudds-ai
fly secrets set GEMINI_API_KEY=your_key
fly deploy
```

**Frontend:**
```powershell
cd frontend
fly launch --name studybudds-frontend
fly secrets set NEXT_PUBLIC_API_URL=https://studybudds-backend.fly.dev
fly deploy
```

---

## 🖥️ Option 3: Run Locally (100% Free)

If you just want to test, run everything locally:

1. **Start Backend Services**:
   ```powershell
   .\scripts\start-backend.ps1
   ```

2. **Start Frontend**:
   ```powershell
   cd frontend
   npm run dev
   ```

3. **Access**: http://localhost:3000

---

## 📊 Comparison

| Platform | Free Tier | Credit Card | Ease |
|----------|----------|-------------|------|
| **Railway** | $5/month credit | ❌ Not required | ⭐⭐⭐⭐⭐ |
| **Fly.io** | 3 VMs free | ❌ Not required | ⭐⭐⭐⭐ |
| **Vercel** | Unlimited | ❌ Not required | ⭐⭐⭐⭐⭐ |
| **Netlify** | 100GB bandwidth | ❌ Not required | ⭐⭐⭐⭐⭐ |
| **Render** | Free tier | ✅ Required | ⭐⭐⭐ |

---

## 🎯 Recommended Setup

**Best Free Combo (No Credit Card):**
- **Backend**: Railway (3 services)
- **Frontend**: Vercel or Netlify

**Quick Start:**
1. Deploy backend services on Railway
2. Deploy frontend on Vercel
3. Set environment variables
4. Done! 🎉

---

## 💡 Tips

- **Railway**: Generous free tier, easy setup
- **Vercel**: Best for Next.js frontends
- **Fly.io**: More control, slightly more complex
- **Local**: Perfect for development/testing

Choose what works best for you!

