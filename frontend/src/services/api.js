/**
 * API Service
 * Centralized Axios instance with auth interceptors.
 */
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

/**
 * Request interceptor to inject JWT token into headers.
 * Request interceptor to inject JWT token into headers.
 * Ensures all API calls are authenticated if a token exists.
 * Manually attach 'x-auth-token' for backend compatibility.
 */
api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['x-auth-token'] = token;
    }
    return config;
});

export default api;
