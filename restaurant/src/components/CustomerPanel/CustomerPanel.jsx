import React, { useState } from 'react';
import MenuDisplay from './MenuDisplay';
import OrderSummary from './OrderSummary';
import './customer.css';

const CustomerPanel = ({ data, updateData }) => {
  const [cart, setCart] = useState([]);
  const [tableNumber, setTableNumber] = useState('');

  const handleAddToCart = (menuItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.menuId === menuItem.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.menuId === menuItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { menuId: menuItem.id, quantity: 1, notes: '' }];
      }
    });
  };

  const handlePlaceOrder = () => {
    if (!tableNumber || cart.length === 0) return;

    const newOrder = {
      id: Math.max(0, ...data.orders.map((o) => o.id)) + 1,
      tableNumber: parseInt(tableNumber),
      customerName: 'Customer',
      status: 'pending',
      items: cart,
      total: cart.reduce((total, item) => {
        const menuItem = data.menus.find((m) => m.id === item.menuId);
        return total + (menuItem?.price || 0) * item.quantity;
      }, 0),
      createdAt: new Date().toISOString(),
    };

    updateData((prevData) => ({
      ...prevData,
      orders: [...prevData.orders, newOrder],
    }));

    setCart([]);
    setTableNumber('');
  };

  return (
    <div className="customer-dashboard">
      <div className="customer-header">
        <h2>Customer Self-Service</h2>
        <div className="table-input">
          <label>Table Number:</label>
          <input
            type="number"
            value={tableNumber}
            onChange={(e) => setTableNumber(e.target.value)}
            min="1"
            placeholder="Enter your table number"
          />
        </div>
      </div>

      <div className="customer-content">
        <MenuDisplay menus={data.menus} onAddToCart={handleAddToCart} />
        <OrderSummary
          cart={cart}
          menus={data.menus}
          tableNumber={tableNumber}
          onPlaceOrder={handlePlaceOrder}
          onClearCart={() => setCart([])}
        />
      </div>
    </div>
  );
};

export default CustomerPanel;
