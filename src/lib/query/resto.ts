import { useQuery } from '@tanstack/react-query';
import { restoApi } from '../api/resto';

export const useRestaurants = () => {
  return useQuery({
    queryKey: ['restaurants'],
    queryFn: restoApi.getRestaurants,
  });
};

export const useRestaurantDetail = (id: string) => {
  return useQuery({
    queryKey: ['restaurant', id],
    queryFn: () => restoApi.getRestaurantDetail(id),
    enabled: !!id,
  });
};
