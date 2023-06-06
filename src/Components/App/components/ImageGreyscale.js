import React, { useState } from 'react';
import axios from 'axios';
import './ImageGreyscale.css';

const ImageGreyscale = ({ image }) => {
    const [percentage, setPercentage] = useState(0);
    const [lastPercentage, setLastPercentage] = useState(0);
    const [greyscaleImage, setGreyscaleImage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handlePercentageChange = (e) => {
        let value = e.target.value;

        // Ensure the value is within the valid range
        if (value < 0) {
            value = 0;
        } else if (value > 100) {
            value = 100;
        }

        setPercentage(value);
    };

    const handlePercentageBlur = () => {
        if (percentage !== lastPercentage) {
            sendGetRequest();
        }
    };

    const handlePercentageKeyPress = (e) => {
        if (e.key === 'Enter') {
            handlePercentageBlur();
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
        <div className="image-greyscale">
            <h1 className="text-center mb-4">Image Greyscale</h1>
            <div className="row justify-content-center">
                    <div className="card">
                        <div className="card-body">
                            <div className="image-container">
                                <img src={greyscaleImage ? greyscaleImage : image} alt="Image" className="img-fluid mb-3" />
                                {isLoading && <div className="loader-greyscale"></div>}
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
                                <div className="percentage-wrapper">
                                    <span className="percentage-label">Percentage:</span>
                                    <input
                                        type="number"
                                        min="0"
                                        max="100"
                                        value={percentage}
                                        onChange={handlePercentageChange}
                                        onBlur={handlePercentageBlur}
                                        onKeyPress={handlePercentageKeyPress}
                                        className="percentage-input"
                                    />
                                    <span>%</span>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    );
};

export default ImageGreyscale;
