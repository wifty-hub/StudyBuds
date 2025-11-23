from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import google.generativeai as genai
import os
from dotenv import load_dotenv
import chromadb
from chromadb.config import Settings
import uuid

load_dotenv()

app = FastAPI(title="AI Service")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Gemini
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY environment variable is required")

genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel("gemini-pro")

# Initialize ChromaDB for RAG
chroma_client = chromadb.Client(Settings(
    chroma_db_impl="duckdb+parquet",
    persist_directory="./chroma_db"
))

try:
    collection = chroma_client.get_or_create_collection(name="study_documents")
except:
    collection = chroma_client.create_collection(name="study_documents")


class SummaryRequest(BaseModel):
    document_id: str
    text_content: str
    type: str = "lecture"


class FlashcardRequest(BaseModel):
    document_id: str
    text_content: str


class QuizRequest(BaseModel):
    document_id: str
    text_content: str
    question_count: int = 10


class ChatRequest(BaseModel):
    message: str
    documents: List[dict]


class StudyPlanRequest(BaseModel):
    documents: List[dict]


def generate_with_gemini(prompt: str, max_tokens: int = 2000) -> str:
    """Generate content using Gemini"""
    try:
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Gemini API error: {str(e)}")


def store_document_embeddings(document_id: str, text_content: str, filename: str):
    """Store document chunks in vector database"""
    # Simple chunking (can be improved)
    chunks = text_content.split("\n\n")
    chunks = [chunk.strip() for chunk in chunks if len(chunk.strip()) > 50]
    
    ids = [f"{document_id}_{i}" for i in range(len(chunks))]
    metadatas = [
        {"document_id": document_id, "filename": filename, "chunk_index": str(i)}
        for i in range(len(chunks))
    ]
    
    collection.add(
        documents=chunks,
        ids=ids,
        metadatas=metadatas,
    )


def retrieve_relevant_chunks(query: str, n_results: int = 5) -> List[str]:
    """Retrieve relevant document chunks using RAG"""
    try:
        results = collection.query(
            query_texts=[query],
            n_results=n_results,
        )
        if results["documents"] and len(results["documents"]) > 0:
            return results["documents"][0]
        return []
    except Exception as e:
        print(f"Retrieval error: {e}")
        return []


@app.post("/summaries")
async def generate_summary(request: SummaryRequest):
    """Generate a summary for a document"""
    summary_type_prompts = {
        "exam": "Create a comprehensive exam-focused summary highlighting key concepts, definitions, and important facts.",
        "lecture": "Create a structured lecture summary with main topics, key points, and important details.",
        "quick_review": "Create a concise quick review summary with the most important points and takeaways.",
    }
    
    prompt_template = f"""
    {summary_type_prompts.get(request.type, summary_type_prompts["lecture"])}
    
    Document content:
    {request.text_content[:5000]}  # Limit to avoid token limits
    
    Generate a well-structured summary:
    """
    
    content = generate_with_gemini(prompt_template)
    
    # Store embeddings for RAG
    store_document_embeddings(request.document_id, request.text_content, f"doc_{request.document_id}")
    
    return {"content": content}


@app.post("/flashcards")
async def generate_flashcards(request: FlashcardRequest):
    """Generate flashcards for a document"""
    prompt = f"""
    Create flashcards from the following study material. Generate 10-15 flashcards.
    Format each flashcard as:
    Front: [question or term]
    Back: [answer or definition]
    
    Document content:
    {request.text_content[:5000]}
    
    Return ONLY the flashcards in this exact format:
    Front: [text]
    Back: [text]
    
    Front: [text]
    Back: [text]
    ...
    """
    
    content = generate_with_gemini(prompt)
    
    # Parse flashcards
    flashcards = []
    lines = content.split("\n")
    current_front = None
    
    for line in lines:
        line = line.strip()
        if line.startswith("Front:"):
            if current_front:
                flashcards.append({"front": current_front, "back": ""})
            current_front = line.replace("Front:", "").strip()
        elif line.startswith("Back:") and current_front:
            back = line.replace("Back:", "").strip()
            flashcards.append({"front": current_front, "back": back})
            current_front = None
    
    if current_front:
        flashcards.append({"front": current_front, "back": ""})
    
    return {"flashcards": flashcards[:15]}  # Limit to 15


