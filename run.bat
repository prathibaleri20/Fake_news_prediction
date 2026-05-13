@echo off
echo ==============================================
echo Fake News Detection System Setup and Runner
echo ==============================================

echo [1/4] Installing Backend Dependencies...
cd backend
pip install -r requirements.txt
if %errorlevel% neq 0 (
    echo Failed to install backend dependencies. Make sure Python is installed.
    pause
    exit /b %errorlevel%
)

echo [2/4] Training the ML Model (This may take a moment)...
python ml/train_model.py
if %errorlevel% neq 0 (
    echo Failed to train the model.
    pause
    exit /b %errorlevel%
)

echo [3/4] Installing Frontend Dependencies...
cd ../frontend
call npm install
if %errorlevel% neq 0 (
    echo Failed to install frontend dependencies. Make sure Node.js is installed.
    pause
    exit /b %errorlevel%
)

echo [4/4] Starting the Servers...
echo Starting Backend Server on http://127.0.0.1:8000
start cmd /k "cd ../backend && uvicorn app:app --reload"

echo Starting Frontend Server...
start cmd /k "npm run dev"

echo Done! The frontend will be available at the URL shown in the new window (usually http://localhost:5173).
pause
