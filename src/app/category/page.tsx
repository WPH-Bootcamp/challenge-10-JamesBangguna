'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Star, SlidersHorizontal, X } from 'lucide-react';
import FilterSidebar from '@/components/FilterSidebar';
import Footer from '@/components/Layout/Footer';

interface Restaurant {
  id: number;
  name: string;
  rating: number;
  location: string;
  distance: string;
  logo: string;
}

export default function CategoryPage() {
  const router = useRouter();

  // State manajemen filter
  const [distance, setDistance] = useState('nearby');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  // State untuk mengontrol kemunculan filter di mobile view
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Simulasi data restoran dari mockup grid
  const restaurants: Restaurant[] = Array(8)
    .fill({
      id: 1,
      name: 'Burger King',
      rating: 4.9,
      location: 'Jakarta Selatan',
      distance: '2.4 km',
      logo: '/Rectangle.png',
    })
    .map((item, idx) => ({ ...item, id: idx + 1 }));

  return (
    <div className='min-h-screen bg-[#fafafa] font-sans antialiased flex flex-col justify-between relative text-left'>
      <div>
        {/* NAVBAR */}
        <header className='sticky top-0 z-40 bg-white border-b border-gray-100 shadow-xs'>
          <div className='max-w-6xl mx-auto px-4 h-20 flex items-center justify-between'>
            {/* Bagian Kiri: Logo Gambar & Tulisan Foody */}
            <div
              className='flex items-center gap-3 cursor-pointer select-none'
              onClick={() => router.push('/')}
            >
              <div className='relative w-9 h-9'>
                <Image
                  src='/Logo-login.png'
                  alt='Foody Logo Icon'
                  fill
                  className='object-contain'
                  priority
                />
              </div>
              <span className='text-xl font-black text-gray-900 tracking-tight'>
                Foody
              </span>
            </div>

            {/* Bagian Kanan: Bag & Foto Profil dari Public */}
            <div className='flex items-center gap-5'>
              {/* Tombol Bag menggunakan aset Image dari folder public */}
              <button
                aria-label='View Shopping Cart'
                className='relative w-10 h-10 flex items-center justify-center hover:bg-gray-50 rounded-full transition-colors'
              >
                <div className='relative w-6 h-6'>
                  <Image
                    src='/Bag-2.png'
                    alt='Shopping Bag'
                    fill
                    className='object-contain'
                  />
                </div>
                <span className='absolute top-1 right-1 bg-red-600 text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center border border-white'>
                  1
                </span>
              </button>

              {/* Garis Pembatas & Profil User */}
              <div className='flex items-center gap-3 border-l border-gray-200 pl-5'>
                <div className='relative w-9 h-9 rounded-full overflow-hidden border border-gray-100 bg-gray-50 shrink-0'>
                  <Image
                    src='/Jhon doe.png'
                    alt='User Profile'
                    fill
                    className='object-cover'
                  />
                </div>
                <span className='text-xs font-bold text-gray-800 hidden sm:inline-block'>
                  John Doe
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* CONTAINER UTAMA */}
        <main className='max-w-6xl mx-auto px-4 py-8 md:py-12'>
          {/* HEADER SEKSI & TOMBOL FILTER MOBILE */}
          <div className='flex items-center justify-between mb-6 md:mb-8'>
            <h2 className='text-2xl md:text-3xl font-black text-gray-900 tracking-tight'>
              All Restaurant
            </h2>
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className='md:hidden flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 font-bold text-xs rounded-xl shadow-xs active:bg-gray-50 transition-colors'
            >
              <SlidersHorizontal className='w-3.5 h-3.5' /> Filter
            </button>
          </div>

          <div className='flex flex-col md:flex-row gap-6 lg:gap-8 items-start'>
            {/* DESKTOP SIDEBAR FILTER */}
            <aside className='hidden md:block w-64 shrink-0 sticky top-28'>
              <FilterSidebar
                distance={distance}
                setDistance={setDistance}
                minPrice={minPrice}
                setMinPrice={setMinPrice}
                maxPrice={maxPrice}
                setMaxPrice={setMaxPrice}
                selectedRating={selectedRating}
                setSelectedRating={setSelectedRating}
              />
            </aside>

            {/* LIST GRID RESTORAN */}
            <div className='flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full'>
              {restaurants.map((resto) => (
                <div
                  key={resto.id}
                  onClick={() => router.push(`/resto/${resto.id}`)}
                  className='bg-white border border-gray-100 rounded-2xl p-4 flex items-center gap-4 hover:shadow-md transition-all cursor-pointer shadow-xs text-left group'
                >
                  <div className='relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl border border-gray-50 overflow-hidden shrink-0 bg-white p-1'>
                    <Image
                      src={resto.logo}
                      alt={resto.name}
                      fill
                      className='object-contain p-2'
                    />
                  </div>
                  <div className='flex-1 min-w-0'>
                    <h4 className='font-extrabold text-gray-900 tracking-tight text-base group-hover:text-red-600 transition-colors truncate'>
                      {resto.name}
                    </h4>
                    <div className='flex items-center gap-1 mt-1 text-xs text-amber-500 font-bold'>
                      <Star className='w-3.5 h-3.5 fill-amber-500 stroke-amber-500' />{' '}
                      {resto.rating}
                    </div>
                    <p className='text-xs text-gray-400 font-medium mt-1.5 truncate'>
                      {resto.location}{' '}
                      <span className='mx-1.5 text-gray-200'>•</span>{' '}
                      {resto.distance}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      {/* MOBILE DRAWER FILTER */}
      {isMobileFilterOpen && (
        <div className='fixed inset-0 z-50 md:hidden flex flex-col justify-end'>
          <div
            className='absolute inset-0 bg-black/40 transition-opacity'
            onClick={() => setIsMobileFilterOpen(false)}
          />

          <div className='relative bg-white rounded-t-3xl p-6 max-h-[85vh] overflow-y-auto shadow-2xl transition-transform animate-slide-up'>
            <div className='flex items-center justify-between mb-5'>
              <h3 className='text-base font-black text-gray-900'>
                Filter Pencarian
              </h3>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                aria-label='Close Filter Menu'
                className='p-1 hover:bg-gray-100 rounded-full transition-colors'
              >
                <X className='w-5 h-5 text-gray-500' />
              </button>
            </div>

            <FilterSidebar
              distance={distance}
              setDistance={setDistance}
              minPrice={minPrice}
              setMinPrice={setMinPrice}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
              selectedRating={selectedRating}
              setSelectedRating={setSelectedRating}
            />

            <button
              onClick={() => setIsMobileFilterOpen(false)}
              className='w-full mt-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-sm rounded-xl shadow-md transition-colors text-center'
            >
              Terapkan Filter
            </button>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
