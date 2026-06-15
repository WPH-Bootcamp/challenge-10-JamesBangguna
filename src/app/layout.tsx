import { ReactNode } from 'react';
import { AuthProvider } from '@/context/AuthContext';
import QueryProvider from '@/providers/QueryProvider';
import '@/app/globals.css';

import { Poppins } from 'next/font/google';

// Konfigurasi font Poppins global agar tampilan teks sesuai desain Foody
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
});

// Pengaturan SEO Metadata untuk aplikasi Foody
export const metadata = {
  title: 'Foody App',
  description: 'Restaurant Application',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='en' className={poppins.variable}>
      {/* Memasang class font Poppins secara global pada seluruh elemen HTML body */}
      <body className={poppins.className} suppressHydrationWarning>
        {/* Lapisan 1: QueryProvider agar useMutation/useQuery aktif di seluruh komponen */}
        <QueryProvider>
          {/* Lapisan 2: AuthProvider untuk mengelola status login member Foody secara global */}
          <AuthProvider>{children}</AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
