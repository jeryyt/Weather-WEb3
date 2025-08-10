#!/bin/bash

echo "Weather App - Starting up..."
echo

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Error: Node.js is not installed or not in PATH"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "Error: npm is not installed or not in PATH"
    echo "Please install npm or Node.js from https://nodejs.org/"
    exit 1
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
    if [ $? -ne 0 ]; then
        echo "Error: Failed to install dependencies"
        exit 1
    fi
fi

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo
    echo "Warning: .env file not found!"
    echo "Please create a .env file with your OpenWeatherMap API key:"
    echo "WEATHER_API_KEY=your-api-key-here"
    echo "PORT=3000"
    echo
    echo "You can get a free API key from: https://openweathermap.org/api"
    echo
    read -p "Press Enter to continue anyway..."
fi

echo
echo "Starting Weather App..."
echo
echo "The application will be available at: http://localhost:3000"
echo "Press Ctrl+C to stop the server"
echo

npm start 