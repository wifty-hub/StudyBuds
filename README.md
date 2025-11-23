# AI Study Assistant

A full-stack, multimodal learning platform powered by Google Gemini and a modern microservices architecture. Automatically generates high-quality summaries, flashcards, quizzes, and personalized study plans from uploaded study materials.

## 🚀 Features

- **Document Understanding**: Accepts PDFs, DOCX, images, and scanned pages with OCR support
- **Smart Summaries**: Generates structured, student-friendly summaries
- **Flashcards & Quizzes**: Creates Anki-ready flashcards and multi-format quizzes (MCQ, TF, short answer)
- **AI Study Chat**: Interactive Q&A using retrieval-augmented generation (RAG) with citations
- **Personalized Study Plans**: Builds schedules and topic priorities based on difficulty and progress
- **Knowledge Retrieval**: Semantic search across uploaded materials using embeddings

## 🏗️ Architecture

```
├── frontend/          # Next.js + TypeScript + TailwindCSS
├── backend/           # FastAPI gateway
├── services/
│   ├── document/      # PDF/DOCX/image processing & OCR
│   ├── ai/            # Gemini integration for content generation
│   ├── vector/        # ChromaDB for RAG
│   └── storage/       # File storage service
└── shared/            # Shared utilities and types
```

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, TypeScript, TailwindCSS
- **Backend**: FastAPI (Python)
- **AI Engine**: Google Gemini 2.0 Pro/Flash
- **Vector DB**: ChromaDB
- **Storage**: Local filesystem (ready for GCS/S3)
- **Auth**: Firebase Auth structure

## 📦 Setup

### Prerequisites

- Node.js 18+
- Python 3.10+
- Google Gemini API key

### Installation

#### Quick Setup (Recommended)

**Windows:**
```powershell
.\scripts\setup.ps1
```

**Linux/Mac:**
```bash
chmod +x scripts/setup.sh
./scripts/setup.sh
```

#### Manual Setup

1. Clone the repository
2. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   ```

3. Install backend dependencies:
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

4. Install service dependencies:
   ```bash
   cd services/document
   pip install -r requirements.txt
   
   cd ../ai
   pip install -r requirements.txt
   ```

5. Set up environment variables:
   ```bash
   # Create .env file from .env.example
   # Add your GEMINI_API_KEY to .env
   ```

### Running the Application

1. Start the backend services:
   ```bash
   # Terminal 1: Backend gateway
   cd backend
   uvicorn main:app --reload --port 8000
   
   # Terminal 2: Document service
   cd services/document
   uvicorn main:app --reload --port 8001
   
   # Terminal 3: AI service
   cd services/ai
   uvicorn main:app --reload --port 8002
   ```

2. Start the frontend:
   ```bash
   cd frontend
   npm run dev
   ```

3. Open http://localhost:3000

## 🔑 Environment Variables

```env
GEMINI_API_KEY=your_gemini_api_key
DATABASE_URL=sqlite:///./study_assistant.db
VECTOR_DB_PATH=./vector_db
STORAGE_PATH=./uploads
FRONTEND_URL=http://localhost:3000
BACKEND_URL=http://localhost:8000
```

## 📝 API Documentation

Once running, visit:
- Backend API: http://localhost:8000/docs
- Document Service: http://localhost:8001/docs
- AI Service: http://localhost:8002/docs

## 🎯 Usage

1. Upload study materials (PDFs, DOCX, images)
2. Wait for processing and text extraction
3. Generate summaries, flashcards, or quizzes
4. Use the AI chat to ask questions about your materials
5. Get personalized study plans based on your progress

## 🌐 Deployment

**Want to deploy? Start here:** [EASY_DEPLOY.md](./EASY_DEPLOY.md) ⚡

**Recommended Options:**
- **Frontend**: [Netlify](NETLIFY_DEPLOY.md) (easiest) or Vercel (2 minutes, free)
- **Backend**: Deploy to Render or Railway (10 minutes, free tier)

**Quick Links:**
- [Netlify Deployment Guide](./NETLIFY_DEPLOY.md) 🚀
- [Full Deployment Guide](./DEPLOYMENT.md) - All options and details

## 🎨 Branding

This project features **Lumio the Owl** as its mascot and uses the **Scholarly Calm** color palette. See [BRANDING.md](./BRANDING.md) for complete branding guidelines.

- **Mascot**: Lumio the Owl (friendly, scholarly owl with lightbulb plume)
- **Primary Color**: Soft Indigo (#5966FF)
- **Accent Color**: Gold Highlight (#FFC857)
- **Background**: Cloud White (#FAFAFF)

## 📄 License

MIT

