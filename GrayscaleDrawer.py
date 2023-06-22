import cv2
import numpy as np

def overlay_grayscale(color_image_path, bw_image_path, output_image_path, brightness_reduction):
    # Load color image
    color_image = cv2.imread(color_image_path)

    # Convert color image to grayscale
    grayscale_image = cv2.cvtColor(color_image, cv2.COLOR_BGR2GRAY)

    # Load black and white image
    bw_image = cv2.imread(bw_image_path, 0)  # 0 for grayscale loading

    # Resize grayscale image to match the size of the black and white image
    grayscale_image = cv2.resize(grayscale_image, (bw_image.shape[1], bw_image.shape[0]))

    # Create a mask by thresholding the black and white image
    _, mask = cv2.threshold(bw_image, 127, 255, cv2.THRESH_BINARY_INV)

    # Apply the mask to the grayscale image
    grayscale_image_masked = cv2.bitwise_and(grayscale_image, mask)

    # Reduce the brightness of the grayscale image
    adjusted_grayscale_image = cv2.convertScaleAbs(grayscale_image_masked, alpha=(1 - brightness_reduction/100), beta=0)

    # Combine the result image with the grayscale image
    result_image = cv2.bitwise_or(adjusted_grayscale_image, cv2.bitwise_and(bw_image, cv2.bitwise_not(mask)))

    # Save the resulting image
    cv2.imwrite(output_image_path, result_image)


# Provide the paths to your input and output images
# color_image_path = 'images\\4.jpg'
# bw_image_path = 'output_image.jpg'
# output_image_path = 'grayscale.jpg'
# brightness_reduction = 30  # Percentage by which to reduce the brightness of the grayscale image

# # Call the function to overlay grayscale image on black parts of the black and white image with brightness reduction
# overlay_grayscale(color_image_path, bw_image_path, output_image_path, brightness_reduction)

# def add_grayscale(color_image_path, brightness_reduction):
    # overlay_grayscale(color_image_path, "processed-images\\pattern.jpg", brightness_reduction)
