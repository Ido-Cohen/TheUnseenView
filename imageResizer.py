from PIL import Image

def resize_image(image_path, target_width, target_height, output_path):
    image = Image.open(image_path)

    # Get original image dimensions
    original_width, original_height = image.size

    # Calculate aspect ratios
    target_ratio = target_width / target_height
    original_ratio = original_width / original_height

    # Determine the resize dimensions
    if target_ratio > original_ratio:
        # Fit within the target width
        new_width = target_width
        new_height = round(new_width / original_ratio)
    else:
        # Fit within the target height
        new_height = target_height
        new_width = round(new_height * original_ratio)

    # Resize the image while maintaining aspect ratio
    resized_image = image.resize((new_width, new_height), Image.ANTIALIAS)

    # Create a new blank image with the target dimensions
    result_image = Image.new("RGB", (target_width, target_height))

    # Calculate the position to paste the resized image
    x = (target_width - new_width) // 2
    y = (target_height - new_height) // 2

    # Paste the resized image onto the blank image
    result_image.paste(resized_image, (x, y))

    # Save the result image
    result_image.save(output_path)

# Usage example
# image_path = "cropped_image.jpg"
# target_width = 1920
# target_height = 1080

# resize_image(image_path, target_width, target_height)
