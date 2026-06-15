import { axiosInstance } from './axios';
import { Restaurant, MenuItem } from '@/types';

export const restoApi = {
  getRestaurants: async (): Promise<Restaurant[]> => {
    const { data } = await axiosInstance.get('/restaurants');
    return data;
  },
  getRestaurantDetail: async (
    id: string
  ): Promise<Restaurant & { menu: MenuItem[] }> => {
    const { data } = await axiosInstance.get(`/restaurants/${id}`);
    return data;
  },
};
