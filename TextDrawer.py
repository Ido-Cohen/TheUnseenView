from PIL import Image, ImageDraw, ImageFont

def generate_image(hebrew_word, english_word, font1_path, font2_path):
    # Set the font sizes and background color
    font1_size = 72
    font2_size = 48
    background_color = (128, 128, 128)

    # Load the Hebrew fonts
    font1 = ImageFont.truetype(font1_path, font1_size)
    font2 = ImageFont.truetype(font2_path, font2_size)

    # Calculate the sizes of the texts
    text1_width, text1_height = font1.getsize(hebrew_word)
    text2_width, text2_height = font2.getsize(hebrew_word)

    # Calculate the total width and height of the image
    total_width = max(text1_width, text2_width)
    total_height = text1_height + text2_height + 10

    # Create a new image with a black background
    image = Image.new("RGB", (total_width, total_height), background_color)

    # Create a drawing object
    draw = ImageDraw.Draw(image)

    # Calculate the position to center the first font vertically
    text1_y = (total_height - text1_height - text2_height - 10) // 2

    # Calculate the position to align the second font to the right
    text2_x = total_width - text2_width

    # Draw the first font (Hebrew word) in white color
    draw.text((0, text1_y), hebrew_word, font=font1, fill="white")

    # Reverse the Hebrew word for the second font
    reversed_word = hebrew_word[::-1]

    # Draw the second font (reversed Hebrew word) in white color aligned to the right
    draw.text((text2_x, text1_y + text1_height + 10), reversed_word, font=font2, fill="white")

    # Save the image with the corresponding English word as the filename
    image.save(f"hebrew-braille\\{english_word}.png")

    # Close the image
    image.close()

def main():
    # Input file paths
    hebrew_file_path = "hebrew_words.txt"
    english_file_path = "english_words.txt"
    font1_file_path = "braille-hebrew.otf"
    font2_file_path = "arialbd.ttf"

    # Read the Hebrew words from the input file
    with open(hebrew_file_path, "r", encoding="utf-8") as hebrew_file:
        hebrew_words = hebrew_file.read().splitlines()

    # Read the corresponding English words from the input file
    with open(english_file_path, "r", encoding="utf-8") as english_file:
        english_words = english_file.read().splitlines()

    # Verify that the number of Hebrew words matches the number of English words
    if len(hebrew_words) != len(english_words):
        print("Error: The number of Hebrew words does not match the number of English words.")
        return

    # Generate images for each Hebrew word
    for hebrew_word, english_word in zip(hebrew_words, english_words):
        generate_image(hebrew_word, english_word, font1_file_path, font2_file_path)

    print("Images generated successfully.")

if __name__ == "__main__":
    main()
