from flask import Flask, render_template, request, jsonify
import os
import replicate
import requests
from PIL import Image
import uuid
from io import BytesIO
import time

app = Flask(__name__)

# Ensure the generated images directory exists
os.makedirs(os.path.join('static', 'generated'), exist_ok=True)

def generate_image(prompt):
    try:
        # Using Stable Diffusion 1.5 - reliable model with good rate limits
        output = replicate.run(
            "stability-ai/stable-diffusion:db21e45d3f7023abc2a46ee38a23973f6dce16bb082a930b0c49861f96d1e5bf",
            input={
                "prompt": prompt,
                "image_dimensions": "1024x1024",
                "num_inference_steps": 20,  # Lower steps for faster generation
                "guidance_scale": 7.5,
                "scheduler": "K_EULER",  # Fast scheduler
                "num_outputs": 1
            }
        )

        if isinstance(output, list) and len(output) > 0:
            image_url = output[0]
            try:
                response = requests.get(image_url, timeout=10)
                if response.status_code == 200:
                    image = Image.open(BytesIO(response.content))
                    filename = f"generated_{uuid.uuid4()}.png"
                    filepath = os.path.join('static', 'generated', filename)
                    image.save(filepath)
                    return filename
            except requests.exceptions.RequestException as e:
                print(f"Error downloading image: {e}")
                return None
        return None
        
    except Exception as e:
        error_msg = str(e).lower()
        if 'rate limit' in error_msg:
            time.sleep(1)  # Brief pause before retry
            raise Exception("Please try again in a moment")
        raise e

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/generate', methods=['POST'])
def generate_image_route():
    try:
        if not os.environ.get('REPLICATE_API_TOKEN'):
            return jsonify({
                'error': 'Configuration Error',
                'details': 'API token not set'
            }), 500

        prompt = request.json.get('prompt')
        if not prompt:
            return jsonify({
                'error': 'Invalid Request',
                'details': 'Please provide a description'
            }), 400

        # Implement retry logic
        max_retries = 2
        for attempt in range(max_retries):
            try:
                filename = generate_image(prompt)
                if filename:
                    return jsonify({'image_url': f"/static/generated/{filename}"})
                elif attempt < max_retries - 1:
                    time.sleep(2)  # Wait before retry
                    continue
            except Exception as e:
                if 'rate limit' in str(e).lower() and attempt < max_retries - 1:
                    time.sleep(2)  # Wait before retry
                    continue
                raise e

        return jsonify({
            'error': 'Generation Failed',
            'details': 'Unable to generate image. Please try again.'
        }), 500

    except Exception as e:
        error_msg = str(e).lower()
        if 'rate limit' in error_msg:
            return jsonify({
                'error': 'Server Busy',
                'details': 'Please try again in a moment'
            }), 429
        return jsonify({
            'error': 'Error',
            'details': str(e)
        }), 500

if __name__ == '__main__':
    token = os.environ.get('REPLICATE_API_TOKEN')
    if not token:
        print("Error: REPLICATE_API_TOKEN not set!")
        print("Set it using:")
        print("Windows CMD: set REPLICATE_API_TOKEN=your_token_here")
        print("Windows PowerShell: $env:REPLICATE_API_TOKEN='your_token_here'")
    else:
        print("API token configured successfully")
    app.run(debug=True)
