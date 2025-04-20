import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';

const KasirDashboard = () => {
  const { state, dispatch } = useAppContext();
  const { items, currentUser, cart } = state;
  const [customerId, setCustomerId] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [amountPaid, setAmountPaid] = useState(0);

  const total = cart.reduce((sum, item) => sum + item.hargaItem * item.qty, 0);
  const change = amountPaid - total;

  const handleAddToCart = (item) => {
    dispatch({ type: 'ADD_TO_CART', payload: item });
  };

  const handleRemoveFromCart = (itemId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: itemId });
  };

  const handleUpdateQty = (itemId, qty) => {
    if (qty > 0) {
      dispatch({ type: 'UPDATE_CART_ITEM_QTY', payload: { id: itemId, qty } });
    }
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    if (cart.length === 0) return;
    if (amountPaid < total) {
      alert('Amount paid is less than total');
      return;
    }

    dispatch({
      type: 'CREATE_TRANSACTION',
      payload: {
        customerId,
        paymentMethod,
        total,
        amountPaid,
        change,
      },
    });
    setCustomerId('');
    setAmountPaid(0);
  };

  return (
    <div className="dashboard">
      <header>
        <h2>Kasir Dashboard</h2>
        <div className="user-info">
          <span>Welcome, {currentUser?.username}</span>
          <Link to="/signout" className="btn-signout">
            Sign Out
          </Link>
        </div>
      </header>

      <div className="kasir-container">
        <div className="items-section">
          <h3>Menu Items</h3>
          <div className="items-grid">
            {items.map((item) => (
              <div
                key={item.id}
                className="item-card"
                onClick={() => handleAddToCart(item)}
              >
                <h4>{item.nama}</h4>
                <p>Rp{item.hargaItem.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="cart-section">
          <h3>Current Order</h3>
          {cart.length === 0 ? (
            <p>No items in cart</p>
          ) : (
            <div className="cart-items">
              {cart.map((item) => (
                <div key={item.id} className="cart-item">
                  <div className="item-info">
                    <span>{item.nama}</span>
                    <span>
                      Rp{item.hargaItem.toLocaleString()} x {item.qty}
                    </span>
                    <span>
                      Rp{(item.hargaItem * item.qty).toLocaleString()}
                    </span>
                  </div>
                  <div className="item-actions">
                    <button
                      onClick={() => handleUpdateQty(item.id, item.qty - 1)}
                    >
                      -
                    </button>
                    <button
                      onClick={() => handleUpdateQty(item.id, item.qty + 1)}
                    >
                      +
                    </button>
                    <button onClick={() => handleRemoveFromCart(item.id)}>
                      Remove
                    </button>
                  </div>
                </div>
              ))}
              <div className="cart-total">
                <h4>Total: Rp{total.toLocaleString()}</h4>
              </div>
            </div>
          )}

          <form onSubmit={handleCheckout} className="checkout-form">
            <div className="form-group">
              <label>Customer ID</label>
              <input
                type="text"
                value={customerId}
                onChange={(e) => setCustomerId(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Payment Method</label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <option value="cash">Cash</option>
                <option value="qris">QRIS</option>
                <option value="kreditCard">Credit Card</option>
              </select>
            </div>
            <div className="form-group">
              <label>Amount Paid</label>
              <input
                type="number"
                value={amountPaid}
                onChange={(e) => setAmountPaid(Number(e.target.value))}
                required
              />
            </div>
            {amountPaid > 0 && (
              <div className="form-group">
                <label>Change</label>
                <input type="number" value={change > 0 ? change : 0} readOnly />
              </div>
            )}
            <button type="submit" disabled={cart.length === 0}>
              Complete Transaction
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default KasirDashboard;
