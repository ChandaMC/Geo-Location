# Geo-Location Tracking

This project is a web application that tracks the user's geographical location and saves it to a MySQL database. It consists of a frontend built with React and a backend powered by Node.js and Express.

## Getting Started

To get a copy of the project up and running on your local machine for development and testing purposes, follow these instructions.

### Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/)
- [MySQL](https://www.mysql.com/)

### Clone the Repository

Clone this repository to your local machine:

```bash
git clone https://github.com/yourusername/geo-location.git


Installation
Backend
Navigate to the backend directory:

bash
Copy code
cd geo-location/back-end
Install the required Node.js packages:

bash
Copy code
npm install
Set up your MySQL database:

Start your MySQL server.

Create a database and a table for storing positions with the following SQL commands:

sql
Copy code
CREATE DATABASE geo_location;

USE geo_location;

CREATE TABLE positions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
Frontend
Navigate to the frontend directory:

bash
Copy code
cd geo-location/front-end
Install the required React packages:

bash
Copy code
npm install
Running the Project
Start the Backend Server
Navigate to the backend directory:

bash
Copy code
cd geo-location/back-end
Start the Node.js server:

bash
Copy code
npm start
The backend server will run on http://localhost:5000.

Start the Frontend Application
Open a new terminal window or tab.

Navigate to the frontend directory:

bash
Copy code
cd geo-location/front-end
Start the React application:

bash
Copy code
npm start
The frontend will be accessible at http://localhost:3000.

Available Scripts
In the frontend project directory, you can run:

npm start
Runs the app in the development mode.
Open http://localhost:3000 to view it in your browser.
The page will reload when you make changes. You may also see any lint errors in the console.

npm test
Launches the test runner in the interactive watch mode.
See the section about running tests for more information.

npm run build
Builds the app for production to the build folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified, and the filenames include the hashes.
Your app is ready to be deployed! See the section about deployment for more information.

npm run eject
Note: this is a one-way operation. Once you eject, you can't go back!

If you aren't satisfied with the build tool and configuration choices, you can eject at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc.) right into your project so you have full control over them. All of the commands except eject will still work, but they will point to the copied scripts so you can tweak them. At this point, you're on your own.

You don't have to ever use eject. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature.

How It Works
The React app fetches the user's current geolocation using the browser's Geolocation API and sends the data to the backend every 20 seconds.
The Express server listens for incoming data on the /api/save-position endpoint and saves the latitude and longitude to the MySQL database.
API Endpoints
POST /api/save-position
Description: Saves the latitude and longitude to the database.

Request Body:

json
Copy code
{
    "latitude": -15.4042368,
    "longitude": 28.3148288
}
Response:

Success:
json
Copy code
{
    "message": "Position saved successfully!"
}
Error:
json
Copy code
{
    "message": "Failed to save position",
    "error": "Error details"
}
Contributing
Contributions are welcome! Feel free to submit a pull request or create an issue for any suggestions or improvements.

License
This project is licensed under the MIT License - see the LICENSE file for details.

markdown
Copy code

### Instructions to Create the README

1. Create a file named `README.md` in the root of your project.
2. Copy the above content and paste it into the `README.md` file.
3. Save the file.

This README includes all relevant information and is formatted to follow GitHub standards. Let me know if you need any further modifications or additions!





