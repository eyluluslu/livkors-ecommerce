Write-Host "🚀 Livkors E-Commerce Sunucusu Başlatılıyor..." -ForegroundColor Green
Write-Host ""

# Environment variables ayarla
$env:DATABASE_URL = "file:./dev.db"
$env:JWT_SECRET = "your-super-secret-jwt-key-here-please-change-in-production"

Write-Host "✅ Environment variables ayarlandı" -ForegroundColor Green
Write-Host "📊 DATABASE_URL: $env:DATABASE_URL" -ForegroundColor Cyan
Write-Host ""

Write-Host "🔧 Sunucu başlatılıyor..." -ForegroundColor Yellow
npm run dev 