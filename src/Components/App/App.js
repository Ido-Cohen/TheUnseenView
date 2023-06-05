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

function App() {
    const [croppedImage, setCroppedImage] = useState(null);
    const [detectedObjects, setDetectedObjects] = useState(null);
    const navigate = useNavigate();
    const handleCrop = (image,detected) => {
        console.log(image);
        setCroppedImage(image);
        setDetectedObjects(detected);
        navigate('/cropped-image');
    };
    return (

        <div className="container mt-4">
            {/*<nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">*/}
            {/*    <Link to="/about" className="navbar-brand">*/}
            {/*        <img src={logo} alt="Logo" width="100" height="100" className="d-inline-block align-top"/>*/}
            {/*        /!*Image App*!/*/}
            {/*    </Link>*/}
            {/*    <ul className="navbar-nav">*/}
            {/*        <li className="nav-item h1 m-1">*/}
            {/*            <Link to="/home" className="nav-link">*/}
            {/*                Home*/}
            {/*            </Link>*/}
            {/*        </li>*/}
            {/*        <li className="nav-item h1 m-1">*/}
            {/*            <Link to="/generate" className="nav-link">*/}
            {/*                Generate*/}
            {/*            </Link>*/}
            {/*        </li>*/}
            {/*        <li className="nav-item h1 m-1">*/}
            {/*            <Link to="/about" className="nav-link">*/}
            {/*                About*/}
            {/*            </Link>*/}
            {/*        </li>*/}
            {/*    </ul>*/}
            {/*    <div className="dropdown">*/}
            {/*        <button className="btn btn-secondary dropdown-toggle" type="button" id="languageDropdown" data-bs-toggle="dropdown" aria-expanded="false">*/}
            {/*            Language*/}
            {/*        </button>*/}
            {/*        <ul className="dropdown-menu" aria-labelledby="languageDropdown">*/}
            {/*            <li><button className="dropdown-item" type="button">English</button></li>*/}
            {/*            <li><button className="dropdown-item" type="button">Hebrew</button></li>*/}
            {/*        </ul>*/}
            {/*    </div>*/}
            {/*</nav>*/}
            <MyNavbar/>
            <Routes>
                <Route exact path="/he" element={<AboutHE/>}/>
                <Route exact path="/" element={<About/>}/>

                <Route exact path="/generate" element={<Generate onCrop={handleCrop}/>}/>
                <Route exact path="/he/generate" element={<GenerateHE onCrop={handleCrop}/>}/>
                <Route exact path="/cropped-image" element={<CroppedImage croppedImage={croppedImage} detected={detectedObjects}/>}/>

                <Route exact path="/about" element={<About/>}/>
                <Route exact path="/he/about" element={<AboutHE/>}/>

            </Routes>
            <ToastContainer position="top-center"/>
        </div>

    );
}

export default App;
