import { formatSui, type Charge } from '../types';
import { Card, CardBody, CardHeader } from './Card';
import { Badge } from './Badge';
import { Check, X } from 'lucide-react';
import { EmptyState } from './Dialog';

interface ChargeHistoryProps {
  charges: Charge[];
}

export function ChargeHistory({ charges }: ChargeHistoryProps) {
  if (charges.length === 0) {
    return (
      <Card>
        <CardBody>
          <EmptyState
            icon="📋"
            title="No charges yet"
            description="This pass hasn't been used for any transactions."
          />
        </CardBody>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader title="Charge History" description={`${charges.length} transaction${charges.length !== 1 ? 's' : ''}`} />
      <CardBody className="divide-y divide-gray-200 dark:divide-gray-700">
        {charges.map(charge => (
          <ChargeHistoryItem key={charge.id} charge={charge} />
        ))}
      </CardBody>
    </Card>
  );
}

interface ChargeHistoryItemProps {
  charge: Charge;
}

function ChargeHistoryItem({ charge }: ChargeHistoryItemProps) {
  const isBlocked = charge.status === 'Blocked';

  return (
    <div className={`py-4 first:pt-0 last:pb-0 ${isBlocked ? 'bg-red-50/50 dark:bg-red-900/10 px-4 py-4 rounded-lg -mx-4 px-4' : ''}`}>
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <p className="font-semibold text-gray-900 dark:text-white truncate">{charge.merchant}</p>
            {isBlocked && (
              <Badge variant="danger" size="sm">
                Blocked
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <span>{charge.date}</span>
            {isBlocked && charge.reason && (
              <span className="text-red-600 dark:text-red-400 font-medium">• {charge.reason}</span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className={`font-semibold text-lg ${isBlocked ? 'text-red-600 dark:text-red-400 line-through' : 'text-green-600 dark:text-green-400'}`}>
              {formatSui(charge.amount)}
            </p>
          </div>

          {isBlocked ? (
            <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center flex-shrink-0">
              <X className="w-4 h-4 text-red-600 dark:text-red-400" />
            </div>
          ) : (
            <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
              <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
