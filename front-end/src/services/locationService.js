import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api' // Backend base URL
});

export const savePosition = (latitude, longitude) => {
    return api.post('/save-position', { latitude, longitude });
};
