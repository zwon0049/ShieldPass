import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Card, CardBody, CardHeader, CardFooter, Input, Select, Button, Form, FormGroup, Toast } from '../components';
import { formatSui, type ShieldPass } from '../types';

interface CreatePassPageProps {
  onPassCreated: () => void;
}

export function CreatePassPage({ onPassCreated }: CreatePassPageProps) {
  const { addPass } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    label: '',
    merchantAddress: '',
    spendLimit: '',
    expiryDays: '',
    maxCharges: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.label.trim()) newErrors.label = 'Enter the subscription name';
    if (!formData.merchantAddress.trim()) newErrors.merchantAddress = 'Enter the merchant address';

    if (!formData.spendLimit || parseFloat(formData.spendLimit) <= 0) {
      newErrors.spendLimit = 'Spend limit must be greater than 0';
    }

    if (!formData.expiryDays || parseInt(formData.expiryDays) <= 0) {
      newErrors.expiryDays = 'Please select an expiry duration';
    }

    if (!formData.maxCharges || parseInt(formData.maxCharges) <= 0) {
      newErrors.maxCharges = 'Please select maximum charges';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const generatePassId = (): string => {
    const num = Math.floor(Math.random() * 9000) + 1000;
    return `#${num.toString()}`;
  };

  const getExpiryDate = (days: number): string => {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const newPass: ShieldPass = {
        id: generatePassId(),
        label: formData.label.trim(),
        merchantAddress: formData.merchantAddress.trim(),
        status: 'Active',
        spendLimit: parseFloat(formData.spendLimit),
        expiryDate: getExpiryDate(parseInt(formData.expiryDays)),
        chargesUsed: 0,
        maxCharges: parseInt(formData.maxCharges),
        createdDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
        charges: [],
      };

      addPass(newPass);
      setIsLoading(false);
      setShowSuccess(true);

      // Reset form
      setFormData({
        label: '',
        merchantAddress: '',
        spendLimit: '',
        expiryDays: '',
        maxCharges: '',
      });

      setTimeout(() => {
        onPassCreated();
      }, 1500);
    }, 800);
  };

  const spendLimit = formData.spendLimit ? parseFloat(formData.spendLimit) : 0;
  const maxCharges = formData.maxCharges ? parseInt(formData.maxCharges) : 0;
  const maxTotal = spendLimit * maxCharges;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Create a New ShieldPass</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Set up your protection in 3 simple steps</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader title="Pass Configuration" />
              <Form onSubmit={handleSubmit}>
                <CardBody className="space-y-6">
                  <FormGroup>
                    <Input
                      label="Subscription Name"
                      name="label"
                      type="text"
                      placeholder="e.g. Netflix"
                      value={formData.label}
                      onChange={handleChange}
                      error={errors.label}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Input
                      label="Merchant Address"
                      name="merchantAddress"
                      type="text"
                      placeholder="e.g. 0x7a3f...91c2"
                      value={formData.merchantAddress}
                      onChange={handleChange}
                      error={errors.merchantAddress}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Input
                      label="Maximum Amount Per Charge (SUI)"
                      name="spendLimit"
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder="e.g. 10"
                      value={formData.spendLimit}
                      onChange={handleChange}
                      error={errors.spendLimit}
                      hint="This is the maximum amount allowed for each individual charge."
                      icon="SUI"
                      iconPosition="left"
                    />
                  </FormGroup>

                  <FormGroup>
                    <Select
                      label="How Long Should This Pass Remain Valid?"
                      name="expiryDays"
                      value={formData.expiryDays}
                      onChange={handleChange}
                      error={errors.expiryDays}
                      hint="After this period, the pass automatically expires and can't be used"
                      options={[
                        { value: '1', label: '1 Day' },
                        { value: '7', label: '7 Days (1 Week)' },
                        { value: '14', label: '14 Days (2 Weeks)' },
                        { value: '30', label: '30 Days (1 Month)' },
                        { value: '60', label: '60 Days (2 Months)' },
                        { value: '90', label: '90 Days (3 Months)' },
                      ]}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Select
                      label="Maximum Number of Charges Allowed"
                      name="maxCharges"
                      value={formData.maxCharges}
                      onChange={handleChange}
                      error={errors.maxCharges}
                      hint="The merchant can charge this pass this many times before it expires"
                      options={[
                        { value: '1', label: '1 Charge' },
                        { value: '2', label: '2 Charges' },
                        { value: '3', label: '3 Charges' },
                        { value: '5', label: '5 Charges' },
                        { value: '10', label: '10 Charges' },
                      ]}
                    />
                  </FormGroup>
                </CardBody>

                <CardFooter align="right">
                  <Button
                    variant="secondary"
                    size="md"
                    type="reset"
                  >
                    Clear
                  </Button>
                  <Button
                    size="md"
                    type="submit"
                    isLoading={isLoading}
                  >
                    {isLoading ? 'Creating...' : 'Create ShieldPass'}
                  </Button>
                </CardFooter>
              </Form>
            </Card>
          </div>

          {/* Summary Panel */}
          <div>
            <Card variant="outline" className="sticky top-20 border-2 border-indigo-200 dark:border-indigo-800">
              <CardHeader title="Summary" />
              <CardBody className="space-y-6">
                <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-4 space-y-3">
                  <div>
                    <p className="text-xs uppercase tracking-widest font-semibold text-indigo-700 dark:text-indigo-400">Per Charge Limit</p>
                    <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mt-1">
                      {spendLimit > 0 ? formatSui(spendLimit) : '—'}
                    </p>
                  </div>

                  <div className="h-px bg-indigo-200 dark:bg-indigo-700" />

                  <div>
                    <p className="text-xs uppercase tracking-widest font-semibold text-purple-700 dark:text-purple-400">Maximum Charges</p>
                    <p className="text-3xl font-bold text-purple-600 dark:text-purple-400 mt-1">
                      {maxCharges > 0 ? maxCharges : '—'}
                    </p>
                  </div>
                </div>

                {spendLimit > 0 && maxCharges > 0 && (
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg p-4 space-y-2">
                    <p className="text-xs uppercase tracking-widest font-semibold text-green-700 dark:text-green-400">Maximum Possible Total</p>
                    <p className="text-4xl font-bold text-green-600 dark:text-green-400">{formatSui(maxTotal)}</p>
                    <p className="text-xs text-green-700 dark:text-green-400 pt-2 border-t border-green-200 dark:border-green-800">
                      {formatSui(spendLimit)} × {maxCharges} charges
                    </p>
                  </div>
                )}

                <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 border-l-4 border-yellow-400">
                  <p className="text-sm font-semibold text-yellow-900 dark:text-yellow-300 mb-2">⚠️ Important</p>
                  <p className="text-xs text-yellow-800 dark:text-yellow-400">
                    The spend limit applies to <strong>each individual charge</strong>, not the total. Each separate transaction must be ≤ ${spendLimit > 0 ? spendLimit.toFixed(2) : 'your limit'}.
                  </p>
                </div>

                <div className="pt-4 space-y-2">
                  <p className="text-xs text-gray-600 dark:text-gray-400">✓ Auto-expiry after period ends</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">✓ No manual cancellation needed</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">✓ Blocked charges are instant</p>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>

      <Toast
        open={showSuccess}
        type="success"
        message="ShieldPass created successfully! Redirecting to dashboard..."
        onClose={() => setShowSuccess(false)}
      />
    </div>
  );
}
