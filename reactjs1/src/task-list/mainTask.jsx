import React from 'react';
import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import AppTask from './AppTask';

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <AppTask />
//   </StrictMode>
// );

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppTask />
  </StrictMode>
);
