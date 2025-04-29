import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './App.css';
import App from './App.jsx';
import { AppProvider, useAppContext } from './context/AppContext';

createRoot(document.getElementById('root')).render(
  <AppProvider store={useAppContext}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </AppProvider>
);
