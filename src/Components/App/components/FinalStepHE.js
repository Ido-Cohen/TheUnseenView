import React, {useState} from 'react';
import axios from 'axios';
import './ImageGreyscale.css';
import {toast} from "react-toastify";
import {getSessionIdFromCookie} from "../../utils/cookies";

const FinalStepHE = ({image}) => {
    const [loading, setLoading] = useState(false);
    const [downloadProgress, setDownloadProgress] = useState(0);

    const Loader = () => (
        <div className="loader">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <p>יוצר קובץ STL. אנא המתן</p>
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

    const handleDownload = async () => {
        try {
            const response = await axios.get('http://theunseenview.org:777/lithophaneStl', {
                responseType: 'blob',
                headers: {
                    'Session-ID': getSessionIdFromCookie()
                },
                onDownloadProgress: (progressEvent) => {
                    const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setDownloadProgress(progress);
                },
            });

            const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.setAttribute('download', 'file.stl'); // Replace with the desired file name
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            toast.success("הקובץ ירד בהצלחה!");
        } catch (error) {
            // Handle any errors
            toast.error('משהו השתבש!');
            console.error('Error occurred during file download:', error);
        }
    };

    return (
        <div dir={'rtl'}>
            {loading && <SpinnerOverlay/>}
            <div className="legend-attachment">
                <h1 className="text-center mb-4">דף הורדה</h1>
                <div className="row justify-content-center">
                    <div className="card">
                        <div className="card-body">
                            <div className="d-flex justify-content-center">
                                <p style={{fontSize: '36px'}}>{image.file_size_he}</p>
                            </div>
                            <div className="d-flex justify-content-center">
                                <button className="btn btn-primary eladTheBest" style={{
                                    padding: '10px 20px',
                                    fontSize: '20px',
                                    borderRadius: '10px'
                                }} onClick={handleDownload}>לחץ להורדה
                                </button>
                            </div>
                            {downloadProgress > 0 && (
                                <div className="progress mt-3 h-25 mb-3">

                                    <div className="progress-bar" role="progressbar"
                                         style={{width: `${downloadProgress}%`, fontSize: '20px'}}
                                         aria-valuenow={downloadProgress} aria-valuemin="0" aria-valuemax="100">
                                        <span className="progress-percentage">{`${downloadProgress}%`}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FinalStepHE;
