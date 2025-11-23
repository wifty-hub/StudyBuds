#!/bin/bash

# Start Backend Gateway
echo "Starting Backend Gateway..."
cd backend
uvicorn main:app --reload --port 8000 &
BACKEND_PID=$!

# Start Document Service
echo "Starting Document Service..."
cd ../services/document
uvicorn main:app --reload --port 8001 &
DOCUMENT_PID=$!

# Start AI Service
echo "Starting AI Service..."
cd ../ai
uvicorn main:app --reload --port 8002 &
AI_PID=$!

echo "All services started!"
echo "Backend Gateway: http://localhost:8000"
echo "Document Service: http://localhost:8001"
echo "AI Service: http://localhost:8002"
echo ""
echo "Press Ctrl+C to stop all services"

# Wait for user interrupt
trap "kill $BACKEND_PID $DOCUMENT_PID $AI_PID; exit" INT TERM
wait

