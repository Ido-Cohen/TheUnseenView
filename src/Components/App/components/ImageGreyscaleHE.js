import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './ImageGreyscale.css';
import {toast} from "react-toastify";
import {getSessionIdFromCookie} from "../../utils/cookies";

const ImageGreyscaleHE = ({ image,onNext }) => {
    const [percentage, setPercentage] = useState(85);
    const [lastPercentage, setLastPercentage] = useState(0);
    const [greyscaleImage, setGreyscaleImage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [loading, setLoading] = useState(false);

    const Loader = () => (
        <div className="loader">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <p>Detecting objects. Please wait.</p>
        </div>
    );

    const SpinnerOverlay = () => (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0,0,0,0.5)',
                zIndex: 9999,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Loader/>
        </div>
    );


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

    const handleNextClick = async () => {
        try {
            setLoading(true);
            const croppedImageResponse = await axios.get("http://theunseenview.org:777/legendAttached", {
                headers: {
                    'Session-ID': getSessionIdFromCookie()
                },
            }).then(response => response.data.imageDataUri);
            onNext(croppedImageResponse);
            toast.success('יצירת המקרא עברה בהצלחה!');
        } catch (error) {
            console.log(error);
            toast.error('משהו השתבש!');
        } finally {
            setLoading(false);
        }
    };

    const sendGetRequest = async () => {
        setIsLoading(true);

        try {
            const response = await axios.get('http://theunseenview.org:777/grayscaled', {
                params: {
                    brightness: percentage,
                },
                headers: {
                    'Session-ID': getSessionIdFromCookie()
                },
            });
            setGreyscaleImage(response.data.imageDataUri);
            setLastPercentage(percentage);
        } catch (error) {
            console.error('GET request failed:', error);
        }

        setIsLoading(false);
    };
    useEffect(() => {
        sendGetRequest()
    },[])

    const greyscaleStyle = {
        filter: `grayscale(${percentage}%)`,
    };

    return (<div dir={'rtl'}>
            {loading && <SpinnerOverlay/>}
            <div className="image-greyscale">
                <h1 className="text-center mb-4">הוספת רקע</h1>
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
                                    <span className="percentage-label">אחוזים:</span>
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
                                <h5 className="text-primary">נא לבחור את רמת הבהירות עבור הרקע.</h5>
                                <h5 className="text-warning">*מומלץ לא לעבור את ה85% על מנת לא לפגוע באיכות הצורות בהדפסה.</h5>
                            </div>
                            <div className="d-flex justify-content-end"> {/* Use d-flex justify-content-end class */}
                                <button className="btn btn-primary btn-lg eladTheBest" onClick={handleNextClick}>לדף הבא</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImageGreyscaleHE;
