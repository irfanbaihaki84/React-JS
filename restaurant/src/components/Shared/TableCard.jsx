import React from 'react';
import './shared.css';

const TableCard = ({ table, onSelect, currentOrder }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'available':
        return 'status-available';
      case 'occupied':
        return 'status-occupied';
      case 'reserved':
        return 'status-reserved';
      case 'needs-cleaning':
        return 'status-cleaning';
      default:
        return '';
    }
  };

  return (
    <div
      className={`table-card ${getStatusColor(table.status)} ${
        currentOrder ? 'has-order' : ''
      }`}
      onClick={() => onSelect(table)}
    >
      <div className="table-header">
        <h3>Table {table.number}</h3>
        <span className={`table-status ${getStatusColor(table.status)}`}>
          {table.status.replace('-', ' ').toUpperCase()}
        </span>
      </div>
      <div className="table-details">
        <p>Capacity: {table.capacity} persons</p>
        {currentOrder && (
          <div className="table-order-info">
            <p>Order #{currentOrder.id}</p>
            <p>Rp {currentOrder.total.toLocaleString()}</p>
          </div>
        )}
      </div>
      {table.status === 'needs-cleaning' && (
        <button
          className="btn-clean"
          onClick={(e) => {
            e.stopPropagation();
            // Handle clean table action
          }}
        >
          Mark as Clean
        </button>
      )}
    </div>
  );
};

export default TableCard;
