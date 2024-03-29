import React, {useState} from "react";
import {Button, Form} from "react-bootstrap";
import axios from "axios";
import '../../../loader.css';
import {toast} from 'react-toastify';
import VerticalAlignmentComponent from "./VerticalAlignmentComponent";
import {getSessionIdFromCookie} from "../../utils/cookies";

function Generate({onCrop}) {
    const [imagePreview, setImagePreview] = useState("");
    const [alignment, setAlignment] = useState("");
    const [imageCrop, setImageCrop] = useState(null);
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(null);
    const [isFormValid, setIsFormValid] = useState(false);
    function saveSessionIdToCookie(sessionId) {
        document.cookie = `sessionID=${sessionId}; path=/`;
    }

    const handleAlignment = (data) => {
        setAlignment(data);
    };

    const Loader = () => (
        <div className="loader">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <p>Detecting objects. Please wait.</p>
        </div>
    );
    const SpinnerOverlay = () => (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0,0,0,0.5)',
                zIndex: 9999,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Loader/>
        </div>
    );
    const handleInputChange = (event) => {
        const {name} = event.target;

        switch (name) {
            case "image":
                setImage(event.target.files[0]);
                break;
            default:
                break;
        }
    };
    function checkPicDimension(width, height) {
        const ratio = width / height;
        if (ratio === 16 / 9) {
            setImageCrop(0);
            setIsFormValid(true)
        } else if (ratio > 16 / 9) {
            setImageCrop(1);
            toast.warn('The image is too wide!');
        } else {
            setImageCrop(-1);
            toast.warn('The image is too tall!');
        }
    }

    // }
    const handleImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            const image = event.target.files[0];
            const reader = new FileReader();

            reader.onload = (e) => {
                const imageUrl = e.target.result;
                const img = new Image();

                img.onload = () => {
                    const {naturalWidth: width, naturalHeight: height} = img;
                    checkPicDimension(width, height);

                };
                img.src = imageUrl;
                setImagePreview(imageUrl);
            };

            reader.readAsDataURL(image);
        }
    };
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            setLoading(true);

            const formData = new FormData();
            formData.append('image', image);

            let crop;
            if (imageCrop === 0) {
                crop = 'none';
            } else if (imageCrop === 1) {
                crop = alignment === "" ? 'top' : alignment;
            } else {
                crop = alignment === "" ? 'left' : alignment;
            }
            formData.append('cropDetail', crop);

            const croppedImageResponse = await axios.post("http://theunseenview.org:777/cropImage", formData);
            const sessionId = croppedImageResponse.data.sessionId;
            saveSessionIdToCookie(sessionId);
            const detectedObjectsResponse = await axios.get("http://theunseenview.org:777/getDetectedObjects", {
                headers: {
                    'Session-ID': getSessionIdFromCookie()
                }
            });

            const croppedImageData = croppedImageResponse.data;

            const detectedObjects = detectedObjectsResponse.data;

            onCrop(croppedImageData.imageDataUri, detectedObjects);
            toast.success('Image cropped successfully!');
        } catch (error) {
            onCrop(error);
            toast.error('Image cropping failed!');
        } finally {
            setLoading(false);
        }
    };

    const isInputValid = (input) => {
        return input !== "";
    };

    const handleFormValidation = () => {
        setIsFormValid(isInputValid(image));
    };

    return (
        <>
            {loading && <SpinnerOverlay/>}

            <Form onSubmit={handleSubmit} className="p-4 rounded-lg bg-light">
                <h3 className="mb-4">Image Form</h3>
                <Form.Group controlId="description">
                    <Form.Text style={{ fontSize: '24px'}}>Please select only .jpg or .jpeg images.</Form.Text>
                </Form.Group>
                <Form.Group controlId="image">
                    <Form.Label>Image</Form.Label>
                    <Form.Control
                        type="file"
                        name="image"
                        accept=".jpg, .jpeg"
                        onChange={(e) => {
                            handleInputChange(e);
                            handleImageChange(e);
                            handleFormValidation();
                        }}
                    />

                    <Button
                        className={"mt-3 eladTheBest btn-lg"}
                        variant="primary"
                        type="submit"
                        disabled={!isFormValid}>
                        Next Step
                    </Button>
                </Form.Group>
                {imageCrop !== null && imageCrop !== 0 &&
                    <VerticalAlignmentComponent onAlignmentChange={handleAlignment} onCrop={imageCrop}/>}
                {imagePreview && <img src={imagePreview} alt="Selected Image" style={{width: '48vw', margin: "20px"}}/>}
            </Form>
        </>

    );
}

export default Generate;