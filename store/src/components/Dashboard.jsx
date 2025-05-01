import React from 'react';
import { useStore } from '../contexts/StoreContext';

const Dashboard = () => {
  const { products, transactions, getFinancialSummary } = useStore();
  const { income, expense, balance } = getFinancialSummary();

  // Hitung produk yang stoknya hampir habis
  const lowStockProducts = products.filter((p) => p.stock < 5);

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>

      <div className="summary-cards">
        <div className="card">
          <h3>Total Produk</h3>
          <p>{products.length}</p>
        </div>

        <div className="card">
          <h3>Pemasukan</h3>
          <p className="income">{income.toLocaleString('id-ID')}</p>
        </div>

        <div className="card">
          <h3>Pengeluaran</h3>
          <p className="expense">{expense.toLocaleString('id-ID')}</p>
        </div>

        <div className="card">
          <h3>Saldo</h3>
          <p className={balance >= 0 ? 'positive' : 'negative'}>
            {balance.toLocaleString('id-ID')}
          </p>
        </div>
      </div>

      <div className="alerts-section">
        <h3>Produk Stok Rendah</h3>
        {lowStockProducts.length > 0 ? (
          <ul>
            {lowStockProducts.map((product) => (
              <li key={product.id}>
                {product.name} - Stok: {product.stock}
              </li>
            ))}
          </ul>
        ) : (
          <p>Tidak ada produk dengan stok rendah</p>
        )}
      </div>

      <div className="recent-transactions">
        <h3>Transaksi Terakhir</h3>
        {transactions.slice(0, 5).map((transaction) => (
          <div key={transaction.id} className="transaction-item">
            <span>
              {new Date(transaction.date).toLocaleDateString('id-ID')}
            </span>
            <span>
              {transaction.type === 'income' ? 'Pemasukan' : 'Pengeluaran'}
            </span>
            <span>{transaction.total.toLocaleString()}</span>
            {/* <span>{transaction.amount.toLocaleString()}</span> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
