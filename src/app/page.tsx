'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Search, Star } from 'lucide-react';
import Navbar from '@/components/Layout/Navbar';
import Footer from '@/components/Layout/Footer';
import { useAuth } from '@/context/AuthContext';

// Data Kategori dasar
const allCategories = [
  { id: 1, name: 'All Restaurant', image: '/Category-1.png' }, // Otomatis mengarah ke /category jika di-klik
  { id: 2, name: 'Nearby', image: '/Category-2.png' },
  { id: 3, name: 'Discount', image: '/Category-3.png' },
  { id: 4, name: 'Best Seller', image: '/Category-4.png' },
  { id: 5, name: 'Delivery', image: '/Category-5.png' },
  { id: 6, name: 'Lunch', image: '/Category-6.png' },
];

// Data List Restoran
const restaurants = Array(12).fill({
  id: 'burger-king',
  name: 'Burger King',
  rating: '4.9',
  location: 'Jakarta Selatan',
  distance: '2.4 km',
  logo: '/Rectangle.png',
});

export default function HomePage() {
  const { user, loading } = useAuth();

  // LOGIKA: Jika login, hanya tampilkan 4 kategori (Tanpa Discount & Delivery)
  const displayCategories = user
    ? allCategories.filter(
        (cat) =>
          cat.name === 'All Restaurant' ||
          cat.name === 'Nearby' ||
          cat.name === 'Best Seller' ||
          cat.name === 'Lunch'
      )
    : allCategories;

  if (loading) {
    return (
      <div className='min-h-screen bg-white flex items-center justify-center'>
        <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-red-600'></div>
      </div>
    );
  }

  return (
    <main className='min-h-screen bg-white flex flex-col overflow-x-hidden text-left'>
      {/* Navbar otomatis mendeteksi profil user dari AuthContext */}
      <Navbar />

      {/* ================= HERO SECTION ================= */}
      <section className='relative w-full bg-black flex items-center justify-center px-4 h-112.5 md:h-137.5'>
        <Image
          src='/Image.png'
          alt='Hero Background'
          fill
          sizes='100vw'
          className='object-cover opacity-60'
          priority
        />
        <div className='relative z-10 w-full max-w-4xl text-center text-white space-y-6'>
          <h1 className='text-4xl md:text-6xl font-bold tracking-tight'>
            Explore Culinary Experiences
          </h1>
          <p className='text-sm md:text-lg text-gray-200 max-w-2xl mx-auto opacity-90'>
            Search and refine your choice to discover the perfect restaurant.
          </p>

          {/* Search Bar Rata Tengah */}
          <div className='mx-auto flex max-w-2xl items-center rounded-full bg-white px-6 py-3 md:py-4 shadow-2xl transition-all focus-within:ring-2 focus-within:ring-red-600'>
            <Search className='text-gray-400 mr-3 shrink-0' size={20} />
            <input
              type='text'
              placeholder='Search restaurants, food and drink'
              className='w-full text-sm md:text-base outline-none bg-transparent text-gray-800'
            />
          </div>
        </div>
      </section>

      {/* ================= SECTION KATEGORI (Dinamis 4 atau 6 Kolom) ================= */}
      <section className='mx-auto max-w-7xl w-full px-6 md:px-12 lg:px-20 py-16'>
        <div
          className={`grid gap-6 transition-all duration-500 ${
            user ? 'grid-cols-2 md:grid-cols-4' : 'grid-cols-2 md:grid-cols-6'
          }`}
        >
          {displayCategories.map((cat) => {
            // Komponen isi dari Item Kategori
            const CategoryContent = (
              <>
                <div className='relative w-14 h-14 mb-4 group-hover:scale-110 transition-transform'>
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    sizes='56px'
                    className='object-contain'
                  />
                </div>
                <span className='text-sm font-bold text-gray-800 text-center group-hover:text-red-600 transition-colors'>
                  {cat.name}
                </span>
              </>
            );

            // PERBAIKAN: Jika namanya 'All Restaurant', bungkus dengan Next.js Link untuk navigasi langsung
            if (cat.name === 'All Restaurant') {
              return (
                <Link
                  key={cat.id}
                  href='/category'
                  className='flex flex-col items-center justify-center border border-gray-100 rounded-3xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-md transition-all duration-300 cursor-pointer bg-white group h-40'
                >
                  {CategoryContent}
                </Link>
              );
            }

            // Default kategori lainnya tanpa link pembungkus internal
            return (
              <div
                key={cat.id}
                className='flex flex-col items-center justify-center border border-gray-100 rounded-3xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-md transition-all duration-300 cursor-pointer bg-white group h-40'
              >
                {CategoryContent}
              </div>
            );
          })}
        </div>
      </section>

      {/* ================= SECTION RECOMMENDED ================= */}
      <section className='mx-auto max-w-7xl w-full px-6 md:px-12 lg:px-20 pb-24'>
        <div className='flex items-center justify-between mb-10'>
          <h3 className='text-2xl md:text-3xl font-extrabold text-gray-900'>
            Recommended
          </h3>
          {/* PERBAIKAN: Mengubah button menjadi Link agar tombol See All langsung mengarah ke halaman category */}
          <Link
            href='/category'
            className='text-sm font-bold text-red-600 hover:text-red-700 transition-colors'
          >
            See All
          </Link>
        </div>

        {/* Grid Card Restoran dengan Link Pembungkus */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
          {restaurants.map((item, index) => (
            <Link
              href={`/resto/${item.id}`}
              key={index}
              className='group block cursor-pointer'
            >
              <div className='flex items-center gap-5 border border-gray-100 rounded-[2rem] p-5 hover:shadow-xl transition-all duration-300 bg-white'>
                {/* Logo Restoran */}
                <div className='relative w-20 h-20 shrink-0 rounded-2xl overflow-hidden border border-gray-50'>
                  <Image
                    src={item.logo}
                    alt={item.name}
                    fill
                    sizes='80px'
                    className='object-cover group-hover:scale-110 transition-transform duration-500'
                  />
                </div>

                {/* Info Text Detail Restoran */}
                <div className='flex-1 min-w-0'>
                  <h4 className='font-bold text-gray-900 text-lg truncate group-hover:text-red-600 transition-colors'>
                    {item.name}
                  </h4>
                  <div className='flex items-center gap-1.5 my-1'>
                    <Star size={16} className='fill-amber-400 text-amber-400' />
                    <span className='text-sm font-bold text-gray-700'>
                      {item.rating}
                    </span>
                  </div>
                  <p className='text-xs text-gray-400 font-medium'>
                    {item.location} • {item.distance}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className='flex justify-center mt-16'>
          <button className='px-10 py-3 border border-gray-200 rounded-full text-sm font-bold text-gray-500 hover:bg-gray-50 transition-all active:scale-95 shadow-sm'>
            Show More
          </button>
        </div>
      </section>

      <Footer />
    </main>
  );
}
