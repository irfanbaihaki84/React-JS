import React from 'react';
import './customer.css';

const OrderSummary = ({
  cart,
  menus,
  tableNumber,
  onPlaceOrder,
  onClearCart,
}) => {
  const getItemTotal = (item) => {
    const menuItem = menus.find((m) => m.id === item.menuId);
    return (menuItem?.price || 0) * item.quantity;
  };

  const subtotal = cart.reduce((sum, item) => sum + getItemTotal(item), 0);

  return (
    <div className="order-summary">
      <h3>Your Order</h3>
      {cart.length === 0 ? (
        <p className="empty-cart">Your cart is empty</p>
      ) : (
        <>
          <div className="order-items">
            {cart.map((item, index) => {
              const menuItem = menus.find((m) => m.id === item.menuId);
              return (
                <div key={index} className="order-item">
                  <div className="item-info">
                    <span className="item-quantity">{item.quantity}x</span>
                    <span className="item-name">
                      {menuItem?.name || 'Unknown Item'}
                    </span>
                  </div>
                  <span className="item-price">
                    Rp {getItemTotal(item).toLocaleString()}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="order-total">
            <span>Subtotal:</span>
            <span>Rp {subtotal.toLocaleString()}</span>
          </div>
          <div className="order-actions">
            <button
              className="place-order-btn"
              onClick={onPlaceOrder}
              disabled={!tableNumber}
            >
              Place Order
            </button>
            <button className="clear-cart-btn" onClick={onClearCart}>
              Clear Order
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default OrderSummary;
