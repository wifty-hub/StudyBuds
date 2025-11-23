from fastapi import FastAPI, HTTPException, UploadFile, File, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from typing import List, Optional
import httpx
import os
from dotenv import load_dotenv
from pydantic import BaseModel
from datetime import datetime
import uuid
from storage import storage

load_dotenv()

app = FastAPI(title="StudyBudds API", version="1.0.0")

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=os.getenv("CORS_ORIGINS", "http://localhost:3000").split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Service URLs
DOCUMENT_SERVICE_URL = os.getenv("DOCUMENT_SERVICE_URL", "http://localhost:8001")
AI_SERVICE_URL = os.getenv("AI_SERVICE_URL", "http://localhost:8002")

# Use persistent storage
documents_db = storage.documents
summaries_db = storage.summaries
flashcards_db = storage.flashcards
quizzes_db = storage.quizzes
chat_history_db = storage.chat_history
study_plans_db = storage.study_plans


class DocumentResponse(BaseModel):
    id: str
    filename: str
    file_type: str
    upload_date: str
    status: str
    text_content: Optional[str] = None
    page_count: Optional[int] = None


class SummaryRequest(BaseModel):
    document_id: str
    type: str = "lecture"


class FlashcardRequest(BaseModel):
    document_id: str


class QuizRequest(BaseModel):
    document_id: str
    question_count: int = 10


class ChatRequest(BaseModel):
    message: str
    document_ids: Optional[List[str]] = None


class StudyPlanRequest(BaseModel):
    document_ids: List[str]


@app.get("/")
async def root():
    return {"message": "StudyBudds API", "version": "1.0.0"}


@app.post("/documents/upload", response_model=DocumentResponse)
async def upload_document(file: UploadFile = File(...)):
    """Upload a document for processing"""
    try:
        # Forward to document service
        async with httpx.AsyncClient() as client:
            files = {"file": (file.filename, await file.read(), file.content_type)}
            response = await client.post(
                f"{DOCUMENT_SERVICE_URL}/process",
                files=files,
                timeout=60.0
            )
            response.raise_for_status()
            result = response.json()
            
            # Store document metadata
            document = DocumentResponse(
                id=result.get("id", str(uuid.uuid4())),
                filename=file.filename,
                file_type=result.get("file_type", file.content_type),
                upload_date=datetime.now().isoformat(),
                status="processing",
                text_content=result.get("text_content"),
                page_count=result.get("page_count"),
            )
            documents_db.append(document.dict())
            storage.save_documents()
            
            return document
    except httpx.HTTPError as e:
        raise HTTPException(status_code=500, detail=f"Document service error: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Upload failed: {str(e)}")


@app.get("/documents", response_model=List[DocumentResponse])
async def get_documents():
    """Get all uploaded documents"""
    return documents_db


@app.get("/documents/{document_id}", response_model=DocumentResponse)
async def get_document(document_id: str):
    """Get a specific document"""
    doc = next((d for d in documents_db if d["id"] == document_id), None)
    if not doc:
        raise HTTPException(status_code=404, detail="Document not found")
    return doc


@app.delete("/documents/{document_id}")
async def delete_document(document_id: str):
    """Delete a document"""
    global documents_db
    documents_db = [d for d in documents_db if d["id"] != document_id]
    storage.save_documents()
    return {"message": "Document deleted"}


@app.post("/ai/summaries")
async def create_summary(request: SummaryRequest):
    """Generate a summary for a document"""
    doc = next((d for d in documents_db if d["id"] == request.document_id), None)
    if not doc:
        raise HTTPException(status_code=404, detail="Document not found")
    
    if doc["status"] != "completed":
        raise HTTPException(status_code=400, detail="Document processing not completed")
    
    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"{AI_SERVICE_URL}/summaries",
                json={
                    "document_id": request.document_id,
                    "text_content": doc.get("text_content", ""),
                    "type": request.type,
                },
                timeout=120.0
            )
            response.raise_for_status()
            result = response.json()
            
            summary = {
                "id": str(uuid.uuid4()),
                "document_id": request.document_id,
                "content": result.get("content", ""),
                "created_at": datetime.now().isoformat(),
                "type": request.type,
            }
            summaries_db.append(summary)
            storage.save_summaries()
            return summary
    except httpx.HTTPError as e:
        raise HTTPException(status_code=500, detail=f"AI service error: {str(e)}")


@app.get("/ai/summaries")
async def get_summaries(document_id: Optional[str] = None):
    """Get summaries, optionally filtered by document"""
    summaries = summaries_db
    if document_id:
        summaries = [s for s in summaries if s["document_id"] == document_id]
    return summaries


@app.post("/ai/flashcards")
async def create_flashcards(request: FlashcardRequest):
    """Generate flashcards for a document"""
    doc = next((d for d in documents_db if d["id"] == request.document_id), None)
    if not doc:
        raise HTTPException(status_code=404, detail="Document not found")
    
    if doc["status"] != "completed":
        raise HTTPException(status_code=400, detail="Document processing not completed")
    
    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"{AI_SERVICE_URL}/flashcards",
                json={
                    "document_id": request.document_id,
                    "text_content": doc.get("text_content", ""),
                },
                timeout=120.0
            )
            response.raise_for_status()
            result = response.json()
            
            flashcards = result.get("flashcards", [])
            for card in flashcards:
                card["id"] = str(uuid.uuid4())
                card["document_id"] = request.document_id
                card["created_at"] = datetime.now().isoformat()
                flashcards_db.append(card)
            
            storage.save_flashcards()
            return flashcards
    except httpx.HTTPError as e:
        raise HTTPException(status_code=500, detail=f"AI service error: {str(e)}")


