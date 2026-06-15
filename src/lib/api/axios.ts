import axios from 'axios';

// Membuat instance Axios dengan nama axiosInstance agar sinkron dengan file auth.ts
export const axiosInstance = axios.create({
  // Base URL backend aplikasi restoran Foody di Railway
  baseURL: 'https://be-restaurant-production.up.railway.app/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Tambahkan Request Interceptor (Opsional namun sangat disarankan)
// Ini berguna agar setiap kali kamu menembak API, token dari local storage otomatis terlampir
axiosInstance.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      // Mengambil data token dari auth-storage milik Zustand
      const storage = localStorage.getItem('auth-storage');
      if (storage) {
        const parsed = JSON.parse(storage);
        const token = parsed?.state?.token;
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
