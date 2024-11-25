// src/components/PositionForm.jsx

import React, { useState, useEffect } from "react";
import axios from "axios";
import MapView from "./MapView";
require('./PositionForm.css');


const PositionForm = () => {
    const [position, setPosition] = useState({ latitude: null, longitude: null });
    const [status, setStatus] = useState("");

    const updatePosition = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setPosition({ latitude, longitude });
                    setStatus("Position updated!");

                    // Send position to backend
                    axios
                        .post("http://localhost:5000/api/save-position", { latitude, longitude })
                        .then(() => setStatus("Position saved successfully!"))
                        .catch((error) => {
                            console.error("Error saving position:", error);
                            setStatus("Failed to save position.");
                        });
                },
                (error) => {
                    console.error("Error getting position:", error);
                    setStatus("Error retrieving position.");
                }
            );
        } else {
            setStatus("Geolocation is not supported by your browser.");
        }
    };

    useEffect(() => {
        const interval = setInterval(updatePosition, 20000);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <h2 className="title">Location Tracker</h2>
            <p className="latitude">Latitude: {position.latitude}</p>
            <p className="longitude">Longitude: {position.longitude}</p>
            {status && <p className="status">{status}</p>}

            {/*Pass latitude and longitude to MapView */}
            <MapView latitude={position.latitude} longitude={position.longitude} className="position-form"/>
        </>
    );
};

export default PositionForm;
