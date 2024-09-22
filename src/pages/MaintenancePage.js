import React from 'react'
import HeaderComp from '../components/Header'
import FooterComp from '../components/Footer'
import "../CSS/maintenance.css"
import MaintenanceProject from '../components/MaintenanceProject';
import MaintenanceTeam from '../components/MaintenanceTeam';
import MaintenanceTimeline from '../components/MaintenanceTimeline';
import MaintenanceNews from "../components/MaintenanceNews";

export default function MaintenancePage () {
    const handleLogout = () => {
        sessionStorage.removeItem("maintenanceToken")
        window.location.href = '/maintenance'
    }

    return (
        <div>
            <HeaderComp/>
            <h1>Maintenance Page</h1>
            <button onClick={handleLogout}>Logout</button>
            <div id="login-body-container">
                <MaintenanceProject/>
                <MaintenanceTeam/>
                <MaintenanceTimeline/>
                <MaintenanceNews/>
            </div>
            <FooterComp/>
        </div>
    )
};