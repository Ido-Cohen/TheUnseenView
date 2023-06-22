import React, {useState} from 'react';
import axios from 'axios';
import './ImageGreyscale.css';
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

const LegendAttachment = ({image, onGenerate}) => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    console.log(image)

    const Loader = () => (
        <div className="loader">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <p>Generating STL file. Please wait.</p>
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


    return (<>
            {loading && <SpinnerOverlay/>}
            <div className="legend-attachment">
                <h1 className="text-center mb-4">Preview</h1>
                <div className="row justify-content-center">
                    <div className="card">
                        <div className="card-body">
                            <div className="image-container">
                                <img src={image} alt="Image" className="img-fluid mb-3"/>
                            </div>
                            <h4 className="text">The brighter a pixel is, the more prominent it will be in the final result.</h4>
                            <div className="d-flex justify-content-center">
                                <button className="btn btn-primary btn-lg" onClick={handleGenerateClick}>Generate STL file</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
};

export default LegendAttachment;
