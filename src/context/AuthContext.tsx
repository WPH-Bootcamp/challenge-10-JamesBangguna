'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';
import axios from 'axios';

const API_URL = 'https://be-restaurant-production.up.railway.app/api/auth';

interface User {
  id?: number;
  name: string;
  email: string;
  phone?: string;
  avatar: string | null;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string, userData?: User) => Promise<void>;
  logout: () => void;
  updateProfile: (updatedData: Partial<User>) => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Helper untuk menyimpan data dengan struktur objek bersarang (state) ke localStorage
  const saveToAuthStorage = (
    currentUser: User | null,
    currentToken: string | null
  ) => {
    const dataToPersist = {
      state: {
        user: currentUser,
        token: currentToken,
      },
      version: 0,
    };
    localStorage.setItem('auth-storage', JSON.stringify(dataToPersist));
  };

  // Fungsi logout: Membersihkan key 'auth-storage' dan mereset state global
  const logout = useCallback(() => {
    localStorage.removeItem('auth-storage');
    setToken(null);
    setUser(null);

    // Memicu custom event agar komponen lain mendeteksi perubahan status secara instan
    window.dispatchEvent(new Event('auth-change'));

    // Mengembalikan halaman ke Beranda awal (tampilan Sebelum Login)
    window.location.href = '/';
  }, []);

  // Fungsi mengambil profil member dari backend Railway
  const fetchProfile = useCallback(
    async (authToken: string) => {
      try {
        const response = await axios.get(`${API_URL}/profile`, {
          headers: { Authorization: `Bearer ${authToken}` },
        });

        const backendUser = response.data;

        // Ambil data lokal lama sebagai fallback jika diperlukan
        const authStorage = localStorage.getItem('auth-storage');
        let localUserData = null;
        if (authStorage) {
          const parsed = JSON.parse(authStorage);
          localUserData = parsed?.state?.user || null;
        }

        // KUNCI UTAMA: Gabungkan properti user dengan jaminan fallback nama dan avatar member
        const finalUser = {
          ...localUserData,
          ...backendUser,
          name: backendUser?.name || localUserData?.name || 'John Doe',
          // Jika backend tidak mengirim foto, pakai fallback gambar profil lokal default
          avatar:
            backendUser?.avatar || localUserData?.avatar || '/Rectangle.png',
        };

        setUser(finalUser);
        // Simpan pembaruan profil ke struktur storage lokal yang baru
        saveToAuthStorage(finalUser, authToken);
      } catch (error) {
        console.error('Gagal mengambil profile dari backend:', error);
        // Jika token kedaluwarsa (401/403 dari server), lakukan logout otomatis
        if (
          axios.isAxiosError(error) &&
          (error.response?.status === 401 || error.response?.status === 403)
        ) {
          logout();
        }
      } finally {
        setLoading(false);
      }
    },
    [logout]
  );

  // Inisialisasi Auth instan saat pertama kali client-side load menggunakan struktur objek bersarang
  useEffect(() => {
    const checkAuth = () => {
      const authStorage = localStorage.getItem('auth-storage');

      if (authStorage) {
        try {
          const parsed = JSON.parse(authStorage);

          if (parsed.state) {
            const storedToken = parsed.state.token || null;
            const savedUser = parsed.state.user || null;

            if (storedToken) {
              setToken(storedToken);
            }

            if (savedUser) {
              // Pastikan data lokal yang di-load juga memiliki fallback nama dan foto
              setUser({
                ...savedUser,
                name: savedUser.name || 'John Doe',
                avatar: savedUser.avatar || '/Rectangle.png',
              });
            }

            // Jika token ditemukan, sinkronkan data profil terbaru di latar belakang
            if (storedToken) {
              fetchProfile(storedToken);
              return; // Biarkan fetchProfile yang mengubah loading menjadi false setelah selesai
            }
          }
        } catch (e) {
          console.error('Gagal parsing auth-storage pada awal render:', e);
        }
      }

      // Matikan loading jika data tidak valid atau token tidak ditemukan
      setLoading(false);
    };

    checkAuth();
  }, [fetchProfile]);

  // Fungsi Login: Menerima token baru dan data user kustom dari form login
  const login = async (newToken: string, userData?: User) => {
    setToken(newToken);

    // KUNCI UTAMA: Langsung set data default prapendaftaran sesaat setelah klik login berhasil
    const completeUser: User = {
      name: userData?.name || 'John Doe',
      email: userData?.email || 'member@wph.com',
      phone: userData?.phone || '',
      avatar: userData?.avatar || '/Rectangle.png',
    };

    setUser(completeUser);

    // Tulis data ke localStorage dengan format bersarang agar sinkron saat halaman di-refresh
    saveToAuthStorage(completeUser, newToken);
    setLoading(false);

    // Ambil data profile terbaru dari API backend untuk sinkronisasi akhir
    await fetchProfile(newToken);

    // Kirim sinyal perubahan auth ke komponen yang mendengarkan event window
    window.dispatchEvent(new Event('auth-change'));
  };

  // Fungsi Update Profil: Menyimpan perubahan data ke database backend
  const updateProfile = async (updatedData: Partial<User>) => {
    if (!token) return;
    try {
      const response = await axios.put(`${API_URL}/profile`, updatedData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const mergedUser = {
        ...user,
        ...response.data,
      };

      setUser(mergedUser);
      saveToAuthStorage(mergedUser, token);
      window.dispatchEvent(new Event('auth-change'));
    } catch (error) {
      console.error('Gagal mengupdate profile:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, token, login, logout, updateProfile, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth harus digunakan di dalam AuthProvider');
  }
  return context;
}
