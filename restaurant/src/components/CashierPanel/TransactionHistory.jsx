import React from 'react';
import './cashier.css';

const TransactionHistory = ({ transactions }) => {
  return (
    <div className="transaction-history">
      <h3>Transaction History</h3>
      <div className="transaction-filters">
        <select>
          <option value="all">All Transactions</option>
          <option value="today">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
        </select>
        <input type="text" placeholder="Search..." />
      </div>

      <table className="transaction-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Date/Time</th>
            <th>Order ID</th>
            <th>Amount</th>
            <th>Payment Method</th>
            <th>Cashier</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.id}</td>
              <td>{new Date(transaction.date).toLocaleString()}</td>
              <td>#{transaction.orderId}</td>
              <td>Rp {transaction.amount.toLocaleString()}</td>
              <td>
                <span className={`payment-method ${transaction.paymentMethod}`}>
                  {transaction.paymentMethod}
                </span>
              </td>
              <td>{transaction.cashier}</td>
              <td>
                <button className="btn-receipt">View Receipt</button>
                <button className="btn-refund">Refund</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="transaction-summary">
        <div className="summary-item">
          <span>Total Transactions:</span>
          <span>{transactions.length}</span>
        </div>
        <div className="summary-item">
          <span>Total Revenue:</span>
          <span>
            Rp{' '}
            {transactions
              .reduce((sum, t) => sum + t.amount, 0)
              .toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;
