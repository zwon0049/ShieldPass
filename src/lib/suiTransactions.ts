import { Transaction } from '@mysten/sui/transactions';
import { SHIELDPASS_PACKAGE_ID, SUI_CLOCK_OBJECT_ID } from '@/config/sui';

/**
 * 1. Create a ShieldPass: Locks funds, sets merchant, cap, and duration
 */
export function buildCreatePassTx(
  merchantAddress: string,
  depositMist: bigint,
  maxChargeMist: bigint,
  durationDays: number = 7
) {
  const tx = new Transaction();
  const durationMs = durationDays * 24 * 60 * 60 * 1000;

  // Split the pass budget from the user's gas coin
  const [depositCoin] = tx.splitCoins(tx.gas, [tx.pure.u64(depositMist)]);

  tx.moveCall({
    target: `${SHIELDPASS_PACKAGE_ID}::pass::create_pass`,
    arguments: [
      tx.pure.address(merchantAddress),
      depositCoin,
      tx.pure.u64(maxChargeMist),
      tx.pure.u64(durationMs),
      tx.object(SUI_CLOCK_OBJECT_ID),
    ],
  });

  return tx;
}

/**
 * 2. Charge the Pass: Used by the Simulator for both valid and sneaky charges
 */
export function buildChargePassTx(
  passObjectId: string,
  chargeAmountMist: bigint
) {
  const tx = new Transaction();

  tx.moveCall({
    target: `${SHIELDPASS_PACKAGE_ID}::pass::charge_pass`,
    arguments: [
      tx.object(passObjectId),
      tx.pure.u64(chargeAmountMist),
      tx.object(SUI_CLOCK_OBJECT_ID),
    ],
  });

  return tx;
}

/**
 * 3. Burn/Cancel Pass: Deletes the object and refunds remaining balance to owner
 */
export function buildBurnPassTx(passObjectId: string) {
  const tx = new Transaction();

  tx.moveCall({
    target: `${SHIELDPASS_PACKAGE_ID}::pass::burn_pass`,
    arguments: [
      tx.object(passObjectId),
    ],
  });

  return tx;
}
