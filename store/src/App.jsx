import React from 'react';
import { StoreProvider } from './contexts/StoreContext';
import Navigation from './components/Navigation';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Products from './components/Products';
import Transactions from './components/Transactions';
import Reports from './components/Reports';
import Settings from './components/Settings';
import './App.css';
import SalesTransaction from './components/SalesTransaction';
import PurchaseTransaction from './components/PurchaseTansaction';

function App() {
  return (
    <StoreProvider>
      <Router>
        <div className="app-container">
          <Navigation />
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/products" element={<Products />} />
              <Route path="/sales" element={<SalesTransaction />} />
              <Route path="/purchases" element={<PurchaseTransaction />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </div>
        </div>
      </Router>
    </StoreProvider>
  );
}

export default App;
