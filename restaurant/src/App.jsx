import React, { useState, useEffect } from 'react';
import { dummyData } from './data/dummyData';
import AdminPanel from './components/AdminPanel/AdminPanel';
import CashierPanel from './components/CashierPanel/CashierPanel';
import WaiterPanel from './components/WaiterPanel/WaiterPanel';
import ChefPanel from './components/ChefPanel/ChefPanel';
import CustomerPanel from './components/CustomerPanel/CustomerPanel';
import Navbar from './components/Shared/Navbar';
import './App.css';

function App() {
  const [userRole, setUserRole] = useState('customer');
  const [data, setData] = useState(dummyData);

  // Load data from localStorage on initial render
  useEffect(() => {
    const savedData = localStorage.getItem('restaurantData');
    if (savedData) {
      setData(JSON.parse(savedData));
    } else {
      localStorage.setItem('restaurantData', JSON.stringify(dummyData));
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('restaurantData', JSON.stringify(data));
  }, [data]);

  const updateData = (newData) => {
    setData(newData);
  };

  const renderPanel = () => {
    switch (userRole) {
      case 'admin':
        return <AdminPanel data={data} updateData={updateData} />;
      case 'cashier':
        return <CashierPanel data={data} updateData={updateData} />;
      case 'waiter':
        return <WaiterPanel data={data} updateData={updateData} />;
      case 'chef':
        return <ChefPanel data={data} updateData={updateData} />;
      default:
        return <CustomerPanel data={data} updateData={updateData} />;
    }
  };

  return (
    <div className="app">
      <Navbar userRole={userRole} setUserRole={setUserRole} />
      <main className="main-content">{renderPanel()}</main>
    </div>
  );
}

export default App;
