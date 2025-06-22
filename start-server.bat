@echo off
echo 🚀 Livkors E-Commerce Sunucusu Başlatılıyor...
echo.

REM Environment variables ayarla
set DATABASE_URL=file:./dev.db
set JWT_SECRET=your-super-secret-jwt-key-here-please-change-in-production

echo ✅ Environment variables ayarlandı
echo 📊 DATABASE_URL: %DATABASE_URL%
echo.

echo 🔧 Sunucu başlatılıyor...
npm run dev

pause 