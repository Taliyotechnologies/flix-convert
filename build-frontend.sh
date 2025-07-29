#!/bin/bash
set -e

echo "Starting frontend build process..."
echo "Current directory: $(pwd)"

# Navigate to frontend directory
cd frontend
echo "Changed to frontend directory: $(pwd)"

# List files to verify structure
echo "Files in frontend directory:"
ls -la

# Install dependencies
echo "Installing dependencies..."
npm install --production=false

# Build the project
echo "Building project..."
npm run build

echo "Build completed successfully!" 