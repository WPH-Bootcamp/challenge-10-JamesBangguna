'use client';

import { useState } from 'react';
import Image from 'next/image';
import { MapPin, ShoppingBag, LogOut } from 'lucide-react';
import Navbar from '@/components/Layout/Navbar';
import Footer from '@/components/Layout/Footer';
import { useAuth } from '@/context/AuthContext';

export default function ProfilePage() {
  const { user, loading, updateProfile } = useAuth();

  // PERBAIKAN: Inisialisasi langsung dari data 'user' context tanpa menggunakan useEffect sinkron
  const [name, setName] = useState(user?.name || 'Johndoe');
  const [phone, setPhone] = useState(user?.phone || '081234567890');

  const handleSave = async () => {
    try {
      await updateProfile({ name, phone });
      alert('Profil berhasil diperbarui!');
    } catch (err) {
      console.error('Error saat memperbarui profil:', err);
      alert('Gagal memperbarui profil');
    }
  };

  if (loading) {
    return (
      <div className='min-h-screen bg-white flex items-center justify-center'>
        <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-red-600'></div>
      </div>
    );
  }

  return (
    <main className='min-h-screen bg-[#F9FAFB] flex flex-col overflow-x-hidden text-left'>
      {/* Navbar di bagian atas halaman */}
      <Navbar />

      {/* Main Container dengan maks-lebar konsisten rata tengah */}
      <div className='mx-auto max-w-7xl w-full px-6 md:px-12 lg:px-20 py-12 flex-1 mt-16'>
        <div className='flex flex-col lg:flex-row gap-8 items-start'>
          {/* ================= SIDEBAR KIRI ================= */}
          <aside className='w-full lg:w-64 bg-white rounded-2xl p-6 border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.01)]'>
            {/* Ringkasan Profil Pengguna di Sidebar */}
            <div className='flex items-center gap-3 pb-6 mb-6 border-b border-gray-100'>
              <div className='relative w-12 h-12 rounded-full overflow-hidden shrink-0'>
                <Image
                  src='/Jhon doe.png'
                  alt='John Doe Profile'
                  fill
                  sizes='48px'
                  className='object-cover'
                />
              </div>
              <div className='min-w-0'>
                <h3 className='font-bold text-gray-900 text-sm truncate'>
                  {name}
                </h3>
              </div>
            </div>

            {/* Menu Navigasi Akun */}
            <nav className='space-y-1'>
              <button className='w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all text-sm font-semibold'>
                <MapPin size={18} className='text-gray-400' />
                <span>Delivery Address</span>
              </button>
              <button className='w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all text-sm font-semibold'>
                <ShoppingBag size={18} className='text-gray-400' />
                <span>My Orders</span>
              </button>
              <button className='w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-600 hover:bg-red-50/50 transition-all text-sm font-semibold mt-4'>
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </nav>
          </aside>

          {/* ================= KONTEN UTAMA (FORM PROFIL) ================= */}
          <section className='flex-1 w-full'>
            <h1 className='text-3xl font-extrabold text-gray-900 mb-6'>
              Profile
            </h1>

            <div className='bg-white rounded-3xl p-8 border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] max-w-2xl'>
              {/* Foto Besar di Atas Detail Form */}
              <div className='relative w-20 h-20 rounded-full overflow-hidden mb-8 border border-gray-100'>
                <Image
                  src='/Brown.png'
                  alt='John Doe Avatar Big'
                  fill
                  sizes='80px'
                  className='object-cover'
                />
              </div>

              {/* List Form Baris Konten - Rata Kiri Kanan (flex justify-between) */}
              <div className='space-y-6'>
                {/* Baris Name */}
                <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-gray-50'>
                  <span className='text-sm font-bold text-gray-500'>Name</span>
                  <input
                    type='text'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className='text-sm font-bold text-gray-900 text-left sm:text-right outline-none bg-transparent focus:text-red-600 border-b border-transparent focus:border-gray-200 py-0.5 max-w-xs w-full'
                    placeholder='Input your name'
                  />
                </div>

                {/* Baris Email (Read-Only sesuai contoh mockup gambar) */}
                <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-gray-50'>
                  <span className='text-sm font-bold text-gray-500'>Email</span>
                  <span className='text-sm font-bold text-gray-900 text-left sm:text-right truncate'>
                    {user?.email || 'johndoe@email.com'}
                  </span>
                </div>

                {/* Baris Nomor Handphone */}
                <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-6'>
                  <span className='text-sm font-bold text-gray-500'>
                    Nomor Handphone
                  </span>
                  <input
                    type='text'
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className='text-sm font-bold text-gray-900 text-left sm:text-right outline-none bg-transparent focus:text-red-600 border-b border-transparent focus:border-gray-200 py-0.5 max-w-xs w-full'
                    placeholder='Input phone number'
                  />
                </div>

                {/* Tombol Aksi Simpan Perubahan / Update Profile */}
                <div className='pt-4'>
                  <button
                    onClick={handleSave}
                    className='w-full py-3.5 bg-red-600 hover:bg-red-700 active:scale-[0.99] text-white font-bold rounded-full text-sm shadow-md shadow-red-100 transition-all'
                  >
                    Update Profile
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Footer di bagian bawah halaman */}
      <Footer />
    </main>
  );
}
