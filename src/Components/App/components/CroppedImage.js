import React, { useState } from 'react';
import shapes from './constants/shapes';
import './CroppedImage.css';

const CroppedImage = ({ croppedImage, detected }) => {
    const [selectedOptions, setSelectedOptions] = useState({});

    const handleOptionChange = (id, value) => {
        setSelectedOptions((prevOptions) => ({
            ...prevOptions,
            [id]: value,
        }));
    };
    console.log(selectedOptions);
    const handleNextClick = () => {
        // Do something when the next button is clicked
    };

    const isNextButtonDisabled = Object.values(selectedOptions).some((value) => value === '');

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
                                <button
                                    className="btn btn-primary"
                                    onClick={handleNextClick}
                                    disabled={isNextButtonDisabled}
                                    title={isNextButtonDisabled ? 'You have to select all objects' : ''}
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
