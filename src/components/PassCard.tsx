import { type ShieldPass } from '../types';
import { Card, CardBody } from './Card';
import { PassStatusBadge } from './Badge';
import { ArrowRight, Play } from 'lucide-react';
import { formatSui } from '../types';

interface PassCardProps {
  pass: ShieldPass;
  onClick: () => void;
  onSimulate: () => void;
}

export function PassCard({ pass, onClick, onSimulate }: PassCardProps) {
  const chargesRemaining = pass.maxCharges - pass.chargesUsed;

  return (
    <Card
      variant="elevated"
      className="cursor-pointer hover:-translate-y-1 active:translate-y-0"
      onClick={onClick}
    >
      <CardBody className="space-y-4 bg-gradient-to-br from-indigo-700 via-indigo-600 to-slate-900 text-white">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-widest text-indigo-200">ShieldPass {pass.id}</p>
            <h2 className="mt-1 text-2xl font-bold tracking-tight">{pass.label}</h2>
          </div>
          <PassStatusBadge status={pass.status} />
        </div>

        <div className="grid grid-cols-2 gap-4 border-y border-white/20 py-4">
          <div>
            <p className="text-xs uppercase tracking-wider text-indigo-200">Balance Remaining</p>
            <p className="mt-1 text-lg font-bold">{formatSui(pass.spendLimit * chargesRemaining)}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-indigo-200">Max Charge</p>
            <p className="mt-1 text-lg font-bold">{formatSui(pass.spendLimit)}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 text-xs text-indigo-100">
          <p>Charges: <strong>{pass.chargesUsed}/{pass.maxCharges}</strong></p>
          <p>Expires: <strong>{pass.expiryDate}</strong></p>
          <p>Created: <strong>{pass.createdDate}</strong></p>
          <p className="col-span-2 truncate">Merchant: <strong>{pass.merchantAddress}</strong></p>
        </div>

        <div className="flex items-center justify-between border-t border-white/20 pt-3">
          <button
            type="button"
            onClick={event => { event.stopPropagation(); onSimulate(); }}
            className="inline-flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-sm font-semibold text-indigo-700 transition hover:bg-indigo-50"
          >
            <Play className="h-4 w-4" /> Simulate Charge
          </button>
          <ArrowRight className="h-4 w-4 text-indigo-200" />
        </div>
      </CardBody>
    </Card>
  );
}

export function PassCardSkeleton() {
  return (
    <Card variant="elevated">
      <CardBody className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex-1 space-y-2">
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-24 animate-pulse" />
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-32 animate-pulse" />
          </div>
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-24 animate-pulse" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        </div>

        <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-40 animate-pulse" />
      </CardBody>
    </Card>
  );
}
