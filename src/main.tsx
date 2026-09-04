import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { SuiProvider } from './context/SuiProvider';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SuiProvider>
      <AuthProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </AuthProvider>
    </SuiProvider>
  </StrictMode>
);