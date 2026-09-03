'use client';

import dynamic from 'next/dynamic';
import type { ReactNode } from 'react';

// Enoki's Google zkLogin session runs in the browser, so this component must
// not be rendered by the Next.js server.
const ClientWalletProviders = dynamic(
  () =>
    import('./wallet-providers').then((module) => module.ClientWalletProviders),
  {
    ssr: false,
    loading: () => <div className="provider-loading">Loading Google sign-in…</div>,
  },
);

export function Providers({ children }: { children: ReactNode }) {
  return <ClientWalletProviders>{children}</ClientWalletProviders>;
}
