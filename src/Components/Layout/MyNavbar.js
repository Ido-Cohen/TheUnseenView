import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import logo from "../App/logo.png";
import {Dropdown, DropdownButton} from "react-bootstrap";
import {IL, US} from 'country-flag-icons/react/3x2'

const Navbar = () => {
    const [language, setLanguage] = useState("Hebrew");
    const navigate = useNavigate();
    const handleLanguageChange = (lang) => {
        if (language !== lang) {
            if (lang === "English") {
                navigate(window.location.pathname.replace("/he", ""))
            } else {
                navigate(`/he${window.location.pathname}`)
            }
        }
        setLanguage(lang);
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4"
             dir={language === "English" ? 'ltr' : 'rtl'}>
            <Link to={language === "English" ? "/about" : "/he/about"} className="navbar-brand">
                <img
                    src={logo}
                    alt="Logo"
                    width="100"
                    height="100"
                    className="d-inline-block align-top"
                />
                {/*Image App*/}
            </Link>
            <ul className="navbar-nav">
                {/*<li className="nav-item h1 m-1">*/}
                {/*    <Link to={language === "English" ? "/home" : "/he/home"} className="nav-link">*/}
                {/*        Home*/}
                {/*    </Link>*/}
                {/*</li>*/}
                <li className="nav-item h1 m-1">
                    <Link to={language === "English" ? "/generate" : "/he/generate"} className="nav-link">
                        {language === "English" ? 'Generate 3D' : 'יצירת קובץ'}
                    </Link>
                </li>
                <li className="nav-item h1 m-1">
                    <Link to={language === "English" ? "/about" : "/he/about"} className="nav-link">
                        {language === "English" ? 'About' : 'על הפרויקט'}
                        {/*About*/}
                    </Link>
                </li>
            </ul>
            <DropdownButton
                title={
                    language === "Hebrew" ? (
                        <IL title="Israel" style={{width: 50, height: 50}}/>
                    ) : (
                        <US title="United States" style={{width: 50, height: 50}}/>
                    )
                }
                variant="outline-primary"
                className={"align-content-end"}
            >
                <Dropdown.Item onClick={() => handleLanguageChange("Hebrew")}>
                    <IL title="Israel" style={{width: 50, height: 50}}/> Hebrew
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleLanguageChange("English")}>
                    <US title="United States" style={{width: 50, height: 50}}/> English
                </Dropdown.Item>
            </DropdownButton>
        </nav>
    );
};

export default Navbar;