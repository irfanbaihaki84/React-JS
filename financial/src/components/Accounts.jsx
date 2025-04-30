import { useState } from 'react';
import { useFinancial } from '../context/FinancialContext';
import { formatCurrency } from '../utils/formatCurrency';

const Accounts = () => {
  const {
    accounts,
    addAccount,
    updateAccount,
    deleteAccount,
    getAccountBalance,
  } = useFinancial();
  const [formData, setFormData] = useState({
    name: '',
    type: 'cash',
    initialBalance: '0',
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

    const accountData = {
      ...formData,
      initialBalance:
        typeof formData.initialBalance === 'string'
          ? parseFloat(formData.initialBalance) || 0
          : formData.initialBalance,
    };
    // const accountData = {
    //   ...formData,
    //   initialBalance: parseFloat(formData.initialBalance),
    // };

    if (editingId) {
      updateAccount(editingId, accountData);
      setEditingId(null);
    } else {
      addAccount(accountData);
    }

    setFormData({
      name: '',
      type: 'cash',
      initialBalance: '0',
    });
  };

  const handleEdit = (account) => {
    setFormData({
      name: account.name,
      type: account.type,
      initialBalance: account.initialBalance.toString(),
    });
    setEditingId(account.id);
  };

  return (
    <div className="accounts">
      <h2>Akun</h2>

      <form onSubmit={handleSubmit} className="account-form">
        <div className="form-group">
          <label>Nama Akun</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Jenis Akun</label>
          <select name="type" value={formData.type} onChange={handleChange}>
            <option value="cash">Tunai</option>
            <option value="bank">Rekening Bank</option>
            <option value="credit">Kartu Kredit</option>
            <option value="investment">Investasi</option>
            <option value="other">Lainnya</option>
          </select>
        </div>

        <div className="form-group">
          <label>Saldo Awal</label>
          <input
            type="number"
            name="initialBalance"
            value={formData.initialBalance}
            onChange={handleChange}
            min="0"
            step="100"
            required
          />
        </div>

        <button type="submit">
          {editingId ? 'Update Akun' : 'Tambah Akun'}
        </button>
        {editingId && (
          <button type="button" onClick={() => setEditingId(null)}>
            Batal
          </button>
        )}
      </form>

      <div className="account-list">
        <h3>Daftar Akun</h3>
        <table>
          <thead>
            <tr>
              <th>Nama</th>
              <th>Jenis</th>
              <th>Saldo Awal</th>
              <th>Saldo Saat Ini</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((account) => {
              const currentBalance =
                account.initialBalance + getAccountBalance(account.id);

              return (
                <tr key={account.id}>
                  <td>{account.name}</td>
                  <td>
                    {account.type === 'cash'
                      ? 'Tunai'
                      : account.type === 'bank'
                      ? 'Rekening Bank'
                      : account.type === 'credit'
                      ? 'Kartu Kredit'
                      : account.type === 'investment'
                      ? 'Investasi'
                      : 'Lainnya'}
                  </td>
                  <td>{formatCurrency(account.initialBalance)}</td>
                  <td>{formatCurrency(currentBalance)}</td>
                  <td>
                    <button onClick={() => handleEdit(account)}>Edit</button>
                    <button onClick={() => deleteAccount(account.id)}>
                      Hapus
                    </button>
                  </td>
                </tr>
              );
            })}
            {/* {accounts.map((account) => (
              <tr key={account.id}>
                <td>{account.name}</td>
                <td>
                  {account.type === 'cash'
                    ? 'Tunai'
                    : account.type === 'bank'
                    ? 'Rekening Bank'
                    : account.type === 'credit'
                    ? 'Kartu Kredit'
                    : account.type === 'investment'
                    ? 'Investasi'
                    : 'Lainnya'}
                </td>
                <td>Rp{account.initialBalance.toLocaleString()}</td>
                <td>
                  Rp
                  {(
                    account.initialBalance + getAccountBalance(account.id)
                  ).toLocaleString()}
                </td>
                <td>
                  <button onClick={() => handleEdit(account)}>Edit</button>
                  <button onClick={() => deleteAccount(account.id)}>
                    Hapus
                  </button>
                </td>
              </tr>
            ))} */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Accounts;
