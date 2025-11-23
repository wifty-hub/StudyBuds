#!/bin/bash

echo "Setting up AI Study Assistant..."

# Create necessary directories
mkdir -p uploads
mkdir -p vector_db
mkdir -p chroma_db

# Install frontend dependencies
echo "Installing frontend dependencies..."
cd frontend
npm install
cd ..

# Install backend dependencies
echo "Installing backend dependencies..."
cd backend
python -m pip install -r requirements.txt
cd ..

# Install document service dependencies
echo "Installing document service dependencies..."
cd services/document
python -m pip install -r requirements.txt
cd ../..

# Install AI service dependencies
echo "Installing AI service dependencies..."
cd services/ai
python -m pip install -r requirements.txt
cd ../..

echo ""
echo "Setup complete!"
echo ""
echo "Don't forget to:"
echo "1. Copy .env.example to .env"
echo "2. Add your GEMINI_API_KEY to .env"
echo "3. Install Tesseract OCR for image processing (optional)"
echo ""
echo "To start the application:"
echo "  Frontend: cd frontend && npm run dev"
echo "  Backend: ./scripts/start-backend.sh"

