from PIL import Image, ImageOps

def merge_images(legend_path, grayscaled_path, final_path):
    # Open the legend image
    legend = Image.open(legend_path)

    # Open the grayscaled image
    grayscaled = Image.open(grayscaled_path)

    # Resize the legend image to match the width of the grayscaled image
    legend = legend.resize((grayscaled.width, legend.height))

    # Create a new image with the same width as the grayscaled image and height that accommodates both images
    final_image = Image.new("RGB", (grayscaled.width, grayscaled.height + legend.height))

    # Paste the grayscaled image at the top of the final image
    final_image.paste(grayscaled, (0, 0))

    # Paste the legend image at the bottom of the final image
    final_image.paste(legend, (0, grayscaled.height))

    # adding a 1 pixel black border around the final image so that the stl wont have holes 
    new_image = ImageOps.expand(final_image, border=10, fill='black') 
    # Save the final image
    new_image.save(final_path)

# Example usage
# legend_path = "processed-images/legend.jpg"
# grayscaled_path = "processed-images/grayscaled.jpg"
# final_path = "processed-images/final.jpg"

# merge_images(legend_path, grayscaled_path, final_path)
