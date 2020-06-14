  
import axios from 'axios';

const api = axios.create({
    baseURL: 'https://heliotarefasbackend.herokuapp.com'
});

export default api;
