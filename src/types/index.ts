// User types
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  theme: 'light' | 'dark' | 'system';
}

// ShieldPass types
export type PassStatus = 'Active' | 'Used' | 'Expired' | 'Disabled';

export interface ShieldPass {
  id: string;
  label: string;
  merchantAddress: string;
  status: PassStatus;
  spendLimit: number;
  expiryDate: string;
  chargesUsed: number;
  maxCharges: number;
  createdDate: string;
  charges: Charge[];
}

export interface Charge {
  id: string;
  merchant: string;
  amount: number;
  date: string;
  status: 'Successful' | 'Blocked';
  reason?: string;
}

export const SUI_TO_USD = 1.25;

export function formatSui(amount: number): string {
  return `${amount.toFixed(2)} SUI ($${(amount * SUI_TO_USD).toFixed(2)} USD)`;
}

// Form types
export interface CreatePassFormData {
  spendLimit: number;
  expiryDays: number;
  maxCharges: number;
}
