import { createContext, useContext, useState } from 'react';
import { type User, type ShieldPass } from '../types';
import { mockUser, mockPasses } from '../data/mockData';

interface AuthContextType {
  user: User | null;
  passes: ShieldPass[];
  isAuthenticated: boolean;
  login: (name?: string) => void;
  logout: () => void;
  updateUser: (user: User) => void;
  addPass: (pass: ShieldPass) => void;
  updatePass: (pass: ShieldPass) => void;
  disablePass: (passId: string) => void;
  simulateCharge: (passId: string, merchant: string, amount: number) => void;
  getPasses: (status?: string) => ShieldPass[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [passes, setPasses] = useState<ShieldPass[]>(mockPasses);

  const login = (name?: string) => {
    setUser(name ? { ...mockUser, name } : mockUser);
    setPasses(mockPasses);
  };

  const logout = () => {
    setUser(null);
    setPasses([]);
  };

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
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
        isAuthenticated: user !== null,
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
