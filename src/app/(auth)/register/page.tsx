'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import { Eye, EyeOff } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  // State Form Utama
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  // State untuk manajemen validasi error per field
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  // State untuk visibilitas password
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset pesan error sebelum validasi dijalankan
    const newErrors = {
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
    };
    let hasError = false;

    if (!form.name.trim()) {
      newErrors.name = 'Error Text Helper';
      hasError = true;
    }
    if (!form.email.trim()) {
      newErrors.email = 'Error Text Helper';
      hasError = true;
    }
    if (!form.phone.trim()) {
      newErrors.phone = 'Error Text Helper';
      hasError = true;
    }
    if (!form.password) {
      newErrors.password = 'Error Text Helper';
      hasError = true;
    }
    if (!form.confirmPassword) {
      newErrors.confirmPassword = 'Error Text Helper';
      hasError = true;
    }

    // Validasi tambahan: kecocokan password dan konfirmasi password
    if (
      form.password &&
      form.confirmPassword &&
      form.password !== form.confirmPassword
    ) {
      newErrors.confirmPassword = 'Passwords do not match';
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    try {
      setIsPending(true);

      // Mengirimkan data pendaftaran langsung ke endpoint backend
      const response = await axios.post(
        'https://be-restaurant-production.up.railway.app/api/auth/register',
        {
          name: form.name,
          email: form.email,
          phone: form.phone,
          password: form.password,
        }
      );

      console.log('Register Success:', response.data);
      alert('Register Berhasil! Silakan login.');
      router.push('/login');
    } catch (error: unknown) {
      console.error('Register Error:', error);

      if (axios.isAxiosError(error) && error.response?.status === 409) {
        alert('Email atau nomor telepon sudah terdaftar!');
      } else {
        alert('Register gagal. Silakan coba kembali.');
      }
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className='flex min-h-screen w-full bg-white select-none'>
      {/* SISI KIRI: GAMBAR HERO */}
      <div className='relative hidden w-1/2 bg-amber-950 md:block'>
        <Image
          src='/Frame.png'
          alt='Delicious Burger Background'
          fill
          className='object-cover opacity-90'
          priority
        />
      </div>

      {/* SISI KANAN: FORM REGISTRASI */}
      <div className='flex w-full flex-col justify-center px-6 py-12 md:w-1/2 lg:px-20 xl:px-32'>
        <div className='mx-auto w-full max-w-md space-y-7'>
          {/* Header Konten Form (Sesuai Gambar Mockup) */}
          <div className='space-y-2 text-left'>
            <div className='flex items-center gap-2 mb-2'>
              <Image
                src='/Logo-Login.png'
                alt='Foody Logo Red'
                width={32}
                height={32}
              />
              <span className='text-xl font-bold text-gray-900'>Foody</span>
            </div>
            <h1 className='text-2xl font-bold text-gray-900 tracking-tight'>
              Welcome Back
            </h1>
            <p className='text-sm text-gray-400'>
              Good to see you again! Let&apos;s eat
            </p>
          </div>

          {/* Toggle Tab Antara Sign In dan Sign Up */}
          <div className='grid w-full grid-cols-2 rounded-xl bg-gray-100 p-1'>
            <Link href='/login' className='w-full'>
              <button
                type='button'
                className='w-full py-2.5 text-xs font-bold text-gray-400 rounded-lg transition'
              >
                Sign in
              </button>
            </Link>
            <button
              type='button'
              className='w-full py-2.5 text-xs font-bold text-gray-800 bg-white rounded-lg shadow-sm transition'
            >
              Sign up
            </button>
          </div>

          {/* Form Utama */}
          <form onSubmit={handleSubmit} className='space-y-4' noValidate>
            {/* Input Name */}
            <div className='space-y-1'>
              <input
                type='text'
                placeholder='Name'
                className={`w-full h-12 rounded-xl border px-4 text-sm outline-none transition-all placeholder:text-gray-400 ${
                  errors.name
                    ? 'border-red-500 bg-white focus:border-red-500'
                    : 'border-gray-200 focus:border-red-600'
                }`}
                value={form.name}
                onChange={(e) => {
                  setForm({ ...form, name: e.target.value });
                  if (errors.name) setErrors({ ...errors, name: '' });
                }}
              />
              {errors.name && (
                <p className='text-xs font-medium text-red-500 pl-1'>
                  {errors.name}
                </p>
              )}
            </div>

            {/* Input Email */}
            <div className='space-y-1'>
              <input
                type='email'
                placeholder='Email'
                className={`w-full h-12 rounded-xl border px-4 text-sm outline-none transition-all placeholder:text-gray-400 ${
                  errors.email
                    ? 'border-red-500 bg-white focus:border-red-500'
                    : 'border-gray-200 focus:border-red-600'
                }`}
                value={form.email}
                onChange={(e) => {
                  setForm({ ...form, email: e.target.value });
                  if (errors.email) setErrors({ ...errors, email: '' });
                }}
              />
              {errors.email && (
                <p className='text-xs font-medium text-red-500 pl-1'>
                  {errors.email}
                </p>
              )}
            </div>

            {/* Input Number Phone */}
            <div className='space-y-1'>
              <input
                type='text'
                placeholder='Number Phone'
                className={`w-full h-12 rounded-xl border px-4 text-sm outline-none transition-all placeholder:text-gray-400 ${
                  errors.phone
                    ? 'border-red-500 bg-white focus:border-red-500'
                    : 'border-gray-200 focus:border-red-600'
                }`}
                value={form.phone}
                onChange={(e) => {
                  setForm({ ...form, phone: e.target.value });
                  if (errors.phone) setErrors({ ...errors, phone: '' });
                }}
              />
              {errors.phone && (
                <p className='text-xs font-medium text-red-500 pl-1'>
                  {errors.phone}
                </p>
              )}
            </div>

            {/* Input Password */}
            <div className='space-y-1'>
              <div className='relative'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder='Password'
                  className={`w-full h-12 rounded-xl border pl-4 pr-11 text-sm outline-none transition-all placeholder:text-gray-400 ${
                    errors.password
                      ? 'border-red-500 bg-white focus:border-red-500'
                      : 'border-gray-200 focus:border-red-600'
                  }`}
                  value={form.password}
                  onChange={(e) => {
                    setForm({ ...form, password: e.target.value });
                    if (errors.password) setErrors({ ...errors, password: '' });
                  }}
                />
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600'
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && (
                <p className='text-xs font-medium text-red-500 pl-1'>
                  {errors.password}
                </p>
              )}
            </div>

            {/* Input Confirm Password */}
            <div className='space-y-1'>
              <div className='relative'>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder='Confirm Password'
                  className={`w-full h-12 rounded-xl border pl-4 pr-11 text-sm outline-none transition-all placeholder:text-gray-400 ${
                    errors.confirmPassword
                      ? 'border-red-500 bg-white focus:border-red-500'
                      : 'border-gray-200 focus:border-red-600'
                  }`}
                  value={form.confirmPassword}
                  onChange={(e) => {
                    setForm({ ...form, confirmPassword: e.target.value });
                    if (errors.confirmPassword)
                      setErrors({ ...errors, confirmPassword: '' });
                  }}
                />
                <button
                  type='button'
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600'
                >
                  {showConfirmPassword ? (
                    <EyeOff size={16} />
                  ) : (
                    <Eye size={16} />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className='text-xs font-medium text-red-500 pl-1'>
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Tombol Submit Registrasi */}
            <div className='pt-2'>
              <button
                type='submit'
                disabled={isPending}
                className='w-full h-12 rounded-xl bg-red-600 font-bold text-sm text-white shadow-lg shadow-red-600/10 hover:bg-red-700 active:scale-[0.99] transition disabled:opacity-50'
              >
                {isPending ? 'Processing...' : 'Register'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
