import React, { useState } from 'react';
import shapes from './constants/shapes';
import './CroppedImage.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const CroppedImage = ({ croppedImage, detected, onNext }) => {
    const [selectedOptions, setSelectedOptions] = useState({});
    const navigate = useNavigate();

    const handleOptionChange = (id, value) => {
        setSelectedOptions((prevOptions) => ({
            ...prevOptions,
            [id]: value,
        }));
    };

    const handleNextClick = () => {
        const jsonContent = JSON.stringify(
            Object.entries(selectedOptions).reduce((result, [label, value]) => {
                const [r, g, b] = detected[label][0]; // Get the RGB values from detected colors
                const shape = shapes[value].name;
                result[label] = [[r, g, b], shape];
                return result;
            }, {})
        );

        // Make a POST request with Axios
        axios
            .post('http://theunseenview.org:777/chosenPatterns', jsonContent, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then((response) => {
                // Handle the response from the server
                console.log('Post request successful:', response.data);
                toast.success('Image passed successfully');
                onNext(response.data.imageDataUri);
            })
            .catch((error) => {
                // Handle any errors that occurred during the POST request
                console.error('Post request failed:', error);
                toast.error("Couldn't send the JSON");
            });
    };

    const handleBackClick = () => {
        navigate('/generate');
    };

    const isNextButtonDisabled =
        Object.values(selectedOptions).some((value) => value === '') ||
        Object.keys(detected).some((id) => !selectedOptions[id]);

    const handleRandomizeClick = () => {
        const availableShapes = Object.keys(shapes).filter(
            (shapeKey) => !Object.values(selectedOptions).includes(shapeKey)
        );

        Object.keys(detected).forEach((id) => {
            const availableShapesCount = availableShapes.length;
            const randomIndex = Math.floor(Math.random() * (availableShapesCount + 1)); // +1 for empty option
            const selectedShape = availableShapes[randomIndex] || ''; // Select an empty option if no more shapes available
            availableShapes.splice(randomIndex, 1); // Remove the selected shape from available shapes
            setSelectedOptions((prevOptions) => ({
                ...prevOptions,
                [id]: selectedShape,
            }));
        });
    };

    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4">Generated Image</h1>
            <div className="row">
                <div className="col-md-12 mb-4">
                    <img src={croppedImage} className="img-fluid" alt="Cropped" />
                </div>
                <div className="col-md-8 offset-md-2">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Detected Data</h4>
                            <div className="row">
                                {Object.entries(detected).map(([label, colors]) => (
                                    <div key={label} className="col-md-4 mb-4">
                                        <div className="detected-object">
                                            <p className="card-text">
                                                <span className="object-name">{label}:</span>
                                                <span className="color-squares">
                          {colors.map((color, index) => (
                              <span
                                  key={index}
                                  className="color-square"
                                  style={{ backgroundColor: `rgb(${color.join(', ')})` }}
                              ></span>
                          ))}
                        </span>
                                            </p>
                                            <div className="custom-select-arrow">
                                                <select
                                                    className="form-control"
                                                    id={label}
                                                    value={selectedOptions[label] || ''}
                                                    onChange={(e) => handleOptionChange(label, e.target.value)}
                                                >
                                                    <option value="">Select an option</option>
                                                    {Object.entries(shapes).map(([key, shape]) => (
                                                        <option key={key} value={key}>
                                                            {shape.description}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="text-center">
                                <button className="btn btn-primary mr-2" onClick={handleBackClick}>
                                    Back
                                </button>
                                <button
                                    className="btn btn-primary mr-2"
                                    onClick={handleRandomizeClick}
                                    disabled={isNextButtonDisabled}
                                >
                                    Randomize
                                </button>
                                <button
                                    className="btn btn-primary"
                                    onClick={handleNextClick}
                                    disabled={isNextButtonDisabled}
                                    title={
                                        isNextButtonDisabled ? 'You have to select all objects' : 'Click to proceed to the next step'
                                    }
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CroppedImage;
