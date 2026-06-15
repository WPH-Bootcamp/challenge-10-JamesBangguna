'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState, ReactNode } from 'react';

export default function Providers({ children }: { children: ReactNode }) {
  // Membuat instance QueryClient agar data fetching terisolasi per user session
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5, // Data dianggap fresh selama 5 menit
            refetchOnWindowFocus: false, // Menghindari fetch ulang otomatis saat pindah tab browser
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
