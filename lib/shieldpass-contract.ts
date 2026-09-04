import { Transaction } from '@mysten/sui/transactions';

// Member 3's published Sui Testnet contract. This value is public.
// If Member 3 republishes the contract, update NEXT_PUBLIC_SHIELDPASS_PACKAGE_ID.
export const SHIELDPASS_PACKAGE_ID =
  process.env.NEXT_PUBLIC_SHIELDPASS_PACKAGE_ID ??
  '0xb0761fc1fc88160d64b8a9ef9711aa820215e86b1552d0c03ca562faf2a192b0';

export const SHIELDPASS_MODULE = 'pass';
export const CLOCK_ID = '0x6';
const MIST_PER_SUI = 1_000_000_000n;

/** Convert a value such as "0.05" SUI into MIST without floating-point rounding. */
export function suiToMist(value: string) {
  const cleaned = value.trim();

  if (!/^\d+(\.\d{0,9})?$/.test(cleaned)) {
    throw new Error('Enter a valid SUI amount with no more than 9 decimal places.');
  }

  const [wholePart, decimalPart = ''] = cleaned.split('.');
  const paddedDecimal = decimalPart.padEnd(9, '0');

  return BigInt(wholePart) * MIST_PER_SUI + BigInt(paddedDecimal || '0');
}

export function buildCreatePassTx({
  merchantAddress,
  depositMist,
  maxChargeMist,
  durationDays,
}: {
  merchantAddress: string;
  depositMist: bigint;
  maxChargeMist: bigint;
  durationDays: number;
}) {
  const tx = new Transaction();
  const durationMs = BigInt(durationDays) * 24n * 60n * 60n * 1_000n;

  // Lock this amount of Testnet SUI inside the new ShieldPass.
  const [depositCoin] = tx.splitCoins(tx.gas, [tx.pure.u64(depositMist)]);

  tx.moveCall({
    target: `${SHIELDPASS_PACKAGE_ID}::${SHIELDPASS_MODULE}::create_pass`,
    arguments: [
      tx.pure.address(merchantAddress),
      depositCoin,
      tx.pure.u64(maxChargeMist),
      tx.pure.u64(durationMs),
      tx.object(CLOCK_ID),
    ],
  });

  return tx;
}
