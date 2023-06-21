import React, {useState} from 'react';
import axios from 'axios';
import './ImageGreyscale.css';
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

const LegendAttachmentHE = ({image, onGenerate}) => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    console.log(image)

    const Loader = () => (
        <div className="loader">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <p>יוצר קובץ STL. אנא המתן.</p>
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


    const handleGenerateClick = async () => {

        try {
            setLoading(true);


            const lithophaneImageResponse = await axios.post("http://theunseenview.org:777/generateLithophane", {}, {
                timeout: 60000 // Set the timeout to 1 minute
            });
            const lithophaneImageData = lithophaneImageResponse.data;
            console.log(lithophaneImageResponse);

            onGenerate(lithophaneImageData);

            toast.success('Generated lithophane successfully!');


        } catch (error) {
            console.log(error);
            onGenerate(error);
            toast.error('generate lithophane failed!');
        } finally {
            setLoading(false);
        }
    };

    // const sendGetRequest = async () => {
    //     setIsLoading(true);
    //
    //     try {
    //         const response = await axios.get('http://theunseenview.org:777/grayscaled', {
    //             params: {
    //                 brightness: percentage,
    //             },
    //         });
    //         setGreyscaleImage(response.data.imageDataUri);
    //         setLastPercentage(percentage);
    //     } catch (error) {
    //         console.error('GET request failed:', error);
    //     }
    //
    //     setIsLoading(false);
    // };
    //
    // const greyscaleStyle = {
    //     filter: `grayscale(${percentage}%)`,
    // };

    return (<div dir={'rtl'}>
            {loading && <SpinnerOverlay/>}
            <div className="legend-attachment">
                <h1 className="text-center mb-4">מקרא</h1>
                <div className="row justify-content-center">
                    <div className="card">
                        <div className="card-body">
                            <div className="image-container">
                                <img src={image} alt="Image" className="img-fluid mb-3"/>
                            </div>
                            <div className="d-flex justify-content-center">
                                <button className="btn btn-primary" onClick={handleGenerateClick}>צור קובץ STL</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default LegendAttachmentHE;
