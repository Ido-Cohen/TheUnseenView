import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyNavbar from "../Layout/MyNavbar";
import React, {useState} from "react";
import { Route, Routes, useNavigate} from "react-router-dom";
import Generate from "./components/Generate";
import About from "./components/About";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CroppedImage from "./components/CroppedImage";
import GenerateHE from "./components/GenerateHE";
import AboutHE from "./components/AboutHE";
import ImageGreyscale from "./components/ImageGreyscale";
import LegendAttachment from "./components/LegendAttachment";
import FinalStep from "./components/FinalStep";
import CroppedImageHE from "./components/CroppedImageHE";
import ImageGreyscaleHE from "./components/ImageGreyscaleHE";
import LegendAttachmentHE from "./components/LegendAttachmentHE";
import FinalStepHE from "./components/FinalStepHE";

function App() {
    const [croppedImage, setCroppedImage] = useState(null);
    const [legendImage, setLegendImage] = useState(null);
    const [imageGreyscale, setImageGreyscale] = useState(null);
    const [detectedObjects, setDetectedObjects] = useState(null);
    const [imageSize, setImageSize] = useState({});
    const navigate = useNavigate();

    const checkUrlContainsHe = () => {
        const currentUrl = window.location.href;

        return currentUrl.includes('he/');
    };
    const handleCrop = (image,detected) => {
        setCroppedImage(image);
        setDetectedObjects(detected);
        checkUrlContainsHe() ? navigate('/he/cropped-image') : navigate('/cropped-image');
    };

    const handleNext = (image) => {
        setImageGreyscale(image);
        checkUrlContainsHe() ? navigate('/he/greyscale-image') : navigate('/greyscale-image');
    };

    const handleLegendNext = (image) => {
        setLegendImage(image);
        checkUrlContainsHe()? navigate('/he/legend-attachment') : navigate('/legend-attachment');
    };

    const handleGenerateLithophan = (image) => {
        setImageSize(image);
        checkUrlContainsHe()? navigate('/he/finalize') : navigate('/finalize');
    };

    return (

        <div className="container mt-4">
            <MyNavbar/>
            <Routes>
                <Route exact path="/he" element={<AboutHE/>}/>
                <Route exact path="/" element={<About/>}/>

                <Route exact path="/generate" element={<Generate onCrop={handleCrop}/>}/>
                <Route exact path="/he/generate" element={<GenerateHE onCrop={handleCrop}/>}/>

                <Route exact path="/cropped-image" element={<CroppedImage croppedImage={croppedImage} detected={detectedObjects} onNext={handleNext}/>}/>
                <Route exact path="/he/cropped-image" element={<CroppedImageHE croppedImage={croppedImage} detected={detectedObjects} onNext={handleNext}/>}/>

                <Route exact path="/greyscale-image" element={<ImageGreyscale image={imageGreyscale} onNext={handleLegendNext}/>}/>
                <Route exact path="/he/greyscale-image" element={<ImageGreyscaleHE image={imageGreyscale} onNext={handleLegendNext}/>}/>

                <Route exact path="/legend-attachment" element={<LegendAttachment image={legendImage} onGenerate={handleGenerateLithophan}/>}/>
                <Route exact path="/he/legend-attachment" element={<LegendAttachmentHE image={legendImage} onGenerate={handleGenerateLithophan}/>}/>

                <Route exact path="/finalize" element={<FinalStep image={imageSize}/>}/>
                <Route exact path="/he/finalize" element={<FinalStepHE image={imageSize}/>}/>

                <Route exact path="/about" element={<About/>}/>
                <Route exact path="/he/about" element={<AboutHE/>}/>

            </Routes>
            <ToastContainer position="top-center"/>
        </div>

    );
}

export default App;
