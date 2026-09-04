'use client';

import { useState } from 'react';
import { useDAppKit } from '@mysten/dapp-kit-react';
import { useMutation } from '@tanstack/react-query';
import type { Transaction } from '@mysten/sui/transactions';

export type Notice = {
  type: 'success' | 'error';
  message: string;
  digest?: string;
} | null;

type ExecutionResult = {
  Transaction?: { digest: string };
  FailedTransaction?: { status?: { error?: { message?: string } } };
  digest?: string;
};

function friendlyError(error: unknown) {
  const raw = error instanceof Error ? error.message : String(error);
  const lower = raw.toLowerCase();

  if (lower.includes('rejected') || lower.includes('denied') || lower.includes('cancel')) {
    return 'The transaction was cancelled before signing.';
  }
  if (lower.includes('insufficient') || lower.includes('gas coin')) {
    return 'Not enough Testnet SUI. Request tokens from the Sui faucet.';
  }
  if (lower.includes('not_merchant') || lower.includes('enotmerchant')) {
    return 'This wallet is not the approved merchant.';
  }
  if (lower.includes('expired') || lower.includes('eexpired')) {
    return 'This ShieldPass has expired.';
  }
  if (lower.includes('too_large') || lower.includes('chargetoolarge')) {
    return 'The requested amount exceeds the ShieldPass charge limit.';
  }

  return 'Transaction failed. Check the Google account, Testnet balance and contract details.';
}

export function useSuiTransaction() {
  const dAppKit = useDAppKit();
  const [notice, setNotice] = useState<Notice>(null);

  const mutation = useMutation({
    mutationFn: async ({
      transaction,
      successMessage,
    }: {
      transaction: Transaction;
      successMessage: string;
    }) => {
      setNotice(null);

      const result = (await dAppKit.signAndExecuteTransaction({
        transaction,
        network: 'testnet',
      })) as ExecutionResult;

      if (result.FailedTransaction) {
        throw new Error(
          result.FailedTransaction.status?.error?.message ?? 'Sui transaction failed.',
        );
      }

      const digest = result.Transaction?.digest ?? result.digest;
      if (!digest) throw new Error('No transaction digest was returned.');

      return { digest, successMessage };
    },
    onSuccess: ({ digest, successMessage }) => {
      setNotice({ type: 'success', message: successMessage, digest });
    },
    onError: (error) => {
      setNotice({ type: 'error', message: friendlyError(error) });
    },
  });

  return {
    execute: mutation.mutateAsync,
    isProcessing: mutation.isPending,
    notice,
    clearNotice: () => setNotice(null),
  };
}
