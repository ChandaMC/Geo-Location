// src/components/CoordinatesHistory.jsx

import React, { useEffect, useState } from "react";
import { useCoordinateContext } from "../context/CoordinateContext.jsx";
import "./CoordinatesHistory.css";
import axios from "axios";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

const CoordinateHistory = () => {
    const { timer, status } = useCoordinateContext();
    const [coordinateHistory, setCoordinateHistory] = useState([]);
    const [error, setError] = useState(null);


    const fetchLatestCoordinate = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/coordinates");
            setError(null)
            console.log("Fetched Latest Coordinate Response:", response.data);

            const coordinates = response.data; // This is an array
            if (!Array.isArray(coordinates) || coordinates.length === 0) {
                console.warn("No coordinates available");
                return [];
            }

            if (Array.isArray(coordinates) && coordinates.length > 0) {
                const latestCoordinate = coordinates[0]; // Assuming the first item is the latest
                console.log("Latest Coordinate:", latestCoordinate);

                if (latestCoordinate.latitude && latestCoordinate.longitude) {
                    // Update the current coordinate
                    // setCurrentCoordinate(latestCoordinate);

                    // Add the new coordinate to the history
                    // setCoordinateHistory((prevHistory) => [latestCoordinate, ...prevHistory]);
                    setCoordinateHistory((prevHistory) => {
                        if (prevHistory[0] && prevHistory[0]._id === latestCoordinate._id)
                            return prevHistory; // Avoid duplicate
                        return [latestCoordinate, ...prevHistory];
                    })
                } else {
                    console.warn("Invalid coordinate data:", latestCoordinate);
                }
            } else {
                console.warn("No coordinates found in response:", coordinates);
            }
        } catch (error) {
            console.error("Error fetching latest coordinate:", error);
            setError("Failed to fetch coordinates. Please try again later.");
        }
    };

    useEffect(() => {
        console.log("Timer triggered fetchLatestCoordinate: ", timer);
        // const interval = setInterval(fetchLatestCoordinate, 20000);
        // return () => clearInterval(interval);

        if (timer === 1) {
            fetchLatestCoordinate();
        }
    }, [timer]);
    // }, []);

    return (
        <div className="coordinate-history">
            {error && <p className="error-message">{error}</p>}
            <h3>Current Coordinates</h3>
            <ul>
                <li>
                    <span>Status:
                        <i className="status"> {status}</i>
                    </span>
                    <span> | Next Update in: {timer} sec</span>
                </li>
            </ul>
            <ul className="coordinate-list">
                {coordinateHistory.length > 0 ? (
                    coordinateHistory.map((coord, index) => (
                        <li
                            className="coordinate-item"
                            key={`${coord._id || coord.latitude}-${coord.longitude}-${index}`}
                        >
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
                        {coord.timestamp && dayjs(coord.timestamp).isValid()
                            ? dayjs(coord.timestamp).tz("Africa/Lusaka", true).format("YYYY-MM-DD HH:mm:ss")
                            : "Invalid timestamp"}
                    </i>
                </span>
                        </li>
                    ))
                ) : (
                    <li className="no-coordinates">Fetching coordinates or no data available.</li>
                )}
            </ul>
        </div>
    );
};

export default CoordinateHistory;
