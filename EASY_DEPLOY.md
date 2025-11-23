# 🚀 Easiest Way to Deploy (Start Here!)

## Option 1: Frontend Only (Easiest - 2 minutes)

Just want to see your app online? Deploy the frontend first:

### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

### Step 2: Deploy
```bash
cd frontend
vercel
```

**That's it!** Follow the prompts:
- Press Enter to create new project
- Press Enter to use default settings
- Your app will be live at `https://your-app.vercel.app`

**Note:** Backend features won't work yet, but you can see the UI!

---

## Option 2: Full App (Still Easy - 10 minutes)

### Part A: Deploy Frontend (Vercel)

1. **Go to**: https://vercel.com
2. **Click**: "Add New" → "Project"
3. **Import** your GitHub repo (or drag & drop the `frontend` folder)
4. **Settings**:
   - Framework Preset: Next.js
   - Root Directory: `frontend`
   - Build Command: `npm run build` (auto-detected)
5. **Click**: "Deploy"
6. **Wait 2 minutes** → Done! Copy your URL

### Part B: Deploy Backend (Render - Free)

1. **Go to**: https://render.com
2. **Sign up** (free with GitHub)
3. **Click**: "New +" → "Web Service"

#### Deploy Backend Gateway:
- **Name**: `ai-study-backend`
- **Repository**: Connect your GitHub repo
- **Root Directory**: `backend`
- **Build Command**: `pip install -r requirements.txt`
- **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
- **Environment Variables**:
  - `GEMINI_API_KEY` = (your key)
  - `DOCUMENT_SERVICE_URL` = (we'll set after next step)
  - `AI_SERVICE_URL` = (we'll set after next step)
  - `CORS_ORIGINS` = (your Vercel frontend URL)
- **Click**: "Create Web Service"
- **Copy the URL** (e.g., `https://ai-study-backend.onrender.com`)

#### Deploy Document Service:
- **Name**: `ai-study-document`
- **Root Directory**: `services/document`
- **Build Command**: `pip install -r requirements.txt`
- **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
- **Click**: "Create Web Service"
- **Copy the URL**

#### Deploy AI Service:
- **Name**: `ai-study-ai`
- **Root Directory**: `services/ai`
- **Build Command**: `pip install -r requirements.txt`
- **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
- **Environment Variables**:
  - `GEMINI_API_KEY` = (your key)
- **Click**: "Create Web Service"
- **Copy the URL**

### Part C: Connect Everything

1. **Go back to Backend Gateway** on Render
2. **Settings** → **Environment Variables**
3. **Update**:
   - `DOCUMENT_SERVICE_URL` = Your document service URL
   - `AI_SERVICE_URL` = Your AI service URL
   - `CORS_ORIGINS` = Your Vercel frontend URL
4. **Go to Vercel** → Your project → Settings → Environment Variables
5. **Add**: `NEXT_PUBLIC_API_URL` = Your backend gateway URL
6. **Redeploy** frontend (or wait for auto-deploy)

### Done! 🎉

Visit your Vercel URL and everything should work!

---

## Even Easier: Use This Script

Save this as `deploy-easy.ps1` (Windows) or `deploy-easy.sh` (Mac/Linux):

### Windows (PowerShell):
```powershell
# Deploy frontend to Vercel
Write-Host "Deploying frontend..." -ForegroundColor Green
cd frontend
vercel --prod
cd ..

Write-Host "Frontend deployed! Now deploy backend services on Render.com" -ForegroundColor Yellow
Write-Host "Go to: https://render.com" -ForegroundColor Cyan
```

### Mac/Linux:
```bash
#!/bin/bash
echo "Deploying frontend..."
cd frontend
vercel --prod
cd ..
echo "Frontend deployed! Now deploy backend on Render.com"
```

---

## Quick Checklist

- [ ] Frontend deployed on Vercel ✅
- [ ] Backend Gateway deployed on Render ✅
- [ ] Document Service deployed on Render ✅
- [ ] AI Service deployed on Render ✅
- [ ] Environment variables set ✅
- [ ] URLs connected ✅

---

## Need Help?

**Frontend not loading?**
- Check Vercel deployment logs
- Make sure `NEXT_PUBLIC_API_URL` is set

**Backend errors?**
- Check Render logs
- Verify `GEMINI_API_KEY` is set
- Check service URLs are correct

**CORS errors?**
- Make sure `CORS_ORIGINS` includes your frontend URL
- No trailing slashes in URLs

---

## Cost: $0 (Free Tier)

- **Vercel**: Free forever for personal projects
- **Render**: Free tier (services sleep after 15 min inactivity)
- **Total**: $0/month! 🎉

---

**That's it! Your app is live!** 🚀

