from DetectorSeg import *
import patternDrawer
import GrayscaleDrawer
import legendDrawer
import legendAttacher
import imageCrop
import imageResizer
import subprocess
import argparse
import stlMaker
import winsound
import takeStlPhoto

def open_directory_in_explorer(directory_path):
    subprocess.Popen(f'explorer {directory_path}')

def main(directory_path, image_path, image_brighness):
    # Your main function code goes here
    # print(f"Directory path: {directory_path}")
    # print(f"Flag: {flag}")

    # imageCrop.crop_image(image_path, f"{directory_path}\\cropped.jpg")
    # imageResizer.resize_image(f"{directory_path}\\cropped.jpg", 1920, 1080, f"{directory_path}\\resized.jpg")
    # detector = Detector(model_type = "PS")
    # detector.onImage(f"{directory_path}\\resized.jpg", f"{directory_path}\\segmented.png", f"{directory_path}\\detected-objects.json")
    # play_three_beeps()
    # input("Press Enter to continue...")
    # patternDrawer.pattern_filler(f"{directory_path}\\segmented.png", f"{directory_path}\\pattern.png", f"{directory_path}\\detected-objects.json")
    # GrayscaleDrawer.overlay_grayscale(f"{directory_path}\\resized.jpg", f"{directory_path}\\pattern.png", f"{directory_path}\\grayscaled.png", image_brighness)
    # legendDrawer.create_image_bar(f"{directory_path}\\detected-objects.json", f"{directory_path}\\legend.png")
    # legendAttacher.merge_images(f"{directory_path}\\legend.png", f"{directory_path}\\grayscaled.png", f"{directory_path}\\attached.png")
    # createStl = input("Create STL(y/n)? ").lower()
    # if createStl == "y":
    #     print("Creating STL please wait...")
    #     stlMaker.createLithophane(f"{directory_path}\\attached.png", f"{directory_path}\lithophane.stl")
    #     play_beep()
    #     print("STL created!")

    takeStlPhoto.take_photo("processed-images\\")

    # open_directory_in_explorer(directory_path)

def play_beep():
    # Frequency = 2500 Hertz, Duration = 1000 milliseconds (1 second)
    winsound.Beep(2500, 1000)

def play_three_beeps():
    for _ in range(3):
        winsound.Beep(2500, 150)  # Frequency = 2500 Hertz, Duration = 500 milliseconds (0.5 seconds)
        time.sleep(0.0001)  # Pause for 0.5 seconds between each beep



if __name__ == '__main__':
    # Create the argument parser
    parser = argparse.ArgumentParser(description='Description of your script')

    # Add the arguments
    parser.add_argument('directory_path', type=str, help='Path to the directory')
    parser.add_argument('image_path', type=str, help='Path to the image')
    parser.add_argument('image_brightness', type=int, help='Image brightness')

    # parser.add_argument('--flag', type=int, default=0, help='Optional flag')

    # Parse the arguments
    args = parser.parse_args()

    # Call the main function with the parsed arguments
    main(args.directory_path, args.image_path, args.image_brightness)
# segment_names, segment_colors = detector.getSegmentNamesAndColors()

# Print the segment names and colors
# for name, color in zip(segment_names, segment_colors):
#     print(f"Segment Name: {name}, Color Code: {color}")
# for name, color in zip(segment_names, segment_colors):
#     print(f"{name}")

#python main.py "C:\Users\Ido Cohen\OneDrive\Final Project\TheUnseenView\processed-images" "C:\Users\Ido Cohen\OneDrive\Final Project\TheUnseenView\images\10.jpg" 30    
# python main.py "TheUnseenView\processed-images" "TheUnseenView\images\10.jpg" 30