import { useMutation } from '@tanstack/react-query';

// PERBAIKAN: Menghapus import loginSchema dan 'z' yang tidak digunakan untuk membersihkan warning ESLint
import { login, LoginPayload } from '@/lib/api/auth';

export const useLogin = () => {
  return useMutation({
    // Menghubungkan React Query Mutation langsung dengan fungsi API Auth
    mutationFn: async (values: LoginPayload) => {
      const data = await login(values);
      return data;
    },
  });
};
