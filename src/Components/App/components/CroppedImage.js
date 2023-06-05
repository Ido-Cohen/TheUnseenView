import React from 'react';
import shapes from './constants/shapes';
import './CroppedImage.css';

const CroppedImage = ({ croppedImage, detected }) => {
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
                                            <p className="card-text">{label}:</p>
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
        </div>
    );
};

export default CroppedImage;
