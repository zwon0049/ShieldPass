import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Card, CardBody, CardHeader, Button, ChargeHistory, ConfirmDialog, Toast } from '../components';
import { PassStatusBadge } from '../components/Badge';
import { formatSui } from '../types';
import { ArrowLeft, Copy, Calendar, CreditCard, Zap, Power } from 'lucide-react';

interface PassDetailPageProps {
  passId: string;
  onBack: () => void;
}

export function PassDetailPage({ passId, onBack }: PassDetailPageProps) {
  const { passes, disablePass } = useAuth();
  const pass = passes.find(p => p.id === passId);
  const [showDisableConfirm, setShowDisableConfirm] = useState(false);
  const [showCopied, setShowCopied] = useState(false);
  const [isDisabling, setIsDisabling] = useState(false);

  if (!pass) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Pass not found</h2>
          <Button onClick={onBack}>Go back</Button>
        </div>
      </div>
    );
  }

  const chargesRemaining = pass.maxCharges - pass.chargesUsed;
  const progressPercent = (pass.chargesUsed / pass.maxCharges) * 100;

  const handleCopyId = () => {
    navigator.clipboard.writeText(pass.id);
    setShowCopied(true);
  };

  const handleDisable = () => {
    setIsDisabling(true);
    setTimeout(() => {
      disablePass(pass.id);
      setIsDisabling(false);
      onBack();
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </button>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">{pass.label}</h1>
            <p className="font-mono text-sm text-indigo-600 dark:text-indigo-400 mt-2">{pass.id}</p>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Created on {pass.createdDate}
            </p>
          </div>
          <PassStatusBadge status={pass.status} size="lg" />
        </div>

        {/* Main Details Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Left Column - Key Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Pass Configuration Card */}
            <Card>
              <CardHeader title="Pass Configuration" />
              <CardBody className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Spend Limit */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                      <p className="text-sm uppercase tracking-widest font-semibold text-gray-600 dark:text-gray-400">
                        Per Charge Limit
                      </p>
                    </div>
                    <p className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">
                      {formatSui(pass.spendLimit)}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Maximum allowed for each individual charge
                    </p>
                  </div>

                  {/* Expiry */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                      <p className="text-sm uppercase tracking-widest font-semibold text-gray-600 dark:text-gray-400">
                        Expiry Date
                      </p>
                    </div>
                    <p className="text-4xl font-bold text-purple-600 dark:text-purple-400">
                      {pass.expiryDate}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Pass expires on this date
                    </p>
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* Charges Progress Card */}
            <Card>
              <CardHeader title="Charges Progress" />
              <CardBody className="space-y-6">
                {/* Max Charges Info */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Zap className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                      <span className="font-semibold text-gray-900 dark:text-white">
                        Charges: {pass.chargesUsed} / {pass.maxCharges}
                      </span>
                    </div>
                    {chargesRemaining > 0 && (
                      <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                        {chargesRemaining} remaining
                      </span>
                    )}
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-indigo-500 to-indigo-600 h-full transition-all duration-500"
                      style={{ width: `${Math.min(progressPercent, 100)}%` }}
                    />
                  </div>
                </div>

                {/* Breakdown */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg text-center">
                    <p className="text-xs uppercase tracking-widest font-semibold text-indigo-700 dark:text-indigo-400">
                      Used
                    </p>
                    <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mt-1">
                      {pass.chargesUsed}
                    </p>
                  </div>
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg text-center">
                    <p className="text-xs uppercase tracking-widest font-semibold text-green-700 dark:text-green-400">
                      Remaining
                    </p>
                    <p className="text-3xl font-bold text-green-600 dark:text-green-400 mt-1">
                      {chargesRemaining}
                    </p>
                  </div>
                  <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-center">
                    <p className="text-xs uppercase tracking-widest font-semibold text-purple-700 dark:text-purple-400">
                      Max Possible
                    </p>
                    <p className="text-3xl font-bold text-purple-600 dark:text-purple-400 mt-1">
                      {formatSui(pass.spendLimit * pass.maxCharges)}
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    💡 This pass allows up to {pass.maxCharges} {pass.maxCharges === 1 ? 'charge' : 'charges'} with a maximum of <strong>{formatSui(pass.spendLimit)}</strong> per individual charge.
                  </p>
                </div>
              </CardBody>
            </Card>

            {/* Charge History */}
            <ChargeHistory charges={pass.charges} />
          </div>

          {/* Right Column - Quick Actions */}
          <div className="space-y-4">
            <Card>
              <CardHeader title="Quick Actions" />
              <CardBody className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-center"
                  onClick={handleCopyId}
                  icon={<Copy className="w-4 h-4" />}
                >
                  Copy Pass ID
                </Button>
                {pass.status === 'Active' && (
                  <Button
                    variant="secondary"
                    className="w-full justify-center"
                    onClick={() => setShowDisableConfirm(true)}
                    icon={<Power className="w-4 h-4" />}
                  >
                    Disable Pass
                  </Button>
                )}
              </CardBody>
            </Card>

            {/* Status Card */}
            <Card>
              <CardHeader title="Status Overview" />
              <CardBody className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${pass.status === 'Active' ? 'bg-green-600' : pass.status === 'Used' ? 'bg-yellow-600' : pass.status === 'Disabled' ? 'bg-gray-500' : 'bg-red-600'}`} />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Status: <strong>{pass.status}</strong>
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-indigo-600" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      ID: <code className="font-mono text-xs">{pass.id}</code>
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-purple-600" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate">
                      Merchant: <strong>{pass.merchantAddress}</strong>
                    </span>
                  </div>
                </div>

              </CardBody>
            </Card>

            {/* Info Card */}
            <Card>
              <CardBody>
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border-l-4 border-blue-400">
                  <p className="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-2">ℹ️ How It Works</p>
                  <p className="text-xs text-blue-800 dark:text-blue-400 leading-relaxed">
                    This pass will automatically block any transaction that exceeds {formatSui(pass.spendLimit)} per charge, regardless of the total amount.
                  </p>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>

      {/* Disable Confirmation */}
      <ConfirmDialog
        open={showDisableConfirm}
        onClose={() => setShowDisableConfirm(false)}
        onConfirm={handleDisable}
        title="Disable ShieldPass?"
        description={`Are you sure you want to disable ${pass.id}? Disabled passes remain available for your records but can no longer be used.`}
        confirmText="Disable"
        cancelText="Cancel"
        isDangerous
        isLoading={isDisabling}
      />

      {/* Toast Notification */}
      <Toast
        open={showCopied}
        type="success"
        message="Pass ID copied to clipboard!"
        onClose={() => setShowCopied(false)}
      />
    </div>
  );
}
