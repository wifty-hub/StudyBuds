# PowerShell script to start all backend services

Write-Host "Starting Backend Services..." -ForegroundColor Green

# Start Backend Gateway
Write-Host "Starting Backend Gateway on port 8000..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; uvicorn main:app --reload --port 8000"

# Wait a bit
Start-Sleep -Seconds 2

# Start Document Service
Write-Host "Starting Document Service on port 8001..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd services/document; uvicorn main:app --reload --port 8001"

# Wait a bit
Start-Sleep -Seconds 2

# Start AI Service
Write-Host "Starting AI Service on port 8002..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd services/ai; uvicorn main:app --reload --port 8002"

Write-Host ""
Write-Host "All services started!" -ForegroundColor Green
Write-Host "Backend Gateway: http://localhost:8000" -ForegroundColor Cyan
Write-Host "Document Service: http://localhost:8001" -ForegroundColor Cyan
Write-Host "AI Service: http://localhost:8002" -ForegroundColor Cyan
Write-Host ""
Write-Host "Close the PowerShell windows to stop the services." -ForegroundColor Yellow

