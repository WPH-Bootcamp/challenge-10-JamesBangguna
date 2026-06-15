'use client';

import Image from 'next/image';
import Link from 'next/link'; // Ditambahkan untuk navigasi ke halaman sukses
import { useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import Navbar from '@/components/Layout/Navbar';
import Footer from '@/components/Layout/Footer';

// Data Mockup Item Checkout berdasarkan gambar referensi
const initialItems = [
  {
    id: 'item-1',
    name: 'Food Name',
    price: 50000,
    quantity: 1,
    image: '/Detail-1.png',
  },
  {
    id: 'item-2',
    name: 'Food Name',
    price: 50000,
    quantity: 1,
    image: '/Detail-1.png',
  },
];

const paymentMethods = [
  { id: 'bni', name: 'Bank Negara Indonesia', logo: '/bni-logo.png' },
  { id: 'bri', name: 'Bank Rakyat Indonesia', logo: '/bri-logo.png' },
  { id: 'bca', name: 'Bank Central Asia', logo: '/bca-logo.png' },
  { id: 'mandiri', name: 'Mandiri', logo: '/mandiri-logo.png' },
];

export default function CheckoutPage() {
  const [selectedPayment, setSelectedPayment] = useState('bni');

  return (
    <main className='min-h-screen bg-[#F9FAFB] flex flex-col overflow-x-hidden text-left'>
      {/* Navbar tetap berada di paling atas halaman */}
      <Navbar />

      {/* Main Container - Responsif & Rata Kiri-Kanan */}
      <div className='mx-auto max-w-6xl w-full px-4 sm:px-6 md:px-8 lg:px-12 py-12 flex-1 mt-16'>
        {/* Judul Utama Halaman */}
        <h1 className='text-3xl font-extrabold text-gray-900 mb-8'>Checkout</h1>

        {/* Grid Layout: Kolom Kiri (Detail Alamat & Item) | Kolom Kanan (Metode Pembayaran & Ringkasan) */}
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 items-start'>
          {/* ==================== KOLOM KIRI (7/12) ==================== */}
          <div className='lg:col-span-7 space-y-6'>
            {/* Bagian 1: Alamat Pengiriman */}
            <div className='bg-white rounded-2xl p-6 border border-gray-100 shadow-[0_4px_25px_rgba(0,0,0,0.02)]'>
              <div className='flex items-center gap-2 mb-4'>
                <div className='relative w-5 h-5'>
                  <Image
                    src='/Category-2.png' // Pastikan gambar ditaruh di folder public/
                    alt='Delivery Location Icon'
                    fill
                    className='object-contain'
                  />
                </div>
                <h2 className='font-bold text-gray-900 text-base'>
                  Delivery Address
                </h2>
              </div>

              <div className='space-y-1 text-sm text-gray-600 mb-5'>
                <p className='font-medium text-gray-800'>
                  JL. Sudirman No. 25, Jakarta Central, 10220
                </p>
                <p>0812-3456-7890</p>
              </div>

              <button className='px-6 py-2 border border-gray-200 hover:bg-gray-50 text-gray-700 font-bold rounded-full text-xs transition-colors active:scale-[0.98]'>
                Change
              </button>
            </div>

            {/* Bagian 2: Daftar Item Restoran */}
            <div className='bg-white rounded-2xl p-6 border border-gray-100 shadow-[0_4px_25px_rgba(0,0,0,0.02)]'>
              <div className='flex items-center justify-between mb-6'>
                <div className='flex items-center gap-2'>
                  <div className='relative w-5 h-5'>
                    <Image
                      src='/store-icon.png'
                      alt='Restaurant Icon'
                      fill
                      className='object-contain'
                    />
                  </div>
                  <span className='font-bold text-gray-900 text-base'>
                    Burger Bang
                  </span>
                </div>

                <button className='px-4 py-1.5 border border-gray-200 hover:bg-gray-50 text-gray-700 font-bold rounded-full text-xs transition-colors active:scale-[0.98]'>
                  Add item
                </button>
              </div>

              {/* List Makanan */}
              <div className='space-y-6'>
                {initialItems.map((item) => (
                  <div
                    key={item.id}
                    className='flex items-center justify-between gap-4'
                  >
                    <div className='flex items-center gap-4'>
                      <div className='relative w-16 h-16 rounded-xl overflow-hidden border border-gray-100 shrink-0'>
                        <Image
                          src={item.image}
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

                    {/* Kontrol Kuantitas */}
                    <div className='flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-full p-1'>
                      <button
                        aria-label='Decrease quantity'
                        className='w-7 h-7 rounded-full bg-white flex items-center justify-center text-gray-600 border border-gray-100 shadow-sm hover:bg-gray-100 transition-all'
                      >
                        <Minus size={12} />
                      </button>
                      <span className='text-xs font-bold text-gray-800 min-w-3 text-center'>
                        {item.quantity}
                      </span>
                      <button
                        aria-label='Increase quantity'
                        className='w-7 h-7 rounded-full bg-red-600 flex items-center justify-center text-white shadow-sm hover:bg-red-700 transition-all'
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ==================== KOLOM KANAN (5/12) ==================== */}
          <div className='lg:col-span-5 space-y-6'>
            {/* Blok Metode Pembayaran & Ringkasan Tagihan */}
            <div className='bg-white rounded-2xl p-6 border border-gray-100 shadow-[0_4px_25px_rgba(0,0,0,0.02)]'>
              <h2 className='font-bold text-gray-900 text-base mb-4'>
                Payment Method
              </h2>

              {/* Daftar Opsi Bank */}
              <div className='divide-y divide-gray-100 border border-gray-100 rounded-xl overflow-hidden mb-8'>
                {paymentMethods.map((method) => (
                  <label
                    key={method.id}
                    className='flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50/50 transition-colors'
                  >
                    <div className='flex items-center gap-3'>
                      <div className='relative w-10 h-10 border border-gray-100 rounded bg-white p-0.5 flex items-center justify-center'>
                        <Image
                          src={method.logo} // Mengambil dari folder public/
                          alt={`${method.name} Logo`}
                          fill
                          className='object-contain p-1'
                        />
                      </div>
                      <span className='text-sm font-medium text-gray-700'>
                        {method.name}
                      </span>
                    </div>

                    <input
                      type='radio'
                      name='payment-option'
                      checked={selectedPayment === method.id}
                      onChange={() => setSelectedPayment(method.id)}
                      className='w-4 h-4 text-red-600 border-gray-300 focus:ring-red-500 accent-red-600'
                    />
                  </label>
                ))}
              </div>

              {/* Ringkasan Pembayaran (Payment Summary) */}
              <h2 className='font-bold text-gray-900 text-base mb-4'>
                Payment Summary
              </h2>

              <div className='space-y-3 text-sm pb-4 border-b border-dashed border-gray-200'>
                <div className='flex justify-between text-gray-600'>
                  <span>Price ( 2 items )</span>
                  <span className='font-bold text-gray-900'>Rp100.000</span>
                </div>
                <div className='flex justify-between text-gray-600'>
                  <span>Delivery Fee</span>
                  <span className='font-bold text-gray-900'>Rp10.000</span>
                </div>
                <div className='flex justify-between text-gray-600'>
                  <span>Service Fee</span>
                  <span className='font-bold text-gray-900'>Rp1.000</span>
                </div>
              </div>

              {/* Total Keseluruhan */}
              <div className='flex justify-between items-center my-6'>
                <span className='text-sm font-medium text-gray-700'>Total</span>
                <span className='text-lg font-extrabold text-gray-900'>
                  Rp111.000
                </span>
              </div>

              {/* PERBAIKAN: Membungkus tombol dengan elemen Link eksternal Next.js menuju rute /success */}
              <Link href='/success' className='w-full block'>
                <button className='w-full py-3.5 bg-red-600 hover:bg-red-700 active:scale-[0.99] text-white font-bold rounded-full text-sm shadow-md shadow-red-100 transition-all'>
                  Buy
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer tetap di bagian bawah halaman */}
      <Footer />
    </main>
  );
}
