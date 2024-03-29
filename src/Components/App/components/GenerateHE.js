import React, {useState} from "react";
import {Button, Form} from "react-bootstrap";
import axios from "axios";
import '../../../loader.css';
import {toast} from 'react-toastify';
import VerticalAlignmentComponent from "./VerticalAlignmentComponent";
import {getSessionIdFromCookie} from "../../utils/cookies";

function GenerateHE({onCrop}) {
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
            <p>מזהה אובייקטים. אנא המתן.</p>
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
            toast.warn('התמונה רחבה מדי!');
        } else {
            setImageCrop(-1);
            toast.warn('התמונה גבוהה מדי!');
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
            toast.success('התמונה נקלטה בהצלחה!');
        } catch (error) {
            console.log(error);
            onCrop(error);
            toast.error('משהו השתבש!');
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
        <div dir={'rtl'}>
            {loading && <SpinnerOverlay/>}

            <Form onSubmit={handleSubmit} className="p-4 rounded-lg bg-light">
                <h3 className="mb-4">טופס תמונה</h3>
                <Form.Group controlId="description">
                    <Form.Text style={{ fontSize: '24px'}}>נא לבחור תמונה בפורמט רק מהסוג הבא: jpg/jpeg</Form.Text>
                </Form.Group>
                <Form.Group controlId="image">
                    <Form.Label>תמונה</Form.Label>
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
                        לשלב הבא
                    </Button>
                </Form.Group>
                {imageCrop !== null && imageCrop !== 0 &&
                    <VerticalAlignmentComponent onAlignmentChange={handleAlignment} onCrop={imageCrop}/>}
                {imagePreview && <img src={imagePreview} alt="Selected Image" style={{width: '48vw', margin: "20px"}}/>}
            </Form>
        </div>

    );
}

export default GenerateHE;