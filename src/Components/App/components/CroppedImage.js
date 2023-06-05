import React from 'react';
import shapes from './constants/shapes';
import './CroppedImage.css';

const CroppedImage = ({ croppedImage, detected }) => {
    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4">Generated Image</h1>
            <div className="row justify-content-center">
                <div className="col-md-6 mb-4">
                    <img src={croppedImage} className="img-fluid" alt="Cropped" />
                </div>
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Detected Data</h4>
                            {Object.entries(detected).map(([label, colors]) => (
                                <div key={label} className="detected-object">
                                    <p className="card-text">{label}:</p>
                                    <div className="detected-info">
                                        <div className="color-squares">
                                            {colors.map((color, index) => (
                                                <div
                                                    key={index}
                                                    className="color-square"
                                                    style={{ backgroundColor: `rgb(${color.join(', ')})` }}
                                                ></div>
                                            ))}
                                        </div>
                                        <select className="form-control">
                                            {Object.entries(shapes).map(([key, shape]) => (
                                                <option key={key} value={key}>
                                                    {shape.description}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CroppedImage;
