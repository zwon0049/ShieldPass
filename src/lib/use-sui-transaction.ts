import { useState } from 'react';
import { useDAppKit } from '@mysten/dapp-kit-react';
import { useMutation } from '@tanstack/react-query';
import type { Transaction } from '@mysten/sui/transactions';

export type TransactionNotice = {
  type: 'success' | 'error';
  message: string;
  digest?: string;
} | null;

function friendlyError(error: unknown): string {
  const raw = error instanceof Error ? error.message : String(error);
  const lower = raw.toLowerCase();

  if (lower.includes('rejected') || lower.includes('denied') || lower.includes('cancel')) {
    return 'The transaction was cancelled before signing.';
  }
  if (lower.includes('insufficient') || lower.includes('balance') || lower.includes('coin')) {
    return 'Not enough Testnet SUI. Fund the zkLogin address from the Sui faucet, then retry.';
  }
  if (lower.includes('invalid') && lower.includes('address')) {
    return 'The merchant wallet address is not valid.';
  }

  return `Transaction failed: ${raw}`;
}

export function useSuiTransaction() {
  const dAppKit = useDAppKit();
  const [notice, setNotice] = useState<TransactionNotice>(null);

  const mutation = useMutation({
    mutationFn: async ({
      transaction,
      successMessage,
    }: {
      transaction: Transaction;
      successMessage: string;
    }) => {
      setNotice(null);
      const result = await dAppKit.signAndExecuteTransaction({
        transaction,
        network: 'testnet',
      });

      if (result.FailedTransaction) {
        throw new Error(
          result.FailedTransaction.status.error?.message || 'Sui transaction failed.',
        );
      }

      return { digest: result.Transaction.digest, successMessage };
    },
    onSuccess: ({ digest, successMessage }) => {
      setNotice({ type: 'success', message: successMessage, digest });
    },
    onError: error => {
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

