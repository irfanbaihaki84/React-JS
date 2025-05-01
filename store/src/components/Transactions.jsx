import React, { useState } from 'react';
import { useStore } from '../contexts/StoreContext';

const Transactions = () => {
  const { products, transactions, addTransaction } = useStore();
  const [newTransaction, setNewTransaction] = useState({
    productId: '',
    quantity: 1,
    type: 'income', // 'income' or 'expense'
    amount: 0,
    description: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTransaction({
      ...newTransaction,
      [name]:
        name === 'quantity' || name === 'amount' || name === 'productId'
          ? Number(value)
          : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Jika transaksi income (penjualan), kurangi stok produk
    if (newTransaction.type === 'income') {
      const product = products.find(
        (p) => p.id === Number(newTransaction.productId)
      );
      if (product && product.stock < newTransaction.quantity) {
        alert('Stok produk tidak mencukupi!');
        return;
      }
    }

    addTransaction(newTransaction);

    // Reset form
    setNewTransaction({
      productId: '',
      quantity: 1,
      type: 'income',
      amount: 0,
      description: '',
    });
  };

  return (
    <div className="transactions-container">
      <h2>Manajemen Transaksi</h2>

      <form onSubmit={handleSubmit} className="transaction-form">
        <div className="form-group">
          <label>Pilih</label>
          <select
            name="type"
            value={newTransaction.type}
            onChange={handleInputChange}
          >
            <option value="income">Pemasukan (Penjualan)</option>
            <option value="expense">Pengeluaran (Pembelian/Biaya)</option>
          </select>
        </div>

        {newTransaction.type === 'income' && (
          <div className="form-group">
            <label>Product</label>
            <select
              name="productId"
              value={newTransaction.productId}
              onChange={handleInputChange}
              required
            >
              <option value="">Pilih Produk</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name} (Price: {product.price})
                </option>
              ))}
            </select>
          </div>
        )}

        {newTransaction.type === 'income' && (
          <div className="form-group">
            <label>Quantity</label>
            <input
              type="number"
              name="quantity"
              value={newTransaction.quantity}
              onChange={handleInputChange}
              placeholder="Jumlah"
              min="1"
              required
            />
          </div>
        )}

        <div className="form-group">
          <label>Price</label>
          <input
            type="number"
            name="amount"
            value={newTransaction.amount}
            onChange={handleInputChange}
            placeholder="Jumlah Uang"
            required
          />
          {/* <input
          type="number"
          name="amount"
          value={newTransaction.amount}
          onChange={handleInputChange}
          placeholder="Jumlah Uang"
          required
        /> */}
        </div>

        <div className="form-group">
          <label>Description</label>
          <input
            type="text"
            name="description"
            value={newTransaction.description}
            onChange={handleInputChange}
            placeholder="Keterangan"
          />
        </div>

        <button type="submit">Catat Transaksi</button>
      </form>

      <div className="transaction-list">
        <h3>Riwayat Transaksi</h3>
        <table>
          <thead>
            <tr>
              <th>Tanggal</th>
              <th>Tipe</th>
              <th>Produk</th>
              <th>Jumlah</th>
              <th>Total</th>
              <th>Keterangan</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => {
              const product = products.find(
                (p) => p.id === transaction.productId
              );
              return (
                <tr key={transaction.id}>
                  <td>{new Date(transaction.date).toLocaleString()}</td>
                  <td>
                    {transaction.type === 'income'
                      ? 'Pemasukan'
                      : 'Pengeluaran'}
                  </td>
                  <td>{product ? product.name : '-'}</td>
                  <td>{transaction.quantity || '-'}</td>
                  <td>{transaction.amount.toLocaleString()}</td>
                  <td>{transaction.description}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transactions;
