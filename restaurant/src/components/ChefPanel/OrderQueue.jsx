import React from 'react';
import OrderCard from '../Shared/OrderCard';
import './chef.css';

const OrderQueue = ({ menus, orders, updateData }) => {
  const handleStartCooking = (orderId) => {
    const updatedOrders = orders.map((order) =>
      order.id === orderId ? { ...order, status: 'cooking' } : order
    );
    updateData((prevData) => ({
      ...prevData,
      orders: prevData.orders.map(
        (o) => updatedOrders.find((uo) => uo.id === o.id) || o
      ),
    }));
  };

  return (
    <div className="order-queue">
      <h3>Pending Orders</h3>
      {orders.length === 0 ? (
        <p className="no-orders">No orders in queue</p>
      ) : (
        <div className="orders-grid">
          {orders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              menus={menus}
              onStatusChange={(id) => handleStartCooking(id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderQueue;
