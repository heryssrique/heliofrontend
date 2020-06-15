  
import axios from 'axios';

const api = axios.create({
    baseURL: 'https://helioagendabackend.herokuapp.com'
});

export default api;
