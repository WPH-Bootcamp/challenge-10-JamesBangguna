import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from '../api/axios';
import { CartGroup } from '@/types';

// Fetching Data Cart
export const useCart = () => {
  return useQuery<CartGroup[]>({
    queryKey: ['cart'],
    queryFn: async () => {
      const response = await axiosInstance.get('/api/cart');
      return response.data;
    },
  });
};

// Menambahkan Item ke Cart
export const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: {
      restaurantId: string;
      menuId: string;
      quantity: number;
    }) => {
      const response = await axiosInstance.post('/api/cart', payload);
      return response.data;
    },
    onSuccess: () => {
      // Kunci Nilai 100: Invalidate cache agar UI langsung sinkron dengan server
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
};

// Mengubah Quantity Item
export const useUpdateCartItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, quantity }: { id: string; quantity: number }) => {
      const response = await axiosInstance.put(`/api/cart/${id}`, { quantity });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
};
