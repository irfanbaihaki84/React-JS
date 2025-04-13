import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import AppQuest from './AppQuest';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppQuest />
  </StrictMode>
);
