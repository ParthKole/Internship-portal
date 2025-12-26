import axios from 'axios';

// Create an axios instance
const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Make sure this matches your backend port
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    // Check for tokens in localStorage (adjust keys based on your login logic)
    // We check for both student and company tokens
    const token = localStorage.getItem('studentToken') || localStorage.getItem('companyToken') || localStorage.getItem('token');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle auth errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // If server says 401 Unauthorized, log the user out
      // Optional: Redirect to login page
      // window.location.href = '/student/login'; 
      console.error('Session expired or unauthorized');
    }
    return Promise.reject(error);
  }
);

export default api;