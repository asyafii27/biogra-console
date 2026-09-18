import axios from 'axios';

// Mengambil dari .env, atau gunakan fallback default
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8081/api';

export const API_ROUTES = {
  EXPERIENCES: '/experiences',
  AWARDEES: '/awardees',
  ORGANIZATIONS: '/organizations',
  SKILLS: '/skills',
  TECHNICAL_EXPERIENCES: '/technical-experiences',
};

// Buat instance axios terpusat agar bisa digunakan di semua halaman
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Menambahkan token JWT jika ada (seperti pada api.ts sebelumnya)
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
