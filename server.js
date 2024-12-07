const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors({
    origin: ['https://texture-ai-bysamarth.vercel.app', 'http://localhost:3000'],
    methods: ['GET', 'POST'],
    credentials: true
}));
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Hugging Face API endpoint
const API_URL = "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2-1";
const API_TOKEN = process.env.HUGGING_FACE_TOKEN || "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";

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
});

// Generate image endpoint
app.post('/api/generate-image', async (req, res) => {
    try {
        const { prompt } = req.body;
        if (!prompt) {
            return res.status(400).json({
                success: false,
                error: 'Prompt is required'
            });
        }
        
        console.log('Generating image for prompt:', prompt);
        console.log('Using API URL:', API_URL);
        console.log('Token (first 10 chars):', API_TOKEN.substring(0, 10) + '...');
        
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

        console.log('API Response status:', response.status);
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error('API Error:', response.status, errorText);
            throw new Error(`API error: ${response.status} - ${errorText}`);
        }

        const buffer = await response.buffer();
        console.log('Received buffer of size:', buffer.length);
        
        const base64Image = `data:image/jpeg;base64,${buffer.toString('base64')}`;
        console.log('Successfully converted to base64');

        res.json({
            success: true,
            image: base64Image
        });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            success: false,
            error: error.message || 'Failed to generate image'
        });
    }
});

// Serve index.html for all other routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Export for Vercel
module.exports = app;

// Start server if not running in Vercel
if (process.env.NODE_ENV !== 'production') {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}
