'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Search, MapPin, ClipboardList, LogOut, X, Star } from 'lucide-react';
import Navbar from '@/components/Layout/Navbar';
import Footer from '@/components/Layout/Footer';

const statuses = ['Preparing', 'On the Way', 'Delivered', 'Done', 'Canceled'];

const initialOrders = [
  {
    id: 'order-1',
    restaurant: 'Burger King',
    restaurantIcon: '/store-icon.png',
    foodName: 'Food Name',
    foodImage: '/Detail-1.png',
    quantity: 2,
    pricePerItem: 50000,
    totalPrice: 100000,
    status: 'Done',
  },
  {
    id: 'order-2',
    restaurant: 'Burger King',
    restaurantIcon: '/store-icon.png',
    foodName: 'Food Name',
    foodImage: '/Detail-1.png',
    quantity: 2,
    pricePerItem: 50000,
    totalPrice: 100000,
    status: 'Done',
  },
];

export default function MyOrdersPage() {
  const [activeStatus, setActiveStatus] = useState('Done');
  const [searchQuery, setSearchQuery] = useState('');

  // State untuk mengontrol tampilan Modal Review
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [rating, setRating] = useState<number>(4); // Default 4 bintang sesuai gambar
  const [reviewText, setReviewText] = useState('');

  // Fungsi untuk membuka modal review berdasarkan ID Pesanan
  const handleOpenReview = (orderId: string) => {
    setSelectedOrderId(orderId);
    setIsModalOpen(true);
    setRating(4); // Reset ke default gambar saat dibuka
    setReviewText('');
  };

  // Fungsi untuk menutup modal
  const handleCloseReview = () => {
    setIsModalOpen(false);
    setSelectedOrderId(null);
  };

  // Fungsi pengiriman data ulasan
  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    // Proses pengiriman data analitik/API Anda di sini
    console.log({ selectedOrderId, rating, reviewText });
    handleCloseReview();
  };

  return (
    <main className='min-h-screen bg-[#F9FAFB] flex flex-col overflow-x-hidden text-left relative'>
      {/* Navbar Statis */}
      <Navbar />

      {/* Main Container */}
      <div className='mx-auto max-w-6xl w-full px-4 sm:px-6 md:px-8 lg:px-12 py-12 flex-1 mt-16'>
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 items-start'>
          {/* SIDEBAR KIRI */}
          <aside className='lg:col-span-3 bg-white rounded-2xl p-6 border border-gray-100 shadow-[0_4px_25px_rgba(0,0,0,0.02)] flex flex-col gap-6'>
            <div className='flex items-center gap-3 pb-4 border-b border-gray-100'>
              <div className='relative w-12 h-12 rounded-full overflow-hidden border border-gray-100'>
                <Image
                  src='/Jhon doe.png'
                  alt='User Avatar'
                  fill
                  className='object-cover'
                />
              </div>
              <div>
                <h3 className='font-bold text-gray-900 text-sm md:text-base'>
                  John Doe
                </h3>
              </div>
            </div>

            <nav className='flex flex-col gap-1 text-sm font-semibold'>
              <Link
                href='/profile'
                className='flex items-center gap-3 px-3 py-3 text-gray-500 hover:bg-gray-50 rounded-xl transition-colors'
              >
                <MapPin size={18} className='text-gray-400' />
                Delivery Address
              </Link>
              <Link
                href='/My-orders'
                className='flex items-center gap-3 px-3 py-3 bg-red-50 text-red-600 rounded-xl transition-colors'
              >
                <ClipboardList size={18} className='text-red-600' />
                My Orders
              </Link>
              <button className='flex items-center gap-3 px-3 py-3 text-gray-500 hover:bg-red-50 hover:text-red-600 rounded-xl transition-colors mt-4 text-left w-full'>
                <LogOut size={18} className='text-gray-400 rotate-180' />
                Logout
              </button>
            </nav>
          </aside>

          {/* KONTEN UTAMA KANAN */}
          <section className='lg:col-span-9 space-y-6'>
            <h1 className='text-3xl font-extrabold text-gray-900 mb-2'>
              My Orders
            </h1>

            {/* Search Bar */}
            <div className='relative w-full max-w-2xl'>
              <span className='absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400 pointer-events-none'>
                <Search size={18} />
              </span>
              <input
                type='text'
                placeholder='Search'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-full text-sm placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all shadow-sm'
              />
            </div>

            {/* Status Tabs */}
            <div className='w-full overflow-x-auto no-scrollbar py-2 -mx-4 px-4 sm:mx-0 sm:px-0'>
              <div className='flex items-center gap-2.5 min-w-max'>
                <span className='text-sm font-bold text-gray-900 mr-2'>
                  Status
                </span>
                {statuses.map((status) => (
                  <button
                    key={status}
                    onClick={() => setActiveStatus(status)}
                    className={`px-5 py-1.5 rounded-full text-xs font-bold border transition-all active:scale-[0.97] ${
                      activeStatus === status
                        ? 'bg-red-50 border-red-600 text-red-600'
                        : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            {/* Daftar Pesanan */}
            <div className='space-y-6 max-w-4xl'>
              {initialOrders.map((order) => (
                <div
                  key={order.id}
                  className='bg-white rounded-2xl p-5 md:p-6 border border-gray-100 shadow-[0_4px_25px_rgba(0,0,0,0.02)]'
                >
                  <div className='flex items-center gap-2 mb-4'>
                    <div className='relative w-5 h-5'>
                      <Image
                        src={order.restaurantIcon}
                        alt='Store Icon'
                        fill
                        className='object-contain'
                      />
                    </div>
                    <span className='font-bold text-gray-900 text-sm md:text-base'>
                      {order.restaurant}
                    </span>
                  </div>

                  <div className='flex items-start gap-4 pb-5 border-b border-gray-100'>
                    <div className='relative w-16 h-16 rounded-xl overflow-hidden border border-gray-100 shrink-0'>
                      <Image
                        src={order.foodImage}
                        alt={order.foodName}
                        fill
                        className='object-cover'
                      />
                    </div>
                    <div className='space-y-1 py-1'>
                      <h4 className='font-semibold text-gray-500 text-xs md:text-sm'>
                        {order.foodName}
                      </h4>
                      <p className='font-extrabold text-gray-900 text-sm md:text-base'>
                        {order.quantity} x Rp
                        {order.pricePerItem.toLocaleString('id-ID')}
                      </p>
                    </div>
                  </div>

                  <div className='flex items-center justify-between pt-4 gap-4 flex-wrap'>
                    <div className='space-y-0.5'>
                      <span className='text-xs font-medium text-gray-400 block'>
                        Total
                      </span>
                      <span className='text-base font-extrabold text-gray-900'>
                        Rp{order.totalPrice.toLocaleString('id-ID')}
                      </span>
                    </div>

                    {/* Trigger Event untuk membuka modal popup */}
                    <button
                      onClick={() => handleOpenReview(order.id)}
                      className='px-8 py-2.5 bg-red-600 hover:bg-red-700 active:scale-[0.98] text-white font-bold rounded-full text-xs md:text-sm transition-all shadow-md shadow-red-50/50'
                    >
                      Give Review
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* FOOTER */}
      <Footer />

      {/* ==================== BACKDROP & MODAL POPUP GIVE REVIEW ==================== */}
      {isModalOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-[2px] transition-opacity duration-300 animate-fadeIn'>
          {/* Card Box Modal */}
          <div className='bg-white w-full max-w-md rounded-3xl p-6 md:p-8 shadow-[0_10px_40px_rgba(0,0,0,0.12)] border border-gray-50 relative transform transition-all scale-100 flex flex-col items-center text-center'>
            {/* Perbaikan 1: Ditambahkan aria-label="Close modal" agar lolos uji aksesibilitas */}
            <button
              onClick={handleCloseReview}
              aria-label='Close modal'
              className='absolute top-5 right-5 p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-50 transition-colors'
            >
              <X size={20} strokeWidth={2.5} />
            </button>

            {/* Judul Modal */}
            <h2 className='text-xl font-extrabold text-gray-900 mb-6 w-full text-left pl-1'>
              Give Review
            </h2>

            {/* Sub-judul Rating */}
            <p className='text-xs font-bold text-gray-900 mb-3 tracking-wide uppercase'>
              Give Rating
            </p>

            {/* Komponen Bintang Interaktif */}
            <div className='flex items-center gap-2 mb-6'>
              {[1, 2, 3, 4, 5].map((starIndex) => (
                /* Perbaikan 2: Ditambahkan aria-label untuk setiap rating bintang */
                <button
                  key={starIndex}
                  type='button'
                  onClick={() => setRating(starIndex)}
                  aria-label={`Rate ${starIndex} stars`}
                  className='transition-transform active:scale-90'
                >
                  <Star
                    size={32}
                    className={`transition-colors ${
                      starIndex <= rating
                        ? 'fill-[#FFB014] text-[#FFB014]'
                        : 'fill-gray-200 text-gray-200'
                    }`}
                  />
                </button>
              ))}
            </div>

            {/* Form Input Ulasan */}
            <form
              onSubmit={handleSubmitReview}
              className='w-full flex flex-col items-center'
            >
              <textarea
                placeholder='Please share your thoughts about our service!'
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                className='w-full h-36 px-4 py-3 bg-white border border-gray-200 rounded-2xl text-sm placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all resize-none shadow-inner mb-6'
                required
              />

              {/* Tombol Send */}
              <button
                type='submit'
                className='w-full py-3.5 bg-red-600 hover:bg-red-700 active:scale-[0.99] text-white font-bold rounded-full text-sm shadow-md shadow-red-100 transition-all'
              >
                Send
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
