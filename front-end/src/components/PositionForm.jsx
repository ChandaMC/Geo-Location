// src/components/PositionForm.jsx

import React from "react";
import { useCoordinateContext } from "../context/CoordinateContext";
import MapView from "./MapView";
require('./PositionForm.css');


const PositionForm = () => {
    const { position, status } = useCoordinateContext();

    return (
        <>
            {/*Pass latitude and longitude to MapView */}
            <MapView latitude={position.latitude} longitude={position.longitude} className="position-form"/>
        </>
    );
};

export default PositionForm;
