#!/bin/bash
set -e

echo "Starting build process..."
echo "Current directory: $(pwd)"
echo "Listing files:"
ls -la

echo "Installing dependencies..."
npm install --production=false

echo "Building project..."
npm run build

echo "Build completed successfully!" 