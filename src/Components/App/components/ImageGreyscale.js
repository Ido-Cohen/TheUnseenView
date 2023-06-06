import React, { useState } from 'react';
import axios from 'axios';
import './ImageGreyscale.css';

const ImageGreyscale = ({ image }) => {
    const [percentage, setPercentage] = useState(0);
    const [lastPercentage, setLastPercentage] = useState(0);
    const [greyscaleImage, setGreyscaleImage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handlePercentageChange = (e) => {
        setPercentage(e.target.value);
    };

    const handlePercentageBlur = () => {
        if (percentage !== lastPercentage) {
            sendGetRequest();
        }
    };

    const sendGetRequest = async () => {
        setIsLoading(true);

        try {
            const response = await axios.get('http://theunseenview.org:777/grayscaled', {
                params: {
                    brightness: percentage,
                },
            });
            setGreyscaleImage(response.data.imageDataUri);
            setLastPercentage(percentage);
        } catch (error) {
            console.error('GET request failed:', error);
        }

        setIsLoading(false);
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
                            <div className="image-container">
                                <img src={greyscaleImage ? greyscaleImage : image} alt="Image" className="img-fluid mb-3" />
                                {isLoading && <div className="loader"></div>}
                            </div>
                            <div className="form-group">
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    step="1"
                                    value={percentage}
                                    onChange={handlePercentageChange}
                                    onMouseUp={handlePercentageBlur}
                                    className="form-control-range"
                                />
                                <span>{percentage}%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImageGreyscale;
