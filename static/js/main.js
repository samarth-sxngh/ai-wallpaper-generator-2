document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('themeToggle');
    const promptInput = document.getElementById('promptInput');
    const generateBtn = document.getElementById('generateBtn');
    const resultContainer = document.getElementById('result');

    // Theme Toggle
    themeToggle.addEventListener('change', function() {
        document.documentElement.setAttribute(
            'data-theme',
            this.checked ? 'dark' : 'light'
        );
    });

    // Generate Button Click
    generateBtn.addEventListener('click', async function() {
        const prompt = promptInput.value.trim();
        if (!prompt) {
            alert('Please enter a description for your wallpaper');
            return;
        }

        try {
            generateBtn.disabled = true;
            generateBtn.textContent = 'Generating...';

            const response = await fetch('/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt }),
            });

            const data = await response.json();
            
            if (data.image_url) {
                const img = document.createElement('img');
                img.src = data.image_url;
                resultContainer.innerHTML = '';
                resultContainer.appendChild(img);
            } else {
                resultContainer.innerHTML = '<p>Failed to generate image. Please try again.</p>';
            }
        } catch (error) {
            console.error('Error:', error);
            resultContainer.innerHTML = '<p>An error occurred. Please try again later.</p>';
        } finally {
            generateBtn.disabled = false;
            generateBtn.textContent = 'Generate';
        }
    });

    // Initialize theme
    document.documentElement.setAttribute('data-theme', 'dark');
});
