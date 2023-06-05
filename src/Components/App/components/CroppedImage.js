import React, { useState, useEffect } from 'react';
import shapes from './constants/shapes';
import './CroppedImage.css';

const CroppedImage = ({ croppedImage, detected }) => {
    const [selectedShapes, setSelectedShapes] = useState({});

    useEffect(() => {
        // Initialize Bootstrap dropdowns when the component mounts
        window.$('.dropdown-toggle').dropdown();
    }, []);

    const handleShapeSelection = (label, shape) => {
        setSelectedShapes(prevState => ({
            ...prevState,
            [label]: shape,
        }));
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
                          {colors.map((color, index) => (
                              <span
                                  key={index}
                                  className="color-square"
                                  style={{ backgroundColor: `rgb(${color.join(', ')})` }}
                              ></span>
                          ))}
                        </span>
                                            </p>
                                            <div className="dropdown">
                                                <button
                                                    className="btn btn-secondary dropdown-toggle"
                                                    type="button"
                                                    id={`dropdownMenu${index}`}
                                                    data-toggle="dropdown"
                                                    aria-haspopup="true"
                                                    aria-expanded="false"
                                                >
                                                    {selectedShapes[label] ? selectedShapes[label].description : 'Select Shape'}
                                                </button>
                                                <div className="dropdown-menu" aria-labelledby={`dropdownMenu${index}`}>
                                                    {Object.entries(shapes).map(([key, shape]) => {
                                                        const isShapeSelected = selectedShapes[label] && selectedShapes[label].value === key;
                                                        return (
                                                            <a
                                                                key={key}
                                                                className={`dropdown-item ${isShapeSelected ? 'active' : ''}`}
                                                                href="#"
                                                                onClick={() => handleShapeSelection(label, shape)}
                                                            >
                                                                {shape.description}
                                                            </a>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CroppedImage;
