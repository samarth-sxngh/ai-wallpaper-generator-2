const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Serve static files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Hugging Face API endpoint
const API_URL = "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2-1";
const API_TOKEN = process.env.HUGGING_FACE_TOKEN || "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";

// Generate image endpoint
app.post('/api/generate-image', async (req, res) => {
    try {
        const { prompt } = req.body;
        
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_TOKEN}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                inputs: prompt,
                options: {
                    wait_for_model: true
                }
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const buffer = await response.buffer();
        const base64Image = `data:image/jpeg;base64,${buffer.toString('base64')}`;

        res.json({
            success: true,
            image: base64Image
        });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Handle 404
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'index.html'));
});

// Only start the server if we're not in a Vercel environment
if (process.env.NODE_ENV !== 'production') {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}

module.exports = app;
