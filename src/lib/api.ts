import axios from 'axios';
import { useAuthStore } from '@/store/authStore';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || '/api/backend', // Use the proxy to avoid CORS issues
});

// Request interceptor to add token
api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}${config.params ? '?' + new URLSearchParams(config.params).toString() : ''} [Token present]`);
    } else {
      console.warn(`API Request: ${config.method?.toUpperCase()} ${config.url}${config.params ? '?' + new URLSearchParams(config.params).toString() : ''} [Token MISSING]`);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Special case for update if it really is localhost (as per prompt)
// However, it's safer to use a configurable base URL.
// The user prompt specifically mentioned different URLs.
// I'll add a helper or just use absolute URLs in the service if needed.

export default api;
