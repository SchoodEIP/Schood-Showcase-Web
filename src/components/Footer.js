import React, { useEffect, useState } from 'react'
import "../CSS/footer.css"
import apkDownload from "../assets/apkDownload.png"
import iconFb from "../assets/iconCircleFb.png"
import iconMail from "../assets/iconCircleMail.png"

export default function FooterComp () {
    const [downloadAPK, setDownloadAPK] = useState()

    const fbLink = "https://www.facebook.com/profile.php?id=100087044937576"
    const handleNavigation = (event) => {
        window.location.href = event
    }

    useEffect(() => {
        downloadApk()
        .then((data) => {
            setDownloadAPK(data)
        })
    })

    const downloadApk = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/downloadapk`, {
              method: 'GET',
            })
            if (response.status !== 200) /* istanbul ignore next */ {
              throw new Error("Erreur lors de l'envoi du message.")
            } else {
              const blob = await response.blob()
              const objectURL = URL.createObjectURL(blob)
              return objectURL
            }
          } catch (e) /* istanbul ignore next */ {
            console.error(e)
          }
    }

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
                <img onClick={() => handleNavigation(fbLink)} className="footer-icon" id="fb-btn" src={iconFb} alt="facebook"/>
                <div className="footer-vertical-line"/>
                <a href={downloadAPK}>
                    <img className="footer-icon" src={apkDownload} alt="mobile version" />
                </a>
            </div>
        </div>
    )
}

