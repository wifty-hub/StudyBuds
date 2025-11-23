from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
import uuid
from typing import Optional
import PyPDF2
from docx import Document as DocxDocument
from PIL import Image
import pytesseract
from pdf2image import convert_from_path
import io
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="Document Processing Service")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ProcessResponse(BaseModel):
    id: str
    file_type: str
    text_content: str
    page_count: Optional[int] = None


def extract_text_from_pdf(file_content: bytes, filename: str) -> tuple[str, int]:
    """Extract text from PDF file"""
    try:
        pdf_file = io.BytesIO(file_content)
        pdf_reader = PyPDF2.PdfReader(pdf_file)
        text_content = []
        page_count = len(pdf_reader.pages)
        
        for page in pdf_reader.pages:
            text = page.extract_text()
            if text.strip():
                text_content.append(text)
        
        # If no text found, try OCR
        if not text_content:
            # Save temporarily for OCR
            temp_path = f"/tmp/{uuid.uuid4()}.pdf"
            with open(temp_path, "wb") as f:
                f.write(file_content)
            
            try:
                images = convert_from_path(temp_path)
                ocr_text = []
                for image in images:
                    text = pytesseract.image_to_string(image)
                    ocr_text.append(text)
                text_content = ocr_text
            except Exception as e:
                print(f"OCR failed: {e}")
            finally:
                if os.path.exists(temp_path):
                    os.remove(temp_path)
        
        return "\n\n".join(text_content), page_count
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"PDF processing error: {str(e)}")


def extract_text_from_docx(file_content: bytes) -> str:
    """Extract text from DOCX file"""
    try:
        docx_file = io.BytesIO(file_content)
        doc = DocxDocument(docx_file)
        text_content = []
        
        for paragraph in doc.paragraphs:
            if paragraph.text.strip():
                text_content.append(paragraph.text)
        
        return "\n\n".join(text_content)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"DOCX processing error: {str(e)}")


def extract_text_from_image(file_content: bytes) -> str:
    """Extract text from image using OCR"""
    try:
        image = Image.open(io.BytesIO(file_content))
        text = pytesseract.image_to_string(image)
        return text
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Image OCR error: {str(e)}")


@app.post("/process", response_model=ProcessResponse)
async def process_document(file: UploadFile = File(...)):
    """Process uploaded document and extract text"""
    try:
        file_content = await file.read()
        file_type = file.content_type or ""
        filename = file.filename or ""
        
        # Determine file type and extract text
        text_content = ""
        page_count = None
        
        if file_type == "application/pdf" or filename.lower().endswith(".pdf"):
            text_content, page_count = extract_text_from_pdf(file_content, filename)
            file_type = "application/pdf"
        elif (
            file_type == "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            or filename.lower().endswith(".docx")
        ):
            text_content = extract_text_from_docx(file_content)
            file_type = "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        elif file_type.startswith("image/"):
            text_content = extract_text_from_image(file_content)
            file_type = file_type
        else:
            raise HTTPException(
                status_code=400,
                detail=f"Unsupported file type: {file_type}. Supported: PDF, DOCX, images"
            )
        
        if not text_content.strip():
            raise HTTPException(
                status_code=400,
                detail="No text content could be extracted from the document"
            )
        
        return ProcessResponse(
            id=str(uuid.uuid4()),
            file_type=file_type,
            text_content=text_content,
            page_count=page_count,
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Processing error: {str(e)}")


@app.get("/health")
async def health():
    return {"status": "healthy", "service": "document-processing"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)

