@echo off
REM Installation and quick start script for the portfolio (Windows)

echo.
echo ================================
echo [92m Data Science Portfolio Setup[0m
echo ================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if errorlevel 1 (
    echo [91mX Node.js is not installed.[0m
    echo Please download from: https://nodejs.org/
    pause
    exit /b 1
)

echo [92mOK[0m Node.js version:
node --version
echo [92mOK[0m npm version:
npm --version
echo.

REM Install dependencies
echo [93m>>[0m Installing dependencies...
call npm install

if errorlevel 1 (
    echo [91mX Failed to install dependencies[0m
    pause
    exit /b 1
)

echo [92mOK[0m Dependencies installed successfully!
echo.

echo ================================
echo [96m Quick Start[0m
echo ================================
echo.
echo To start development server, run:
echo   npm run dev
echo.
echo To build for production, run:
echo   npm run build
echo.

echo ================================
echo [96m Documentation[0m
echo ================================
echo.
echo 1. QUICKSTART.md - 5-minute setup guide
echo 2. README.md - Full documentation
echo 3. COMPONENT_REFERENCE.md - Component guide
echo 4. BUILD_SUMMARY.md - Build summary
echo.

echo ================================
echo [92m Next Steps[0m
echo ================================
echo.
echo 1. Run: npm run dev
echo 2. Open: http://localhost:3000
echo 3. Customize your information
echo 4. Add your projects
echo 5. Deploy to Vercel/Netlify
echo.

pause
