# ⚡ Quick Deploy Guide

## Fastest Way to Deploy (5 minutes)

### Step 1: Deploy Frontend to Vercel

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Login**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   cd frontend
   vercel
   ```

4. **Set Environment Variable**:
   - When prompted, add: `NEXT_PUBLIC_API_URL` = (you'll set this after backend deploys)

### Step 2: Deploy Backend Services to Railway

1. **Install Railway CLI**:
   ```bash
   npm install -g @railway/cli
   ```

2. **Login**:
   ```bash
   railway login
   ```

3. **Deploy Backend Gateway**:
   ```bash
   cd backend
   railway init
   railway up
   ```
   - Copy the URL (e.g., `https://backend-production.up.railway.app`)

4. **Deploy Document Service**:
   ```bash
   cd ../services/document
   railway init
   railway up
   ```
   - Copy the URL

5. **Deploy AI Service**:
   ```bash
   cd ../services/ai
   railway init
   railway up
   ```
   - Copy the URL

6. **Set Environment Variables** in Railway dashboard:
   - Go to each service → Variables
   - Add:
     - `GEMINI_API_KEY` = Your Gemini API key
     - `DOCUMENT_SERVICE_URL` = Document service URL
     - `AI_SERVICE_URL` = AI service URL
     - `CORS_ORIGINS` = Your Vercel frontend URL

### Step 3: Update Frontend URL

1. Go to Vercel dashboard → Your project → Settings → Environment Variables
2. Update `NEXT_PUBLIC_API_URL` = Your backend gateway URL
3. Redeploy frontend (or wait for auto-deploy)

### Step 4: Test

Visit your Vercel URL and test the application!

---

## Alternative: Render (All Services)

1. Go to https://render.com
2. Connect your GitHub repository
3. Create 4 web services:
   - Frontend (root: `frontend`, build: `npm install && npm run build`)
   - Backend Gateway (root: `backend`)
   - Document Service (root: `services/document`)
   - AI Service (root: `services/ai`)
4. Set environment variables for each
5. Deploy!

---

## Need Help?

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions and troubleshooting.

