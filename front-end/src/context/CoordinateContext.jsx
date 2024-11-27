// src/context/CoordinateContext.jsx

import axios from "axios";
import { createContext, useContext, useEffect,useState } from "react";

const CoordinateContext = createContext();

export const CoordinateProvider = ({ children }) => {
    const [coordinates, setCoordinates] = useState([]);
    const [position, setPosition] = useState({ latitude: null, longitude: null });
    const [timer, setTimer] = useState(25);
    const [status, setStatus] = useState("Waiting for new connection...");

    const fetchCoordinates = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/coordinates");
            setCoordinates(response.data);
            setStatus("Coordinates Updated!"); // Show updated status
            setTimeout(() => setStatus("Waiting for new coordinates..."), 5000)
        } catch (error) {
            console.error("Error fetching coordinates history:", error);
            setStatus("Error fetching coordinates history!"); // Show error status
        }
    };

    const updatePosition = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const { latitude, longitude } = pos.coords;
                    setPosition({ latitude, longitude });
                    setStatus("Position updated!");

                    // Send position to backend
                    axios
                        .post("http://localhost:5000/api/save-position", { latitude, longitude })
                        .then(() => setStatus("Position saved successfully!"))
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
        setStatus("Geolocation not supported by your browser.");
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer((prevTimer) => {
                if (prevTimer <= 1) {
                    fetchCoordinates();
                    updatePosition(); // fetch new position and send to backend
                    setTimer(20); // reset timer to 20 seconds
                }
                return prevTimer - 1; // decrement timer by 1 second each second
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <CoordinateContext.Provider
            value={{coordinates, position, timer, status, updatePosition}}
        >
            {children}
        </CoordinateContext.Provider>
    );
};

export const useCoordinateContext = () => useContext(CoordinateContext);