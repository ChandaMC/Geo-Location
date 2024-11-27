import React, { useEffect, useState } from "react";
import { useCoordinateContext } from "../context/CoordinateContext.jsx";
import "./CoordinatesHistory.css";
import axios from "axios";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc"; // Import the utc plugin
import timezone from "dayjs/plugin/timezone"; // Import the timezone plugin

dayjs.extend(utc); // Extend utc plugin
dayjs.extend(timezone); // Extend timezone plugin

const CoordinateHistory = () => {
    const { timer, status } = useCoordinateContext();
    const [currentCoordinate, setCurrentCoordinate] = useState(null); // For the top <ul>
    const [coordinateHistory, setCoordinateHistory] = useState([]); // For the bottom <ul>

    // Function to fetch the latest coordinate
    const fetchLatestCoordinate = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/coordinates");
            console.log("Fetched Latest Coordinate:", response.data);
            const latestCoordinate = response.data;

            // Update current coordinate
            setCurrentCoordinate(latestCoordinate);

            // Add the new coordinate to the history
            setCoordinateHistory((prevHistory) => [latestCoordinate, ...prevHistory]);
        } catch (error) {
            console.error("Error fetching latest coordinate:", error);
        }
    };

    useEffect(() => {
        if (timer === 1) {
            fetchLatestCoordinate().then();
        }
    }, [timer]);

    return (
        <div className="coordinate-history">
            <h3>Current Coordinates</h3>

            <ul>
                <li>
                    <span>Status:
                        <i className="status"> {status}</i>
                    </span>
                    <span> | Next Update in: {timer} sec</span>
                </li>

                {currentCoordinate && (
                    <li>
                        <span className="latitude">
                            <strong>Latitude: </strong>
                            <i>{currentCoordinate.latitude}</i>
                        </span>
                        <span className="longitude">
                            <strong>Longitude: </strong>
                            <i>{currentCoordinate.longitude}</i>
                        </span>
                        <span className="timestamp">
                            <strong>Captured at: </strong>
                            <i className="fas fa-clock">
                                {currentCoordinate.timestamp && dayjs(currentCoordinate.timestamp).isValid()
                                    ? dayjs(currentCoordinate.timestamp).tz("Africa/Lusaka", true).format("YYYY-MM-DD HH:mm:ss")
                                    : "Invalid timestamp"}
                            </i>
                        </span>
                    </li>
                )}
            </ul>

            <ul className="coordinate-list">
                {coordinateHistory.length > 0 ? (
                    coordinateHistory.map((coord, index) => (
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
                                    {coord.timestamp && dayjs(coord.timestamp).isValid()
                                        ? dayjs(coord.timestamp).tz("Africa/Lusaka", true).format("YYYY-MM-DD HH:mm:ss")
                                        : "Invalid timestamp"}
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
