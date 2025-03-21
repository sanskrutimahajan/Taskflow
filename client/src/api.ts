// src/api.ts
import axios from 'axios';

// Create an Axios instance with the base URL of your API
const api = axios.create({
  baseURL: 'http://localhost:5005', // Update this if your API is running on a different port or domain
});

// Optionally, you can add interceptors to handle tokens, errors, etc.
api.interceptors.request.use((config) => {
  // Add token from localStorage if available
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
