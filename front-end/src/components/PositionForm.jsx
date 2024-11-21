// src/components/PositionForm.jsx

import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";
import "./PositionForm.css"; // Custom styles for better interface

// Fix for missing default icon issue in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

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
                    setStatus("Error retrieving position.");
                }
            );
        } else {
            setStatus("Geolocation is not supported by your browser.");
        }
    };

    useEffect(() => {
        // Automatically update position every 20 seconds
        const interval = setInterval(updatePosition, 20000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="position-form">
            <h2>Geo-Location Tracker</h2>
            <p>Latitude: {position.latitude}</p>
            <p>Longitude: {position.longitude}</p>
            {status && <p className="status">{status}</p>}

            {/* Map Integration */}
            <div className="map-container">
                {position.latitude && position.longitude ? (
                    <MapContainer
                        center={[position.latitude, position.longitude]}
                        zoom={15}
                        scrollWheelZoom={true}
                        style={{ height: "400px", width: "100%", borderRadius: "8px" }}
                    >
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                        <Marker position={[position.latitude, position.longitude]}>
                            <Popup>
                                You are here: <br />
                                Lat: {position.latitude}, Lng: {position.longitude}
                            </Popup>
                        </Marker>
                    </MapContainer>
                ) : (
                    <p className="map-placeholder">Fetching your location...</p>
                )}
            </div>
        </div>
    );
};

export default PositionForm;
