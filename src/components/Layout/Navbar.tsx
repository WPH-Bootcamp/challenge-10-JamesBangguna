'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, ClipboardList, LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
  // Ambil state data user dan fungsi logout langsung dari context global (Reaktif Otomatis)
  const { user: currentUser, logout } = useAuth();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Efek mendeteksi scrolling halaman untuk mengubah style navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Efek untuk menutup dropdown saat klik di luar area menu
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fungsi jembatan untuk mengeksekusi logout
  const handleLogoutClick = () => {
    setIsMenuOpen(false);
    if (logout) {
      logout();
    } else {
      // Fallback jika tidak menggunakan Context Auth di halaman tertentu
      localStorage.removeItem('authToken');
      window.dispatchEvent(new Event('auth-change'));
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 w-full px-4 py-4 md:px-10 lg:px-20 transition-all duration-300 ${
        isScrolled
          ? 'bg-white shadow-md border-b border-gray-100'
          : 'bg-transparent'
      }`}
    >
      <div className='mx-auto flex max-w-7xl items-center justify-between'>
        {/* SISI KIRI: LOGO FOODY */}
        <Link href='/' className='flex items-center gap-2 select-none'>
          <Image
            src={isScrolled ? '/Logo-Login.png' : '/Logo.png'}
            alt='Foody Logo'
            width={36}
            height={36}
            priority
          />
          <span
            className={`text-2xl font-bold tracking-wide transition-colors duration-300 ${
              isScrolled ? 'text-gray-900' : 'text-white'
            }`}
          >
            Foody
          </span>
        </Link>

        {/* SISI KANAN: KONDISIONAL PROFIL USER ATAU SIGN IN & SIGN UP */}
        <div className='flex items-center gap-4 md:gap-6'>
          {/* Tombol/Ikon Keranjang Belanja */}
          <button
            type='button'
            className='relative p-1 transition transform active:scale-[0.97]'
            onClick={() => alert('Membuka Keranjang Belanja')}
          >
            <Image
              src='/Bag-2.png'
              alt='Cart'
              width={24}
              height={24}
              className={`transition-all duration-300 ${
                isScrolled ? 'invert-0' : 'invert'
              }`}
            />
            {/* Hanya muncul angka jika user sudah login */}
            {currentUser && (
              <span className='absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white animate-in scale-in duration-200'>
                1
              </span>
            )}
          </button>

          {/* Pengkondisian Autentikasi berdasarkan Global State AuthContext */}
          {currentUser ? (
            /* JIKA USER SUDAH LOGIN: TAMPILKAN AVATAR DAN MENU DROPDOWN */
            <div className='relative' ref={dropdownRef}>
              <button
                type='button'
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`flex items-center gap-2 rounded-full border p-0.5 outline-none transition duration-300 focus:ring-2 focus:ring-red-500 ${
                  isScrolled
                    ? 'border-gray-200'
                    : 'border-white/20 hover:border-white/60'
                }`}
              >
                <div className='flex items-center gap-2'>
                  <div className='relative h-8 w-8 overflow-hidden rounded-full bg-gray-100'>
                    <Image
                      src={currentUser.avatar || '/Jhon doe.png'}
                      alt={currentUser.name}
                      fill
                      className='object-cover'
                    />
                  </div>
                  <span
                    className={`hidden text-sm font-semibold md:block pr-1 select-none transition-colors duration-300 ${
                      isScrolled ? 'text-black' : 'text-white'
                    }`}
                  >
                    {currentUser.name || 'John Doe'}
                  </span>
                </div>
              </button>

              {/* TAMPILKAN MENU DROPDOWN (MUNCUL JIKA SELEKTOR ACTIVE) */}
              {isMenuOpen && (
                <div className='absolute right-0 mt-3 w-64 origin-top-right rounded-2xl bg-white p-4 shadow-2xl ring-1 ring-black/5 transition-all duration-200 animate-in fade-in slide-in-from-top-2'>
                  {/* Header Dropdown */}
                  <div className='flex items-center gap-3 border-b border-gray-100 pb-3 mb-2'>
                    <div className='relative h-10 w-10 overflow-hidden rounded-full bg-gray-100'>
                      <Image
                        src={currentUser.avatar || '/Jhon doe.png'}
                        alt='Inner Profile Avatar'
                        fill
                        className='object-cover'
                      />
                    </div>
                    <div className='text-left'>
                      <p className='text-sm font-bold text-gray-900 w-36 truncate'>
                        {currentUser.name || 'John Doe'}
                      </p>
                      <p className='text-xs text-gray-400 font-medium'>
                        Customer
                      </p>
                    </div>
                  </div>

                  {/* List Opsi Menu Dropdown */}
                  <div className='space-y-1'>
                    <Link
                      href='/profile'
                      onClick={() => setIsMenuOpen(false)}
                      className='flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-gray-700 hover:bg-gray-50 active:bg-gray-100 transition'
                    >
                      <MapPin size={18} className='text-gray-500' />
                      <span>Delivery Address</span>
                    </Link>

                    <Link
                      href='/orders'
                      onClick={() => setIsMenuOpen(false)}
                      className='flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-gray-700 hover:bg-gray-50 active:bg-gray-100 transition'
                    >
                      <ClipboardList size={18} className='text-gray-500' />
                      <span>My Orders</span>
                    </Link>

                    <hr className='my-1 border-gray-100' />

                    {/* TOMBOL LOGOUT UTAMA */}
                    <button
                      type='button'
                      onClick={handleLogoutClick}
                      className='flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-red-600 hover:bg-red-50/50 active:bg-red-50 transition'
                    >
                      <LogOut size={18} className='text-red-500' />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* JIKA BELUM LOGIN: TAMPILKAN TOMBOL SIGN IN & SIGN UP */
            <div className='flex items-center gap-3 animate-in fade-in duration-300'>
              <Link
                href='/login'
                className='px-5 py-2 rounded-xl text-sm font-semibold transition border border-transparent text-gray-700 hover:bg-gray-50'
                style={{
                  color: isScrolled ? '#DC2626' : '#FFFFFF',
                  borderColor: isScrolled ? '#DC2626' : '#FFFFFF',
                }}
              >
                Sign In
              </Link>
              <Link
                href='/register'
                className={`px-5 py-2 rounded-xl text-sm font-semibold transition shadow-sm ${
                  isScrolled
                    ? 'bg-red-600 text-white hover:bg-red-700'
                    : 'bg-white text-black hover:bg-gray-100'
                }`}
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
