import { useState } from 'react';
import { useAuth } from './context/AuthContext';
import { Header } from './components/Header';
import {
  AuthPage,
  DashboardPage,
  CreatePassPage,
  PassDetailPage,
  SettingsPage,
} from './pages';

type Page = 'home' | 'dashboard' | 'create-pass' | 'pass-detail' | 'settings';

function App() {
  const { isAuthenticated } = useAuth();
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedPassId, setSelectedPassId] = useState<string>('');

  const handleNavigate = (page: Page | string, passId?: string): void => {
    setCurrentPage(page as Page);
    if (passId) {
      setSelectedPassId(passId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    handleNavigate('home' as Page);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      {isAuthenticated && (
        <Header currentPage={currentPage} onNavigate={handleNavigate} />
      )}

      <main>
        {/* Authentication landing page */}
        {currentPage === 'home' && !isAuthenticated && (
          <AuthPage onAuthenticated={() => handleNavigate('dashboard' as Page)} />
        )}

        {/* Dashboard */}
        {currentPage === 'dashboard' && isAuthenticated && (
          <DashboardPage
            onCreatePass={() => handleNavigate('create-pass' as Page)}
            onViewPass={(passId) => handleNavigate('pass-detail' as Page, passId)}
          />
        )}

        {/* Create Pass */}
        {currentPage === 'create-pass' && isAuthenticated && (
          <CreatePassPage onPassCreated={() => handleNavigate('dashboard' as Page)} />
        )}

        {/* Pass Detail */}
        {currentPage === 'pass-detail' && isAuthenticated && (
          <PassDetailPage
            passId={selectedPassId}
            onBack={() => handleNavigate('dashboard' as Page)}
          />
        )}

        {/* Settings */}
        {currentPage === 'settings' && isAuthenticated && (
          <SettingsPage onLogout={handleLogout} />
        )}

        {/* Default to Landing for authenticated users on home page */}
        {currentPage === 'home' && isAuthenticated && (
          <DashboardPage
            onCreatePass={() => handleNavigate('create-pass' as Page)}
            onViewPass={(passId) => handleNavigate('pass-detail' as Page, passId)}
          />
        )}
      </main>
    </div>
  );
}

export default App;