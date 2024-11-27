import React, { useEffect, useState } from "react";
import { useCoordinateContext } from "../context/CoordinateContext.jsx";
import "./CoordinatesHistory.css";
import axios from "axios";

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';  // Import the utc plugin
import timezone from 'dayjs/plugin/timezone';  // Import the timezone plugin

dayjs.extend(utc);  // Extend utc plugin
dayjs.extend(timezone);  // Extend timezone plugin

const CoordinateHistory = () => {
    const { timer, status } = useCoordinateContext();
    const [coordinates, setCoordinates] = useState([]);

    // Function to fetch coordinates
    const fetchCoordinates = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/coordinates");
            console.log("API Response:", response.data);
            setCoordinates(response.data);
        } catch (error) {
            console.error("Error fetching coordinates history:", error);
        }
    };

    // Fetch coordinates when the timer reaches 0 or when the component mounts
    useEffect(() => {
        fetchCoordinates(); // Initial fetch on mount
    }, []); // Fetch on initial render (empty dependency array)

    useEffect(() => {
        if (timer === 0) {
            fetchCoordinates();
        }
    }, [timer]); // Fetch when the timer changes

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
                {coordinates.length > 0 ? (
                    coordinates.map((coord, index) => (
                        <li className="coordinate-item" key={coord._id || index}>
                            <span className="latitude">
                                <strong>Latitude: </strong>
                                <i>{coord.latitude}</i>
                            </span>
                            <span className="longitude">
                                <strong>Longitude: </strong>
                                <i>{coord.longitude}</i>
                            </span>

                            <span className="timestamp">
                                <strong>Captured at: </strong>
                                <i className="fas fa-clock">
                                    {/* Ensure timestamp is valid before applying timezone */}
                                    {coord.timestamp && dayjs(coord.timestamp).isValid()
                                        ? dayjs(coord.timestamp).tz("Africa/Lusaka", true).format("YYYY-MM-DD HH:mm:ss")
                                        : "Invalid timestamp"
                                    }
                                </i>
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
