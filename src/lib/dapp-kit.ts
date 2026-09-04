import { createDAppKit } from '@mysten/dapp-kit-react';
import { enokiWalletsInitializer } from '@mysten/enoki';
import { SuiGrpcClient } from '@mysten/sui/grpc';

const NETWORK_URLS = {
  testnet: 'https://fullnode.testnet.sui.io:443',
} as const;

const enokiPublicApiKey = import.meta.env.VITE_ENOKI_API_KEY;
const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const appUrl = import.meta.env.VITE_APP_URL || window.location.origin;

export const isEnokiConfigured = Boolean(enokiPublicApiKey && googleClientId);

const walletInitializers =
  enokiPublicApiKey && googleClientId
    ? [
        enokiWalletsInitializer({
          apiKey: enokiPublicApiKey,
          providers: {
            google: {
              clientId: googleClientId,
              redirectUrl: appUrl,
            },
          },
        }),
      ]
    : [];

export const dAppKit = createDAppKit({
  networks: ['testnet'],
  createClient: network =>
    new SuiGrpcClient({
      network,
      baseUrl: NETWORK_URLS[network],
    }),
  walletInitializers,
});

declare module '@mysten/dapp-kit-react' {
  interface Register {
    dAppKit: typeof dAppKit;
  }
}

