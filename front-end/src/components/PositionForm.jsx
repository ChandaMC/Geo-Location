// src/components/PositionForm.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./PositionForm.css"; // Create this CSS file for styling

const PositionForm = () => {
    const [position, setPosition] = useState({ latitude: null, longitude: null });

    const updatePosition = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setPosition({ latitude, longitude });
                    console.log(`Updated Position: Lat ${latitude}, Lon ${longitude}`);

                    // Send position to backend server
                    axios
                        .post("http://localhost:5000/api/save-position", { latitude, longitude })
                        .then((response) => console.log(response.data))
                        .catch((error) => console.error("Error saving position:", error));
                },
                (error) => {
                    console.error("Error getting position:", error);
                }
            );
        } else {
            console.error("Geolocation is not supported by this browser.");
        }
    };

    useEffect(() => {
        const interval = setInterval(updatePosition, 20000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="position-form">
            <h2>Current Position:</h2>
            <label>
                Latitude:
                <input type="text" value={position.latitude || ""} readOnly />
            </label>
            <br />
            <label>
                Longitude:
                <input type="text" value={position.longitude || ""} readOnly />
            </label>
        </div>
    );
};

export default PositionForm;
