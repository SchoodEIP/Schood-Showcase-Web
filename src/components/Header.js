import React, { useEffect, useState } from 'react'
import '../CSS/header.css'
import schoodLogo from '../assets/logo_schood.png'

export default function HeaderComp () {
    return (
        <div id="header-container">
            <div id="logo-container">
                <img id="header-logo" src={schoodLogo} alt="Schood"/>
            </div>
            <div id="showcase-menu">
                <button href="/" class="button-link showcase-menu-element">Accueil</button>
                <button href="/description" class="button-link showcase-menu-element">Le projet</button>
                <button href="/team" class="button-link showcase-menu-element">L'équipe</button>
                <button href="/timeline" class="button-link showcase-menu-element">Timeline</button>
                <div class="vertical-line showcase-menu-element"/>
                <button href="https://www.schood.fr" class="button-link showcase-menu-element">Demo</button>
            </div>
        </div>
    )
}

