// import logo from '../../logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyNavbar from "../Layout/MyNavbar";
// import Navbar from "../Layout/Navbar";
import React, {useState} from "react";
import {Route, Routes, useNavigate} from "react-router-dom";
import Home from "./components/Home";
import Generate from "./components/Generate";
import About from "./components/About";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GeneratedImage from "./components/GeneratedImage";
import GenerateHE from "./components/GenerateHE";
import AboutHE from "./components/AboutHE";

function App() {
    const [generatedData, setGeneratedData] = useState(null);
    const navigate = useNavigate();
    const handleGenerate = (data) => {
        console.log(data);
        setGeneratedData(data);
        navigate('/generated-image');
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
                <Route exact path="/home" element={<Home/>}/>

                <Route exact path="/generate" element={<Generate onGenerate={handleGenerate}/>}/>
                <Route exact path="/he/generate" element={<GenerateHE onGenerate={handleGenerate}/>}/>
                {/*<Generate />*/}
                {/*</Route>*/}
                <Route exact path="/generated-image" element={<GeneratedImage generatedData={generatedData}/>}/>

                <Route exact path="/about" element={<About/>}/>
                <Route exact path="/he/about" element={<AboutHE/>}/>

                {/*</Route>*/}
            </Routes>
            <ToastContainer position="top-center"/>
        </div>

    );
}

export default App;
