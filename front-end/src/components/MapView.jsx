import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "./MapView.css";

// Fix for missing default icon issue in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const Loader = () => {
    return (
        <div className="loader">
            <div className="spinner"></div>
            <p>Fetching your location...</p>
        </div>
    );
};

const MapView = ({ latitude, longitude }) => {
    return (
        <>
            {latitude && longitude ? (
                <MapContainer
                    className="map-view"
                    center={[latitude, longitude]}
                    zoom={15}
                    scrollWheelZoom={true}
                    style={{ height: "100%", width: "100%", borderRadius: "8px" }}
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker position={[latitude, longitude]}>
                        <Popup>
                            You are here: <br />
                            Lat: {latitude}, Lng: {longitude}
                        </Popup>
                    </Marker>
                </MapContainer>
            ) : (
                <Loader />
            )}
        </>
    );
};

export default MapView;
