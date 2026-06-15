import { axiosInstance } from './axios';
import { User } from '@/types';

export const getProfile = async (): Promise<User> => {
  const response = await axiosInstance.get('/api/auth/profile');
  return response.data;
};

export const updateProfile = async (data: Partial<User>): Promise<User> => {
  const response = await axiosInstance.put('/api/auth/profile', data);
  return response.data;
};
