# ShieldPass

**Programmable subscription payment protection on Sui.**

## Project description

ShieldPass lets a user create a limited-purpose payment pass for a subscription. The user chooses the merchant, maximum amount per charge, funded amount, and expiry period before creating the pass on Sui Testnet. The goal is to give users clearer control over recurring payments instead of giving a merchant unlimited payment authority.

## Hackathon track

ShieldPass is built for the **Payments & Stablecoins** track, with the current MVP focused on programmable payments. The live contract uses Testnet SUI (`Coin<SUI>`), not a stablecoin. A later version could support stablecoins such as USDC.

## Problem statement

Subscription users can experience unwanted renewals, unexpected price increases, and difficult cancellation processes. Conventional payment methods may allow a merchant to keep charging until the payment instruction is cancelled.

## The solution

ShieldPass acts like a temporary prepaid payment permission:

1. The user signs in with Google through zkLogin.
2. The application provides the user with a Sui Testnet address.
3. The user configures a merchant, per-charge limit, duration, and funded charge capacity.
4. ShieldPass calculates the SUI deposit required for the pass.
5. The user signs a transaction that calls the published Move contract.
6. The contract creates a ShieldPass object and holds the selected Testnet SUI deposit.
7. The application returns a transaction digest that can be verified on Sui Testnet.

## Current implementation status

| Feature | Status |
| --- | --- |
| Google sign-in through Enoki zkLogin | Connected |
| Display the signed-in user's Sui address | Connected |
| Create a ShieldPass through `pass::create_pass` | Connected on Sui Testnet |
| Transaction loading, success, cancellation, and error messages | Connected |
| Existing dashboard passes and charge history | Demo data |
| Disable-pass button | Frontend demo; not connected on-chain |
| Simulate-charge button | Frontend demo; not connected on-chain |

The current `create_pass` function receives the merchant, SUI deposit, maximum charge, duration, and Sui Clock object. It does not receive a separate maximum-charge-count argument. The interface uses **Funded Charge Capacity** to calculate the deposit, but the deployed contract does not independently enforce that selected count. Use **1 charge** for the live demonstration.

## Smart contract addresses (Testnet)

| Item | Value |
| --- | --- |
| Network | Sui Testnet |
| Package ID | `0xb0761fc1fc88160d64b8a9ef9711aa820215e86b1552d0c03ca562faf2a192b0` |
| Module | `pass` |
| Function | `create_pass` |
| Clock object | `0x6` |

The frontend calls:

```text
0xb0761fc1fc88160d64b8a9ef9711aa820215e86b1552d0c03ca562faf2a192b0::pass::create_pass
```

## Blockchain technology used

- **Sui Testnet:** provides the blockchain network used for the live demonstration.
- **Move:** powers the published `pass::create_pass` smart-contract function.
- **Sui objects:** represent the ShieldPass created by the contract.
- **SUI and MIST:** provide the Testnet deposit and transaction fee. One SUI equals 1,000,000,000 MIST.
- **Enoki Google zkLogin:** creates or recovers a Sui address from Google authentication without asking the user to manage a seed phrase inside ShieldPass.
- **Mysten dApp Kit and Sui TypeScript SDK:** connect the React interface to zkLogin and the Move transaction.

### Application technology

- React and TypeScript
- Vite
- Tailwind CSS
- Mysten dApp Kit
- Enoki Google zkLogin
- TanStack React Query
- Sui TypeScript SDK
- Move smart contract on Sui Testnet

## Project structure

```text
src/
├── components/                  Reusable interface components
├── context/
│   ├── AuthContext.tsx          Google zkLogin and connected address
│   ├── SuiProvider.tsx          dApp Kit and React Query providers
│   └── ThemeContext.tsx         Light and dark themes
├── lib/
│   ├── dapp-kit.ts              Enoki and Sui Testnet configuration
│   ├── shieldpass-contract.ts   Builds the create_pass transaction
│   └── use-sui-transaction.ts   Executes transactions and handles status
├── pages/
│   ├── AuthPage.tsx             Google login page
│   ├── CreatePassPage.tsx       Pass form and contract call
│   ├── DashboardPage.tsx        Pass dashboard
│   ├── PassDetailPage.tsx       Pass details and demo actions
│   └── SettingsPage.tsx         Profile, address, and logout
├── App.tsx                      Page navigation
└── main.tsx                     Application providers and entry point
```

## Setup and installation instructions

### Requirements

- Node.js and npm
- A public Enoki API key with zkLogin enabled for Testnet
- A Google OAuth 2.0 Web Client ID registered in the same Enoki application
- Testnet SUI for the signed-in zkLogin address

Do not use real Mainnet SUI for this demonstration.

### Environment setup

The application reads local configuration from `.env.local`. This file is intentionally excluded from Git by `.gitignore` and should not be committed.

