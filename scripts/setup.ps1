# PowerShell setup script for Windows

Write-Host "Setting up AI Study Assistant..." -ForegroundColor Green

# Create necessary directories
New-Item -ItemType Directory -Force -Path uploads | Out-Null
New-Item -ItemType Directory -Force -Path vector_db | Out-Null
New-Item -ItemType Directory -Force -Path chroma_db | Out-Null

# Install frontend dependencies
Write-Host "Installing frontend dependencies..." -ForegroundColor Yellow
Set-Location frontend
npm install
Set-Location ..

# Install backend dependencies
Write-Host "Installing backend dependencies..." -ForegroundColor Yellow
Set-Location backend
python -m pip install -r requirements.txt
Set-Location ..

# Install document service dependencies
Write-Host "Installing document service dependencies..." -ForegroundColor Yellow
Set-Location services/document
python -m pip install -r requirements.txt
Set-Location ../..

# Install AI service dependencies
Write-Host "Installing AI service dependencies..." -ForegroundColor Yellow
Set-Location services/ai
python -m pip install -r requirements.txt
Set-Location ../..

Write-Host ""
Write-Host "Setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Don't forget to:" -ForegroundColor Yellow
Write-Host "1. Copy .env.example to .env" -ForegroundColor White
Write-Host "2. Add your GEMINI_API_KEY to .env" -ForegroundColor White
Write-Host "3. Install Tesseract OCR for image processing (optional)" -ForegroundColor White
Write-Host ""
Write-Host "To start the application:" -ForegroundColor Cyan
Write-Host "  Frontend: cd frontend; npm run dev" -ForegroundColor White
Write-Host "  Backend: .\scripts\start-backend.ps1" -ForegroundColor White

