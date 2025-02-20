import gradio as gr
from openai import OpenAI
from dotenv import load_dotenv
import os

load_dotenv()
api_key = os.getenv('OPENAI_API_KEY')
client = OpenAI(api_key=api_key)

# Function to generate a professional image of an 18-year-old in a specified profession
def generate_professional_image(profession):
    # Crafting a prompt to generate an image of an 18-year-old in the specified profession
    prompt = (
        f"A professional image of an 18-year-old {profession}. "
        f"The image should depict a young individual dressed appropriately for their role as a {profession}, "
        f"conveying professionalism and confidence."
    )
    # Generate image using DALL·E        # Generate image using DALL·E
    response = client.images.generate(
            model="dall-e-3",
            prompt=prompt,
            size="1024x1024",
            n=1
        )
    return response.data[0].url  # Return the generated image URL

# Gradio Interface for generating professional images
iface = gr.Interface(
    fn=generate_professional_image,
    inputs=gr.Textbox(
        lines=1,
        placeholder="Enter profession (e.g., doctor, engineer, nurse, pilot)",
        label="Profession"
    ),
    outputs=gr.Image(label="Generated Image"),
    title="AI-Generated Professional Image",
    description="Enter a profession to generate an image of an 18-year-old in that role."
)

# Launch Gradio App
if __name__ == "__main__":
    iface.launch()