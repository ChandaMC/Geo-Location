import React, { useEffect, useState } from "react";
import "./CoordinatesHistory.css";
import locationService from "../services/locationService.js";
import axios from "axios";


const CoordinateHistory = () => {
    const [coordinates, setCoordinates] = useState([]);

    useEffect(() => {
        const fetchCoordinates = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/coordinates");
                // const response = await locationService.getLastCoordinates();
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
                            <li key={coord._id ||index}>
                                <span>Latitude: {coord.latitude}</span>
                                <span>Longitude: {coord.longitude}</span>
                                <span>
                                    Captured at:{" "}
                                    {new Date(coord.timestamp).toLocaleString()}
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
