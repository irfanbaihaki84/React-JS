import React from 'react';
import OrderCard from '../Shared/OrderCard';
import './chef.css';

const CurrentOrders = ({ menus, orders, updateData }) => {
  const handleStatusChange = (orderId, newStatus) => {
    const updatedOrders = orders.map((order) =>
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    updateData((prevData) => ({
      ...prevData,
      orders: prevData.orders.map(
        (o) => updatedOrders.find((uo) => uo.id === o.id) || o
      ),
    }));
  };

  return (
    <div className="current-orders">
      <h3>Orders in Progress</h3>
      {orders.length === 0 ? (
        <p className="no-orders">No orders currently being prepared</p>
      ) : (
        <div className="orders-grid">
          {orders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              menus={menus}
              onStatusChange={(id, status) => handleStatusChange(id, status)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CurrentOrders;
