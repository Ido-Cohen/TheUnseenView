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
                                                <span className="dropdown-icon">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-down" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
                          </svg>
                        </span>
                                            </p>
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
