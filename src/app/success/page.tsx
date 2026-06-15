'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function PaymentSuccessPage() {
  return (
    <main className='min-h-screen bg-[#F9FAFB] flex flex-col items-center justify-center p-4 text-left'>
      {/* Container Utama Nota Pembayaran */}
      <div className='w-full max-w-md bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.02)] flex flex-col items-center relative overflow-hidden'>
        {/* Logo Brand Foody */}
        <div className='flex items-center gap-2 mb-8'>
          <div className='relative w-8 h-8'>
            <Image
              src='/Logo-Login.png' // Gambar diambil langsung dari folder public
              alt='Foody Logo'
              fill
              className='object-contain'
            />
          </div>
          <span className='text-2xl font-black text-gray-900 tracking-tight'>
            Foody
          </span>
        </div>

        {/* Ikon Centang Hijau Berhasil */}
        <div className='w-16 h-16 bg-[#47C113] rounded-full flex items-center justify-center mb-4 shadow-sm shadow-green-100'>
          <svg
            className='w-8 h-8 text-white'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='3'
              d='M5 13l4 4L19 7'
            ></path>
          </svg>
        </div>

        {/* Judul Status */}
        <h1 className='text-xl font-extrabold text-gray-900 mb-2 text-center'>
          Payment Success
        </h1>

        {/* PERBAIKAN TAILWIND: Mengubah max-w-[280px] menjadi canonical class max-w-70 */}
        <p className='text-xs text-gray-500 font-medium text-center max-w-70 mb-8 leading-relaxed'>
          Your payment has been successfully processed.
        </p>

        {/* Pembatas Garis Putus-putus Atas */}
        <div className='w-full border-t border-dashed border-gray-200 my-2' />

        {/* Detail Manifes Invoice Ringkasan */}
        <div className='w-full space-y-4 py-4 text-sm'>
          <div className='flex justify-between items-center gap-4'>
            <span className='text-gray-500 font-medium text-xs md:text-sm shrink-0'>
              Date
            </span>
            <span className='font-bold text-gray-900 text-xs md:text-sm text-right'>
              25 August 2025, 15:51
            </span>
          </div>

          <div className='flex justify-between items-center gap-4'>
            <span className='text-gray-500 font-medium text-xs md:text-sm shrink-0'>
              Payment Method
            </span>
            <span className='font-bold text-gray-900 text-xs md:text-sm text-right'>
              Bank Rakyat Indonesia
            </span>
          </div>

          <div className='flex justify-between items-center gap-4'>
            <span className='text-gray-500 font-medium text-xs md:text-sm shrink-0'>
              Price ( 2 items )
            </span>
            <span className='font-bold text-gray-900 text-xs md:text-sm text-right'>
              Rp100.000
            </span>
          </div>

          <div className='flex justify-between items-center gap-4'>
            <span className='text-gray-500 font-medium text-xs md:text-sm shrink-0'>
              Delivery Fee
            </span>
            <span className='font-bold text-gray-900 text-xs md:text-sm text-right'>
              Rp10.000
            </span>
          </div>

          <div className='flex justify-between items-center gap-4'>
            <span className='text-gray-500 font-medium text-xs md:text-sm shrink-0'>
              Service Fee
            </span>
            <span className='font-bold text-gray-900 text-xs md:text-sm text-right'>
              Rp1.000
            </span>
          </div>
        </div>

        {/* Pembatas Garis Putus-putus Bawah */}
        <div className='w-full border-t border-dashed border-gray-200 my-2' />

        {/* Total Nominal Tagihan */}
        <div className='w-full flex justify-between items-center py-4 mb-6'>
          <span className='text-sm font-semibold text-gray-700'>Total</span>
          {/* KOREKSI DATA: Menyesuaikan nominal kalkulasi total belanja yang benar */}
          <span className='text-lg font-extrabold text-gray-900'>
            Rp111.000
          </span>
        </div>

        {/* PERBAIKAN: Mengarahkan navigasi langsung ke halaman My Orders saat diklik */}
        <Link href='/My-orders' className='w-full block'>
          <button className='w-full py-3.5 bg-red-600 hover:bg-red-700 active:scale-[0.99] text-white font-bold rounded-full text-sm shadow-md shadow-red-100 transition-all'>
            See My Orders
          </button>
        </Link>
      </div>
    </main>
  );
}
