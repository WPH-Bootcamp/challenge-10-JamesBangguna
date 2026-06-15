import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  const socialMedia = [
    {
      id: 'fb',
      name: 'Facebook',
      icon: '/Fb.png',
      url: 'https://facebook.com',
    },
    {
      id: 'ig',
      name: 'Instagram',
      icon: '/Ig.png',
      url: 'https://instagram.com',
    },
    {
      id: 'ln',
      name: 'LinkedIn',
      icon: '/Link.png',
      url: 'https://linkedin.com',
    },
    {
      id: 'tt',
      name: 'TikTok',
      icon: '/Tiktok.png',
      url: 'https://tiktok.com',
    },
  ];

  return (
    <footer className='bg-[#090909] text-gray-400 py-16 px-6 md:px-12 border-t border-gray-900'>
      <div className='mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8'>
        {/* KOLOM 1: INFO BRAND & SOCIAL MEDIA */}
        <div className='space-y-6'>
          {/* Logo & Judul Brand */}
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

          {/* Deskripsi Teks */}
          <p className='text-base leading-relaxed text-gray-300 max-w-sm'>
            Enjoy homemade flavors & chef&apos;s signature dishes, freshly
            prepared every day. Order online or visit our nearest branch.
          </p>

          {/* Sub-heading Social Media */}
          <div className='space-y-3 pt-2'>
            <h4 className='text-white font-bold text-sm tracking-wide'>
              Follow on Social Media
            </h4>

            {/* Deretan Tombol Lingkaran Media Sosial */}
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
                  {/* Container Ikon dengan filter warna agar putih bersih */}
                  <div className='relative w-8 h-8 opacity-90 hover:opacity-100 transition-opacity'>
                    <Image
                      src={social.icon}
                      alt={`${social.name} icon`}
                      fill
                      className='object-contain brightness-0 invert'
                    />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className='grid grid-cols-2 md:col-span-2 md:grid-cols-2 gap-8'>
          {/* KOLOM 2: EXPLORE NAVIGATION */}
          <div className='md:pl-12'>
            <h4 className='text-white font-bold mb-5 text-base tracking-wider'>
              Explore
            </h4>
            <ul className='space-y-3.5 text-sm font-medium'>
              <li>
                <Link
                  href='#'
                  className='hover:text-white transition-colors duration-150 block py-0.5'
                >
                  All Food
                </Link>
              </li>
              <li>
                <Link
                  href='#'
                  className='hover:text-white transition-colors duration-150 block py-0.5'
                >
                  Nearby
                </Link>
              </li>
              <li>
                <Link
                  href='#'
                  className='hover:text-white transition-colors duration-150 block py-0.5'
                >
                  Discount
                </Link>
              </li>
              <li>
                <Link
                  href='#'
                  className='hover:text-white transition-colors duration-150 block py-0.5'
                >
                  Best Seller
                </Link>
              </li>
              <li>
                <Link
                  href='#'
                  className='hover:text-white transition-colors duration-150 block py-0.5'
                >
                  Delivery
                </Link>
              </li>
              <li>
                <Link
                  href='#'
                  className='hover:text-white transition-colors duration-150 block py-0.5'
                >
                  Lunch
                </Link>
              </li>
            </ul>
          </div>

          {/* KOLOM 3: HELP NAVIGATION */}
          <div>
            <h4 className='text-white font-bold mb-5 text-base tracking-wider'>
              Help
            </h4>
            <ul className='space-y-3.5 text-sm font-medium'>
              <li>
                <Link
                  href='#'
                  className='hover:text-white transition-colors duration-150 block py-0.5'
                >
                  How to Order
                </Link>
              </li>
              <li>
                <Link
                  href='#'
                  className='hover:text-white transition-colors duration-150 block py-0.5'
                >
                  Payment Methods
                </Link>
              </li>
              <li>
                <Link
                  href='#'
                  className='hover:text-white transition-colors duration-150 block py-0.5'
                >
                  Track My Order
                </Link>
              </li>
              <li>
                <Link
                  href='#'
                  className='hover:text-white transition-colors duration-150 block py-0.5'
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href='#'
                  className='hover:text-white transition-colors duration-150 block py-0.5'
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
