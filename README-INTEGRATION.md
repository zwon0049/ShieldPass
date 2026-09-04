# ShieldPass integrated Vite application

This folder combines Member 2's Vite/React interface with Member 4's Google
zkLogin/Enoki setup and Member 3's published `pass::create_pass` Move call on
Sui Testnet.

## What is connected

- **Real:** Google zkLogin through Enoki.
- **Real:** A Sui Testnet address after login.
- **Real:** The Create ShieldPass button calls Member 3's published
  `pass::create_pass` function.
- **Real:** Loading, cancellation, insufficient-balance and transaction-result
  messages.
- **Demo data:** The older passes and charge history shown on the dashboard.
- **Not connected yet:** Disable-pass and simulate-charge buttons. Member 3
  needs to provide the matching published function names and exact arguments.

The current published `create_pass` function accepts a deposit, per-charge cap
and duration, but it does not accept a separate `max_charges` argument. The
frontend therefore uses the chosen charge capacity to calculate the total SUI
deposit. Use **1 charge** for the hackathon scenario until the Move contract is
updated with an exact charge counter.

## First-time setup on Windows

Open this folder in VS Code. The correct terminal folder is the folder where
`package.json` is visible. Run:

```powershell
Copy-Item .env.example .env.local
npm.cmd install
npm.cmd run dev
```

Open <http://localhost:3000>. Keep the terminal running while using the site.
Press `Ctrl+C` in that terminal when you want to stop it.

The `.env.local` file is ignored by Git. Never add a private Enoki key or a
Google Client Secret to browser code or GitHub.

## Google redirect settings

The local URL must match exactly in all three places:

1. `.env.local`: `VITE_APP_URL=http://localhost:3000`
2. Enoki Portal: allow `http://localhost:3000`
3. Google Cloud OAuth web client: add `http://localhost:3000` to both the
   authorized JavaScript origins and authorized redirect URIs.

After changing `.env.local`, stop and restart `npm.cmd run dev`.

## How to test the connection

1. Click **Login with Google** and complete the Google window.
2. Confirm that a shortened Sui address appears in the top-right header.
3. Copy the full address from **Settings** and fund it with Testnet SUI.
4. Open **Create Pass** and use a complete Sui merchant address.
5. For the live demo, choose a small amount, 7 days and 1 charge.
6. Click **Create ShieldPass**.
7. Success is confirmed only when the app shows a transaction digest and the
   Sui Testnet Explorer link opens the transaction.

## Important files

- `src/context/SuiProvider.tsx` supplies dApp Kit and React Query to the app.
- `src/lib/dapp-kit.ts` configures Testnet and Google zkLogin/Enoki.
- `src/context/AuthContext.tsx` turns the Google wallet connection into the
  website's logged-in state.
- `src/pages/AuthPage.tsx` is Member 2's login screen connected to zkLogin.
- `src/lib/shieldpass-contract.ts` builds Member 3's `create_pass` transaction.
- `src/lib/use-sui-transaction.ts` sends the transaction and creates clear
  success/error states.
- `src/pages/CreatePassPage.tsx` connects the frontend form to the Move call.

## Put this corrected version into the GitHub integration branch

Test it first. Then copy the extracted files into the existing cloned
`ShieldPass` repository while it is on the `integration` branch. Allow Windows
to replace files with the same names. Delete the old root-level `app`,
`components` and `lib` folders because they were the unused Next.js version.

Run:

```powershell
git switch integration
git status
npm.cmd install
npm.cmd run build
git add .
git status
git commit -m "Connect Vite frontend with zkLogin and Sui contract"
git push
```

Check `git status` before committing and make sure `.env.local` is not listed.

