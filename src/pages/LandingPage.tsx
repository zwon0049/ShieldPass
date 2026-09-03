import { Button } from '../components';
import { Shield, Lock, AlertCircle, TrendingUp, CheckCircle } from 'lucide-react';

interface LandingPageProps {
  onCreatePass: () => void;
}

export function LandingPage({ onCreatePass }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-indigo-100 dark:bg-indigo-900/30 px-4 py-2 rounded-full">
              <Shield className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">Safe & Secure Payment Control</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
              Take Control of Your
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600"> Subscriptions</span>
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
              Stop losing money to forgotten subscriptions and hidden price hikes. Create a self-destructing payment pass that protects you in under 60 seconds.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" onClick={onCreatePass}>
                Create Your First Pass
              </Button>
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </div>
          </div>

          {/* Hero Illustration */}
          <div className="relative">
            <div className="w-full aspect-square bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-2xl flex items-center justify-center">
              <Shield className="w-32 h-32 text-indigo-400 dark:text-indigo-500 opacity-50" />
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="bg-gray-50 dark:bg-gray-800/50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-16 text-center">
            The Problem You Face Every Day
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <AlertCircle className="w-8 h-8" />,
                title: 'Forgotten Subscriptions',
                description: 'You forget to cancel a free trial and suddenly you\'re charged. Then you spend hours on hold trying to get a refund.',
              },
              {
                icon: <TrendingUp className="w-8 h-8" />,
                title: 'Hidden Price Hikes',
                description: 'Services quietly raise their prices without asking. You don\'t notice until you see an unexpected charge on your card.',
              },
              {
                icon: <Lock className="w-8 h-8" />,
                title: 'Complex Cancellation',
                description: 'Canceling subscriptions takes forever. Services make it intentionally difficult to leave, burying the cancel button.',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="p-8 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-lg dark:hover:shadow-lg/20 transition-all"
              >
                <div className="text-4xl mb-4 text-red-500">{item.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-16 text-center">
            How ShieldPass Works
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                number: '1',
                title: 'Set Your Limit',
                description: 'Define the maximum amount allowed per individual charge. Merchants can\'t charge more than you allow.',
              },
              {
                number: '2',
                title: 'Choose Duration',
                description: 'Set how long the pass remains valid. Auto-expires so you don\'t have to remember to cancel.',
              },
              {
                number: '3',
                title: 'Limit Charges',
                description: 'Control how many charges can be made. Once the limit is reached, the pass expires automatically.',
              },
            ].map((item, i) => (
              <div key={i} className="text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-lg mx-auto">
                  {item.number}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Concept */}
      <section className="bg-indigo-50 dark:bg-indigo-900/20 py-20 border-t border-indigo-200 dark:border-indigo-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            The Key Difference: Per-Charge Limits
          </h2>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 md:p-12 space-y-8">
            <div>
              <p className="text-sm uppercase tracking-widest font-semibold text-indigo-600 dark:text-indigo-400 mb-2">
                NOT Total Spending Limit
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300">
                ❌ <strong>Wrong:</strong> "I can spend $30 total" - Then a $40 charge passes through
              </p>
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-indigo-300 to-transparent dark:via-indigo-700" />

            <div>
              <p className="text-sm uppercase tracking-widest font-semibold text-green-600 dark:text-green-400 mb-2">
                Per-Charge Limit
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300">
                ✓ <strong>Right:</strong> "$10 maximum per charge, up to 3 charges" - Each individual charge is blocked if it exceeds $10
              </p>
            </div>

            <div className="bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-xl p-6 space-y-4 mt-8">
              <h3 className="font-bold text-gray-900 dark:text-white">Example:</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <p className="font-semibold text-indigo-600 dark:text-indigo-400">Your ShieldPass Settings:</p>
                  <ul className="space-y-1 text-gray-700 dark:text-gray-300">
                    <li>💰 <strong>$10 per charge</strong></li>
                    <li>📊 Maximum 3 charges</li>
                    <li>📅 Expires in 30 days</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <p className="font-semibold text-green-600 dark:text-green-400">Maximum Possible Total:</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">$30 ($10 × 3 charges)</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">But no single charge can exceed $10</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-16 text-center">
            Why You'll Love ShieldPass
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              'Create passes in under 60 seconds',
              'Automatic expiration - no manual cancellation',
              'Real-time charge blocking & notifications',
              'View detailed charge history',
              'Multiple passes for different services',
              'Dark mode for comfortable viewing',
              'Works on all devices',
              'No technical knowledge required',
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-4 p-4">
                <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400 flex-shrink-0" />
                <span className="text-lg text-gray-700 dark:text-gray-300">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="text-4xl font-bold text-white">Ready to Protect Your Money?</h2>
          <p className="text-xl text-indigo-100">Start creating ShieldPasses today and take back control of your subscriptions.</p>
          <Button
            size="lg"
            className="bg-white text-indigo-600 hover:bg-gray-100 dark:bg-white dark:text-indigo-600 dark:hover:bg-gray-100 mx-auto"
            onClick={onCreatePass}
          >
            Create Your First Pass Now
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-black text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-semibold text-white mb-4">ShieldPass</h3>
              <p className="text-sm">Protect your subscriptions. Control your payments.</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">How it Works</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>&copy; 2026 ShieldPass. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
