'use client';

import { useEffect, useState } from 'react';
import {
  useCurrentAccount,
  useCurrentWallet,
  useDAppKit,
  useWallets,
} from '@mysten/dapp-kit-react';
import { isGoogleWallet } from '@mysten/enoki';
import { isEnokiConfigured } from '@/lib/dapp-kit';

function shorten(address: string) {
  return `${address.slice(0, 8)}…${address.slice(-6)}`;
}

function friendlyError(error: unknown) {
  if (!(error instanceof Error)) return 'Google sign-in could not be completed.';
  if (error.message.toLowerCase().includes('popup')) {
    return 'The sign-in window was closed or blocked. Allow pop-ups and try again.';
  }
  return error.message;
}

export function ZkLoginPanel() {
  const dAppKit = useDAppKit();
  const wallets = useWallets();
  const account = useCurrentAccount();
  const currentWallet = useCurrentWallet();
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [isPreparingGoogle, setIsPreparingGoogle] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const googleWallet = wallets.find(isGoogleWallet);
  const signedInWithGoogle = Boolean(currentWallet && isGoogleWallet(currentWallet));

  // This version is zkLogin-only. Clear any connection remembered by an older
  // version of the demo, then present Google as the only sign-in choice.
  useEffect(() => {
    if (!currentWallet || isGoogleWallet(currentWallet)) return;

    let active = true;
    setIsPreparingGoogle(true);
    dAppKit
      .disconnectWallet()
      .catch((disconnectError) => {
        if (active) setError(friendlyError(disconnectError));
      })
      .finally(() => {
        if (active) setIsPreparingGoogle(false);
      });

    return () => {
      active = false;
    };
  }, [currentWallet, dAppKit]);

  async function signInWithGoogle() {
    if (!googleWallet) return;

    setError(null);
    setIsSigningIn(true);
    try {
      await dAppKit.connectWallet({ wallet: googleWallet });
    } catch (signInError) {
      setError(friendlyError(signInError));
    } finally {
      setIsSigningIn(false);
    }
  }

  async function signOut() {
    setError(null);
    try {
      await dAppKit.disconnectWallet();
    } catch (signOutError) {
      setError(friendlyError(signOutError));
    }
  }

  return (
    <section className="zklogin-card">
      <span className="eyebrow">ENOKI · ZKLOGIN</span>
      <h2>Google sign-in</h2>
      <p className="auth-description">
        Enoki turns a successful Google login into a Sui Testnet account. ShieldPass never
        receives the user&apos;s Google password.
      </p>

      {!isEnokiConfigured ? (
        <div className="setup-box">
          <strong>One-time setup required</strong>
          <p>
            Add the team&apos;s public Enoki API key and Google Client ID to <code>.env.local</code>,
            then restart the development server.
          </p>
        </div>
      ) : signedInWithGoogle && account ? (
        <div className="google-connected">
          <div className="google-mark">G</div>
          <div>
            <span>Google zkLogin address</span>
            <strong title={account.address}>{shorten(account.address)}</strong>
            <small>Sui Testnet · managed through Enoki</small>
          </div>
          <button className="secondary-button" onClick={signOut}>
            Sign out
          </button>
        </div>
      ) : currentWallet && !isGoogleWallet(currentWallet) ? (
        <div className="setup-box">
          <strong>Preparing Google sign-in</strong>
          <p>Removing an earlier local connection…</p>
        </div>
      ) : (
        <button
          className="google-button"
          onClick={signInWithGoogle}
          disabled={!googleWallet || isSigningIn || isPreparingGoogle}
        >
          <span>G</span>
          {isSigningIn ? 'Waiting for Google…' : 'Continue with Google'}
        </button>
      )}

      {isEnokiConfigured && !googleWallet && !currentWallet && (
        <p className="inline-error">Enoki could not load. Check the values in .env.local.</p>
      )}
      {error && <p className="inline-error">{error}</p>}
    </section>
  );
}
