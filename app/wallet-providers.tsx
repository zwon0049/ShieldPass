'use client';

import { useState, type ReactNode } from 'react';
import { DAppKitProvider } from '@mysten/dapp-kit-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { dAppKit } from '@/lib/dapp-kit';

export function ClientWalletProviders({ children }: { children: ReactNode }) {
  // Creating it inside useState prevents a new QueryClient on every render.
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <DAppKitProvider dAppKit={dAppKit}>{children}</DAppKitProvider>
    </QueryClientProvider>
  );
}
