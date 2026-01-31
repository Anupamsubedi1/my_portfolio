#!/bin/bash
# Installation and quick start script for the portfolio

echo "================================"
echo "📊 Data Science Portfolio Setup"
echo "================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js from https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo "✅ npm version: $(npm --version)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully!"
    echo ""
    echo "================================"
    echo "🚀 Quick Start"
    echo "================================"
    echo ""
    echo "To start development server, run:"
    echo "  npm run dev"
    echo ""
    echo "To build for production, run:"
    echo "  npm run build"
    echo ""
    echo "================================"
    echo "📚 Documentation"
    echo "================================"
    echo ""
    echo "1. QUICKSTART.md - 5-minute setup guide"
    echo "2. README.md - Full documentation"
    echo "3. COMPONENT_REFERENCE.md - Component guide"
    echo "4. BUILD_SUMMARY.md - Build summary"
    echo ""
    echo "================================"
    echo "✨ Next Steps"
    echo "================================"
    echo ""
    echo "1. Run: npm run dev"
    echo "2. Open: http://localhost:3000"
    echo "3. Customize your information"
    echo "4. Add your projects"
    echo "5. Deploy to Vercel/Netlify"
    echo ""
else
    echo "❌ Failed to install dependencies"
    exit 1
fi
