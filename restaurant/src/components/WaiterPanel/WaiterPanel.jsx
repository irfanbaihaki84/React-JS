import React, { useState } from 'react';
import TableManagement from './TableManagement';
import OrderManagement from './OrderManagement';
import './waiter.css';

const WaiterPanel = ({ data, updateData }) => {
  const [activeTab, setActiveTab] = useState('tables');

  return (
    <div className="waiter-dashboard">
      <div className="waiter-header">
        <h2>Waiter Dashboard</h2>
        <div className="waiter-tabs">
          <button
            className={`tab-btn ${activeTab === 'tables' ? 'active' : ''}`}
            onClick={() => setActiveTab('tables')}
          >
            Table Management
          </button>
          <button
            className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            Order Management
          </button>
        </div>
      </div>

      <div className="waiter-content">
        {activeTab === 'tables' ? (
          <TableManagement
            menus={data.menus}
            tables={data.tables}
            orders={data.orders}
            updateData={updateData}
          />
        ) : (
          <OrderManagement
            menus={data.menus}
            orders={data.orders.filter((o) => o.status === 'ready')}
            updateData={updateData}
          />
        )}
      </div>
    </div>
  );
};

export default WaiterPanel;
