import axios from 'axios';
import type { Biography, BiographyCreateInput, BiographyUpdateInput } from '../types/biography';

// Default to localhost:8081 if not specified
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8081/api';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to attach the JWT token to all requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const AuthService = {
  login: async (data: any) => {
    const response = await apiClient.post('/auth/login', data);
    // Backend API wraps data in `data` object: { code: 200, data: { token: "..." } }
    if (response.data?.data?.token) {
      localStorage.setItem('token', response.data.data.token);
    } else if (response.data?.token) {
      localStorage.setItem('token', response.data.token); // fallback
    }
    return response.data;
  },
  register: async (data: any) => {
    const response = await apiClient.post('/auth/register', data);
    return response.data;
  },
  logout: () => {
    localStorage.removeItem('token');
  }
};

export const BiographyService = {
  getAll: async (search?: string) => {
    const response = await apiClient.get<Biography[]>('/biographies', {
      params: { search },
    });
    return response.data;
  },

  getById: async (id: number) => {
    const response = await apiClient.get<Biography>(`/biographies/${id}`);
    return response.data;
  },

  create: async (data: BiographyCreateInput) => {
    const response = await apiClient.post<Biography>('/biographies', data);
    return response.data;
  },

  update: async (id: number, data: BiographyUpdateInput) => {
    const response = await apiClient.put<Biography>(`/biographies/${id}`, data);
    return response.data;
  },

  delete: async (id: number) => {
    const response = await apiClient.delete(`/biographies/${id}`);
    return response.data;
  },
};
