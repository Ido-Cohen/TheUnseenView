import React, {useState} from 'react';
import shapes from './constants/shapes';
import './CroppedImage.css';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import {toast} from 'react-toastify';
import seedrandom from 'seedrandom';

const CroppedImage = ({croppedImage, detected, onNext}) => {
    const [selectedOptions, setSelectedOptions] = useState({});
    const navigate = useNavigate();

    const handleOptionChange = (id, value) => {
        setSelectedOptions((prevOptions) => {
            const updatedOptions = { ...prevOptions };

            if (value === '') {
                delete updatedOptions[id];
            } else {
                updatedOptions[id] = value;
            }

            return updatedOptions;
        });
    };

    const handleNextClick = () => {
        Object.keys(selectedOptions).forEach((key) => {
            if (selectedOptions[key] === 'EMPTY') {
                delete selectedOptions[key];
            }
        });
        const jsonContent = JSON.stringify(
            Object.entries(selectedOptions).reduce((result, [label, value]) => {
                const [r, g, b] = detected[label][0]; // Get the RGB values from detected colors
                const shape = shapes[value].name;
                result[label] = [[r, g, b], shape];
                return result;
            }, {})
        );

        // Make a POST request with Axios
        axios.post('http://theunseenview.org:777/chosenPatterns', jsonContent, {
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
            (shapeKey) => shapeKey !== 'EMPTY' && !Object.values(selectedOptions).includes(shapeKey)
        );

        // Create a random number generator with a fixed seed value
        const currentTimestamp = new Date().getTime().toString();
        const rng = new seedrandom(currentTimestamp);

        const randomizedOptions = { ...selectedOptions };
        Object.keys(detected).forEach((id, index) => {
            const selectedShape = randomizedOptions[id];
            console.log(selectedShape);
            if (!selectedShape || selectedShape === 'EMPTY') {
                if (index < 6 && availableShapes.length > 0) {
                    const randomIndex = Math.floor(rng() * availableShapes.length);
                    const shapeToAssign = availableShapes[randomIndex];
                    randomizedOptions[id] = shapeToAssign;
                    availableShapes.splice(randomIndex, 1);
                } else {
                    randomizedOptions[id] = 'EMPTY';
                }
            }
        });

        setSelectedOptions(randomizedOptions);
    };

    const isDisabled = (selectedOptions) => {
        const nonEmptyOptions = Object.values(selectedOptions).filter(option => option !== 'EMPTY');
        return nonEmptyOptions.length >= 6;
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
                                {Object.entries(detected).map(([label, colors], index) => (
                                    <div key={label} className="col-md-4 mb-4">
                                        <div className="detected-object">
                                            <p className="card-text">
                                                <span className="object-name">{label}:</span>
                                                <span className="color-squares">
                      {colors.map((color, colorIndex) => (
                          <span
                              key={colorIndex}
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
                                                    disabled={isDisabled(selectedOptions) && (selectedOptions[label] === 'EMPTY' || !selectedOptions[label])}
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
                                <button className="btn btn-primary mr-2 eladTheBest" onClick={handleBackClick}>
                                    Back
                                </button>
                                <button className="btn btn-primary mr-2 eladTheBest" onClick={handleRandomizeClick}>
                                    Randomize
                                </button>
                                <button
                                    className="btn btn-primary eladTheBest"
                                    onClick={handleNextClick}
                                    disabled={isNextButtonDisabled}
                                    title={
                                        isNextButtonDisabled
                                            ? 'You have to select all objects'
                                            : 'Click to proceed to the next step'
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
