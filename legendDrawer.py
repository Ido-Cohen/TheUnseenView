from PIL import Image, ImageDraw
import json

def create_image_bar(input_path, output_path):
    images, shapes = read_image_shape_pairs(input_path)
    def draw_shape_in_box(shape, draw, top_left, box_width=120, box_height=120, shape_size=15, spacing=8, line_length=30, line_width=5):
        steps_x = box_width // (shape_size + spacing)
        steps_y = box_height // (shape_size + spacing)
        for i in range(steps_x):
            for j in range(steps_y):
                x = top_left[0] + i * (shape_size + spacing)
                y = top_left[1] + j * (shape_size + spacing)
                if shape == 'triangles':
                    draw.polygon([(x + shape_size/2, y), (x, y + shape_size), (x + shape_size, y + shape_size)], fill='white')
                elif shape == 'vertical lines':
                    draw.line([(x, y), (x, y + line_length)], fill='white', width=line_width)
                elif shape == 'diagonal lines':
                    draw.line([(x, y), (x + line_length, y + line_length)], fill='white', width=line_width)
                elif shape == 'squares':
                    draw.rectangle([(x, y), (x + shape_size, y + shape_size)], fill='white')
                elif shape == 'circles':
                    draw.ellipse([(x, y), (x + shape_size, y + shape_size)], fill='white')
                elif shape == 'upside-down triangles':
                    draw.polygon([(x, y), (x + shape_size, y), (x + shape_size/2, y + shape_size)], fill='white')
                elif shape == 'opposite diagonal lines':
                    draw.line([(x, y + line_length), (x + line_length, y)], fill='white', width=line_width)
                elif shape == 'horizontal lines':
                    draw.line([(x, y + line_length/2), (x + line_length, y + line_length/2)], fill='white', width=line_width)



    bar_width = 1920
    bar_height = 270
    bar = Image.new('RGB', (bar_width, bar_height), (128, 128, 128))
    draw = ImageDraw.Draw(bar)

    num_images = len(images)
    image_width = (bar_width - 10 * (num_images - 1)) // num_images
    image_height = bar_height - 15

    total_image_width = num_images * image_width + (num_images - 1) * 10

    left_margin = (bar_width - total_image_width) // 2 + 50

    for i in range(num_images):
        image_path = images[i]
        shape = shapes[i]

        image = Image.open(image_path)
        original_witdh, original_height = image.size
        image.thumbnail((image_width, image_height), Image.ANTIALIAS)

        image_x = left_margin + i * (image_width + 10)
        image_y = 15

        bar.paste(image, (image_x, image_y))

        box_x = image_x
        box_y = image_y + image.height + 10

        draw_shape_in_box(shape, draw, (box_x, box_y))
    bar.save(output_path)
    # return bar

def read_image_shape_pairs(file_path):
    detected_objects_dic = read_json_file(file_path)
    image_list = [f"hebrew-braille\\{image_name}.png" for image_name in detected_objects_dic.keys()]
    # print(image_list)
    shape_list = [value[1] for value in detected_objects_dic.values()]
    
    return image_list, shape_list

    # with open(file_path, 'r') as file:
    #     lines = file.readlines()
    #     image_list = []
    #     shape_list = []
    #     for line in lines:
    #         image_name = line[0:line.find(",")]
    #         shape_name = line[line.rfind(",") + 2: -1]
    #         image_list.append(f"hebrew-braille\\{image_name}.png")
    #         shape_list.append(shape_name)
    #     return image_list, shape_list

def read_json_file(file_path):
    try:
        with open(file_path, 'r') as json_file:
            data = json.load(json_file)
            return data
    except Exception as e:
        print("Error occurred while reading JSON file:", str(e))
        return None
# file_path = 'processed-images\detected-objects' 
# image_paths, shape_list = read_image_shape_pairs(file_path)

# result_image = create_image_bar(image_paths, shape_list)
# result_image.show()
# result_image.save(f'processed-images\\legend.jpg')    