document.addEventListener('DOMContentLoaded', () => {
    const textInput = document.getElementById('newsText');
    const analyzeBtn = document.getElementById('analyzeBtn');
    const btnText = document.getElementById('btnText');
    const spinner = document.getElementById('spinner');
    const errorMsg = document.getElementById('errorMessage');
    
    const resultContainer = document.getElementById('resultContainer');
    const resultTitle = document.getElementById('resultTitle');
    const confidenceFill = document.getElementById('confidenceFill');
    const confidenceText = document.getElementById('confidenceText');

    analyzeBtn.addEventListener('click', async () => {
        const text = textInput.value.trim();
        
        if (!text) {
            errorMsg.textContent = "Please enter some text to analyze.";
            errorMsg.classList.remove('hidden');
            return;
        }

        // Reset UI
        errorMsg.classList.add('hidden');
        resultContainer.classList.add('hidden');
        resultContainer.className = 'result-container hidden';
        resultTitle.className = 'result-title';
        confidenceFill.className = 'confidence-fill';
        confidenceFill.style.width = '0%';
        
        // Set Loading
        textInput.disabled = true;
        analyzeBtn.disabled = true;
        btnText.textContent = "Analyzing Content...";
        spinner.classList.remove('hidden');

        try {
            const response = await fetch('http://127.0.0.1:8000/predict', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: text })
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.detail || "Failed to analyze text");
            }

            const data = await response.json();
            
            // Show result
            const type = data.prediction.toLowerCase();
            resultTitle.textContent = `${data.prediction} News`;
            confidenceText.textContent = `AI Confidence: ${data.confidence}%`;
            
            resultContainer.classList.add(type);
            resultTitle.classList.add(type);
            confidenceFill.classList.add(type);
            
            resultContainer.classList.remove('hidden');
            
            // Animate bar
            setTimeout(() => {
                confidenceFill.style.width = `${data.confidence}%`;
            }, 100);

        } catch (err) {
            errorMsg.textContent = err.message;
            errorMsg.classList.remove('hidden');
        } finally {
            textInput.disabled = false;
            analyzeBtn.disabled = false;
            btnText.textContent = "Verify Authenticity";
            spinner.classList.add('hidden');
        }
    });
});
