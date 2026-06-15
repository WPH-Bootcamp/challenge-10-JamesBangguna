// PERBAIKAN: Gunakan kurung kurawal sesuai saran petunjuk compiler TypeScript
import { axiosInstance } from './axios';

// 1. Definisikan Interface Kontrak Payload Data API
export interface RegisterPayload {
  name: string;
  email: string;
  phone: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

// 2. Fungsi Register
export const register = async (data: RegisterPayload) => {
  const response = await axiosInstance.post('/auth/register', data);
  return response.data;
};

// 3. Fungsi Login
export const login = async (data: LoginPayload) => {
  const response = await axiosInstance.post('/auth/login', data);
  return response.data;
};
