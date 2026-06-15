'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Share2, Star, Plus, Minus, ShoppingBag } from 'lucide-react';

// DATA ARRAYS UNTUK SOSIAL MEDIA DI FOOTER
const socialMedia = [
  {
    id: 1,
    name: 'Facebook',
    url: '#',
    icon: '/Fb.png',
  },
  {
    id: 2,
    name: 'Instagram',
    url: '#',
    icon: '/Ig.png',
  },
  {
    id: 3,
    name: 'LinkedIn',
    url: '#',
    icon: '/Link.png',
  },
  {
    id: 4,
    name: 'TikTok',
    url: '#',
    icon: '/Tiktok.png',
  },
];

interface MenuItem {
  id: number;
  name: string;
  price: number;
  image: string;
  type: 'food' | 'drink';
}

interface ReviewItem {
  id: number;
  name: string;
  date: string;
  rating: number;
  comment: string;
  avatar: string;
}

interface RestoDetail {
  id: string;
  name: string;
  rating: number;
  reviewsCount: number;
  location: string;
  logo: string;
  images: string[];
  menus: MenuItem[];
  reviews: ReviewItem[];
}

export default function RestoDetailPage() {
  const params = useParams();
  const restoId = params?.id as string;

  const [resto, setResto] = useState<RestoDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [activeCategory, setActiveCategory] = useState<string>('All Menu');
  const [cartQuantities, setCartQuantities] = useState<Record<number, number>>({
    2: 1, // Default Spaghetti
    3: 1, // Default Fries
  });

  useEffect(() => {
    if (!restoId) return;

    const fetchRestoDetail = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/resto/${restoId}`);
        if (!res.ok) throw new Error('Gagal memuat data detail restoran');
        const data = await res.json();
        setResto(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Terjadi kesalahan sistem');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchRestoDetail();
  }, [restoId, setError]);

  const handleIncrement = (id: number) => {
    setCartQuantities((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const handleDecrement = (id: number) => {
    setCartQuantities((prev) => {
      const updated = { ...prev };
      if (updated[id] <= 1) {
        delete updated[id];
      } else {
        updated[id] -= 1;
      }
      return updated;
    });
  };

  if (loading && !resto) {
    return (
      <div className='min-h-screen bg-white flex items-center justify-center'>
        <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-red-600'></div>
      </div>
    );
  }

  if (error || !resto) {
    return (
      <div className='min-h-screen bg-white flex flex-col items-center justify-center gap-4 px-4 text-center'>
        <p className='text-red-600 font-semibold'>
          {error || 'Restoran tidak ditemukan'}
        </p>
        <Link
          href='/'
          className='text-sm underline text-gray-500 hover:text-gray-800 transition'
        >
          Kembali ke Beranda
        </Link>
      </div>
    );
  }

  const filteredMenus =
    resto.menus?.filter(
      (item) =>
        activeCategory === 'All Menu' ||
        item.type.toLowerCase() === activeCategory.toLowerCase()
    ) || [];

  return (
    <div className='min-h-screen bg-white text-gray-900 font-sans flex flex-col justify-between antialiased'>
      {/* ================= HEADER / NAVBAR ================= */}
      <header className='border-b border-gray-100 bg-white sticky top-0 z-50 w-full'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between'>
          <Link href='/' className='flex items-center gap-2 group'>
            {/* PERBAIKAN: Menggunakan Image dari public untuk logo samping tulisan Foody */}
            <Image
              src='/Logo-Login.png'
              alt='Foody Logo'
              width={32}
              height={32}
              priority
              className='object-contain'
            />
            <span className='text-xl font-black tracking-tight text-gray-950'>
              Foody
            </span>
          </Link>
          <div className='flex items-center gap-4'>
            <button
              className='relative p-2 text-gray-700 hover:text-red-600 transition'
              aria-label='Keranjang Belanja'
            >
              <ShoppingBag className='h-6 w-6' />
              {Object.values(cartQuantities).reduce((a, b) => a + b, 0) > 0 && (
                <span className='absolute top-1 right-1 h-4 w-4 rounded-full bg-red-600 text-[10px] font-bold text-white flex items-center justify-center animate-pulse'>
                  {Object.values(cartQuantities).reduce((a, b) => a + b, 0)}
                </span>
              )}
            </button>
            <div className='flex items-center gap-2 pl-2 border-l border-gray-200'>
              <div className='h-8 w-8 rounded-full overflow-hidden bg-gray-100 relative shadow-inner'>
                <Image
                  src='/Jhon doe.png'
                  alt='User Profile'
                  fill
                  sizes='32px'
                  className='object-cover'
                />
              </div>
              <span className='text-sm font-semibold text-gray-700 hidden sm:inline'>
                John Doe
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* ================= MAIN CONTENT ================= */}
      <main className='grow mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 pt-6 pb-24 space-y-10'>
        {/* SECTION 1: GALLERY GRID IMAGES */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          <div className='md:col-span-2 relative h-64 sm:h-80 md:h-100 w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm'>
            <Image
              src={resto.images?.[0] || '/Image-detail.png'}
              alt='Main Food Presentation'
              fill
              sizes='(max-w-768px) 100vw, 66vw'
              className='object-cover hover:scale-[1.02] transition duration-500'
              priority
            />
          </div>
          <div className='grid grid-cols-2 md:grid-cols-1 md:grid-rows-2 gap-4 h-32 sm:h-40 md:h-100'>
            <div className='relative w-full h-full rounded-xl sm:rounded-2xl overflow-hidden shadow-sm'>
              <Image
                src={resto.images?.[1] || '/Image-detail1.png'}
                alt='Sub 1'
                fill
                sizes='(max-w-768px) 50vw, 33vw'
                className='object-cover hover:scale-105 transition duration-500'
              />
            </div>
            <div className='grid grid-cols-2 gap-4 h-full md:h-auto'>
              <div className='relative w-full h-full rounded-xl sm:rounded-2xl overflow-hidden shadow-sm'>
                <Image
                  src={resto.images?.[2] || '/Image-detail2.png'}
                  alt='Sub 2'
                  fill
                  sizes='(max-w-768px) 25vw, 16vw'
                  className='object-cover hover:scale-105 transition duration-500'
                />
              </div>
              <div className='relative w-full h-full rounded-xl sm:rounded-2xl overflow-hidden shadow-sm'>
                <Image
                  src={resto.images?.[3] || '/Image-detail3.png'}
                  alt='Sub 3'
                  fill
                  sizes='(max-w-768px) 25vw, 16vw'
                  className='object-cover hover:scale-105 transition duration-500'
                />
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: BRAND HEADER */}
        <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-6 w-full'>
          <div className='flex items-center gap-4 text-left'>
            <div className='relative h-16 w-16 shrink-0 rounded-full border border-gray-100 overflow-hidden bg-white shadow-sm flex items-center justify-center'>
              <Image
                src={resto.logo || '/Rectangle.png'}
                alt={resto.name}
                fill
                sizes='64px'
                className='object-contain p-1'
              />
            </div>
            <div>
              <h1 className='text-2xl sm:text-3xl font-bold tracking-tight text-gray-900'>
                {resto.name}
              </h1>
              <div className='flex items-center gap-2 mt-1 text-sm text-gray-500 font-medium'>
                <span className='flex items-center gap-1 text-amber-500 font-bold'>
                  <Star className='h-4 w-4 fill-amber-400 text-amber-400' />{' '}
                  {resto.rating}
                </span>
                <span>•</span>
                <span>{resto.location}</span>
              </div>
            </div>
          </div>
          <button className='flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-bold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition shadow-sm self-start sm:self-center'>
            <Share2 className='h-4 w-4' /> Share
          </button>
        </div>

        {/* SECTION 3: MENU DESIGN */}
        <div className='space-y-6 w-full text-left'>
          <h2 className='text-2xl font-bold tracking-tight text-gray-900'>
            Menu
          </h2>
          <div className='flex flex-wrap gap-2'>
            {['All Menu', 'Food', 'Drink'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-5 py-2 text-xs font-semibold tracking-wide transition border ${
                  activeCategory === cat
                    ? 'bg-red-50 text-red-600 border-red-200'
                    : 'bg-white text-gray-500 border-gray-200 hover:text-gray-900 hover:border-gray-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full'>
            {filteredMenus.map((product) => {
              const qty = cartQuantities[product.id] || 0;
              return (
                <div
                  key={product.id}
                  className='group flex flex-col justify-between overflow-hidden rounded-2xl border border-gray-100 bg-white p-3 shadow-sm hover:shadow-md transition'
                >
                  <div className='relative aspect-square w-full overflow-hidden rounded-xl bg-gray-50'>
                    <Image
                      src={product.image || '/images/default-menu.png'}
                      alt={product.name}
                      fill
                      sizes='(max-w-640px) 100vw, (max-w-1024px) 33vw, 25vw'
                      className='object-cover group-hover:scale-105 transition duration-300'
                    />
                  </div>
                  <div className='mt-4 space-y-3 text-left'>
                    <div>
                      <h3 className='text-sm font-semibold text-gray-800 line-clamp-1'>
                        {product.name}
                      </h3>
                      <p className='text-sm font-bold text-gray-900 mt-0.5'>
                        Rp {product.price.toLocaleString('id-ID')}
                      </p>
                    </div>
                    {qty > 0 ? (
                      <div className='flex items-center justify-between rounded-xl border border-gray-200 p-1 bg-gray-50'>
                        <button
                          onClick={() => handleDecrement(product.id)}
                          className='flex h-8 w-8 items-center justify-center rounded-lg bg-white text-gray-600 shadow-sm hover:bg-gray-100 transition'
                          aria-label={`Kurangi kuantitas ${product.name}`}
                        >
                          <Minus className='h-3.5 w-3.5' />
                        </button>
                        <span className='text-sm font-bold text-gray-900'>
                          {qty}
                        </span>
                        <button
                          onClick={() => handleIncrement(product.id)}
                          className='flex h-8 w-8 items-center justify-center rounded-lg bg-red-600 text-white shadow-sm hover:bg-red-700 transition'
                          aria-label={`Tambah kuantitas ${product.name}`}
                        >
                          <Plus className='h-3.5 w-3.5' />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleIncrement(product.id)}
                        className='w-full rounded-xl bg-red-600 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-red-700 transition'
                      >
                        Add
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className='text-center pt-4'>
            <button className='rounded-xl border border-gray-200 bg-white px-6 py-2.5 text-xs font-bold text-gray-500 hover:bg-gray-50 hover:text-gray-800 transition shadow-sm'>
              Show More
            </button>
          </div>
        </div>

        {/* SECTION 4: REVIEWS DESIGN */}
        <div className='space-y-6 pt-10 border-t border-gray-100 w-full text-left'>
          <div className='space-y-1'>
            <h2 className='text-2xl font-bold tracking-tight text-gray-900'>
              Review
            </h2>
            <div className='flex items-center gap-1.5 text-sm font-bold text-gray-800'>
              <Star className='h-4 w-4 fill-amber-400 text-amber-400' />
              {resto.rating}{' '}
              <span className='text-gray-400 font-normal'>
                ({resto.reviewsCount} Ulasan)
              </span>
            </div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 w-full'>
            {resto.reviews?.map((review) => (
              <div
                key={review.id}
                className='rounded-2xl border border-gray-100 bg-white p-5 shadow-sm space-y-3 flex flex-col justify-between'
              >
                <div className='space-y-3 text-left'>
                  <div className='flex items-center gap-3'>
                    <div className='relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-gray-50 shadow-inner'>
                      <Image
                        src={review.avatar || '/images/default-avatar.png'}
                        alt={review.name}
                        fill
                        sizes='40px'
                        className='object-cover'
                      />
                    </div>
                    <div>
                      <h4 className='text-sm font-bold text-gray-800'>
                        {review.name}
                      </h4>
                      <p className='text-xs text-gray-400 mt-0.5'>
                        {review.date}
                      </p>
                    </div>
                  </div>
                  <div className='flex gap-0.5'>
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star
                        key={idx}
                        className={`h-3.5 w-3.5 ${
                          idx < review.rating
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                  <p className='text-xs sm:text-sm text-gray-600 leading-relaxed text-justify sm:text-left'>
                    {review.comment}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className='text-center pt-4'>
            <button className='rounded-xl border border-gray-200 bg-white px-6 py-2.5 text-xs font-bold text-gray-500 hover:bg-gray-50 hover:text-gray-800 transition shadow-sm'>
              Show More
            </button>
          </div>
        </div>
      </main>

      {/* ================= FOOTER ================= */}
      <footer className='bg-[#090909] text-gray-400 py-16 px-6 md:px-12 border-t border-gray-900 w-full'>
        <div className='mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8'>
          {/* KOLOM 1: INFO BRAND & SOCIAL MEDIA */}
          <div className='space-y-6 text-left'>
            <div className='flex items-center gap-3'>
              <Image
                src='/Logo-Login.png'
                alt='Foody Logo'
                width={44}
                height={44}
                priority
              />
              <span className='text-3xl font-bold text-white tracking-wide'>
                Foody
              </span>
            </div>

            <p className='text-base leading-relaxed text-gray-300 max-w-sm'>
              Enjoy homemade flavors & chef&apos;s signature dishes, freshly
              prepared every day. Order online or visit our nearest branch.
            </p>

            <div className='space-y-3 pt-2'>
              <h4 className='text-white font-bold text-sm tracking-wide'>
                Follow on Social Media
              </h4>

              <div className='flex gap-3'>
                {socialMedia.map((social) => (
                  <a
                    key={social.id}
                    href={social.url}
                    target='_blank'
                    rel='noopener noreferrer'
                    aria-label={`Follow Foody on ${social.name}`}
                    title={`Foody ${social.name}`}
                    className='w-11 h-11 rounded-full border border-gray-800 flex items-center justify-center transition-all duration-200 hover:bg-white/10 hover:border-gray-500 active:scale-90 bg-transparent'
                  >
                    <div className='relative w-6 h-6 opacity-90 hover:opacity-100 transition-opacity'>
                      {/* PERBAIKAN: Menghapus className brightness-0 invert agar warna asli logo medsos public terlihat */}
                      <Image
                        src={social.icon}
                        alt={`${social.name} icon`}
                        fill
                        className='object-contain'
                      />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* KOLOM 2: EXPLORE */}
          <div className='text-left'>
            <h4 className='text-white font-bold mb-6 text-sm tracking-wide uppercase'>
              Explore
            </h4>
            <ul className='space-y-3 text-sm'>
              <li>
                <Link href='#' className='hover:text-white transition'>
                  All Food
                </Link>
              </li>
              <li>
                <Link href='#' className='hover:text-white transition'>
                  Nearby
                </Link>
              </li>
              <li>
                <Link href='#' className='hover:text-white transition'>
                  Discount
                </Link>
              </li>
              <li>
                <Link href='#' className='hover:text-white transition'>
                  Best Seller
                </Link>
              </li>
              <li>
                <Link href='#' className='hover:text-white transition'>
                  Delivery
                </Link>
              </li>
              <li>
                <Link href='#' className='hover:text-white transition'>
                  Lunch
                </Link>
              </li>
            </ul>
          </div>

          {/* KOLOM 3: HELP */}
          <div className='text-left'>
            <h4 className='text-white font-bold mb-6 text-sm tracking-wide uppercase'>
              Help
            </h4>
            <ul className='space-y-3 text-sm'>
              <li>
                <Link href='#' className='hover:text-white transition'>
                  How to Order
                </Link>
              </li>
              <li>
                <Link href='#' className='hover:text-white transition'>
                  Payment Methods
                </Link>
              </li>
              <li>
                <Link href='#' className='hover:text-white transition'>
                  Track My Order
                </Link>
              </li>
              <li>
                <Link href='#' className='hover:text-white transition'>
                  FAQ
                </Link>
              </li>
              <li>
                <Link href='#' className='hover:text-white transition'>
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