@app.post("/quizzes")
async def generate_quiz(request: QuizRequest):
    """Generate a quiz for a document"""
    prompt = f"""
    Create {request.question_count} quiz questions from the following study material.
    Include a mix of multiple choice, true/false, and short answer questions.
    
    Document content:
    {request.text_content[:5000]}
    
    Return questions in this JSON format:
    {{
        "questions": [
            {{
                "id": "1",
                "question": "Question text",
                "type": "mcq",
                "options": ["Option A", "Option B", "Option C", "Option D"],
                "correct_answer": "Option A"
            }},
            {{
                "id": "2",
                "question": "Question text",
                "type": "true_false",
                "correct_answer": "True"
            }},
            {{
                "id": "3",
                "question": "Question text",
                "type": "short_answer",
                "correct_answer": "Answer text"
            }}
        ]
    }}
    """
    
    content = generate_with_gemini(prompt)
    
    # Try to parse JSON from response
    import json
    try:
        # Extract JSON from markdown code blocks if present
        if "```json" in content:
            content = content.split("```json")[1].split("```")[0]
        elif "```" in content:
            content = content.split("```")[1].split("```")[0]
        
        quiz_data = json.loads(content.strip())
        return quiz_data
    except:
        # Fallback: create simple questions
        questions = []
        lines = content.split("\n")
        for i, line in enumerate(lines[:request.question_count]):
            if "?" in line:
                questions.append({
                    "id": str(i + 1),
                    "question": line.strip(),
                    "type": "short_answer",
                    "correct_answer": "See document",
                })
        
        return {"questions": questions[:request.question_count]}


@app.post("/chat")
async def chat(request: ChatRequest):
    """Chat with AI using RAG"""
    # Retrieve relevant chunks
    relevant_chunks = retrieve_relevant_chunks(request.message, n_results=5)
    
    # Build context
    context = ""
    citations = []
    
    if relevant_chunks:
        context = "\n\nRelevant context from your documents:\n" + "\n\n".join(relevant_chunks[:3])
        citations = [f"Document excerpt {i+1}" for i in range(min(3, len(relevant_chunks)))]
    
    # Also include full document content if available
    doc_texts = []
    for doc in request.documents:
        if doc.get("text_content"):
            doc_texts.append(f"From {doc.get('filename', 'document')}:\n{doc['text_content'][:2000]}")
    
    full_context = "\n\n".join(doc_texts[:2])  # Limit to 2 documents
    
    prompt = f"""
    You are StudyBudds, an AI study assistant. Answer the student's question based on the provided study materials.
    Be accurate, helpful, and cite specific information when possible.
    
    Student's question: {request.message}
    
    {context}
    
    {full_context}
    
    Provide a clear, helpful answer. If you reference specific information, mention which document it came from.
    """
    
    content = generate_with_gemini(prompt)
    
    return {
        "content": content,
        "citations": citations if citations else ["General knowledge"],
    }


@app.post("/study-plans")
async def generate_study_plan(request: StudyPlanRequest):
    """Generate a personalized study plan"""
    doc_summaries = []
    for doc in request.documents:
        summary = f"Document: {doc.get('filename', 'Unknown')}\n"
        summary += f"Content preview: {doc.get('text_content', '')[:1000]}"
        doc_summaries.append(summary)
    
    prompt = f"""
    Create a personalized study plan based on these study materials.
    Analyze the content, identify topics, assess difficulty, and create a structured plan.
    
    Study materials:
    {chr(10).join(doc_summaries)}
    
    Return a JSON structure with topics:
    {{
        "topics": [
            {{
                "id": "1",
                "name": "Topic name",
                "difficulty": "easy|medium|hard",
                "priority": 8,
                "estimated_time": 60,
                "document_ids": ["doc_id"]
            }}
        ]
    }}
    
    Create 5-10 topics covering the material. Prioritize important concepts.
    """
    
    content = generate_with_gemini(prompt)
    
    import json
    try:
        if "```json" in content:
            content = content.split("```json")[1].split("```")[0]
        elif "```" in content:
            content = content.split("```")[1].split("```")[0]
        
        plan_data = json.loads(content.strip())
        
        # Ensure all topics have required fields
        doc_ids = [doc.get("id", "") for doc in request.documents]
        for topic in plan_data.get("topics", []):
            if "id" not in topic:
                topic["id"] = str(uuid.uuid4())
            if "document_ids" not in topic:
                topic["document_ids"] = doc_ids
        
        return plan_data
    except Exception as e:
        # Fallback plan
        return {
            "topics": [
                {
                    "id": str(uuid.uuid4()),
                    "name": "Study Material Review",
                    "difficulty": "medium",
                    "priority": 5,
                    "estimated_time": 120,
                    "document_ids": [doc.get("id", "") for doc in request.documents],
                }
            ]
        }


@app.get("/health")
async def health():
    return {"status": "healthy", "service": "ai-service"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8002)

