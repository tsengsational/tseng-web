#!/bin/sh
# Railway Start Script
# Build the frontend
cd frontend
npm install
npm run build
# Serve the build using Vite's preview on port 8080 (Railway default style)
npm run preview -- --port ${PORT:-8080} --host 0.0.0.0
