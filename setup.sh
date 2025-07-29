#!/bin/bash

echo "🎬 ConvertFlix Setup Script"
echo "=========================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    echo "Download from: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ npm version: $(npm --version)"
echo ""

# Backend setup
echo "🔧 Setting up Backend..."
cd backend

# Install backend dependencies
echo "Installing backend dependencies..."
npm install

# Create uploads directory
mkdir -p uploads

echo "✅ Backend setup complete!"
echo ""

# Frontend setup
echo "🎨 Setting up Frontend..."
cd ../frontend

# Install frontend dependencies
echo "Installing frontend dependencies..."
npm install

echo "✅ Frontend setup complete!"
echo ""

# Return to root
cd ..

echo "🚀 Setup Complete!"
echo ""
echo "Next steps:"
echo "1. Configure environment variables in backend/config.env"
echo "2. Start backend: cd backend && npm run dev"
echo "3. Start frontend: cd frontend && npm run dev"
echo ""
echo "Default admin credentials:"
echo "Username: admin"
echo "Password: flixconvert2024"
echo ""
echo "Happy coding! 🎉"