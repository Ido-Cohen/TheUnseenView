from PIL import Image, ImageDraw
import math
import json

def color_distance(color1, color2):
    # Calculate the Euclidean distance between two RGB colors
    r1, g1, b1 = color1
    r2, g2, b2 = color2
    return math.sqrt((r1 - r2) ** 2 + (g1 - g2) ** 2 + (b1 - b2) ** 2)

spacing = 22
line_length = 25        
line_thickness = 4
triangle_size = 8
square_size = 15
circle_radius = 5

def fill_pattern(image_path, color_pattern_map, output_path, threshold=20):
    # Load the original image
    original_image = Image.open(image_path).convert("RGB")
    width, height = original_image.size

    # Create a new image with a black background
    new_image = Image.new("RGB", (width, height), (0, 0, 0))

    # Create a drawing object for the new image
    draw = ImageDraw.Draw(new_image)

    # Iterate over each 15th pixel in the original image
    for x in range(0, width, spacing):
        for y in range(0, height, spacing):
            # Get the color of the current pixel
            pixel_color = original_image.getpixel((x, y))

            # Check if the color is close to any color in the color_pattern_map
            matched_color = None
            for target_color in color_pattern_map.keys():
                if color_distance(pixel_color, target_color) <= threshold:
                    matched_color = target_color
                    break

            if matched_color is not None:
                # Get the pattern for the matched color
                pattern = color_pattern_map[matched_color]

                # Draw the pattern at the current pixel with spacing
                if pattern == "triangles":
                    draw_triangle(draw, x, y)
                elif pattern == "vertical lines":
                    draw_vertical_line(draw, x, y)
                elif pattern == "diagonal lines":
                    draw_diagonal_line(draw, x, y)
                elif pattern == "squares":
                    draw_square(draw, x, y)
                elif pattern == "circles":
                    draw_circle(draw, x, y)
                elif pattern == "upside-down triangles":
                    draw_upside_down_triangle(draw, x, y)
                elif pattern == "opposite diagonal lines":
                    draw_opposite_diagonal_line(draw, x, y)
                elif pattern == "horizontal lines":
                    draw_horizontal_line(draw, x, y)
                # Add more pattern options if needed

    # Save the new image
    new_image.save(output_path)

def draw_triangle(draw, x, y):
    # Draw a triangle at the given coordinates with spacing
    triangle_color = (255, 255, 255)
    points = [
        (x, y - triangle_size),
        (x - (triangle_size), y + (triangle_size)),
        (x + (triangle_size), y + (triangle_size))
    ]
    draw.polygon(points, fill=triangle_color)

def draw_vertical_line(draw, x, y):
    # Draw a vertical line at the given coordinates with spacing

    line_color = (255, 255, 255)
    draw.rectangle(
        [
            (x, y),
            (x + line_thickness, y + (line_length))
        ],
        fill=line_color
    )

def draw_diagonal_line(draw, x, y):
    # Draw a diagonal line at the given coordinates with spacing
    line_color = (255, 255, 255)
    draw.line(
        [
            (x, y),
            (x + (line_length), y + (line_length))
        ],
        fill=line_color,
        width=line_thickness
    )

def draw_square(draw, x, y):
    # Draw a square at the given coordinates with spacing
    square_color = (255, 255, 255)
    draw.rectangle(
        [
            (x, y),
            (x + (square_size), y + (square_size))
        ],
        fill=square_color
    )
def draw_circle(draw, x, y):
    # Draw a circle at the given coordinates with spacing
    circle_color = (255, 255, 255)
    draw.ellipse(
        [
            (x - circle_radius, y - circle_radius),
            (x + circle_radius, y + circle_radius)
        ],
        fill=circle_color
    )

def draw_upside_down_triangle(draw, x, y):
    # Draw an upside-down triangle at the given coordinates with spacing
    triangle_color = (255, 255, 255)
    points = [
        (x - (triangle_size), y - (triangle_size)),
        (x, y + (triangle_size)),
        (x + (triangle_size), y - (triangle_size))
    ]
    draw.polygon(points, fill=triangle_color)

def draw_opposite_diagonal_line(draw, x, y):
    # Draw an opposite-direction diagonal line at the given coordinates with spacing
    line_color = (255, 255, 255)
    draw.line(
        [
            (x, y),  (x - (line_length), y + (line_length))
        ],
        fill=line_color,
        width=line_thickness
    )
def draw_horizontal_line(draw, x, y):
    # Draw a horizontal line at the given coordinates with spacing
    line_color = (255, 255, 255)
    draw.rectangle(
        [
            (x, y),
            (x + (line_length), y + line_thickness)
        ],
        fill=line_color
    )


# Example usage
# image_path = "images\\4_out.jpg"  # Path to the original image
# detected_objects_file = open("detected-objects", "r")
# line = detected_objects_file.readline()
# color_pattern_map = {}
# while line:
#     color = line[line.find("(") + 1:line.find(")")]
#     rValue, gValue, bValue = color.split(",")
#     color_tuple = (int(rValue), int(gValue), int(bValue))
#     color_pattern_map[color_tuple] = line.split(", ")[-1][0:-1]
#     line = detected_objects_file.readline()
# # color_pattern_map = {
# #     (74, 98, 24): "triangles",
# #     (50, 53, 121): "vertical lines",
# #     (176, 147, 86): "horizontal lines",
# #     (0, 79, 100): "circles",
# #     (0, 0, 134): "squares",
# #     (48, 90, 125): "upside-down triangles",
# #     (154, 14, 42): "diagonal lines",
# #     }  # Color pattern mapping
# print(color_pattern_map)
# output_path = "output_image.jpg"  # Path to save the output image

# fill_pattern(image_path, color_pattern_map, output_path)
def pattern_filler(image_path, output_path, detected_objects_path):
    # path_dir = output_path[0:output_path.rfind("\\")]
    
    detected_objects_map = read_json_file(detected_objects_path)
    color_pattern_map = {}
    for value in detected_objects_map.values():
        color_pattern_map[(int(value[0][0] * .7), int(value[0][1] * .7), int(value[0][2] * .7))] = value[1]


    # line = detected_objects_file.readline()
    # while line:
    #     color = line[line.find("(") + 1:line.find(")")]
    #     rValue, gValue, bValue = color.split(",")
    #     color_tuple = (int(rValue) * .7, int(gValue) * .7, int(bValue) * .7)
    #     color_pattern_map[color_tuple] = line.split(", ")[-1][0:-1]
    #     line = detected_objects_file.readline()
    fill_pattern(image_path, color_pattern_map, output_path)

def read_json_file(file_path):
    try:
        with open(file_path, 'r') as json_file:
            data = json.load(json_file)
            return data
    except Exception as e:
        print("Error occurred while reading JSON file:", str(e))
        return None