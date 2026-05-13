import { useState } from 'react'
import './index.css'

function App() {
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const handleAnalyze = async () => {
    if (!text.trim()) {
      setError("Please enter some text to analyze.")
      return
    }

    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await fetch('http://127.0.0.1:8000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: text }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.detail || "Failed to analyze text")
      }

      const data = await response.json()
      setResult(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <div className="glass-card">
        <header className="header">
          <h1>Veritas AI</h1>
          <p>Advanced Neural Fake News Detection System</p>
        </header>

        <div className="input-section">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste the news article or headline here to verify its authenticity..."
            disabled={loading}
          />
          <button 
            className="analyze-btn" 
            onClick={handleAnalyze}
            disabled={loading || !text.trim()}
          >
            {loading ? (
              <>
                <div className="spinner"></div>
                Analyzing Content...
              </>
            ) : (
              'Verify Authenticity'
            )}
          </button>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {result && (
          <div className={`result-container ${result.prediction.toLowerCase()}`}>
            <h2 className={`result-title ${result.prediction.toLowerCase()}`}>
              {result.prediction} News
            </h2>
            <div className="confidence-bar">
              <div 
                className={`confidence-fill ${result.prediction.toLowerCase()}`}
                style={{ width: `${result.confidence}%` }}
              ></div>
            </div>
            <p className="confidence-text">
              AI Confidence: {result.confidence}%
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
