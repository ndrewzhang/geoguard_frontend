import axios from 'axios';
import type { AxiosInstance } from 'axios';

// Configure the base API URL - adjust this to match your backend API
const API_BASE_URL = 'http://localhost:3000/api';

// Create axios instance with default config
const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// API Service object with all endpoints
export const apiService = {
  // Fetch 1: Get all locations (example endpoint for home page data)
  getLocations: async () => {
    try {
      const response = await api.get('/locations');
      return response.data;
    } catch (error) {
      console.error('Error fetching locations:', error);
      throw error;
    }
  },

  // Fetch 2: Get location statistics/analytics (for data dashboard)
  getLocationStats: async () => {
    try {
      const response = await api.get('/locations/stats');
      return response.data;
    } catch (error) {
      console.error('Error fetching location stats:', error);
      throw error;
    }
  },

  // Fetch 3: Get security incidents data (for data dashboard visualization)
  getSecurityIncidents: async () => {
    try {
      const response = await api.get('/incidents');
      return response.data;
    } catch (error) {
      console.error('Error fetching security incidents:', error);
      throw error;
    }
  },

  // Additional fetch for detailed location information
  getLocationById: async (id: string) => {
    try {
      const response = await api.get(`/locations/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching location with id ${id}:`, error);
      throw error;
    }
  },

  // Fetch for carousel/images
  getLocationImages: async () => {
    try {
      const response = await api.get('/locations/images');
      return response.data;
    } catch (error) {
      console.error('Error fetching location images:', error);
      throw error;
    }
  },

  // Fetch URL info from backend
  getUrlInfo: async (url: string) => {
    try {
      const response = await api.get('/info', {
        params: {
          url: url,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching URL info:', error);
      throw error;
    }
  },
};

export default api;
