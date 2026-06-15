'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';
import axios from 'axios';

import { loginSchema, LoginSchema } from '@/lib/validations/login-schema';
import { useAuth } from '@/context/AuthContext';

export default function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Inisialisasi React Hook Form dengan Zod Validator
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: 'onSubmit',
  });

  // Handler Submit hasil penggabungan fungsionalitas API dan State Management Global
  const onSubmit = async (values: LoginSchema) => {
    setErrorMsg('');
    setIsSubmitting(true);

    try {
      // 1. Kirim data formulir tervalidasi langsung ke API Backend asli di Railway
      const response = await axios.post(
        'https://be-restaurant-production.up.railway.app/api/auth/login',
        {
          email: values.email,
          password: values.password,
        }
      );

      // 2. Ambil token dari respons sukses API
      const token =
        response.data.token ||
        response.data.accessToken ||
        response.data.data?.token ||
        response.data.data?.accessToken;

      if (token) {
        // 3. Susun data member (Gunakan data backend, pasang fallback jika properti kosong)
        const userMember = {
          id: response.data.user?.id,
          name: response.data.user?.name || 'John Doe',
          email: response.data.user?.email || values.email,
          phone: response.data.user?.phone || '',
          avatar: response.data.user?.avatar || '/Jhon doe.png',
        };

        // 4. PANGGIL FUNGSI LOGIN DARI useAuth() agar tersimpan ke auth-storage di LocalStorage
        await login(token, userMember);

        // Redirect ke halaman utama secara instan dengan state yang sudah terisi
        router.push('/');
      } else {
        setErrorMsg('Token tidak ditemukan dari respon server backend.');
      }
    } catch (error: unknown) {
      console.error('Login failed:', error);

      if (axios.isAxiosError(error)) {
        const serverMessage = error.response?.data?.message;
        setErrorMsg(
          serverMessage || 'Email atau password salah! Silakan periksa kembali.'
        );
      } else {
        setErrorMsg(
          'Terjadi kesalahan jaringan. Silakan coba beberapa saat lagi.'
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='flex min-h-screen w-full items-stretch justify-center bg-white'>
      {/* ================= SISI KIRI: GAMBAR PRESENTASI (50% Layar Desktop) ================= */}
      <div className='relative hidden w-1/2 bg-amber-950 lg:block'>
        <Image
          src='/Frame.png'
          alt='Foody Burger Presentation'
          fill
          sizes='50vw'
          className='object-cover object-center'
          priority
        />
      </div>

      {/* ================= SISI KANUAN: KONTEN UTAMA FORM ================= */}
      <div className='flex w-full flex-col justify-center px-8 py-12 sm:px-16 md:px-24 lg:w-1/2 xl:px-32'>
        <div className='mx-auto w-full max-w-md space-y-8'>
          {/* Identitas Brand (Logo & Nama) */}
          <div className='flex items-center gap-3'>
            <div className='relative h-9 w-9'>
              <Image
                src='/Logo-Login.png'
                alt='Foody Logo'
                fill
                className='object-contain'
              />
            </div>
            <span className='text-2xl font-bold tracking-tight text-gray-900'>
              Foody
            </span>
          </div>

          {/* Judul Teks Heading */}
          <div>
            <h2 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
              Welcome Back
            </h2>
            <p className='mt-2 text-sm text-gray-500'>
              Good to see you again! Let&apos;s eat
            </p>
          </div>

          {/* Toggle Pilihan Tab Sign In / Sign Up */}
          <div className='flex rounded-xl bg-gray-100 p-1.5'>
            <Link
              href='/login'
              className='flex-1 rounded-lg bg-white py-2.5 text-center text-sm font-semibold text-gray-900 shadow-sm'
            >
              Sign in
            </Link>
            <Link
              href='/register'
              className='flex-1 py-2.5 text-center text-sm font-medium text-gray-400 hover:text-gray-900 transition-colors'
            >
              Sign up
            </Link>
          </div>

          {/* Tampilan Pesan Error Alert jika API Backend Menolak Login */}
          {errorMsg && (
            <div className='p-4 bg-red-50 text-red-600 text-xs font-semibold rounded-xl border border-red-100 shadow-sm animate-pulse'>
              {errorMsg}
            </div>
          )}

          {/* Area Input Data Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='space-y-4'
            noValidate
          >
            {/* Input: Email */}
            <div className='space-y-1.5'>
              <input
                type='email'
                placeholder='Email'
                {...register('email')}
                disabled={isSubmitting}
                className={`w-full rounded-xl border p-4 text-sm transition outline-none focus:ring-2 text-gray-800 bg-white ${
                  errors.email
                    ? 'border-red-600 focus:ring-red-100 bg-red-50/10'
                    : 'border-gray-200 focus:border-gray-400 focus:ring-gray-100'
                }`}
              />
              {errors.email && (
                <p className='text-xs font-medium text-red-600 pl-1'>
                  {errors.email.message || 'Format penulisan email salah.'}
                </p>
              )}
            </div>

            {/* Input: Password */}
            <div className='space-y-1.5'>
              <div className='relative'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder='Password'
                  {...register('password')}
                  disabled={isSubmitting}
                  className={`w-full rounded-xl border p-4 pr-12 text-sm transition outline-none focus:ring-2 text-gray-800 bg-white ${
                    errors.password
                      ? 'border-red-600 focus:ring-red-100 bg-red-50/10'
                      : 'border-gray-200 focus:border-gray-400 focus:ring-gray-100'
                  }`}
                />
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition-colors'
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className='text-xs font-medium text-red-600 pl-1'>
                  {errors.password.message || 'Wajib memasukkan password.'}
                </p>
              )}
            </div>

            {/* Checkbox: Remember Me */}
            <div className='pt-1'>
              <label className='flex items-center gap-2.5 text-sm font-medium text-gray-600 cursor-pointer select-none'>
                <input
                  type='checkbox'
                  disabled={isSubmitting}
                  className='h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500 accent-red-700 cursor-pointer'
                />
                Remember Me
              </label>
            </div>

            {/* Tombol Eksekusi Submit Login */}
            <div className='pt-3'>
              <button
                type='submit'
                disabled={isSubmitting}
                className='w-full rounded-xl bg-red-700 py-3.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-red-800 active:scale-[0.99] disabled:pointer-events-none disabled:opacity-50 flex items-center justify-center'
              >
                {isSubmitting ? 'Signing in...' : 'Login'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
