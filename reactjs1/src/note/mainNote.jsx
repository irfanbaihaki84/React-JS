import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import AppNote from './AppNote';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppNote />
  </StrictMode>
);
