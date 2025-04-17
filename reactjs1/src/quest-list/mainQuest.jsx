import React from 'react';
// import ReactDOM from 'react-dom/client';
import { createRoot } from 'react-dom/client';
import AppQuest from './AppQuest';
import { AppProvider } from './context/AppContext';
import './styles/App.css';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <AppProvider>
//       <AppQuest />
//     </AppProvider>
//   </React.StrictMode>
// );

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppProvider>
      <AppQuest />
    </AppProvider>
  </React.StrictMode>
);
