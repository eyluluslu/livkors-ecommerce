@echo off
echo 🚀 Starting Livkors E-Commerce Development Server...
echo.
echo 🔧 Setting environment variables...
set DATABASE_URL=file:./dev.db
set JWT_SECRET=your-super-secret-jwt-key-here-please-change-in-production

echo 📦 Starting Next.js development server...
echo.
echo 🌐 Server will be available at: http://localhost:3000
echo 👤 Admin login: admin@test.com / 123456
echo.
npm run dev 