# Fake News Detection System

This project is an automated Fake News Detection system built with Python, Scikit-learn, FastAPI, and React. It uses Natural Language Processing (NLP) to classify news articles as 'Fake' or 'Real'.

## Prerequisites

- **Python 3.8+** installed on your system.
- **Node.js v20+** installed on your system.

## Project Structure

- `/backend`: Contains the FastAPI server, the ML training script, and data directory.
- `/frontend`: Contains the Vite + React user interface.

## Quick Start (Windows)

The easiest way to start both the backend and frontend is by running the `run.bat` script provided in this folder:

1. Double-click `run.bat` or run it from the command line:
   ```bash
   run.bat
   ```
2. The script will:
   - Install backend Python dependencies.
   - Train the ML model on the dataset (it will generate a sample dataset if Kaggle's `train.csv` is missing).
   - Start the FastAPI backend server on `http://127.0.0.1:8000`.
   - Install frontend Node dependencies.
   - Start the React frontend on `http://localhost:5173` (or the next available port).

## Adding the Kaggle Dataset

To get better accuracy, you should use the real Kaggle Fake News dataset instead of the generated sample:
1. Download `train.csv` from [Kaggle Fake News Competition](https://www.kaggle.com/c/fake-news/data).
2. Place the `train.csv` file inside `backend/data/`.
3. Stop the backend server and run `run.bat` again, or manually run:
   ```bash
   cd backend
   python ml/train_model.py
   ```

## Manual Start

### Backend
```bash
cd backend
pip install -r requirements.txt
python ml/train_model.py
uvicorn app:app --reload
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Technologies Used
- **Frontend**: React, Vite, Vanilla CSS (Glassmorphism design).
- **Backend**: FastAPI, Uvicorn.
- **Machine Learning**: Scikit-learn (Logistic Regression, TF-IDF Vectorizer), NLTK, Pandas.
