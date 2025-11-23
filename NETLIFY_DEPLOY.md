# 🚀 Deploy to Netlify - Easy Guide

Netlify is perfect for deploying your Next.js frontend! Here's the easiest way:

## Option 1: Deploy via Netlify Dashboard (Easiest - 5 minutes)

### Step 1: Prepare Your Code
Make sure your code is pushed to GitHub (✅ Already done!)

### Step 2: Deploy Frontend to Netlify

1. **Go to**: https://app.netlify.com
2. **Sign up/Login** (free with GitHub)
3. **Click**: "Add new site" → "Import an existing project"
4. **Connect** your GitHub account
5. **Select** repository: `wifty-hub/StudyBuds`
6. **Configure build settings**:
   - **Base directory**: `frontend`
   - **Build command**: `npm install && npm run build`
   - **Publish directory**: `.next`
   - **Environment variables**:
     - `NEXT_PUBLIC_API_URL` = (your backend URL - set after deploying backend)

7. **Click**: "Deploy site"
8. **Wait 2-3 minutes** → Your site is live! 🎉

### Step 3: Deploy Backend Services

You still need to deploy the backend services. Use one of these:

**Option A: Render (Free)**
- Go to https://render.com
- Create 3 web services (backend, document, ai)
- See `DEPLOYMENT.md` for details

**Option B: Railway**
- Go to https://railway.app
- Deploy each service
- See `DEPLOYMENT.md` for details

### Step 4: Connect Frontend to Backend

1. **Go back to Netlify** → Your site → Site settings → Environment variables
2. **Add/Update**: `NEXT_PUBLIC_API_URL` = Your backend gateway URL
3. **Redeploy** (or wait for auto-deploy)

---

## Option 2: Deploy via Netlify CLI (Command Line)

### Step 1: Install Netlify CLI
```bash
npm install -g netlify-cli
```

### Step 2: Login
```bash
netlify login
```

### Step 3: Deploy
```bash
cd frontend
netlify deploy --prod
```

Follow the prompts:
- Link to existing site or create new
- Set build command: `npm run build`
- Set publish directory: `.next`

---

## Option 3: Auto-Deploy from GitHub

Netlify will automatically deploy when you push to GitHub!

1. **Connect** your GitHub repo in Netlify dashboard
2. **Enable** "Deploy notifications"
3. **Every push** to `main` branch = automatic deploy ✅

---

## Configuration Files

I've created these files for you:
- `netlify.toml` - Root Netlify config
- `frontend/netlify.toml` - Frontend-specific config

These are already configured! Just deploy and it will work.

---

## Environment Variables Setup

In Netlify dashboard → Site settings → Environment variables:

**Required:**
- `NEXT_PUBLIC_API_URL` = Your backend URL (e.g., `https://your-backend.onrender.com`)

**Optional:**
- `NODE_VERSION` = `18` (already set in config)

---

## Netlify Features You Get

✅ **Free HTTPS** - Automatic SSL certificates
✅ **CDN** - Fast global content delivery
✅ **Auto-deploy** - Deploy on every git push
✅ **Preview deployments** - Test before merging
✅ **Form handling** - Built-in form submissions
✅ **Serverless functions** - For API routes (if needed)

---

## Troubleshooting

### Build Fails
- Check build logs in Netlify dashboard
- Make sure `NEXT_PUBLIC_API_URL` is set
- Verify Node version (should be 18+)

### API Not Connecting
- Check `NEXT_PUBLIC_API_URL` environment variable
- Verify backend is deployed and accessible
- Check CORS settings on backend

### 404 Errors
- Make sure publish directory is `.next`
- Check Next.js routing configuration

---

## Quick Deploy Checklist

- [ ] Code pushed to GitHub ✅
- [ ] Netlify account created
- [ ] Site connected to GitHub repo
- [ ] Build settings configured
- [ ] Environment variables set
- [ ] Backend services deployed
- [ ] `NEXT_PUBLIC_API_URL` updated
- [ ] Site deployed and working! 🎉

---

## Cost: FREE! 🎉

Netlify free tier includes:
- 100GB bandwidth/month
- 300 build minutes/month
- Unlimited sites
- Perfect for your project!

---

**Your site will be live at**: `https://your-site-name.netlify.app`

Need help? Check Netlify docs: https://docs.netlify.com

