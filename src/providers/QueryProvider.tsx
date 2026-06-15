'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState, ReactNode } from 'react';

export default function QueryProvider({ children }: { children: ReactNode }) {
  // Menggunakan useState agar QueryClient tidak dibuat ulang pada setiap render
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false, // Opsional: mencegah fetch ulang saat pindah tab
            retry: 1, // Opsional: jumlah percobaan ulang jika API gagal
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
