import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ImageGreyscale = ({ image }) => {
    const [percentage, setPercentage] = useState(0);
    const [greyscaleImage, setGreyscaleImage] = useState('');

    const handlePercentageChange = (e) => {
        const newPercentage = e.target.value;
        setPercentage(newPercentage);
    };

    useEffect(() => {
        // Send GET request with Axios
        axios.get('http://theunseenview.org:777/grayscaled', {
            params: {
                brightness: percentage,
            },
        })
            .then((response) => {
                // Handle the response from the server
                console.log('GET request successful');
                const imageData = Buffer.from(response.data, 'binary').toString('base64'); // Convert image data to base64
                setGreyscaleImage(response.data.imageDataUri); // Set the greyscale image
            })
            .catch((error) => {
                // Handle any errors that occurred during the GET request
                console.error('GET request failed:', error);
                // Perform any necessary error handling
            });
    }, [percentage]);

    const greyscaleStyle = {
        filter: `grayscale(${percentage}%)`,
    };

    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4">Image Greyscale</h1>
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-body">
                            <img src={greyscaleImage || image} style={greyscaleStyle} alt="Greyscale Image" className="img-fluid mb-3" />
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
                                <span className="percentage">{percentage}%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImageGreyscale;
