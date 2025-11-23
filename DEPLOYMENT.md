# 🌐 Deployment Guide

This guide covers deploying StudyBudds to production. The application consists of multiple services that need to be deployed separately.

## 📋 Deployment Overview

- **Frontend**: Next.js app → Deploy to Vercel (recommended) or Netlify
- **Backend Gateway**: FastAPI → Deploy to Railway, Render, or Fly.io
- **Document Service**: FastAPI → Deploy to Railway, Render, or Fly.io
- **AI Service**: FastAPI → Deploy to Railway, Render, or Fly.io

## 🚀 Option 1: Vercel (Frontend) + Railway (Backend Services) - Recommended

### Frontend Deployment (Vercel)

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Deploy from frontend directory**:
   ```bash
   cd frontend
   vercel
   ```

3. **Follow prompts**:
   - Link to existing project or create new
   - Set environment variables:
     - `NEXT_PUBLIC_API_URL` = Your backend URL (e.g., `https://your-backend.railway.app`)

4. **Or use Vercel Dashboard**:
   - Go to https://vercel.com
   - Import your GitHub repository
   - Set root directory to `frontend`
   - Add environment variable: `NEXT_PUBLIC_API_URL`

### Backend Services Deployment (Railway)

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

4. **Deploy Document Service**:
   ```bash
   cd ../services/document
   railway init
   railway up
   ```

5. **Deploy AI Service**:
   ```bash
   cd ../services/ai
   railway init
   railway up
   ```

6. **Set Environment Variables** in Railway dashboard:
   - `GEMINI_API_KEY` (required)
   - `DOCUMENT_SERVICE_URL` = Your document service URL
   - `AI_SERVICE_URL` = Your AI service URL
   - `CORS_ORIGINS` = Your frontend URL

## 🚀 Option 2: Render (All Services)

### Frontend Deployment

1. Go to https://render.com
2. Create new **Static Site**
3. Connect your GitHub repository
4. Settings:
   - **Build Command**: `cd frontend && npm install && npm run build`
   - **Publish Directory**: `frontend/.next`
   - **Environment Variables**:
     - `NEXT_PUBLIC_API_URL` = Your backend URL

### Backend Services Deployment

For each service (backend, document, ai):

1. Create new **Web Service**
2. Connect GitHub repository
3. Settings:
   - **Root Directory**: `backend` or `services/document` or `services/ai`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
   - **Environment Variables**:
     - `GEMINI_API_KEY`
     - `PORT` (auto-set by Render)
     - Service URLs

## 🚀 Option 3: Docker + Cloud Platform

### Build Docker Images

1. **Build images**:
   ```bash
   docker build -t ai-study-frontend ./frontend
   docker build -t ai-study-backend ./backend
   docker build -t ai-study-document ./services/document
   docker build -t ai-study-ai ./services/ai
   ```

2. **Push to container registry** (Docker Hub, GitHub Container Registry, etc.)

3. **Deploy to platform**:
   - **Fly.io**: `fly deploy`
   - **Google Cloud Run**: Use Cloud Build
   - **AWS ECS/Fargate**: Use ECS deployment
   - **Azure Container Instances**: Use Azure CLI

## 📝 Environment Variables Setup

### Frontend (.env.production)
```env
NEXT_PUBLIC_API_URL=https://your-backend-url.com
```

### Backend Gateway
```env
GEMINI_API_KEY=your_key
DOCUMENT_SERVICE_URL=https://document-service-url.com
AI_SERVICE_URL=https://ai-service-url.com
CORS_ORIGINS=https://your-frontend-url.com
```

### Document Service
```env
# Usually no special env vars needed
```

### AI Service
```env
GEMINI_API_KEY=your_key
VECTOR_DB_PATH=./chroma_db
```

## 🗄️ Database & Storage Considerations

### For Production:

1. **Replace in-memory storage** with:
   - **PostgreSQL** (Railway, Supabase, Neon)
   - **MongoDB** (MongoDB Atlas)
   - **SQLite** (for small deployments)

2. **File Storage**:
   - **AWS S3** or **Google Cloud Storage**
   - **Cloudinary** (for images)
   - **Supabase Storage**

3. **Vector Database**:
   - **Pinecone** (production-ready)
   - **ChromaDB Cloud**
   - Keep ChromaDB local (for small scale)

## 🔧 Production Checklist

- [ ] Set up environment variables on all services
- [ ] Configure CORS to allow your frontend domain
- [ ] Set up database (replace in-memory storage)
- [ ] Configure file storage (S3/GCS)
- [ ] Set up monitoring (Sentry, LogRocket)
- [ ] Configure SSL/HTTPS (usually automatic)
- [ ] Set up domain names
- [ ] Configure rate limiting
- [ ] Set up backups
- [ ] Test all endpoints
- [ ] Update frontend API URLs

## 📚 Platform-Specific Guides

### Vercel Deployment

```bash
cd frontend
vercel --prod
```

### Railway Deployment

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Deploy each service
cd backend && railway up
cd ../services/document && railway up
cd ../services/ai && railway up
```

### Render Deployment

1. Connect GitHub repo
2. Create web service for each backend
3. Set build/start commands
4. Add environment variables

## 🔐 Security Considerations

1. **Never commit** `.env` files
2. **Use environment variables** for all secrets
3. **Enable CORS** only for your frontend domain
4. **Set up rate limiting** on APIs
5. **Use HTTPS** everywhere
6. **Validate file uploads** (size, type)
7. **Sanitize user inputs**

## 💰 Cost Estimates

- **Vercel**: Free tier available (hobby)
- **Railway**: $5/month starter plan
- **Render**: Free tier available (with limitations)
- **Fly.io**: Pay-as-you-go
- **Database**: Varies by provider ($0-25/month)
- **Storage**: Varies ($0-10/month for small usage)

## 🆘 Troubleshooting

### CORS Errors
- Verify `CORS_ORIGINS` includes your frontend URL
- Check for trailing slashes
- Ensure HTTPS matches

### Service Communication
- Verify all service URLs are correct
- Check environment variables are set
- Ensure services are accessible

### Build Failures
- Check Node.js/Python versions match
- Verify all dependencies are in requirements.txt/package.json
- Check build logs for specific errors

## 📞 Quick Deploy Commands

### All-in-One Railway Deploy
```bash
# Deploy backend gateway
cd backend && railway up

# Deploy document service  
cd ../services/document && railway up

# Deploy AI service
cd ../services/ai && railway up

# Deploy frontend to Vercel
cd ../frontend && vercel --prod
```

---

**Recommended**: Start with Vercel (frontend) + Railway (backend) for easiest deployment experience.

