import sys
sys.path.insert(1, 'detectron2')

from detectron2.engine import DefaultPredictor
from detectron2.config import get_cfg
from detectron2.data import MetadataCatalog
from detectron2.utils.visualizer import ColorMode, Visualizer
from detectron2 import model_zoo

import time
import cv2
import numpy as np

class Detector:
    def __init__(self, model_type="OD"):
        self.cfg = get_cfg()
        self.model_type = model_type

        if model_type == "OD":
            self.cfg.merge_from_file(model_zoo.get_config_file("COCO-Detection/faster_rcnn_R_101_FPN_3x.yaml"))
            self.cfg.MODEL.WEIGHTS = model_zoo.get_checkpoint_url("COCO-Detection/faster_rcnn_R_101_FPN_3x.yaml")
        elif model_type == "IS":
            self.cfg.merge_from_file(model_zoo.get_config_file("COCO-InstanceSegmentation/mask_rcnn_R_50_FPN_3x.yaml"))
            self.cfg.MODEL.WEIGHTS = model_zoo.get_checkpoint_url("COCO-InstanceSegmentation/mask_rcnn_R_50_FPN_3x.yaml")
        elif model_type == "PS":
            self.cfg.merge_from_file(model_zoo.get_config_file("COCO-PanopticSegmentation/panoptic_fpn_R_101_3x.yaml"))
            self.cfg.MODEL.WEIGHTS = model_zoo.get_checkpoint_url("COCO-PanopticSegmentation/panoptic_fpn_R_101_3x.yaml")

        self.cfg.MODEL.ROI_HEADS.SCORE_THRESH_TEST = 0.7
        self.cfg.MODEL.DEVICE = "cpu"

        self.predictor = DefaultPredictor(self.cfg)
        self.metadata = MetadataCatalog.get(self.cfg.DATASETS.TRAIN[0])

    def onImage(self, imagePath):
        start = time.perf_counter()  # start time count

        image = cv2.imread(imagePath)
        blank_image = np.zeros_like(image)  # Create a blank image with the same dimensions as the original image

        if self.model_type != "PS":
            predictions = self.predictor(image)

            viz = Visualizer(blank_image, metadata=self.metadata, instance_mode=ColorMode.SEGMENTATION)

            output = viz.draw_instance_predictions(predictions["instances"].to("cpu"))
        else:
            predictions, segmentInfo = self.predictor(image)["panoptic_seg"]
            viz = Visualizer(blank_image, self.metadata)

            output = viz.draw_panoptic_seg_predictions(predictions.to("cpu"), segmentInfo)

        end = time.perf_counter()  # end time count
        ms = (end - start)  # calculate total time
        print(f"Elapsed {ms:.03f} seconds.")  # print time in seconds

        cv2.imshow("Result", output.get_image()[:, :, ::-1])
        cv2.waitKey(0)
        cv2.imwrite(f"{imagePath.split('.')[0]}_out.jpg", output.get_image()[:, :, ::-1])

    def getSegmentNamesAndColors(self):
        segment_names = self.metadata.thing_classes
        segment_colors = self.metadata.thing_colors

        # Check if segment_colors is not None
        if segment_colors is not None:
            return segment_names, segment_colors
        else:
            return segment_names, []

    