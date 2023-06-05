import React, {useState} from "react";
import {Button, Form} from "react-bootstrap";
import axios from "axios";
import '../../../loader.css';
import {toast} from 'react-toastify';
import VerticalAlignmentComponent from "./VerticalAlignmentComponent";

function Generate({onCrop}) {
    // const [height, setHeight] = useState("");
    // const [width, setWidth] = useState("");
    const [imagePreview, setImagePreview] = useState("");
    const [alignment, setAlignment] = useState("");
    const [imageCrop, setImageCrop] = useState(null);
    // const [depth, setDepth] = useState("");
    const [loading, setLoading] = useState(false);
    // const [maxObjects, setMaxObjects] = useState("");
    const [image, setImage] = useState(null);
    const [isFormValid, setIsFormValid] = useState(false);
    const [percentage, setPercentage] = useState(0);

    const handlePercentageChange = (event) => {
        setPercentage(event.target.value);
    };

    const handleAlignment = (data) => {
        setAlignment(data);
    };

    const Loader = () => (
        <div className="loader">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <p>Generating the 3D file. Please wait.</p>
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
        const {name, value} = event.target;

        switch (name) {
            // case "height":
            //     setHeight(value);
            //     break;
            // case "width":
            //     setWidth(value);
            //     break;
            // case "depth":
            //     setDepth(value);
            //     break;
            // case "maxObjects":
            //     setMaxObjects(value);
            //     break;
            case "image":
                setImage(event.target.files[0]);
                break;
            default:
                break;
        }
    };
    // const handleImageChange = (event) => {
    //     console.log(event)
    //     if (event.target.files && event.target.files[0]) {
    //         const image = event.target.files[0];
    //         setImagePreview(URL.createObjectURL(image));
    //     }
    function checkPicDimension(width, height) {
        const ratio = width / height;
        console.log(ratio)
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
                    console.log(`Image dimensions: ${width}x${height}`);

                };
                img.src = imageUrl;
                setImagePreview(imageUrl);
            };

            reader.readAsDataURL(image);
        }
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        // setImagePreview(URL.createObjectURL(image));
        console.log("Form submitted:", {
            image,
            percentage
        });
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('image', image);
            let crop;
            if (imageCrop === 0) {
                crop = 'none';
            } else if (imageCrop === 1) { // image is tall
                if (alignment === "") {
                    crop = 'top';
                } else {
                    crop = alignment;
                }
            } else { // image is wide
                if (alignment === "") {
                    crop = 'left';
                } else {
                    crop = alignment;
                }
            }
            formData.append('cropDetail', crop)
            const response = await axios.post("http://localhost:777/cropImage", formData);
            console.log(response.data);
            onCrop(response.data);
            toast.success('Image cropped successfully!');
        } catch (error) {
            console.log(error);
            onCrop(error);
            toast.error('Image cropped failed!');
        }
        setLoading(false);
    };

    const isInputValid = (input) => {
        return input !== "";
    };

    // const isFormInputsValid = () => {
    //     return (
    //         isInputValid(height) &&
    //         isInputValid(width) &&
    //         isInputValid(depth) &&
    //         isInputValid(maxObjects)
    //     );
    // };

    const handleFormValidation = () => {
        console.log(imageCrop)
        setIsFormValid(isInputValid(image));
    };
    console.log(" aligment " + alignment);

    return (
        <>
            {loading && <SpinnerOverlay/>}

            <Form onSubmit={handleSubmit} className="p-4 rounded-lg bg-light">
                <h3 className="mb-4">Image Form</h3>
                {/*<Form.Group controlId="height">*/}
                {/*    <Form.Label>Height</Form.Label>*/}
                {/*    <Form.Control*/}
                {/*        type="text"*/}
                {/*        name="height"*/}
                {/*        placeholder="Enter height"*/}
                {/*        value={height}*/}
                {/*        onChange={(e) => {*/}
                {/*            handleInputChange(e);*/}
                {/*            handleFormValidation();*/}
                {/*        }}*/}
                {/*    />*/}
                {/*</Form.Group>*/}
                {/*<Form.Group controlId="width">*/}
                {/*    <Form.Label>Width</Form.Label>*/}
                {/*    <Form.Control*/}
                {/*        type="text"*/}
                {/*        name="width"*/}
                {/*        placeholder="Enter width"*/}
                {/*        value={width}*/}
                {/*        onChange={(e) => {*/}
                {/*            handleInputChange(e);*/}
                {/*            handleFormValidation();*/}
                {/*        }}*/}
                {/*    />*/}
                {/*</Form.Group>*/}
                {/*<Form.Group controlId="depth">*/}
                {/*    <Form.Label>Depth</Form.Label>*/}
                {/*    <Form.Control*/}
                {/*        type="text"*/}
                {/*        name="depth"*/}
                {/*        placeholder="Enter depth"*/}
                {/*        value={depth}*/}
                {/*        onChange={(e) => {*/}
                {/*            handleInputChange(e);*/}
                {/*            handleFormValidation();*/}
                {/*        }}*/}
                {/*    />*/}
                {/*</Form.Group>*/}
                {/*<Form.Group controlId="maxObjects">*/}
                {/*    <Form.Label>Max Objects</Form.Label>*/}
                {/*    <Form.Control*/}
                {/*        type="text"*/}
                {/*        name="maxObjects"*/}
                {/*        placeholder="Enter max objects"*/}
                {/*        value={maxObjects}*/}
                {/*        onChange={(e) => {*/}
                {/*            handleInputChange(e);*/}
                {/*            handleFormValidation();*/}
                {/*        }}*/}
                {/*    />*/}
                {/*</Form.Group>*/}
                {/*<Form.Group controlId="formPercentageSlider">*/}
                {/*    <Form.Label>Background brightness level</Form.Label>*/}
                {/*    <div className="d-flex align-items-center">*/}
                {/*        <div className="mr-2">{percentage}%</div>*/}
                {/*        <input*/}
                {/*            type="range"*/}
                {/*            min="0"*/}
                {/*            max="100"*/}
                {/*            step="1"*/}
                {/*            value={percentage}*/}
                {/*            onChange={handlePercentageChange}*/}
                {/*            className="form-control-range flex-grow-1"*/}
                {/*        />*/}
                {/*    </div>*/}
                {/*</Form.Group>*/}
                <Form.Group controlId="image">
                    <Form.Label>Image</Form.Label>
                    <Form.Control
                        type="file"
                        name="image"
                        onChange={(e) => {
                            handleInputChange(e);
                            handleImageChange(e);
                            handleFormValidation();
                        }}
                    />
                    <Button
                        className={"mt-3"}
                        variant="primary"
                        type="submit"
                        disabled={!isFormValid}>
                        Crop
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