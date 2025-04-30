import { FinancialProvider } from './context/FinancialContext';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Transactions from './components/Transactions';
import Accounts from './components/Accounts';
import Categories from './components/Categories';
import Budgets from './components/Budgets';
import Reports from './components/Reports';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <FinancialProvider>
      <Router>
        <div className="app">
          <Navbar />
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/accounts" element={<Accounts />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/budgets" element={<Budgets />} />
              <Route path="/reports" element={<Reports />} />
            </Routes>
          </div>
        </div>
      </Router>
    </FinancialProvider>
  );
}

export default App;
