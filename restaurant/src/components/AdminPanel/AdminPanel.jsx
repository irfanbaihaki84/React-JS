import React, { useState } from 'react';
import MenuManagement from './MenuManagement';
import EmployeeManagement from './EmployeeManagement';
import TableManagement from './TableManagement';
import InventoryManagement from './InventoryManagement';
import Reports from './Reports';
import './admin.css';

const AdminPanel = ({ data, updateData }) => {
  const [activeTab, setActiveTab] = useState('menu');

  const tabs = [
    { id: 'menu', label: 'Menu Management' },
    { id: 'employees', label: 'Employee Management' },
    { id: 'tables', label: 'Table Management' },
    { id: 'inventory', label: 'Inventory' },
    { id: 'reports', label: 'Reports' },
  ];

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h2>Admin Dashboard</h2>
        <div className="admin-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="admin-content">
        {activeTab === 'menu' && (
          <MenuManagement data={data} updateData={updateData} />
        )}
        {activeTab === 'employees' && (
          <EmployeeManagement data={data} updateData={updateData} />
        )}
        {activeTab === 'tables' && (
          <TableManagement data={data} updateData={updateData} />
        )}
        {activeTab === 'inventory' && (
          <InventoryManagement data={data} updateData={updateData} />
        )}
        {activeTab === 'reports' && <Reports data={data} />}
      </div>
    </div>
  );
};

export default AdminPanel;
