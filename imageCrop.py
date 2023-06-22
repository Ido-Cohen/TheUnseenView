from PIL import Image

def crop_image(image_path, output_path):
    # Open the image
    image = Image.open(image_path)
    original_width, original_height = image.size

    # Calculate the target width and height for a 16:9 ratio
    target_ratio = 16 / 9
    target_width = original_height * target_ratio
    target_height = original_width / target_ratio

    # Check if the image needs cropping
    if original_width / original_height > target_ratio:
        # Image is too wide, prompt user for crop location
        crop_location = input("Image is too wide. Where would you like to crop? (left/right/both): ")
        if crop_location.lower() == "left":
            image = image.crop((0, 0, target_width, original_height))
        elif crop_location.lower() == "right":
            image = image.crop((original_width - target_width, 0, original_width, original_height))
        else:
            image = image.crop(((original_width - target_width) / 2, 0, (original_width + target_width) / 2, original_height))

    elif original_width / original_height < target_ratio:
        # Image is too tall, prompt user for crop location
        crop_location = input("Image is too tall. Where would you like to crop? (top/bottom/both): ")
        if crop_location.lower() == "top":
            image = image.crop((0, 0, original_width, target_height))
        elif crop_location.lower() == "bottom":
            image = image.crop((0, original_height - target_height, original_width, original_height))
        else:
            image = image.crop((0, (original_height - target_height) / 2, original_width, (original_height + target_height) / 2))

    # Save the cropped image
    image.save(output_path)

def crop_image_input(image_path, output_path, crop_location):
        # Open the image
    image = Image.open(image_path)
    original_width, original_height = image.size

    # Calculate the target width and height for a 16:9 ratio
    target_ratio = 16 / 9
    target_width = original_height * target_ratio
    target_height = original_width / target_ratio

    # Check if the image needs cropping
    if original_width / original_height > target_ratio:
        # Image is too wide, prompt user for crop location
        # crop_location = input("Image is too wide. Where would you like to crop? (left/right/both): ")
        if crop_location.lower() == "left":
            image = image.crop((0, 0, target_width, original_height))
        elif crop_location.lower() == "right":
            image = image.crop((original_width - target_width, 0, original_width, original_height))
        else:
            image = image.crop(((original_width - target_width) / 2, 0, (original_width + target_width) / 2, original_height))

    elif original_width / original_height < target_ratio:
        # Image is too tall, prompt user for crop location
        # crop_location = input("Image is too tall. Where would you like to crop? (top/bottom/both): ")
        if crop_location.lower() == "top":
            image = image.crop((0, 0, original_width, target_height))
        elif crop_location.lower() == "bottom":
            image = image.crop((0, original_height - target_height, original_width, original_height))
        else:
            image = image.crop((0, (original_height - target_height) / 2, original_width, (original_height + target_height) / 2))

    # Save the cropped image
    image.save(output_path)

# Provide the path to your image file