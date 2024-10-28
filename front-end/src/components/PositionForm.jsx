// src/components/PositionForm.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./PositionForm.css";

const PositionForm = () => {
    const [position, setPosition] = useState({ latitude: null, longitude: null });
    const [status, setStatus] = useState(""); // State for success/error message

    const [loading, setLoading] = useState(false);

    const updatePosition = (retryCount = 0) => {
        if (navigator.geolocation) {
            setLoading(true);
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setPosition({ latitude, longitude });
                    setLoading(false);
                },
                (error) => {
                    console.error("Error getting position:", error);
                    setLoading(false);
                    if (retryCount < 3) {
                        setTimeout(() => updatePosition(retryCount + 1), 5000); // Retry after 5 seconds
                    }
                },
                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 0
                }
            );
        } else {
            console.error("Geolocation is not supported by this browser.");
        }
    };


    useEffect(() => {
        const interval = setInterval(updatePosition, 20000); // Update position every 20 seconds
        return () => clearInterval(interval); // Cleanup on component unmount
    }, []);

    return (
        <div className="position-form">
            <h2>Current Position:</h2>
            {loading ? (
                <p>Loading...</p> // Show loading message
            ) : (
                <>
                    <label>
                        Latitude:
                        <input type="text" value={position.latitude || ""} readOnly />
                    </label>
                    <br />
                    <label>
                        Longitude:
                        <input type="text" value={position.longitude || ""} readOnly />
                    </label>
                </>
            )}
            {status && <p>{status}</p>}
        </div>
    );
};

export default PositionForm;
