import { useState } from 'react';
import { ArrowRight, Check, Shield } from 'lucide-react';
import { Button, Card, CardBody } from '../components';
import { useAuth } from '../context/AuthContext';

interface AuthPageProps {
  onAuthenticated: () => void;
}

type AuthMode = 'login' | 'signup';

export function AuthPage({ onAuthenticated }: AuthPageProps) {
  const { login } = useAuth();
  const [mode, setMode] = useState<AuthMode>('login');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleGoogleAuth = () => {
    if (mode === 'signup' && !name.trim()) {
      setError('Enter your name to create an account.');
      return;
    }

    login(mode === 'signup' ? name.trim() : undefined);
    onAuthenticated();
  };

  const switchMode = (nextMode: AuthMode) => {
    setMode(nextMode);
    setError('');
  };

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <div className="mx-auto grid min-h-screen max-w-6xl items-center gap-12 px-4 py-10 sm:px-6 lg:grid-cols-2 lg:px-8">
        <section className="hidden lg:block">
          <div className="mb-8 flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 shadow-lg shadow-indigo-200">
              <Shield className="h-6 w-6 text-white" />
            </span>
            <span className="text-2xl font-bold tracking-tight">ShieldPass</span>
          </div>
          <p className="mb-5 text-sm font-semibold uppercase tracking-widest text-indigo-600">Subscription protection</p>
          <h1 className="max-w-xl text-5xl font-bold leading-tight tracking-tight text-gray-950">
            Put every recurring charge on your terms.
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-gray-600">
            Create payment passes with clear spending limits, charge controls, and automatic expiry.
          </p>
          <div className="mt-10 space-y-4">
            {['Set a per-charge spending limit', 'Control how many charges can pass', 'Keep a clear record of every transaction'].map(item => (
              <div key={item} className="flex items-center gap-3 text-gray-700">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-green-600">
                  <Check className="h-4 w-4" />
                </span>
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto w-full max-w-md">
          <div className="mb-8 flex items-center justify-center gap-3 lg:hidden">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600">
              <Shield className="h-5 w-5 text-white" />
            </span>
            <span className="text-2xl font-bold">ShieldPass</span>
          </div>
          <Card className="border-gray-200 shadow-xl shadow-gray-200/60">
            <CardBody className="p-8 sm:p-10">
              <div className="mb-8">
                <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-indigo-600">Welcome to ShieldPass</p>
                <h2 className="text-3xl font-bold tracking-tight text-gray-950">
                  {mode === 'login' ? 'Sign in to your account' : 'Create your account'}
                </h2>
                <p className="mt-3 text-gray-600">
                  {mode === 'login' ? 'Manage your subscription payment protection.' : 'Start protecting your subscriptions in minutes.'}
                </p>
              </div>

              {mode === 'signup' && (
                <label className="mb-5 block text-sm font-semibold text-gray-700">
                  Your name
                  <input
                    value={name}
                    onChange={event => {
                      setName(event.target.value);
                      setError('');
                    }}
                    placeholder="e.g. Sarah Johnson"
                    className="mt-2 w-full rounded-lg border-2 border-gray-200 bg-white px-4 py-3 font-normal text-gray-900 outline-none transition focus:border-indigo-500"
                    autoComplete="name"
                  />
                </label>
              )}

              {error && <p className="mb-4 text-sm font-medium text-red-600" role="alert">{error}</p>}

              <Button size="lg" className="w-full justify-center" onClick={handleGoogleAuth} icon={<GoogleIcon />}>
                {mode === 'login' ? 'Login with Google' : 'Sign up with Google'}
              </Button>
              <p className="mt-4 text-center text-xs leading-relaxed text-gray-500">
                By continuing, you agree to use ShieldPass for authorized payment protection.
              </p>

              <div className="my-8 flex items-center gap-3 text-xs uppercase tracking-widest text-gray-400">
                <span className="h-px flex-1 bg-gray-200" />
                <span>or</span>
                <span className="h-px flex-1 bg-gray-200" />
              </div>

              <button
                type="button"
                onClick={() => switchMode(mode === 'login' ? 'signup' : 'login')}
                className="group flex w-full items-center justify-center gap-2 text-sm font-semibold text-indigo-600 transition hover:text-indigo-700"
              >
                {mode === 'login' ? 'New to ShieldPass? Create an account' : 'Already have an account? Log in'}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </CardBody>
          </Card>
          <p className="mt-6 text-center text-xs text-gray-500">Secure access for your ShieldPass dashboard</p>
        </section>
      </div>
    </main>
  );
}

function GoogleIcon() {
  return <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-sm font-bold text-blue-600">G</span>;
}