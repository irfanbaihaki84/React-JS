import { useState } from 'react';
import { useFinancial } from '../context/FinancialContext';

const Transactions = () => {
  const {
    transactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    accounts,
    categories,
  } = useFinancial();
  const [formData, setFormData] = useState({
    type: 'expense',
    date: new Date().toISOString().split('T')[0],
    amount: '',
    description: '',
    accountId: accounts[0]?.id || '',
    categoryId: categories.find((c) => c.type === 'expense')?.id || '',
  });
  const [editingId, setEditingId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const transactionData = {
      ...formData,
      amount:
        typeof formData.amount === 'string'
          ? parseFloat(formData.amount) || 0
          : formData.amount,
      accountId:
        typeof formData.accountId === 'string'
          ? parseFloat(formData.accountId) || 0
          : formData.accountId,
      categoryId:
        typeof formData.categoryId === 'string'
          ? parseFloat(formData.categoryId) || 0
          : formData.categoryId,
    };

    if (editingId) {
      updateTransaction(editingId, transactionData);
      setEditingId(null);
    } else {
      addTransaction(transactionData);
    }

    setFormData({
      type: 'expense',
      date: new Date().toISOString().split('T')[0],
      amount: '',
      description: '',
      accountId: accounts[0]?.id || '',
      categoryId: categories.find((c) => c.type === 'expense')?.id || '',
    });
  };

  const handleEdit = (transaction) => {
    setFormData({
      type: transaction.type,
      date: transaction.date.split('T')[0],
      amount: transaction.amount,
      description: transaction.description,
      accountId: transaction.accountId,
      categoryId: transaction.categoryId,
    });
    setEditingId(transaction.id);
  };

  const expenseCategories = categories.filter((c) => c.type === 'expense');
  const incomeCategories = categories.filter((c) => c.type === 'income');

  return (
    <div className="transactions">
      <h2>Transaksi</h2>

      <form onSubmit={handleSubmit} className="transaction-form">
        <div className="form-group">
          <label>Jenis Transaksi</label>
          <select name="type" value={formData.type} onChange={handleChange}>
            <option value="expense">Pengeluaran</option>
            <option value="income">Pendapatan</option>
          </select>
        </div>

        <div className="form-group">
          <label>Tanggal</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Jumlah</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            min="0"
            step="100"
            required
          />
        </div>

        <div className="form-group">
          <label>Keterangan</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Akun</label>
          <select
            name="accountId"
            value={formData.accountId}
            onChange={handleChange}
            required
          >
            {accounts.map((account) => (
              <option key={account.id} value={account.id}>
                {account.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Kategori</label>
          <select
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            required
          >
            {(formData.type === 'expense'
              ? expenseCategories
              : incomeCategories
            ).map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">
          {editingId ? 'Update Transaksi' : 'Tambah Transaksi'}
        </button>
        {editingId && (
          <button type="button" onClick={() => setEditingId(null)}>
            Batal
          </button>
        )}
      </form>

      <div className="transaction-list">
        <h3>Daftar Transaksi</h3>
        <table>
          <thead>
            <tr>
              <th>Tanggal</th>
              <th>Jenis</th>
              <th>Keterangan</th>
              <th>Akun</th>
              <th>Kategori</th>
              <th>Jumlah</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => {
              const account = accounts.find(
                (a) => a.id === transaction.accountId
              );
              const category = categories.find(
                (c) => c.id === transaction.categoryId
              );

              return (
                <tr key={transaction.id}>
                  <td>{new Date(transaction.date).toLocaleDateString()}</td>
                  <td>
                    {transaction.type === 'income'
                      ? 'Pendapatan'
                      : 'Pengeluaran'}
                  </td>
                  <td>{transaction.description}</td>
                  <td>{account?.name || 'Unknown'}</td>
                  <td>{category?.name || 'Unknown'}</td>
                  <td
                    className={
                      transaction.type === 'income' ? 'income' : 'expense'
                    }
                  >
                    {transaction.type === 'income' ? '+' : '-'} Rp
                    {transaction.amount.toLocaleString()}
                  </td>
                  <td>
                    <button onClick={() => handleEdit(transaction)}>
                      Edit
                    </button>
                    <button onClick={() => deleteTransaction(transaction.id)}>
                      Hapus
                    </button>
                  </td>
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
