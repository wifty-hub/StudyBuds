# Easy Deployment Script for Windows

Write-Host "🚀 Easy Deployment Script" -ForegroundColor Cyan
Write-Host ""

# Check if Vercel CLI is installed
$vercelInstalled = Get-Command vercel -ErrorAction SilentlyContinue

if (-not $vercelInstalled) {
    Write-Host "Installing Vercel CLI..." -ForegroundColor Yellow
    npm install -g vercel
}

Write-Host "Step 1: Deploying Frontend to Vercel" -ForegroundColor Green
Write-Host "----------------------------------------" -ForegroundColor Gray

cd frontend

if (Test-Path ".vercel") {
    Write-Host "Vercel project already initialized. Deploying..." -ForegroundColor Yellow
    vercel --prod
} else {
    Write-Host "Initializing Vercel project..." -ForegroundColor Yellow
    Write-Host "Follow the prompts:" -ForegroundColor Cyan
    Write-Host "  - Press Enter to create new project" -ForegroundColor White
    Write-Host "  - Press Enter for default settings" -ForegroundColor White
    Write-Host "  - Your app will be live!" -ForegroundColor White
    Write-Host ""
    vercel
}

cd ..

Write-Host ""
Write-Host "✅ Frontend deployed!" -ForegroundColor Green
Write-Host ""
Write-Host "Step 2: Deploy Backend Services" -ForegroundColor Green
Write-Host "----------------------------------------" -ForegroundColor Gray
Write-Host "Now deploy backend services on Render.com:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Go to: https://render.com" -ForegroundColor Cyan
Write-Host "2. Sign up (free with GitHub)" -ForegroundColor White
Write-Host "3. Create 3 Web Services:" -ForegroundColor White
Write-Host "   - Backend Gateway (root: backend)" -ForegroundColor Gray
Write-Host "   - Document Service (root: services/document)" -ForegroundColor Gray
Write-Host "   - AI Service (root: services/ai)" -ForegroundColor Gray
Write-Host ""
Write-Host "4. Set environment variables (see DEPLOYMENT.md)" -ForegroundColor Yellow
Write-Host ""
Write-Host "Need detailed instructions? See EASY_DEPLOY.md" -ForegroundColor Cyan



