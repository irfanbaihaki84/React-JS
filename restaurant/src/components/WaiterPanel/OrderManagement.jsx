import React from 'react';
import OrderCard from '../Shared/OrderCard';
import './waiter.css';

const OrderManagement = ({ menus, orders, updateData }) => {
  const handleServeOrder = (orderId) => {
    const updatedOrders = orders.map((order) =>
      order.id === orderId ? { ...order, status: 'served' } : order
    );
    updateData((prevData) => ({
      ...prevData,
      orders: prevData.orders.map(
        (o) => updatedOrders.find((uo) => uo.id === o.id) || o
      ),
    }));
  };

  return (
    <div className="order-management">
      <h3>Orders Ready to Serve</h3>
      {orders.length === 0 ? (
        <p className="no-orders">No orders ready to serve</p>
      ) : (
        <div className="orders-grid">
          {orders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              menus={menus}
              onStatusChange={(id) => handleServeOrder(id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderManagement;
