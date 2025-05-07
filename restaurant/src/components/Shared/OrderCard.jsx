import React from 'react';
import './shared.css';

const OrderCard = ({ order, menus, onStatusChange, onClick }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'status-pending';
      case 'cooking':
        return 'status-cooking';
      case 'ready':
        return 'status-ready';
      case 'served':
        return 'status-served';
      case 'paid':
        return 'status-paid';
      default:
        return '';
    }
  };

  return (
    <div className="order-card" onClick={onClick}>
      <div className="order-header">
        <span className="order-id">Order #{order.id}</span>
        <span className={`order-status ${getStatusColor(order.status)}`}>
          {order.status.toUpperCase()}
        </span>
      </div>
      <div className="order-details">
        <p>Table: {order.tableNumber}</p>
        <p>Customer: {order.customerName || 'Walk-in'}</p>
        <p>Time: {new Date(order.createdAt).toLocaleTimeString()}</p>
      </div>
      <div className="order-items">
        <h4>Items:</h4>
        <ul>
          {order.items.map((item, index) => {
            const menuItem = menus.find((m) => m.id === item.menuId);
            return (
              <li key={index}>
                {item.quantity}x {menuItem?.name || 'Unknown Item'}
                {item.notes && (
                  <span className="item-notes"> ({item.notes})</span>
                )}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="order-total">
        Total: Rp {order.total.toLocaleString()}
      </div>
      {onStatusChange && (
        <div className="order-actions">
          {order.status === 'pending' && (
            <button
              className="btn-action btn-start"
              onClick={(e) => {
                e.stopPropagation();
                onStatusChange(order.id, 'cooking');
              }}
            >
              Start Cooking
            </button>
          )}
          {order.status === 'cooking' && (
            <button
              className="btn-action btn-ready"
              onClick={(e) => {
                e.stopPropagation();
                onStatusChange(order.id, 'ready');
              }}
            >
              Mark as Ready
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default OrderCard;
