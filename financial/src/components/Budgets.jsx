import { useState, useEffect } from 'react';
import { useFinancial } from '../context/FinancialContext';

const Budgets = () => {
  const {
    budgets,
    addBudget,
    updateBudget,
    deleteBudget,
    categories,
    getCategorySpending,
  } = useFinancial();
  const [formData, setFormData] = useState({
    categoryId: '',
    amount: '',
    period: 'monthly',
  });
  const [editingId, setEditingId] = useState(null);

  // Only show expense categories for budgets
  const expenseCategories = categories.filter((c) => c.type === 'expense');

  useEffect(() => {
    if (expenseCategories.length > 0 && !formData.categoryId) {
      setFormData((prev) => ({ ...prev, categoryId: expenseCategories[0].id }));
    }
  }, [expenseCategories, formData.categoryId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const budgetData = {
      ...formData,
      amount:
        typeof formData.amount === 'string'
          ? parseFloat(formData.amount) || 0
          : formData.amount,
    };
    // const budgetData = {
    //   ...formData,
    //   amount: parseFloat(formData.amount),
    // };

    if (editingId) {
      updateBudget(editingId, budgetData);
      setEditingId(null);
    } else {
      addBudget(budgetData);
    }

    setFormData({
      categoryId: expenseCategories[0]?.id || '',
      amount: '',
      period: 'monthly',
    });
  };

  const handleEdit = (budget) => {
    setFormData({
      categoryId: budget.categoryId,
      amount: budget.amount.toString(),
      period: budget.period,
    });
    setEditingId(budget.id);
  };

  return (
    <div className="budgets">
      <h2>Anggaran</h2>

      <form onSubmit={handleSubmit} className="budget-form">
        <div className="form-group">
          <label>Kategori</label>
          <select
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            required
          >
            {expenseCategories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
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
          <label>Periode</label>
          <select name="period" value={formData.period} onChange={handleChange}>
            <option value="daily">Harian</option>
            <option value="weekly">Mingguan</option>
            <option value="monthly">Bulanan</option>
            <option value="yearly">Tahunan</option>
          </select>
        </div>

        <button type="submit">
          {editingId ? 'Update Anggaran' : 'Tambah Anggaran'}
        </button>
        {editingId && (
          <button type="button" onClick={() => setEditingId(null)}>
            Batal
          </button>
        )}
      </form>

      <div className="budget-list">
        <h3>Daftar Anggaran</h3>
        <table>
          <thead>
            <tr>
              <th>Kategori</th>
              <th>Jumlah</th>
              <th>Periode</th>
              <th>Pengeluaran</th>
              <th>Sisa</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {budgets.map((budget) => {
              const category = categories.find(
                (c) => c.id === budget.categoryId
              );
              const spending = getCategorySpending(budget.categoryId);
              const remaining = budget.amount - spending;

              return (
                <tr key={budget.id}>
                  <td>{category?.name || 'Unknown'}</td>
                  <td>Rp{budget.amount.toLocaleString()}</td>
                  <td>
                    {budget.period === 'daily'
                      ? 'Harian'
                      : budget.period === 'weekly'
                      ? 'Mingguan'
                      : budget.period === 'monthly'
                      ? 'Bulanan'
                      : 'Tahunan'}
                  </td>
                  <td>Rp{spending.toLocaleString()}</td>
                  <td className={remaining >= 0 ? 'positive' : 'negative'}>
                    Rp{Math.abs(remaining).toLocaleString()}
                  </td>
                  <td>
                    <button onClick={() => handleEdit(budget)}>Edit</button>
                    <button onClick={() => deleteBudget(budget.id)}>
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

export default Budgets;
