import axios from 'axios';
import type { Biography, BiographyCreateInput, BiographyUpdateInput } from '../types/biography';

// Default to localhost:8080 if not specified
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

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
