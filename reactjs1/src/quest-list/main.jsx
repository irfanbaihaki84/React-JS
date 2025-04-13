import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import QuestForm from './QuestForm';
import QuestList from './QuestList';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QuestForm />
    <QuestList />
  </StrictMode>
);
