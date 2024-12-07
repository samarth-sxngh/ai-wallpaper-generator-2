document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const progressContainer = document.querySelector('.progress-container');
    const progressBarFill = document.querySelector('.progress-bar-fill');
    const progressText = document.querySelector('.progress-text');
    const imageContainer = document.querySelector('.image-container');
    
    // Check for saved theme or system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Set initial theme
    if (savedTheme === 'light') {
        body.classList.add('light-theme');
        themeToggle.checked = false;
    } else if (savedTheme === 'dark' || prefersDark) {
        body.classList.remove('light-theme');
        themeToggle.checked = true;
    }
    
    // Handle theme toggle
    themeToggle.addEventListener('change', () => {
        if (!themeToggle.checked) {
            body.classList.add('light-theme');
            localStorage.setItem('theme', 'light');
        } else {
            body.classList.remove('light-theme');
            localStorage.setItem('theme', 'dark');
        }
    });

    // Simulate progress updates
    function updateProgress(progress) {
        progressBarFill.style.width = `${progress}%`;
        progressText.textContent = `Generating your wallpaper... ${progress}%`;
    }

    // Generate image function
    async function generateImage(prompt) {
        try {
            // Show progress bar
            progressContainer.classList.add('active');
            updateProgress(0);

            // Simulate progress while waiting for the API
            let progress = 0;
            const progressInterval = setInterval(() => {
                progress += 1;
                if (progress <= 90) {
                    updateProgress(progress);
                }
            }, 100);

            const response = await fetch('/api/generate-image', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ prompt })
            });

            const data = await response.json();
            
            if (!data.success) {
                throw new Error(data.error || 'Failed to generate image');
            }

            // Complete the progress bar
            clearInterval(progressInterval);
            updateProgress(100);

            // Display the generated image
            setTimeout(() => {
                imageContainer.innerHTML = `
                    <div class="generated-image-wrapper">
                        <img src="${data.image}" alt="Generated wallpaper" class="generated-image">
                        <a href="${data.image}" download="wallpaper.jpg" class="download-btn">
                            Download Wallpaper
                        </a>
                    </div>
                `;
                progressContainer.classList.remove('active');
            }, 500);

        } catch (error) {
            console.error('Error:', error);
            alert('Failed to generate image. Please try again.');
            progressContainer.classList.remove('active');
        }
    }

    // Handle generate button
    const generateBtn = document.querySelector('.generate-btn');
    const searchInput = document.querySelector('.search-input');
    let isGenerating = false;

    generateBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        const prompt = searchInput.value.trim();
        
        if (!prompt) {
            alert('Please enter a description for your wallpaper');
            return;
        }
        
        if (!isGenerating) {
            isGenerating = true;
            generateBtn.disabled = true;
            await generateImage(prompt);
            generateBtn.disabled = false;
            isGenerating = false;
        }
    });
});
