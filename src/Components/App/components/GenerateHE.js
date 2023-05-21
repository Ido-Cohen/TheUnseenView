import React, {useState} from "react";
import {Button, Form} from "react-bootstrap";
import axios from "axios";
import '../../../loader.css';
import {toast} from 'react-toastify';

function Generate({onGenerate}) {
    const [height, setHeight] = useState("");
    const [width, setWidth] = useState("");
    const [imagePreview, setImagePreview] = useState("");
    const [depth, setDepth] = useState("");
    const [loading, setLoading] = useState(false);
    const [maxObjects, setMaxObjects] = useState("");
    const [image, setImage] = useState(null);
    const [isFormValid, setIsFormValid] = useState(false);
    const [percentage, setPercentage] = useState(0);

    const handlePercentageChange = (event) => {
        setPercentage(event.target.value);
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
            case "height":
                setHeight(value);
                break;
            case "width":
                setWidth(value);
                break;
            case "depth":
                setDepth(value);
                break;
            case "maxObjects":
                setMaxObjects(value);
                break;
            case "image":
                setImage(event.target.files[0]);
                break;
            default:
                break;
        }
    };
    const handleImageChange = (event) => {
        console.log(event)
        if (event.target.files && event.target.files[0]) {
            const image = event.target.files[0];
            setImagePreview(URL.createObjectURL(image));
        }
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        // setImagePreview(URL.createObjectURL(image));
        console.log("Form submitted:", {
            height,
            width,
            depth,
            maxObjects,
            image,
        });
        setLoading(true);
        try {
            const response = await axios.get('https://myapi.com/data');
            console.log(response.data);
            onGenerate(response.data);
            toast.success('3D file generated successfully!');
        } catch (error) {
            console.log(error);
            onGenerate(error);
            toast.error('Failed to generate 3D file.');
        }
        setLoading(false);
    };

    const isInputValid = (input) => {
        return input !== "";
    };

    const isFormInputsValid = () => {
        return (
            isInputValid(height) &&
            isInputValid(width) &&
            isInputValid(depth) &&
            isInputValid(maxObjects)
        );
    };

    const handleFormValidation = () => {
        setIsFormValid(isFormInputsValid());
    };

    return (
        <div dir={'rtl'}>
            {loading && <SpinnerOverlay/>}

            <Form onSubmit={handleSubmit} className="p-4 rounded-lg bg-light">
                <h3 className="mb-4">טופס תמונה</h3>
                <Form.Group controlId="height">
                    <Form.Label>גובה</Form.Label>
                    <Form.Control
                        type="text"
                        name="height"
                        placeholder="הכנס גובה תמונה"
                        value={height}
                        onChange={(e) => {
                            handleInputChange(e);
                            handleFormValidation();
                        }}
                    />
                </Form.Group>
                <Form.Group controlId="width">
                    <Form.Label>רוחב</Form.Label>
                    <Form.Control
                        type="text"
                        name="width"
                        placeholder="הכנס רוחב תמונה"
                        value={width}
                        onChange={(e) => {
                            handleInputChange(e);
                            handleFormValidation();
                        }}
                    />
                </Form.Group>
                <Form.Group controlId="depth">
                    <Form.Label>עומק</Form.Label>
                    <Form.Control
                        type="text"
                        name="depth"
                        placeholder="הכנס עומק"
                        value={depth}
                        onChange={(e) => {
                            handleInputChange(e);
                            handleFormValidation();
                        }}
                    />
                </Form.Group>
                <Form.Group controlId="maxObjects">
                    <Form.Label>מספר אובייקטים מקסימלי</Form.Label>
                    <Form.Control
                        type="text"
                        name="maxObjects"
                        placeholder="הכנס מספר אובייקטים מקסימלי"
                        value={maxObjects}
                        onChange={(e) => {
                            handleInputChange(e);
                            handleFormValidation();
                        }}
                    />
                </Form.Group>
                <Form.Group controlId="formPercentageSlider">
                    <Form.Label>רמת בהירות רקע</Form.Label>
                    <div className="d-flex align-items-center">
                        <div className="mr-2">{percentage}%</div>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            step="1"
                            value={percentage}
                            onChange={handlePercentageChange}
                            className="form-control-range flex-grow-1"
                        />
                    </div>
                </Form.Group>
                <Form.Group controlId="image">
                    <Form.Label>תמונה</Form.Label>
                    <Form.Control
                        type="file"
                        name="image"
                        lang={"he"}
                        onChange={(e) => {
                            handleInputChange(e);
                            handleFormValidation();
                            handleImageChange(e);
                        }}
                    />
                    <Button
                        className={"mt-3"}
                        variant="primary"
                        type="submit"
                        disabled={!isFormValid}>
                        צור קובץ
                    </Button>
                </Form.Group>

                {imagePreview && <img src={imagePreview} alt="Selected Image"/>}
            </Form>
        </div>

    );
}

export default Generate;