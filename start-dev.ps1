Write-Host "🚀 Starting Livkors E-Commerce Development Server..." -ForegroundColor Green
Write-Host ""
Write-Host "🔧 Setting environment variables..." -ForegroundColor Yellow
$env:DATABASE_URL = "file:./dev.db"
$env:JWT_SECRET = "your-super-secret-jwt-key-here-please-change-in-production"

Write-Host "📦 Starting Next.js development server..." -ForegroundColor Cyan
Write-Host ""
Write-Host "🌐 Server will be available at: http://localhost:3000" -ForegroundColor Green
Write-Host "👤 Admin login: admin@test.com / 123456" -ForegroundColor Magenta
Write-Host ""

npm run dev 