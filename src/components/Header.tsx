import { useState } from 'react';
import { Shield, Menu, X, Settings, LogOut, ChevronDown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Header({ currentPage, onNavigate }: HeaderProps) {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const navigate = (page: string) => {
    onNavigate(page);
    setIsMenuOpen(false);
    setIsProfileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    setIsProfileMenuOpen(false);
    onNavigate('home');
  };

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button
            type="button"
            className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => navigate('home')}
            aria-label="Go to dashboard"
          >
            <span className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </span>
            <span className="text-xl font-bold text-gray-900 dark:text-white">ShieldPass</span>
          </button>

          {user && (
            <>
              <nav className="hidden md:flex items-center gap-8" aria-label="Primary navigation">
                <NavLink label="Dashboard" isActive={currentPage === 'home' || currentPage === 'dashboard'} onClick={() => navigate('dashboard')} />
                <NavLink label="Create Pass" isActive={currentPage === 'create-pass'} onClick={() => navigate('create-pass')} />
              </nav>

              <div className="hidden md:flex items-center gap-4">
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsProfileMenuOpen(open => !open)}
                    className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    aria-expanded={isProfileMenuOpen}
                    aria-haspopup="menu"
                  >
                    <img
                      src={user.avatar}
                      alt=""
                      className="w-8 h-8 rounded-full object-cover"
                      onError={event => {
                        event.currentTarget.src = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop';
                      }}
                    />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-200 max-w-28 truncate">{user.name}</span>
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  </button>

                  {isProfileMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-1" role="menu">
                      <button type="button" onClick={() => navigate('settings')} className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700" role="menuitem">
                        <Settings className="w-4 h-4" />
                        Settings
                      </button>
                      <button type="button" onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20" role="menuitem">
                        <LogOut className="w-4 h-4" />
                        Sign out
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsMenuOpen(open => !open)}
                className="md:hidden p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isMenuOpen}
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </>
          )}
        </div>

        {isMenuOpen && user && (
          <nav className="md:hidden border-t border-gray-200 dark:border-gray-700 py-3 space-y-1" aria-label="Mobile navigation">
            <MobileNavLink label="Dashboard" isActive={currentPage === 'home' || currentPage === 'dashboard'} onClick={() => navigate('dashboard')} />
            <MobileNavLink label="Create Pass" isActive={currentPage === 'create-pass'} onClick={() => navigate('create-pass')} />
            <MobileNavLink label="Settings" isActive={currentPage === 'settings'} onClick={() => navigate('settings')} />
            <button type="button" onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2 text-left text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg">
              <LogOut className="w-4 h-4" />
              Sign out
            </button>
          </nav>
        )}
      </div>
    </header>
  );
}

interface NavLinkProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

function NavLink({ label, isActive, onClick }: NavLinkProps) {
  return (
    <button type="button" onClick={onClick} className={`text-sm font-medium transition-colors ${isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400'}`}>
      {label}
    </button>
  );
}

function MobileNavLink({ label, isActive, onClick }: NavLinkProps) {
  return (
    <button type="button" onClick={onClick} className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${isActive ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400' : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700'}`}>
      {label}
    </button>
  );
}