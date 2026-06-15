import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// 1. interface khusus untuk User menggantikan tipe 'any'
interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role?: string;
}

// interface User ke dalam AuthState
interface AuthState {
  user: User | null; // User bisa berupa data objek atau null saat belum login
  token: string | null;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      // State Awal (Initial State)
      user: null,
      token: null,

      // Aksi untuk menyimpan data setelah berhasil login
      setAuth: (user, token) =>
        set({
          user,
          token,
        }),

      // Aksi untuk menghapus data saat user logout
      logout: () =>
        set({
          user: null,
          token: null,
        }),
    }),
    {
      name: 'auth-storage', // Nama key di Local Storage
    }
  )
);
