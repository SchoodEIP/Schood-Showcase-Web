import React, { useEffect, useState } from 'react'
import '../CSS/header.css'
import schoodLogo from '../assets/logo_schood.png'

export default function HeaderComp () {
    const handleNavigation = (event) => {
        console.log(event)
        window.location.href = event
    }
    return (
        <div id="header-container">
            <div id="logo-container">
                <img id="header-logo" src={schoodLogo} alt="Schood"/>
            </div>
            <div id="showcase-menu">
                <button onClick={() => handleNavigation("/")} className="button-link showcase-menu-element">Accueil</button>
                <button onClick={() => handleNavigation("/description")} className="button-link showcase-menu-element">Le projet</button>
                <button onClick={() => handleNavigation("/team")} className="button-link showcase-menu-element">L'équipe</button>
                <button onClick={() => handleNavigation("/timeline")} className="button-link showcase-menu-element">Timeline</button>
                <div className="vertical-line showcase-menu-element"/>
                <button onClick={() => handleNavigation("https://www.schood.fr")} className="button-link showcase-menu-element">Demo</button>
            </div>
        </div>
    )
}

