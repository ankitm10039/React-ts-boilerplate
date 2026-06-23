import axios from 'axios';

// Create an Axios instance with pre-configured settings
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://api.example.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Request Interceptor: For adding Auth tokens or modifying requests before sending
axiosInstance.interceptors.request.use(
  (config) => {
    // Example: Add Authorization header if a token exists in localStorage
    const token = localStorage.getItem('auth_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: For handling errors globally or refreshing tokens
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Global error handling
    if (error.response) {
      // Server responded with a status other than 2xx
      switch (error.response.status) {
        case 401:
          // Unauthorized - e.g. Redirect to login, clean localStorage, etc.
          console.error('Unauthorized access - Redirecting to login...');
          break;
        case 403:
          console.error('Forbidden - You do not have permission to access this resource.');
          break;
        case 404:
          console.error('Resource not found.');
          break;
        case 500:
          console.error('Internal server error. Please try again later.');
          break;
        default:
          console.error(`Error: ${error.response.statusText}`);
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Network error - No response received from server.');
    } else {
      // Something happened in setting up the request
      console.error('Error setting up request:', error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
