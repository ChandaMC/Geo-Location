// src/App.jsx

import React from "react";
import "./App.css";
import PositionForm from "./components/PositionForm.jsx";
import SideBar from "./components/SideBar.jsx";
import CoordinatesHistory from "./components/CoordinatesHistory.jsx";
import { CoordinateProvider } from "./context/CoordinateContext.jsx";

const App = () => {
    return (
        <CoordinateProvider>
            <div className="app">
                <SideBar />
                <div className="main-content">
                    <div className="history-section">
                        <CoordinatesHistory />
                    </div>
                    <div className="position-section">
                        <PositionForm />
                    </div>
                </div>
            </div>
        </CoordinateProvider>
    );
};

export default App;
