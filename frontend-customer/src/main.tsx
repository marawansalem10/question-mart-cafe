/**
 * Question Mart & Cafe - Main Entry Point
 * Application bootstrap with providers and global styles
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider, ThemeProvider } from './context';
import './styles/global/index.css';
import './styles/animations/guidelines.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);
