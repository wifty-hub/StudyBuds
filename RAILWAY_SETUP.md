# 🚂 Railway Deployment Guide (Frontend + Backend)

Railway can host **both your frontend and backend** services - all in one place! No credit card required.

## 🎯 Quick Start

1. **Sign up**: https://railway.app (use GitHub)
2. **Create New Project** → "Deploy from GitHub repo"
3. **Select your repo**: `wifty-hub/StudyBuds`

## 📦 Deploy All Services

Railway will detect your services automatically. You'll need to create 4 services:

### 1. Backend Gateway

1. In Railway project, click **"+ New"** → **"GitHub Repo"**
2. Select your repo again (or use same project)
3. **Settings**:
   - **Root Directory**: `backend` ⚠️ **IMPORTANT: Must set this!**
   - Railway will auto-detect Python (don't set build/start commands manually)
4. **Variables** tab → Add:
   - `DOCUMENT_SERVICE_URL` = (set after document service deploys)
   - `AI_SERVICE_URL` = (set after AI service deploys)
   - `GEMINI_API_KEY` = your key
   - `CORS_ORIGINS` = your frontend URL

**Note**: Railway will auto-detect Python and use `railway.json` if present. Make sure Root Directory is set to `backend`!

### 2. Document Service

1. **"+ New"** → **"GitHub Repo"**
2. **Root Directory**: `services/document` ⚠️ **Must set this!**
3. Railway will auto-detect Python

### 3. AI Service

1. **"+ New"** → **"GitHub Repo"**
2. **Root Directory**: `services/ai` ⚠️ **Must set this!**
3. Railway will auto-detect Python
4. **Variables** tab → Add:
   - `GEMINI_API_KEY` = your key

### 4. Frontend

1. **"+ New"** → **"GitHub Repo"**
2. **Root Directory**: `frontend` ⚠️ **Must set this!**
3. Railway will auto-detect Node.js/Next.js
4. **Variables** tab → Add:
   - `NEXT_PUBLIC_API_URL` = your backend gateway URL

**Note**: Railway auto-detects Next.js and will run `npm install && npm run build` automatically

## 🔗 Connect Services

After all services deploy:

1. **Copy each service's URL** from Railway dashboard
2. **Update Backend Gateway variables**:
   - `DOCUMENT_SERVICE_URL` = Document service URL
   - `AI_SERVICE_URL` = AI service URL
   - `CORS_ORIGINS` = Frontend URL
3. **Update Frontend variables**:
   - `NEXT_PUBLIC_API_URL` = Backend Gateway URL
4. **Redeploy** services after updating variables

## 💰 Pricing

- **Free Tier**: $5 credit/month (enough for all 4 services!)
- **No Credit Card Required**
- Services sleep after inactivity (free tier)
- First request wakes them up (~10 seconds)

## ✅ Advantages

- ✅ All services in one place
- ✅ Easy to manage
- ✅ No credit card needed
- ✅ Automatic deployments from GitHub
- ✅ Environment variables management
- ✅ Logs and monitoring included

## 🚀 Quick Deploy

**Fastest way:**
1. Go to https://railway.app
2. "New Project" → "Deploy from GitHub repo"
3. Select `wifty-hub/StudyBuds`
4. Railway will auto-detect services
5. Configure each service's root directory
6. Add environment variables
7. Done! 🎉

## 📝 Tips

- Railway auto-detects Python/Node projects
- Services can communicate via private network (use service names)
- Free tier is generous for development/testing
- Upgrade only if you need more resources

## 🔍 Service URLs

After deployment, you'll get URLs like:
- Backend: `https://studybudds-backend.up.railway.app`
- Document: `https://studybudds-document.up.railway.app`
- AI: `https://studybudds-ai.up.railway.app`
- Frontend: `https://studybudds-frontend.up.railway.app`

All in one dashboard! 🎯

