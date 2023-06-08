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

function App() {
    const [croppedImage, setCroppedImage] = useState(null);
    const [legendImage, setLegendImage] = useState(null);
    const [imageGreyscale, setImageGreyscale] = useState(null);
    const [detectedObjects, setDetectedObjects] = useState(null);
    const navigate = useNavigate();
    const handleCrop = (image,detected) => {
        console.log(image);
        setCroppedImage(image);
        setDetectedObjects(detected);
        navigate('/cropped-image');
    };

    const handleNext = (image) => {
        console.log(image);
        setImageGreyscale(image);
        navigate('/greyscale-image');
    };

    const handleLegendNext = (image) => {
        console.log(image);
        setLegendImage(image);
        navigate('/legend-attachment');
    };

    const handleGenerateLithophan = (image) => {
        console.log(image);
        setLegendImage(image);
        navigate('/finalize');
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
                <Route exact path="/greyscale-image" element={<ImageGreyscale image={imageGreyscale} onNext={handleLegendNext}/>}/>
                <Route exact path="/legend-attachment" element={<LegendAttachment image={legendImage} onGenerate={handleGenerateLithophan}/>}/>
                <Route exact path="/finalize" element={<FinalStep image={legendImage}/>}/>

                <Route exact path="/about" element={<About/>}/>
                <Route exact path="/he/about" element={<AboutHE/>}/>

            </Routes>
            <ToastContainer position="top-center"/>
        </div>

    );
}

export default App;
