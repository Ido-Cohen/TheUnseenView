import React, {useState} from 'react';
import axios from 'axios';
import './ImageGreyscale.css';
import {toast} from "react-toastify";
import {getSessionIdFromCookie} from "../../utils/cookies";

const LegendAttachmentHE = ({image, onGenerate}) => {
    const [loading, setLoading] = useState(false);

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
                timeout: 60000, // Set the timeout to 1 minute
                headers : {
                    'Session-ID': getSessionIdFromCookie()
                }
            });
            const lithophaneImageData = lithophaneImageResponse.data;

            onGenerate(lithophaneImageData);

            toast.success('קובץ STL נוצר בהצלחה!');


        } catch (error) {
            console.log(error);
            onGenerate(error);
            toast.error('משהו השתבש!');
        } finally {
            setLoading(false);
        }
    };


    return (<div dir={'rtl'}>
            {loading && <SpinnerOverlay/>}
            <div className="legend-attachment">
                <h1 className="text-center mb-4">תצוגה מקדימה</h1>
                <div className="row justify-content-center">
                    <div className="card">
                        <div className="card-body">
                            <div className="image-container">
                                <img src={image} alt="Image" className="img-fluid mb-3"/>
                            </div>
                            <h4 className="text">ככל שפיקסל בהיר יותר, כך הוא יהיה בולט יותר בתוצאה הסופית.</h4>
                            <div className="d-flex justify-content-center">
                                <button className="btn btn-primary btn-lg" onClick={handleGenerateClick}>צור קובץ STL</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default LegendAttachmentHE;
