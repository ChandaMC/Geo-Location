// src/component/SideBar.jsx

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import "./SideBar.css";

const SideBar = () => {
    return (
        <div className="sidebar">
            <div className="logo">
                <h2>Geo Location</h2>
            </div>
            <div className="menu">
                <div className="menu-item active">🏠 Dashboard</div>
                <div className="menu-item">🗺 Map</div>
                <div className="menu-item">📦 Deliveries</div>
                <div className="menu-item">⚙️ Settings</div>
            </div>
            <div className="profile">
                <FontAwesomeIcon icon={faUser} className="profile-icon"/>
            </div>
            <span>John Doe</span>
        </div>
    )
}

export default SideBar