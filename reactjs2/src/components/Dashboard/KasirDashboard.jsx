import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';

const KasirDashboard = () => {
  const {
    currentUser,
    items,
    cart,
    addToCart,
    updateCart,
    removeFromCart,
    signOut,
  } = useAppContext();
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const navigate = useNavigate();

  if (!currentUser || currentUser.role !== 'kasir') {
    navigate('/signin');
    return null;
  }

  const handleAddToCart = (item) => {
    addToCart(item);
  };

  const handleQuantityChange = (itemId, newQty) => {
    if (newQty < 1) return;
    const item = cart.find((i) => i.id === itemId);
    if (item) {
      updateCart({ ...item, qty: parseInt(newQty) });
    }
  };

  const handleRemoveItem = (itemId) => {
    removeFromCart(itemId);
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.hargaItem * item.qty, 0);
  };

  const handleCheckout = () => {
    // In a real app, you would save the transaction here
    alert(`Transaction completed. Total: ${calculateTotal()}`);
    // Clear cart after checkout
    cart.forEach((item) => removeFromCart(item.id));
  };

  return (
    <div className="dashboard">
      <header>
        <h1>Kasir Dashboard</h1>
        <div className="user-info">
          <span>Welcome, {currentUser.username}</span>
          <button onClick={signOut}>Sign Out</button>
        </div>
      </header>

      <div className="kasir-container">
        <div className="items-section">
          <h2>Menu Items</h2>
          <div className="item-grid">
            {items.map((item) => (
              <div
                key={item.id}
                className="item-card"
                onClick={() => handleAddToCart(item)}
              >
                <h3>{item.nama}</h3>
                <p>Rp {item.hargaItem.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="cart-section">
          <h2>Current Order</h2>
          <div className="customer-selection">
            <label>Customer:</label>
            <select
              value={selectedCustomer}
              onChange={(e) => setSelectedCustomer(e.target.value)}
            >
              <option value={null}>Select Customer</option>
              {/* In a real app, you would list customers here */}
              <option value="1">Bambang</option>
            </select>
          </div>

          <div className="cart-items">
            {cart.length === 0 ? (
              <p>No items in cart</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Price</th>
                    <th>Qty</th>
                    <th>Total</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => (
                    <tr key={item.id}>
                      <td>{item.nama}</td>
                      <td>Rp {item.hargaItem.toLocaleString()}</td>
                      <td>
                        <input
                          type="number"
                          value={item.qty}
                          min="1"
                          onChange={(e) =>
                            handleQuantityChange(item.id, e.target.value)
                          }
                        />
                      </td>
                      <td>Rp {(item.hargaItem * item.qty).toLocaleString()}</td>
                      <td>
                        <button onClick={() => handleRemoveItem(item.id)}>
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <div className="cart-summary">
            <h3>Total: Rp {calculateTotal().toLocaleString()}</h3>
            <div className="payment-method">
              <label>Payment Method:</label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <option value="cash">Cash</option>
                <option value="qris">QRIS</option>
                <option value="kreditCard">Credit Card</option>
              </select>
            </div>
            <button
              onClick={handleCheckout}
              disabled={cart.length === 0 || !selectedCustomer}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KasirDashboard;
