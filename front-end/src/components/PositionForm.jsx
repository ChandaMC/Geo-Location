import React, { useState, useEffect } from "react";
import axios from "axios";

const PositionForm = () => {
    const [position, setPosition] = useState({ latitude: null, longitude: null });
    const [status, setStatus] = useState("");

    const updatePosition = () => {
        console.log("Attempting to retrieve position...");  // Log every attempt to retrieve position

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setPosition({ latitude, longitude });

                    console.log("Position retrieved:", latitude, longitude);

                    // Send position to backend server
                    axios
                        .post("http://localhost:5000/api/save-position", { latitude, longitude })
                        .then((response) => {
                            console.log(response.data);
                            setStatus("Position saved successfully!");
                        })
                        .catch((error) => {
                            console.error("Error saving position:", error);
                            setStatus("Failed to save position.");
                        });
                },
                (error) => {
                    console.error("Error getting position:", error);
                }
            );
        } else {
            console.error("Geolocation is not supported by this browser.");
        }
    };

    // Set up the interval to update position every 20 seconds
    useEffect(() => {
        console.log("Setting up 20-second interval for position updates.");  // Confirm interval setup
        const interval = setInterval(updatePosition, 20000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <h2>Current Position:</h2>
            <p>Latitude: {position.latitude}</p>
            <p>Longitude: {position.longitude}</p>
            {status && <p>{status}</p>}
        </div>
    );
};

export default PositionForm;
