import React, { useState } from 'react';

const ImageGreyscale = ({ image }) => {
    const [percentage, setPercentage] = useState(0);

    const handlePercentageChange = (e) => {
        setPercentage(e.target.value);
    };

    const greyscaleStyle = {
        filter: `grayscale(${percentage}%)`,
    };

    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4">Image Greyscale</h1>
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <img src={image} style={greyscaleStyle} alt="Greyscale Image" className="img-fluid mb-3" />
                            <div className="form-group">
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    step="1"
                                    value={percentage}
                                    onChange={handlePercentageChange}
                                    className="form-control-range"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImageGreyscale;
