  
import axios from 'axios';

const api = axios.create({
    baseURL: 'https://rosanatarefas-backend.herokuapp.com'
});

export default api;