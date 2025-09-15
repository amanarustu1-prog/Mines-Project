import axios from "axios";

// Create a custom axios instance with default config
const api = axios.create({
  baseURL: 'https://api.crushererp.com',
  // timeout: 10000, // 10 seconds
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const access_token = localStorage.getItem('token');
    if (access_token) {
      config.headers.Authorization = `Bearer ${access_token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Handle different status codes
      if (error.response.status === 401) {
        // Handle unauthorized access
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;