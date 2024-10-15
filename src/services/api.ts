import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:3001/',
    timeout: 3000,
    headers: {'X-Custom-Header': 'foobar'}
});

instance.interceptors.request.use((config) => {
    config.headers['token'] = localStorage.getItem('token');
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default instance;