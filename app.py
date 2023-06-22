# app.py

import subprocess
import os
from flask_cors import CORS
from flask import Flask, request, send_file, jsonify
import imageCrop
import imageResizer
from DetectorSeg import *
import base64
import patternDrawer
import GrayscaleDrawer
import legendDrawer
import legendAttacher
import stlMaker
import json

app = Flask(__name__)
CORS(app)

@app.route('/getDetectedObjects', methods=['GET'])
def getDetectedObjects():
    save_directory = "processed-images\\"
    detected_objects_path = os.path.join(save_directory, "detected-objects.json")

    return send_file(detected_objects_path, mimetype='application/json')

@app.route('/cropImage', methods=['POST'])
def run_code():
    # Check if the 'file' key exists in the request.files dictionary
    if 'image' not in request.files:
        return 'No file received'

    # Get the file from the POST request
    file = request.files['image']

    # Check if a file was selected
    if file.filename == '':
        return 'No file selected'

    # Save the file to the specified directory
    save_directory = "processed-images\\"
    file.save(os.path.join(save_directory, "image.jpg"))

    # Get the value of "cropDetail" from the data received
    crop_detail = request.form.get('cropDetail')

    imageCrop.crop_image_input(os.path.join(save_directory, "image.jpg"), os.path.join(save_directory, "cropped.jpg"), crop_detail)
    imageResizer.resize_image(os.path.join(save_directory, "cropped.jpg"), 1920, 1080, os.path.join(save_directory, "resized.jpg"))

    # Detect the objects in the image and save segmented image and detected objects as a json file
    detector = Detector(model_type = "PS")
    detector.onImage(os.path.join(save_directory, "resized.jpg"), os.path.join(save_directory, "segmented.png"), os.path.join(save_directory, "detected-objects.json"))

    # Send back the segmented image and detected objects as a response
    segmented_image_path = os.path.join(save_directory, "segmented.png")

    # return send_file(segmented_image_path, mimetype='image/png')
    with open(segmented_image_path, 'rb') as file:
        image_data = file.read()

    # Encode the image data as Base64
    image_base64 = base64.b64encode(image_data).decode('utf-8')

    # Return the image data URI in the response
    return {
        'imageDataUri': f'data:image/png;base64,{image_base64}'
    }


@app.route('/chosenPatterns', methods=['POST'])
def chosenPatterns():
    # Check if the JSON data exists in the request body
    # if 'detected_objects' not in request.json:
    #     return 'No JSON data received'

    # Get the JSON data from the request body
    json_data = request.get_json()


    # Process the JSON data and save it to a file
    save_directory = "processed-images\\"
    patterns_json_path = os.path.join(save_directory, "detected-objects-pattern.json")

    with open(patterns_json_path, 'w') as outfile:
        json.dump(json_data, outfile)

    patternDrawer.pattern_filler(os.path.join(save_directory, "segmented.png"), os.path.join(save_directory, "pattern.png"), patterns_json_path)
    legendDrawer.create_image_bar(patterns_json_path, os.path.join(save_directory, "legend.png"))

    # Send back the segmented image
    with open(os.path.join(save_directory, "pattern.png"), 'rb') as file:
        image_data = file.read()

    # Encode the image data as Base64
    image_base64 = base64.b64encode(image_data).decode('utf-8')
    
    # Return the image data URI in the response
    return {
        'imageDataUri': f'data:image/png;base64,{image_base64}'
    }


@app.route('/grayscaled', methods=['GET'])
def grayscaled():
    save_directory = "processed-images\\"
    grayscaled_path = os.path.join(save_directory, "grayscaled.png")
    resized_path = os.path.join(save_directory, "resized.jpg")
    pattern_path = os.path.join(save_directory, "pattern.png")

    #get the value of brightness from the data received
    brightness = request.args.get('brightness')
    if brightness is None:
        brightness = 0
    GrayscaleDrawer.overlay_grayscale(resized_path, pattern_path, grayscaled_path, 100 - int(brightness))

    # Send back the grayscaled image as a response
    with open(grayscaled_path, 'rb') as file:
        image_data = file.read()
    
    # Encode the image data as Base64
    image_base64 = base64.b64encode(image_data).decode('utf-8')
    
    # Return the image data URI in the response
    return {
        'imageDataUri': f'data:image/png;base64,{image_base64}'
    }

@app.route('/legendAttached', methods=['GET'])
def legendAttached():
    save_directory = "processed-images\\"
    grayscaled_path = os.path.join(save_directory, "grayscaled.png")
    legend_path = os.path.join(save_directory, "legend.png")
    legend_attached_path = os.path.join(save_directory, "legend-attached.png")
    legendAttacher.merge_images(legend_path, grayscaled_path, legend_attached_path)

    # Send back the legend-attaced image as a response
    with open(legend_attached_path, 'rb') as file:
        image_data = file.read()

    # Encode the image data as Base64
    image_data_base64 = base64.b64encode(image_data).decode('utf-8')

    #return the image data URI in the response
    return {
        'imageDataUri': f'data:image/png;base64,{image_data_base64}'
    }

@app.route('/generateLithophane', methods=['POST'])
def generateLithophane():
    save_directory = "processed-images\\"
    legend_attached_path = os.path.join(save_directory, "legend-attached.png")
    lithophane_path = os.path.join(save_directory, "lithophane.stl")
    stlMaker.createLithophane(legend_attached_path, lithophane_path)

    # Check file size
    file_size_mb = os.path.getsize(lithophane_path) / (1024 * 1024)

    # Send size as a response
    return f"Stl file created successfully. File size: {file_size_mb:.2f} MB."

@app.route('/lithophaneStl', methods=['GET'])
def lithophaneStl():
    save_directory = "processed-images\\"
    lithophane_path = os.path.join(save_directory, "lithophane.stl")

     # Check if the STL file exists
    if os.path.exists(lithophane_path):
        # Send the file for download
        return send_file(lithophane_path, as_attachment=True)
    else:
        # Handle the case where the file doesn't exist
        return "Error: File not found."
    

def execute_code(code):
    # command = 'conda activate detectron_env && python -c "{0}"'.format(code.replace('"', '\\"'))
    command = 'conda activate detectron_env && python -c "{0}"'.format(code.replace('"', '\\"'))
    process = subprocess.Popen(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE, shell=True)
    output, error = process.communicate()
    return output.decode('utf-8')

if __name__ == '__main__':
    app.run(host = '0.0.0.0', port=777)
