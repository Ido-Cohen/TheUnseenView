# from PIL import Image

# def find_color(image, target_color):
#     width, height = image.size

#     for y in range(height):
#         for x in range(width):
#             pixel = image.getpixel((x, y))
#             if pixel == target_color:
#                 return True

#     return False

# def process_image(image_path, color_list_path):
#     with open(color_list_path, 'r') as file:
#         color_list = [line.strip() for line in file]

#     # if len(color_list) > 8:
#     #     print("Error: More than 8 colors in the original list.")
#     #     return

#     new_list = []
#     image = Image.open(image_path)

#     for line in color_list:
#         # Parse string and color manually
#         comma_index = line.find(',')
#         string = line[:comma_index].strip()
#         color = line[comma_index + 1:].strip()[1:-1]
#         r, g, b = map(int, color.split(','))

#         target_color = (r, g, b)
#         if find_color(image, target_color):
#             new_list.append(line)

#     if len(new_list) > 0:
#         with open('new_list.txt', 'w') as file:
#             file.write('\n'.join(new_list))
#             print("New list saved as 'new_list.txt'")
#     else:
#         print("No matching colors found in the image.")


# image_path = 'images\\4_out.jpg'
# color_list_path = 'mapping'

# process_image(image_path, color_list_path)
