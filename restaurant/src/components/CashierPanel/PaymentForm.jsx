import React, { useState } from 'react';
import './cashier.css';

const PaymentForm = ({ order, data, updateData }) => {
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [amountReceived, setAmountReceived] = useState(0);

  const handlePayment = (e) => {
    e.preventDefault();
    if (!order) return;

    // Update order status
    const updatedOrders = data.orders.map((o) =>
      o.id === order.id ? { ...o, status: 'paid' } : o
    );

    // Add transaction
    const newTransaction = {
      id: Math.max(0, ...data.transactions.map((t) => t.id)) + 1,
      orderId: order.id,
      amount: order.total,
      paymentMethod,
      date: new Date().toISOString(),
      cashier: 'Current User', // In real app, use actual user name
    };

    updateData({
      ...data,
      orders: updatedOrders,
      transactions: [...data.transactions, newTransaction],
    });
  };

  return (
    <div className="payment-form">
      <h3>Payment Details</h3>
      {order ? (
        <form onSubmit={handlePayment}>
          <div className="form-group">
            <label>Total Amount</label>
            <input
              type="text"
              value={`Rp ${order.total.toLocaleString()}`}
              readOnly
            />
          </div>

          <div className="form-group">
            <label>Payment Method</label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="cash">Cash</option>
              <option value="debit">Debit Card</option>
              <option value="credit">Credit Card</option>
              <option value="ewallet">E-Wallet</option>
            </select>
          </div>

          {paymentMethod === 'cash' && (
            <div className="form-group">
              <label>Amount Received</label>
              <input
                type="number"
                value={amountReceived}
                onChange={(e) => setAmountReceived(Number(e.target.value))}
                min={order.total}
              />
              {amountReceived > 0 && (
                <p>
                  Change: Rp {(amountReceived - order.total).toLocaleString()}
                </p>
              )}
            </div>
          )}

          <button type="submit" className="btn-process">
            Process Payment
          </button>
        </form>
      ) : (
        <p>Select an order to process payment</p>
      )}
    </div>
  );
};

export default PaymentForm;