@app.get("/ai/flashcards")
async def get_flashcards(document_id: Optional[str] = None):
    """Get flashcards, optionally filtered by document"""
    flashcards = flashcards_db
    if document_id:
        flashcards = [f for f in flashcards if f["document_id"] == document_id]
    return flashcards


@app.get("/ai/flashcards/export/anki")
async def export_flashcards_anki(document_id: Optional[str] = None):
    """Export flashcards in Anki format"""
    flashcards = flashcards_db
    if document_id:
        flashcards = [f for f in flashcards if f["document_id"] == document_id]
    
    # Generate Anki-format CSV
    lines = ["Front,Back"]
    for card in flashcards:
        front = card["front"].replace(",", "，").replace("\n", " ")
        back = card["back"].replace(",", "，").replace("\n", " ")
        lines.append(f"{front},{back}")
    
    content = "\n".join(lines)
    return JSONResponse(
        content={"content": content, "format": "anki_csv"},
        headers={"Content-Disposition": "attachment; filename=flashcards.csv"}
    )


@app.post("/ai/quizzes")
async def create_quiz(request: QuizRequest):
    """Generate a quiz for a document"""
    doc = next((d for d in documents_db if d["id"] == request.document_id), None)
    if not doc:
        raise HTTPException(status_code=404, detail="Document not found")
    
    if doc["status"] != "completed":
        raise HTTPException(status_code=400, detail="Document processing not completed")
    
    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"{AI_SERVICE_URL}/quizzes",
                json={
                    "document_id": request.document_id,
                    "text_content": doc.get("text_content", ""),
                    "question_count": request.question_count,
                },
                timeout=120.0
            )
            response.raise_for_status()
            result = response.json()
            
            quiz = {
                "id": str(uuid.uuid4()),
                "document_id": request.document_id,
                "questions": result.get("questions", []),
                "created_at": datetime.now().isoformat(),
            }
            quizzes_db.append(quiz)
            storage.save_quizzes()
            return quiz
    except httpx.HTTPError as e:
        raise HTTPException(status_code=500, detail=f"AI service error: {str(e)}")


@app.get("/ai/quizzes")
async def get_quizzes(document_id: Optional[str] = None):
    """Get quizzes, optionally filtered by document"""
    quizzes = quizzes_db
    if document_id:
        quizzes = [q for q in quizzes if q["document_id"] == document_id]
    return quizzes


@app.post("/ai/chat")
async def chat(request: ChatRequest):
    """Send a chat message and get AI response with RAG"""
    try:
        # Get relevant documents
        relevant_docs = []
        if request.document_ids:
            relevant_docs = [d for d in documents_db if d["id"] in request.document_ids]
        else:
            relevant_docs = [d for d in documents_db if d["status"] == "completed"]
        
        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"{AI_SERVICE_URL}/chat",
                json={
                    "message": request.message,
                    "documents": [
                        {
                            "id": d["id"],
                            "text_content": d.get("text_content", ""),
                            "filename": d["filename"],
                        }
                        for d in relevant_docs
                    ],
                },
                timeout=120.0
            )
            response.raise_for_status()
            result = response.json()
            
            chat_message = {
                "id": str(uuid.uuid4()),
                "role": "assistant",
                "content": result.get("content", ""),
                "citations": result.get("citations", []),
                "timestamp": datetime.now().isoformat(),
            }
            chat_history_db.append({
                "id": str(uuid.uuid4()),
                "role": "user",
                "content": request.message,
                "timestamp": datetime.now().isoformat(),
            })
            chat_history_db.append(chat_message)
            storage.save_chat_history()
            
            return chat_message
    except httpx.HTTPError as e:
        raise HTTPException(status_code=500, detail=f"AI service error: {str(e)}")


@app.get("/ai/chat/history")
async def get_chat_history():
    """Get chat history"""
    return chat_history_db


@app.post("/ai/study-plans")
async def create_study_plan(request: StudyPlanRequest):
    """Generate a personalized study plan"""
    docs = [d for d in documents_db if d["id"] in request.document_ids]
    if len(docs) != len(request.document_ids):
        raise HTTPException(status_code=404, detail="Some documents not found")
    
    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"{AI_SERVICE_URL}/study-plans",
                json={
                    "documents": [
                        {
                            "id": d["id"],
                            "filename": d["filename"],
                            "text_content": d.get("text_content", ""),
                        }
                        for d in docs
                    ],
                },
                timeout=120.0
            )
            response.raise_for_status()
            result = response.json()
            
            study_plan = {
                "id": str(uuid.uuid4()),
                "topics": result.get("topics", []),
                "created_at": datetime.now().isoformat(),
            }
            study_plans_db.append(study_plan)
            storage.save_study_plans()
            return study_plan
    except httpx.HTTPError as e:
        raise HTTPException(status_code=500, detail=f"AI service error: {str(e)}")


@app.get("/ai/study-plans")
async def get_study_plans():
    """Get all study plans"""
    return study_plans_db


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

