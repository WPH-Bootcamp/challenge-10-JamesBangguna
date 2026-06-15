'use client';

import Image from 'next/image';
import Link from 'next/link'; // Navigasi antar halaman internal Next.js
import { ChevronRight, Minus, Plus } from 'lucide-react';
import Navbar from '@/components/Layout/Navbar';
import Footer from '@/components/Layout/Footer';

// Data Mockup Keranjang/Pesanan - Menggunakan path gambar dari aset public lokal Anda
const cartGroups = [
  {
    id: 'group-1',
    restaurantName: 'Burger King',
    restaurantId: 'burger-king',
    items: [
      {
        id: 'item-1',
        name: 'Food Name',
        price: 50000,
        quantity: 1,
        image: '/Detail-1.png', // Gambar burger diambil langsung dari public/Detail-1.png
      },
      {
        id: 'item-2',
        name: 'Food Name',
        price: 50000,
        quantity: 1,
        image: '/Detail-1.png',
      },
    ],
    totalPrice: 100000,
  },
  {
    id: 'group-2',
    restaurantName: 'Burger King',
    restaurantId: 'burger-king',
    items: [
      {
        id: 'item-3',
        name: 'Food Name',
        price: 50000,
        quantity: 1,
        image: '/Detail-1.png',
      },
      {
        id: 'item-4',
        name: 'Food Name',
        price: 50000,
        quantity: 1,
        image: '/Detail-1.png',
      },
    ],
    totalPrice: 100000,
  },
];

export default function MyCartPage() {
  return (
    <main className='min-h-screen bg-[#F9FAFB] flex flex-col overflow-x-hidden text-left'>
      {/* Navbar di bagian paling atas */}
      <Navbar />

      {/* Main Container Utama - Responsive, Rata Kiri Kanan */}
      <div className='mx-auto max-w-4xl w-full px-6 md:px-12 py-12 flex-1 mt-16'>
        {/* Judul Utama Halaman */}
        <h1 className='text-3xl font-extrabold text-gray-900 mb-8'>My Cart</h1>

        {/* List Card Group Pesanan Per Restoran */}
        <div className='space-y-8'>
          {cartGroups.map((group) => (
            <div
              key={group.id}
              className='bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-[0_4px_25px_rgba(0,0,0,0.02)]'
            >
              {/* Header Restoran dengan tautan navigasi */}
              <Link
                href={`/resto/${group.restaurantId}`}
                className='inline-flex items-center gap-2 group mb-6'
              >
                <div className='relative w-5 h-5'>
                  <Image
                    src='/Category-1.png' // Ikon toko/kategori dari public/Category-1.png
                    alt='Resto Icon'
                    fill
                    sizes='20px'
                    className='object-contain'
                  />
                </div>
                <span className='font-bold text-gray-900 text-base group-hover:text-red-600 transition-colors'>
                  {group.restaurantName}
                </span>
                <ChevronRight
                  size={16}
                  className='text-gray-400 group-hover:text-red-600 transition-colors'
                />
              </Link>

              {/* Daftar Item Makanan/Minuman di dalam Restoran */}
              <div className='space-y-6 pb-6 border-b border-dashed border-gray-200'>
                {group.items.map((item) => (
                  <div
                    key={item.id}
                    className='flex items-center justify-between gap-4'
                  >
                    {/* Detail Informasi Item (Gambar + Nama + Harga) */}
                    <div className='flex items-center gap-4'>
                      <div className='relative w-16 h-16 rounded-2xl overflow-hidden border border-gray-50 shrink-0'>
                        <Image
                          src={item.image} // Mengarah ke rute statis berkas gambar (/Detail-1.png)
                          alt={item.name}
                          fill
                          sizes='64px'
                          className='object-cover'
                        />
                      </div>
                      <div>
                        <h4 className='font-bold text-gray-800 text-sm md:text-base'>
                          {item.name}
                        </h4>
                        <p className='font-extrabold text-gray-900 text-sm mt-1'>
                          Rp{item.price.toLocaleString('id-ID')}
                        </p>
                      </div>
                    </div>

                    {/* Tombol Kontrol Kuantitas Item (Minus / Plus) */}
                    <div className='flex items-center gap-3 bg-gray-50/50 border border-gray-100 rounded-full p-1'>
                      {/* Tombol Kurangi Jumlah */}
                      <button
                        aria-label='Decrease quantity'
                        className='w-8 h-8 rounded-full bg-white flex items-center justify-center border border-gray-100 text-gray-600 hover:bg-gray-50 transition-all active:scale-95 shadow-sm'
                      >
                        <Minus size={14} />
                      </button>

                      {/* Info Angka Kuantitas */}
                      <span className='text-sm font-bold text-gray-800 px-1 min-w-3 text-center'>
                        {item.quantity}
                      </span>

                      {/* Tombol Tambah Jumlah */}
                      <button
                        aria-label='Increase quantity'
                        className='w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-white hover:bg-red-700 transition-all active:scale-95 shadow-sm shadow-red-100'
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bagian Total Pembayaran Ringkasan & Tombol Checkout */}
              <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6'>
                <div>
                  <span className='text-xs font-bold text-gray-400 block mb-1'>
                    Total
                  </span>
                  <span className='text-xl font-extrabold text-gray-900'>
                    Rp{group.totalPrice.toLocaleString('id-ID')}
                  </span>
                </div>

                {/* Tombol Checkout dengan navigasi langsung menuju halaman rute /checkout */}
                <Link href='/checkout' className='w-full sm:w-auto'>
                  <button className='px-12 py-3.5 bg-red-600 hover:bg-red-700 active:scale-[0.99] text-white font-bold rounded-full text-sm shadow-md shadow-red-100 transition-all w-full'>
                    Checkout
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer di bagian bawah halaman */}
      <Footer />
    </main>
  );
}
