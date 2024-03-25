import React from 'react'
import HeaderComp from '../components/Header'
import FooterComp from '../components/Footer'
import children from "../assets/jumpingchildren.png"
import welcomeTitle from "../assets/welcomeTitle.png"
import "../CSS/home.css"

export default function HomePage () {
    return (
        <div>
            <HeaderComp/>
            <div id="homepage-body-container">
                <div id="welcome-image-container">
                    <img id="children-image" src={children} alt="welcome"/>
                </div>
                <div id="welcome-message">
                    <img id="welcome-title" src={welcomeTitle} alt="Welcome to Schood"/>
                </div>
            </div>
            <FooterComp/>
        </div>
    )
};