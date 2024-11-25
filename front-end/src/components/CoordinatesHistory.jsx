import React, { useEffect, useState } from "react";
import "./CoordinatesHistory.css";
import axios from "axios";


const CoordinateHistory = () => {
    const [coordinates, setCoordinates] = useState([]);

    useEffect(() => {
        const fetchCoordinates = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/coordinates");
                setCoordinates(response.data);
            } catch (error) {
                console.error("Error fetching coordinates history:", error);
            }
        };

        fetchCoordinates(); // Call the function on component mount
    }, []); // Empty dependency array ensures that it runs once

    return (
        <>
            <div className="coordinate-history">
                <h2>Current Coordinates</h2>
                <ul>
                    {coordinates.length > 0 ? (
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
        </>
    );
};

export default CoordinateHistory;
