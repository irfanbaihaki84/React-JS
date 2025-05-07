import React, { useState } from 'react';
import CurrentOrders from './CurrentOrders';
import OrderQueue from './OrderQueue';
import './chef.css';

const ChefPanel = ({ data, updateData }) => {
  const [activeTab, setActiveTab] = useState('current');

  return (
    <div className="chef-dashboard">
      <div className="chef-header">
        <h2>Chef Dashboard</h2>
        <div className="chef-tabs">
          <button
            className={`tab-btn ${activeTab === 'current' ? 'active' : ''}`}
            onClick={() => setActiveTab('current')}
          >
            Current Orders
          </button>
          <button
            className={`tab-btn ${activeTab === 'queue' ? 'active' : ''}`}
            onClick={() => setActiveTab('queue')}
          >
            Order Queue
          </button>
        </div>
      </div>

      <div className="chef-content">
        {activeTab === 'current' ? (
          <CurrentOrders
            menus={data.menus}
            orders={data.orders.filter((o) => o.status === 'cooking')}
            updateData={updateData}
          />
        ) : (
          <OrderQueue
            menus={data.menus}
            orders={data.orders.filter((o) => o.status === 'pending')}
            updateData={updateData}
          />
        )}
      </div>
    </div>
  );
};

export default ChefPanel;
