// src/App.jsx

import React from "react";
import "./App.css";
import PositionForm from "./components/PositionForm.jsx";
import SideBar from "./components/SideBar.jsx";
import CoordinatesHistory from "./components/CoordinatesHistory";

const App = () => {
    return (
        <div className="app">
            <SideBar />
            <div className="main-content">
                <div className="history-section">
                    <CoordinatesHistory/>
                </div>
                <div className="position-section">
                {/*<div className="map-section">*/}
                    <PositionForm/>
                </div>
            </div>
        </div>
    )
};

export default App;