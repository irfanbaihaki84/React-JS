import React, { useState } from 'react';
import './waiter.css';

const OrderForm = ({ table, menus, onClose, onSubmit }) => {
  const [orderItems, setOrderItems] = useState([]);
  const [customerName, setCustomerName] = useState('');
  const [notes, setNotes] = useState('');

  const handleAddItem = (menuItem) => {
    setOrderItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.menuId === menuItem.id
      );
      if (existingItem) {
        return prevItems.map((item) =>
          item.menuId === menuItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [
          ...prevItems,
          {
            menuId: menuItem.id,
            quantity: 1,
            notes: '',
          },
        ];
      }
    });
  };

  const handleRemoveItem = (menuId) => {
    setOrderItems((prevItems) =>
      prevItems.filter((item) => item.menuId !== menuId)
    );
  };

  const handleQuantityChange = (menuId, newQuantity) => {
    if (newQuantity < 1) return;
    setOrderItems((prevItems) =>
      prevItems.map((item) =>
        item.menuId === menuId
          ? { ...item, quantity: parseInt(newQuantity) }
          : item
      )
    );
  };

  const handleItemNotesChange = (menuId, newNotes) => {
    setOrderItems((prevItems) =>
      prevItems.map((item) =>
        item.menuId === menuId ? { ...item, notes: newNotes } : item
      )
    );
  };

  const calculateTotal = () => {
    return orderItems.reduce((total, item) => {
      const menuItem = menus.find((m) => m.id === item.menuId);
      return total + (menuItem?.price || 0) * item.quantity;
    }, 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (orderItems.length === 0) return;

    const newOrder = {
      tableNumber: table.number,
      customerName: customerName || `Table ${table.number}`,
      status: 'pending',
      items: orderItems,
      total: calculateTotal(),
      createdAt: new Date().toISOString(),
    };

    onSubmit(newOrder);
  };

  const categories = [...new Set(menus.map((item) => item.category))];

  return (
    <div className="order-form-overlay">
      <div className="order-form-container">
        <div className="order-form-header">
          <h3>New Order for Table {table.number}</h3>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="order-form-content">
          <div className="customer-info">
            <label>
              Customer Name:
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Optional"
              />
            </label>
            <label>
              Order Notes:
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Any special instructions?"
              />
            </label>
          </div>

          <div className="order-form-main">
            <div className="menu-section">
              <h4>Menu Items</h4>
              <div className="category-tabs">
                {categories.map((category) => (
                  <div key={category} className="category-section">
                    <h5>{category}</h5>
                    <div className="menu-items-grid">
                      {menus
                        .filter((menu) => menu.category === category)
                        .map((menu) => (
                          <div
                            key={menu.id}
                            className="menu-item-card"
                            onClick={() => handleAddItem(menu)}
                          >
                            <div className="menu-item-info">
                              <span className="menu-item-name">
                                {menu.name}
                              </span>
                              <span className="menu-item-price">
                                Rp {menu.price.toLocaleString()}
                              </span>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="order-summary-section">
              <h4>Current Order</h4>
              {orderItems.length === 0 ? (
                <p className="empty-order">No items added yet</p>
              ) : (
                <div className="order-items-list">
                  {orderItems.map((item) => {
                    const menuItem = menus.find((m) => m.id === item.menuId);
                    return (
                      <div key={item.menuId} className="order-item">
                        <div className="item-main-info">
                          <span className="item-quantity">
                            <button
                              onClick={() =>
                                handleQuantityChange(
                                  item.menuId,
                                  item.quantity - 1
                                )
                              }
                            >
                              -
                            </button>
                            {item.quantity}
                            <button
                              onClick={() =>
                                handleQuantityChange(
                                  item.menuId,
                                  item.quantity + 1
                                )
                              }
                            >
                              +
                            </button>
                          </span>
                          <span className="item-name">{menuItem?.name}</span>
                          <span className="item-price">
                            Rp{' '}
                            {(
                              (menuItem?.price || 0) * item.quantity
                            ).toLocaleString()}
                          </span>
                        </div>
                        <div className="item-notes">
                          <input
                            type="text"
                            value={item.notes}
                            onChange={(e) =>
                              handleItemNotesChange(item.menuId, e.target.value)
                            }
                            placeholder="Special instructions"
                            onClick={(e) => e.stopPropagation()}
                          />
                        </div>
                        <button
                          className="remove-item-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveItem(item.menuId);
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
              <div className="order-total">
                <span>Total:</span>
                <span>Rp {calculateTotal().toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="order-form-actions">
          <button type="button" className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button
            type="submit"
            className="submit-btn"
            onClick={handleSubmit}
            disabled={orderItems.length === 0}
          >
            Submit Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderForm;
