from DetectorSeg import *

detector = Detector(model_type = "PS")

detector.onImage("images\\3.jpg")
segment_names, segment_colors = detector.getSegmentNamesAndColors()

# Print the segment names and colors
for name, color in zip(segment_names, segment_colors):
    print(f"Segment Name: {name}, Color Code: {color}")