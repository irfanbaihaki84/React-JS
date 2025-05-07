import React from 'react';

const MenuItem = ({ item, onEdit, onDelete }) => {
  return (
    <div className="menu-item">
      <div className="menu-image">
        <img src={item.image || 'default-food.jpg'} alt={item.name} />
      </div>
      <div className="menu-details">
        <h4>{item.name}</h4>
        <p>{item.category}</p>
        <p>Rp {item.price.toLocaleString()}</p>
        <p>Stock: {item.stock}</p>
        <div className="menu-actions">
          <button onClick={onEdit} className="btn btn-primary">
            Edit
          </button>
          <button onClick={onDelete} className="btn btn-danger">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;
