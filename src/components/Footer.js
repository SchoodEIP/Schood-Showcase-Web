import React from 'react'
import "../CSS/footer.css"
import apkDownload from "../assets/apkDownload.png"
import iconFb from "../assets/iconCircleFb.png"
import iconMail from "../assets/iconCircleMail.png"

export default function FooterComp () {
    return (
        <div id="footer-container">
            <div id="contact-container">
                <div id="contact-content">
                    <div>Schood 2024</div>
                    <div>contact: schood.eip@gmail.com</div>
                </div>
                <div className="footer-vertical-line"/>
            </div>
            <div id="mobile-media-container">
                <img className="footer-icon" id="mail-btn" src={iconMail} alt="mail"/>
                <img className="footer-icon" id="fb-btn" src={iconFb} alt="facebook"/>
                <div className="footer-vertical-line"/>
                <img className="footer-icon" src={apkDownload} alt="mobile version"/>
            </div>
        </div>
    )
}

