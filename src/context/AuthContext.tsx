import { createContext, useContext, useEffect, useState } from 'react';
import {
  useCurrentAccount,
  useCurrentWallet,
  useDAppKit,
  useWallets,
} from '@mysten/dapp-kit-react';
import { isGoogleWallet } from '@mysten/enoki';
import { type User, type ShieldPass } from '../types';
import { mockUser, mockPasses } from '../data/mockData';
import { isEnokiConfigured } from '../lib/dapp-kit';

interface AuthContextType {
  user: User | null;
  passes: ShieldPass[];
  isAuthenticated: boolean;
  walletAddress: string | null;
  login: (name?: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (user: User) => void;
  addPass: (pass: ShieldPass) => void;
  updatePass: (pass: ShieldPass) => void;
  disablePass: (passId: string) => void;
  simulateCharge: (passId: string, merchant: string, amount: number) => void;
  getPasses: (status?: string) => ShieldPass[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const dAppKit = useDAppKit();
  const wallets = useWallets();
  const account = useCurrentAccount();
  const currentWallet = useCurrentWallet();
  const [passes, setPasses] = useState<ShieldPass[]>(mockPasses);
  const [profile, setProfile] = useState<User>({
    ...mockUser,
    id: '',
    name: 'Google zkLogin user',
    email: 'Connected through Google zkLogin',
    avatar: undefined,
  });

  const googleWallet = wallets.find(isGoogleWallet);
  const signedInWithGoogle = Boolean(
    account && currentWallet && isGoogleWallet(currentWallet),
  );
  const user = signedInWithGoogle && account
    ? { ...profile, id: account.address }
    : null;

  // The demo intentionally supports Google zkLogin only. If an older version
  // remembered another wallet, clear it instead of treating it as a login.
  useEffect(() => {
    if (currentWallet && !isGoogleWallet(currentWallet)) {
      void dAppKit.disconnectWallet();
    }
  }, [currentWallet, dAppKit]);

  const login = async (name?: string) => {
    if (!isEnokiConfigured) {
      throw new Error('Enoki setup is missing. Create .env.local, then restart the app.');
    }
    if (!googleWallet) {
      throw new Error('Google sign-in is still loading. Wait a moment and try again.');
    }

    if (name?.trim()) {
      setProfile(currentProfile => ({ ...currentProfile, name: name.trim() }));
    }
    setPasses(mockPasses);
    await dAppKit.connectWallet({ wallet: googleWallet });
  };

  const logout = async () => {
    await dAppKit.disconnectWallet();
    setPasses([]);
  };

  const updateUser = (updatedUser: User) => {
    setProfile(updatedUser);
  };

  const addPass = (pass: ShieldPass) => {
    setPasses([pass, ...passes]);
  };

  const updatePass = (updatedPass: ShieldPass) => {
    setPasses(passes.map(p => (p.id === updatedPass.id ? updatedPass : p)));
  };

  const disablePass = (passId: string) => {
    setPasses(currentPasses => currentPasses.map(pass => (
      pass.id === passId && pass.status === 'Active'
        ? { ...pass, status: 'Disabled' }
        : pass
    )));
  };

  const simulateCharge = (passId: string, merchant: string, amount: number) => {
    setPasses(currentPasses => currentPasses.map(pass => {
      if (pass.id !== passId) return pass;

      const isAllowed = pass.status === 'Active'
        && pass.chargesUsed < pass.maxCharges
        && amount <= pass.spendLimit;
      const reason = pass.status !== 'Active'
        ? `Pass is ${pass.status.toLowerCase()}.`
        : pass.chargesUsed >= pass.maxCharges
          ? 'No charges remain on this pass.'
          : `Amount exceeds the ${pass.spendLimit.toFixed(2)} SUI per-charge limit.`;
      const charge = {
        id: `charge-${Date.now()}`,
        merchant,
        amount,
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
        status: isAllowed ? 'Successful' as const : 'Blocked' as const,
        ...(isAllowed ? {} : { reason }),
      };

      return {
        ...pass,
        chargesUsed: isAllowed ? pass.chargesUsed + 1 : pass.chargesUsed,
        charges: [charge, ...pass.charges],
        status: isAllowed && pass.chargesUsed + 1 >= pass.maxCharges ? 'Used' as const : pass.status,
      };
    }));
  };

  const getPasses = (status?: string) => {
    if (!status) return passes;
    return passes.filter(p => p.status === status);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        passes,
        isAuthenticated: signedInWithGoogle && user !== null,
        walletAddress: account?.address ?? null,
        login,
        logout,
        updateUser,
        addPass,
        updatePass,
        disablePass,
        simulateCharge,
        getPasses,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
