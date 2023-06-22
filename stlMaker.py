import numpy as np
from PIL import Image
from stl import mesh

# Image Path
def createLithophane(img_path, output_path):
    # img_path = r"C:\Users\Ido Cohen\OneDrive\Final Project\TheUnseenView\processed-images\attached.png"

    # Load the image
    image = Image.open(img_path).convert("L")
    # Flip the image horizontally
    image = image.transpose(Image.FLIP_LEFT_RIGHT)

    scale_factor = 0.1  # 0.1mm per pixel
    width_mm = 200
    base_height_mm = 1.6
    gap_height_mm = 0
    max_height_mm = 3.2  # Total height including base and gap

    # Resize the image to have width 200mm (assuming each pixel is 0.1mm)
    width_px = int(width_mm / scale_factor)
    height_px = int((width_mm * image.height) / image.width / scale_factor)
    image = image.resize((width_px, height_px))

    # Convert the image into a numpy array
    img_array = np.array(image)

    # Normalize to a range 0-1
    img_normalized = img_array / 255

    # Scale it to the range of gap_height_mm - max_height_mm and add the base height
    img_scaled = (img_normalized * (max_height_mm - base_height_mm)) + base_height_mm

    # Now we create an STL mesh
    vertices = np.zeros((width_px * height_px, 3))

    # We define the x, y, z coordinates for each vertex in our mesh
    for x in range(width_px):
        for y in range(height_px):
            vertices[x*height_px + y] = [x*scale_factor, y*scale_factor, img_scaled[y, x]]

    # To create the faces of our mesh, we'll define the indices of the vertices for each face
    faces = []
    for x in range(width_px - 1):
        for y in range(height_px - 1):
            v1 = x*height_px + y
            v2 = x*height_px + y + 1
            v3 = (x+1)*height_px + y + 1
            v4 = (x+1)*height_px + y
            faces.append([v1, v2, v3])
            faces.append([v1, v3, v4])

    # Create base
    base_vertices = [
        [0, 0, 0],
        [0, height_px*scale_factor, 0],
        [width_px*scale_factor, height_px*scale_factor, 0],
        [width_px*scale_factor, 0, 0],
        [0, 0, base_height_mm],
        [0, height_px*scale_factor, base_height_mm],
        [width_px*scale_factor, height_px*scale_factor, base_height_mm],
        [width_px*scale_factor, 0, base_height_mm]
    ]

    base_faces = [
        [len(vertices), len(vertices) + 1, len(vertices) + 5],
        [len(vertices), len(vertices) + 5, len(vertices) + 4],
        [len(vertices) + 1, len(vertices) + 2, len(vertices) + 6],
        [len(vertices) + 1, len(vertices) + 6, len(vertices) + 5],
        [len(vertices) + 2, len(vertices) + 3, len(vertices) + 7],
        [len(vertices) + 2, len(vertices) + 7, len(vertices) + 6],
        [len(vertices) + 3, len(vertices), len(vertices) + 4],
        [len(vertices) + 3, len(vertices) + 4, len(vertices) + 7],
        [len(vertices), len(vertices) + 1, len(vertices) + 2],  # Bottom of the base
        [len(vertices), len(vertices) + 2, len(vertices) + 3]   # Bottom of the base
    ]

    vertices = np.concatenate((vertices, base_vertices))
    faces += base_faces

    # Create the mesh
    lithophane_mesh = mesh.Mesh(np.zeros(len(faces), dtype=mesh.Mesh.dtype))

    for i, f in enumerate(faces):
        for j in range(3):
            lithophane_mesh.vectors[i][j] = vertices[f[j]]

    # Finally, save the mesh to an STL file
    lithophane_mesh.save(output_path)
