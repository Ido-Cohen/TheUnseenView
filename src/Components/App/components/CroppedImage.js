import React from 'react';

const CroppedImage = ({ croppedImage, detected }) => {
    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4">Generated Image</h1>
            <div className="row justify-content-center align-items-center">
                <div className="col-md-6">
                    <img src={croppedImage} className="img-fluid" alt="Cropped" />
                </div>
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Detected Data</h4>
                            {Object.entries(detected).map(([label, colors]) => (
                                <p key={label} className="card-text">
                                    {label}: {colors.map(color => color.join(', ')).join(', ')}
                                </p>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CroppedImage;