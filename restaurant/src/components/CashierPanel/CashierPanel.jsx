import React, { useState } from 'react';
import OrderList from './OrderList';
import PaymentForm from './PaymentForm';
import TransactionHistory from './TransactionHistory';
import './cashier.css';

const CashierPanel = ({ data, updateData }) => {
  const [activeTab, setActiveTab] = useState('orders');
  const [selectedOrder, setSelectedOrder] = useState(null);

  return (
    <div className="cashier-dashboard">
      <div className="cashier-header">
        <h2>Cashier Dashboard</h2>
        <div className="cashier-tabs">
          <button
            className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            Pending Orders
          </button>
          <button
            className={`tab-btn ${activeTab === 'history' ? 'active' : ''}`}
            onClick={() => setActiveTab('history')}
          >
            Transaction History
          </button>
        </div>
      </div>

      <div className="cashier-content">
        {activeTab === 'orders' ? (
          <div className="payment-grid">
            <OrderList
              menus={data.menus}
              orders={data.orders.filter((o) => o.status === 'ready')}
              onSelectOrder={setSelectedOrder}
            />
            <PaymentForm
              order={selectedOrder}
              data={data}
              updateData={updateData}
            />
          </div>
        ) : (
          <TransactionHistory transactions={data.transactions} />
        )}
      </div>
    </div>
  );
};

export default CashierPanel;
