import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import AppNote from './AppNote';
import { NoteProvider } from './NoteContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <NoteProvider>
      <AppNote />
    </NoteProvider>
  </StrictMode>
);