Create `.env.local` from the included template.

Windows PowerShell:

```powershell
Copy-Item .env.example .env.local
```

Ubuntu, macOS, or another Bash terminal:

```bash
cp .env.example .env.local
```

Open `.env.local` and replace the placeholders:

```env
VITE_ENOKI_API_KEY=your_public_enoki_api_key
VITE_GOOGLE_CLIENT_ID=your_google_oauth_client_id
VITE_APP_URL=http://localhost:3000
VITE_SHIELDPASS_PACKAGE_ID=0xb0761fc1fc88160d64b8a9ef9711aa820215e86b1552d0c03ca562faf2a192b0
```

These variables are used as follows:

| Variable | Purpose |
| --- | --- |
| `VITE_ENOKI_API_KEY` | Initializes Enoki zkLogin in the browser; use only a public key |
| `VITE_GOOGLE_CLIENT_ID` | Identifies the configured Google OAuth web application |
| `VITE_APP_URL` | Sets the OAuth return URL during local development |
| `VITE_SHIELDPASS_PACKAGE_ID` | Identifies the published ShieldPass Move package |

Although the Enoki public key and Google Client ID are browser configuration rather than private secrets, `.env.local` is kept out of Git so each developer can supply their own environment. Never place a private Enoki key or Google Client Secret in frontend code, `.env.local`, screenshots, or GitHub.

### Enoki and Google configuration

For local development, configure the same URL in every service:

```text
http://localhost:3000
```

- Set `VITE_APP_URL=http://localhost:3000` in `.env.local`.
- Add `http://localhost:3000` as an allowed origin in the Enoki Portal.
- Configure the same local URL in the relevant Google OAuth web-client settings.
- Add the Google Client ID to the Google provider in the Enoki application.

After changing `.env.local`, stop and restart the Vite server.

### Install and run

```bash
npm install
npm run dev
```

Open:

```text
http://localhost:3000
```

On Windows PowerShell, use `npm.cmd install` and `npm.cmd run dev` if PowerShell blocks the `npm.ps1` script.

## Live demonstration

1. Open ShieldPass and select **Login with Google**.
2. Confirm that the shortened Sui address appears in the header.
3. Open **Settings** and copy the complete connected address.
4. Fund that exact address with free **Testnet SUI**. The address may be different from a separate Slush wallet address.
5. Open **Create Pass**.
6. Enter a label and a valid Testnet merchant address.
7. Use `0.01 SUI`, `7 Days`, and `1 Charge` for a small demonstration.
8. Select **Create ShieldPass**.
9. Confirm the success message and transaction digest.
10. Verify that the transaction calls `pass::create_pass` on Sui Testnet.

Because the transaction splits the user's gas coin to create the deposit, the connected zkLogin address needs enough Testnet SUI for both the deposit and the transaction fee.

The Netflix and Spotify quick-fill options use placeholder demonstration addresses. They are not official merchant integrations.

## Verify the project

```bash
npm run lint
npm run build
```

## Privacy and security

- `.env.local` is ignored by Git.
- Commit `.env.example`, which contains placeholders, instead of `.env.local`.
- Use only a public Enoki browser key in the frontend.
- Never commit private keys, seed phrases, access tokens, Google Client Secrets, or private Enoki keys.
- The application is configured for Testnet and should not be treated as production payment software.

## Team members

- Dylan Puah
- Camellia Liew
- Wong Zern Ye
- Sim Hui Xin

## Team integration

- **Frontend:** React/Vite screens and reusable interface components.
- **Smart contract:** Published Move package and `pass::create_pass` function.
- **Middleware and authentication:** Enoki Google zkLogin, provider setup, connected address, transaction execution, and status handling.

## Known Limitations and Next Steps

### Known Limitations

* Only the **Create ShieldPass** function is currently connected to the Sui smart contract.
* The disable-pass and merchant-charge functions are currently frontend demonstrations and are not yet connected on-chain.
* The dashboard and transaction history currently use demonstration data.
* The current smart contract uses Testnet SUI instead of a stablecoin.
* The Netflix and Spotify quick-fill buttons use placeholder merchant addresses and are not official integrations.
* ShieldPass cannot currently stop payments made through an existing bank card unless the merchant or payment provider integrates with ShieldPass.

### Next Steps

* Introduce a **Free-Trial Protection mode** that automatically expires the ShieldPass before a free trial changes into a paid subscription.
* Send users reminders before their free trials or subscriptions renew.
* Connect the disable-pass and merchant-charge functions to the Sui smart contract.
* Retrieve pass details and transaction history directly from the Sui blockchain.
* Enforce the maximum number of charges within the Move smart contract.
* Support stablecoins such as USDC for more stable subscription payment values.
* Integrate ShieldPass with real merchants and payment providers.
* Replace placeholder merchant addresses with verified Testnet merchant accounts.

