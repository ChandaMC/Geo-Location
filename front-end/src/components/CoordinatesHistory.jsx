// src/component/CoordinateHistory.jsx

import React, { useEffect, useState } from "react";
import { useCoordinateContext } from "../context/CoordinateContext";
import "./CoordinatesHistory.css";
import axios from "axios";

const CoordinateHistory = () => {
    const { coordinates, timer, status } = useCoordinateContext();

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
