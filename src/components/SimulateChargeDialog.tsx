import { useState } from 'react';
import { CheckCircle2, CreditCard, XCircle, Zap } from 'lucide-react';
import { formatSui, type ShieldPass } from '../types';
import { Button } from './Button';
import { Dialog } from './Dialog';

interface SimulateChargeDialogProps {
  open: boolean;
  pass: ShieldPass | null;
  onClose: () => void;
  onSimulate: (merchant: string, amount: number) => void;
}

export function SimulateChargeDialog({ open, pass, onClose, onSimulate }: SimulateChargeDialogProps) {
  const [amount, setAmount] = useState('');

  const numericAmount = Number(amount);
  const hasAmount = amount !== '' && Number.isFinite(numericAmount) && numericAmount >= 0;
  const canPass = Boolean(
    pass &&
    hasAmount &&
    pass.status === 'Active' &&
    pass.chargesUsed < pass.maxCharges &&
    numericAmount <= pass.spendLimit
  );
  const hasResult = hasAmount && Boolean(pass);

  const failureReason = pass?.status !== 'Active'
    ? `This pass is ${pass?.status.toLowerCase()}.`
    : pass.chargesUsed >= pass.maxCharges
      ? 'This pass has no charges remaining.'
      : numericAmount > (pass?.spendLimit ?? 0)
        ? `The amount exceeds the ${pass?.spendLimit.toFixed(2)} SUI per-charge limit.`
        : '';

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title="Simulate a charge"
      description="Test a subscription charge against this pass. Recording the simulation updates the count and history."
      size="md"
    >
      <div className="space-y-5">
        <div className="rounded-lg bg-indigo-50 px-4 py-3 text-sm text-indigo-800">
          <strong>{pass?.label}</strong> ({pass?.id}) · {pass?.merchantAddress}
        </div>

        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200">
          Charge amount (SUI)
          <div className="relative mt-2">
            <CreditCard className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <span className="absolute left-10 top-1/2 -translate-y-1/2 text-xs text-gray-500">SUI</span>
            <input
              type="number"
              min="0"
              step="0.01"
              value={amount}
              onChange={event => setAmount(event.target.value)}
              placeholder="0.00"
              className="w-full rounded-lg border-2 border-gray-300 bg-white py-3 pl-16 pr-4 font-normal text-gray-900 outline-none transition focus:border-indigo-500"
            />
          </div>
        </label>

        {pass && (
          <div className="flex items-center gap-2 rounded-lg bg-indigo-50 px-4 py-3 text-sm text-indigo-800">
            <Zap className="h-4 w-4 shrink-0" />
            <span>
              {pass.chargesUsed} of {pass.maxCharges} charges used · {pass.spendLimit.toFixed(2)} SUI maximum per charge
            </span>
          </div>
        )}

        {hasResult && (
          <div className={`rounded-xl border-2 p-4 ${canPass ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`} role="status">
            <div className="flex items-start gap-3">
              {canPass ? <CheckCircle2 className="h-6 w-6 shrink-0 text-green-600" /> : <XCircle className="h-6 w-6 shrink-0 text-red-600" />}
              <div>
                <p className={`font-bold ${canPass ? 'text-green-800' : 'text-red-800'}`}>
                  {canPass ? `${pass?.label} charge would pass` : `${pass?.label} charge would fail`}
                </p>
                <p className={`mt-1 text-sm ${canPass ? 'text-green-700' : 'text-red-700'}`}>
                  {canPass ? `${formatSui(numericAmount)} is within this pass's limits.` : failureReason}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-end gap-3 pt-2">
          <Button
            type="button"
            onClick={() => pass && hasResult && onSimulate(pass.label, numericAmount)}
            disabled={!hasResult}
          >
            Record Simulation
          </Button>
          <Button type="button" variant="secondary" onClick={onClose}>Close</Button>
        </div>
      </div>
    </Dialog>
  );
}