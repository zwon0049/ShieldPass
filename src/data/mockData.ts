import { type ShieldPass, type User } from '../types';

// Mock user data
export const mockUser: User = {
  id: 'user-001',
  name: 'Sarah Johnson',
  email: 'sarah@example.com',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
  theme: 'light',
};

// Mock ShieldPass data
export const mockPasses: ShieldPass[] = [
  {
    id: '#001',
    label: 'Netflix',
    merchantAddress: '0x7a3f...91c2',
    status: 'Active',
    spendLimit: 5,
    expiryDate: 'Sept 8, 2026',
    chargesUsed: 0,
    maxCharges: 1,
    createdDate: 'Aug 25, 2026',
    charges: [],
  },
  {
    id: '#002',
    label: 'Spotify Premium',
    merchantAddress: '0x3b82...4e19',
    status: 'Used',
    spendLimit: 10,
    expiryDate: 'Sept 1, 2026',
    chargesUsed: 1,
    maxCharges: 1,
    createdDate: 'Aug 18, 2026',
    charges: [
      {
        id: 'charge-001',
        merchant: 'Netflix',
        amount: 9.99,
        date: 'Aug 30, 2026',
        status: 'Successful',
      },
    ],
  },
  {
    id: '#003',
    label: 'Disney+',
    merchantAddress: '0x9d11...c805',
    status: 'Expired',
    spendLimit: 3,
    expiryDate: 'Aug 25, 2026',
    chargesUsed: 0,
    maxCharges: 2,
    createdDate: 'Aug 10, 2026',
    charges: [],
  },
  {
    id: '#004',
    label: 'Spotify Premium',
    merchantAddress: '0x3b82...4e19',
    status: 'Active',
    spendLimit: 15,
    expiryDate: 'Sept 15, 2026',
    chargesUsed: 2,
    maxCharges: 3,
    createdDate: 'Aug 20, 2026',
    charges: [
      {
        id: 'charge-002',
        merchant: 'Spotify',
        amount: 5.99,
        date: 'Aug 28, 2026',
        status: 'Successful',
      },
      {
        id: 'charge-003',
        merchant: 'Disney+',
        amount: 12.99,
        date: 'Aug 29, 2026',
        status: 'Blocked',
        reason: 'Exceeded per-charge limit of $15',
      },
    ],
  },
  {
    id: '#005',
    label: 'Disney+',
    merchantAddress: '0x9d11...c805',
    status: 'Active',
    spendLimit: 20,
    expiryDate: 'Sept 20, 2026',
    chargesUsed: 0,
    maxCharges: 5,
    createdDate: 'Aug 22, 2026',
    charges: [],
  },
];
