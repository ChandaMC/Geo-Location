import { useState, useEffect } from "react";
import axios from "axios";
import "./app.css";
import "./database"

const App = () => {
  const [position, setPosition] = useState({ latitude: null, longitude: null });

  // Function to get user position and update state 
  const updatePosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setPosition({ latitude, longitude });
          console.log(`Updated Position: Lat ${latitude}, Lon ${longitude}`);

          // Send position to backend server
          axios
            .post("http://localhost:5000/api/save-position", { latitude, longitude })
            .then((response) => console.log(response.data))
            .catch((error) => console.error("Error saving position:", error));
        },
        (error) => {
          console.error("Error getting position:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    // Update the position every 20 seconds
    const interval = setInterval(updatePosition, 20000);
    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, []);

  return (
    <div className="app">
      {/* Display current position in a form */}
      <form className="position-form">
        <h2>Current Position:</h2>
        <label>
          Latitude:
          <input type="text" value={position.latitude || ""} readOnly />
        </label><br></br>
        <br></br>
        <label>
          Longitude:
          <input type="text" value={position.longitude || ""} readOnly />
        </label>
      </form>
    </div>
  );
};

export default App;
