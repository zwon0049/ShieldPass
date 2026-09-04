import { Transaction } from '@mysten/sui/transactions';

export const SHIELDPASS_PACKAGE_ID =
  import.meta.env.VITE_SHIELDPASS_PACKAGE_ID ||
  '0xb0761fc1fc88160d64b8a9ef9711aa820215e86b1552d0c03ca562faf2a192b0';

export const SHIELDPASS_MODULE = 'pass';
export const CLOCK_ID = '0x6';
const SUI_COIN_TYPE = '0x2::sui::SUI';
const MIST_PER_SUI = 1_000_000_000n;

export function suiToMist(value: string): bigint {
  const cleaned = value.trim();

  if (!/^\d+(\.\d{0,9})?$/.test(cleaned)) {
    throw new Error('Enter a valid SUI amount with no more than 9 decimal places.');
  }

  const [wholePart, decimalPart = ''] = cleaned.split('.');
  return BigInt(wholePart) * MIST_PER_SUI + BigInt(decimalPart.padEnd(9, '0') || '0');
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

  // This selects SUI owned by the signed-in user, not Enoki's sponsored gas coin.
  const depositCoin = tx.coin({
    type: SUI_COIN_TYPE,
    balance: depositMist,
    useGasCoin: false,
  });

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

