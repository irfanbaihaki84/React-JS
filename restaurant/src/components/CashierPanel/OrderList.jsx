import React from 'react';
import './cashier.css';

const OrderList = ({ menus, orders, onSelectOrder }) => {
  return (
    <div className="order-list">
      <h3>Orders Ready for Payment</h3>
      {orders.length === 0 ? (
        <p>No orders ready for payment</p>
      ) : (
        <div className="orders-container">
          {orders.map((order) => (
            <div
              key={order.id}
              className="order-card"
              onClick={() => onSelectOrder(order)}
            >
              <div className="order-header">
                <span>Table {order.tableNumber}</span>
                <span>Rp {order.total.toLocaleString()}</span>
              </div>
              <ul className="order-items">
                {order.items.map((item, index) => (
                  <li key={index}>
                    {item.quantity}x{' '}
                    {menus.find((m) => m.id === item.menuId)?.name || 'Unknown'}
                    {item.notes && ` (${item.notes})`}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderList;
