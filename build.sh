#!/bin/bash
set -e

echo "Starting build process..."
echo "Current directory: $(pwd)"

# Navigate to frontend directory
cd frontend

echo "Installing dependencies..."
npm install

echo "Building frontend..."
npm run build

echo "Build completed successfully!" 