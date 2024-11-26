// src/component/CoordinateHistory.jsx

import React, { useEffect, useState } from "react";
import { useCoordinateContext } from "../context/CoordinateContext.jsx";
import "./CoordinatesHistory.css";
import axios from "axios";

const CoordinateHistory = () => {
    const { timer, status } = useCoordinateContext();
    const [coordinates, setCoordinates] = useState([]);


    // Function to fetch coordinates
    const fetchCoordinates = async () => {
        try {
            const response = await axios.get("/api/coordinates");
            setCoordinates(response.data);
        } catch (error) {
            console.error("Error fetching coordinates history:", error);
        }
    };

    // Fetch coordinates when the timer reaches 0
    useEffect(() => {
        if (timer === 0) {
            fetchCoordinates();
        }
    }, [timer]);

    return (
        <div className="coordinate-history">
            <h2>Current Coordinates</h2>

            <ul>
                <li>
                    <span>Status:
                        <i className="status"> { status }</i>
                    </span>
                    <span> | Next Update in: { timer } sec</span>
                </li>
            </ul>

            <ul className="coordinate-list">
                { coordinates.length > 0 ? (
                    coordinates.map((coord, index) => (
                        <li className="coordinate-item" key={coord._id ||index}>
                            <span className="latitude">
                                <strong>Latitude: </strong>
                                <i>{coord.latitude}</i>
                            </span>
                            <span className="longitude">
                                <strong>Longitude: </strong>
                                <i>{coord.longitude}</i>
                            </span>
                            <span className="timestamp">
                                <strong>Captured at:{" "}</strong>
                                <i className="fas fa-clock">{new Date(coord.timestamp).toLocaleString()}</i>
                            </span>
                        </li>
                    ))
                ) : (
                    <li>No coordinates available!!!</li>
                )}
            </ul>
        </div>
    );
};

export default CoordinateHistory;
