import { createDAppKit } from '@mysten/dapp-kit-react';
import { enokiWalletsInitializer } from '@mysten/enoki';
import { SuiGrpcClient } from '@mysten/sui/grpc';

// Member 4 responsibility: keep the website on Sui Testnet.
const NETWORK_URLS = {
  testnet: 'https://fullnode.testnet.sui.io:443',
} as const;

// These are public browser values. Create them in the Enoki Portal and Google Cloud.
// Never put a PRIVATE Enoki key in a NEXT_PUBLIC_ variable.
const enokiPublicApiKey = process.env.NEXT_PUBLIC_ENOKI_API_KEY;
const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';

export const isEnokiConfigured = Boolean(enokiPublicApiKey && googleClientId);

const enokiWalletInitializers =
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
  createClient: (network) =>
    new SuiGrpcClient({
      network,
      baseUrl: NETWORK_URLS[network],
    }),
  // Google becomes an Enoki zkLogin wallet when the public settings exist.
  walletInitializers: enokiWalletInitializers,
});

// This lets the React hooks understand our Testnet configuration.
declare module '@mysten/dapp-kit-react' {
  interface Register {
    dAppKit: typeof dAppKit;
  }
}
