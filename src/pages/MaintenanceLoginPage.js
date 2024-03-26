import React, {useState} from 'react'
import HeaderComp from '../components/Header'
import FooterComp from '../components/Footer'
import "../CSS/maintenance.css"
import schoodLogo from "../assets/logo_schood.png"


export default function MaintenancePage () {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const baseUrl = process.env.REACT_APP_BACKEND_URL + '/user/login'


    const handleEmailChange = (mail) => {
        setEmail(mail.target.value)
    }

    const handlePasswordChange = (pass) => {
        setPassword(pass.target.value)
    }

    const validateEmail = (mail) => {
        const regEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi

        return regEx.test(mail)
    }

    const handleLogin = async (event) => {
        event.preventDefault()

        if (!validateEmail(email)) {
            setMessage('Email is not valid')
            return
        }

        if (!password) {
            setMessage('Password is empty')
            return
        }

        const payload = {
            "email": email,
            "password": password
        }
        console.log("data: ", payload)

        try {
            const response = await fetch(baseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
            })

            const data = await response.json()

            if (response.ok) {
                sessionStorage.setItem('maintenanceToken', data.token)
                window.location.href = '/maintenance'
            } else /* istanbul ignore next */ {
                setMessage(`Error: ${data.message}`)
            }
        } catch (error) /* istanbul ignore next */ {
            setMessage(`Error: ${error}`)
        }
    }

    return (
        <div>
            <HeaderComp/>
            <div id="login-body-container">
                <div id="all-container">
                    <div id="logo-container">
                        <img id="schood-logo" src={schoodLogo} alt="SCHOOD"/>
                    </div>
                    <div id="login-container">
                        <input type="text" id="email-input" placeholder='email' value={email} onChange={handleEmailChange} required/>
                        <input type="password" id="password-input" placeholder='*****' value={password} onChange={handlePasswordChange} required/>
                        <button type="submit" onClick={handleLogin}>Login</button>
                    </div>
                </div>
            </div>
            <FooterComp/>
        </div>
    )
};