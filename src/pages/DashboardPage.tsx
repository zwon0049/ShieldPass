import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Button, EmptyState, PassCard, SimulateChargeDialog } from '../components';
import { Plus, ArrowUpDown } from 'lucide-react';

interface DashboardPageProps {
  onCreatePass: () => void;
  onViewPass: (passId: string) => void;
}

type SortBy = 'newest' | 'oldest';

export function DashboardPage({ onCreatePass, onViewPass }: DashboardPageProps) {
  const { passes, simulateCharge } = useAuth();
  const [filterStatus, setFilterStatus] = useState<'all' | 'Active' | 'Used' | 'Expired' | 'Disabled'>('all');
  const [sortBy, setSortBy] = useState<SortBy>('newest');
  const [simulatorPassId, setSimulatorPassId] = useState<string | null>(null);

  const filteredPasses = filterStatus === 'all' ? passes : passes.filter(p => p.status === filterStatus);

  // Sort passes by creation date
  const sortedPasses = [...filteredPasses].sort((a, b) => {
    const dateA = new Date(a.createdDate).getTime();
    const dateB = new Date(b.createdDate).getTime();
    return sortBy === 'newest' ? dateB - dateA : dateA - dateB;
  });

  const stats = {
    total: passes.length,
    active: passes.filter(p => p.status === 'Active').length,
    used: passes.filter(p => p.status === 'Used').length,
    expired: passes.filter(p => p.status === 'Expired').length,
    disabled: passes.filter(p => p.status === 'Disabled').length,
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Manage and monitor all your ShieldPasses</p>
          </div>
          <Button size="lg" onClick={onCreatePass} icon={<Plus className="w-5 h-5" />}>Create New Pass</Button>
        </div>

        {/* Statistics */}
        <div className="grid md:grid-cols-5 gap-4 mb-12">
          {[
            { label: 'Total Passes', value: stats.total, color: 'indigo' },
            { label: 'Active', value: stats.active, color: 'green' },
            { label: 'Used', value: stats.used, color: 'yellow' },
            { label: 'Expired', value: stats.expired, color: 'red' },
            { label: 'Disabled', value: stats.disabled, color: 'gray' },
          ].map((stat, i) => (
            <div
              key={i}
              className={`p-6 rounded-xl bg-${stat.color}-50 dark:bg-${stat.color}-900/20 border border-${stat.color}-200 dark:border-${stat.color}-800`}
            >
              <p className={`text-sm font-medium text-${stat.color}-700 dark:text-${stat.color}-400 uppercase tracking-wider`}>
                {stat.label}
              </p>
              <p className={`text-3xl font-bold text-${stat.color}-600 dark:text-${stat.color}-400 mt-2`}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Filters and Sort */}
        <div className="mb-8 space-y-4">
          {/* Status Filters */}
          <div className="flex flex-wrap gap-2">
            {['all', 'Active', 'Used', 'Expired', 'Disabled'].map(status => (
              <button
                key={status}
                onClick={() => setFilterStatus(status as 'all' | 'Active' | 'Used' | 'Expired' | 'Disabled')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filterStatus === status
                    ? 'bg-indigo-600 text-white dark:bg-indigo-500'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                {status === 'all' ? 'All' : status}
              </button>
            ))}
          </div>

          {/* Sort Options */}
          <div className="flex items-center gap-2">
            <ArrowUpDown className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Sort by:</span>
            <div className="flex gap-2">
              <button
                onClick={() => setSortBy('newest')}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  sortBy === 'newest'
                    ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                Newest First
              </button>
              <button
                onClick={() => setSortBy('oldest')}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  sortBy === 'oldest'
                    ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                Oldest First
              </button>
            </div>
          </div>
        </div>

        {/* Passes Grid */}
        {sortedPasses.length === 0 ? (
          <EmptyState
            icon="🛡️"
            title={filterStatus === 'all' ? 'No passes yet' : `No ${filterStatus.toLowerCase()} passes`}
            description={
              filterStatus === 'all'
                ? 'Create your first ShieldPass to get started protecting your subscriptions.'
                : `You don't have any ${filterStatus.toLowerCase()} passes at the moment.`
            }
            action={<Button onClick={onCreatePass}>Create Your First Pass</Button>}
          />
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedPasses.map(pass => (
              <PassCard
                key={pass.id}
                pass={pass}
                onClick={() => onViewPass(pass.id)}
                onSimulate={() => setSimulatorPassId(pass.id)}
              />
            ))}
          </div>
        )}
      </div>
      <SimulateChargeDialog
        open={simulatorPassId !== null}
        pass={passes.find(currentPass => currentPass.id === simulatorPassId) ?? null}
        onClose={() => setSimulatorPassId(null)}
        onSimulate={(merchant, amount) => {
          const pass = passes.find(currentPass => currentPass.id === simulatorPassId);
          if (pass) simulateCharge(pass.id, merchant, amount);
        }}
      />
    </div>
  );
}
