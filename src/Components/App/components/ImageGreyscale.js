import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const ImageGreyscale = ({ image }) => {
    const [percentage, setPercentage] = useState(0);
    const [greyscaleImage, setGreyscaleImage] = useState('');
    const inputRef = useRef(null);

    const handlePercentageChange = (e) => {
        setPercentage(e.target.value);
    };

    const handlePercentageBlur = async () => {
        try {
            if (inputRef.current) {
                inputRef.current.removeEventListener('mousedown', handleOutsideClick);
            }

            const response = await axios.get('http://theunseenview.org:777/grayscaled', {
                params: {
                    brightness: percentage,
                },
            });
            setGreyscaleImage(response.data.imageDataUri);
        } catch (error) {
            console.error('GET request failed:', error);
        }
    };

    const handleOutsideClick = (e) => {
        if (inputRef.current && !inputRef.current.contains(e.target)) {
            handlePercentageBlur();
        }
    };

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.addEventListener('mousedown', handleOutsideClick);
        }

        return () => {
            if (inputRef.current) {
                inputRef.current.removeEventListener('mousedown', handleOutsideClick);
            }
        };
    }, []);

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
                            {greyscaleImage ? (
                                <img src={greyscaleImage} alt="Greyscale Image" className="img-fluid mb-3" />
                            ) : (
                                <img src={image} alt="Original Image" className="img-fluid mb-3" />
                            )}
                            <div className="form-group" ref={inputRef}>
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    step="1"
                                    value={percentage}
                                    onChange={handlePercentageChange}
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
