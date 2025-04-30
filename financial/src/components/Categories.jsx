import { useState } from 'react';
import { useFinancial } from '../context/FinancialContext';

const Categories = () => {
  const { categories, addCategory, updateCategory, deleteCategory } =
    useFinancial();
  const [formData, setFormData] = useState({
    name: '',
    type: 'expense',
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

    if (editingId) {
      updateCategory(editingId, formData);
      setEditingId(null);
    } else {
      addCategory(formData);
    }

    setFormData({
      name: '',
      type: 'expense',
    });
  };

  const handleEdit = (category) => {
    setFormData({
      name: category.name,
      type: category.type,
    });
    setEditingId(category.id);
  };

  return (
    <div className="categories">
      <h2>Kategori</h2>

      <form onSubmit={handleSubmit} className="category-form">
        <div className="form-group">
          <label>Nama Kategori</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Jenis Kategori</label>
          <select name="type" value={formData.type} onChange={handleChange}>
            <option value="expense">Pengeluaran</option>
            <option value="income">Pendapatan</option>
          </select>
        </div>

        <button type="submit">
          {editingId ? 'Update Kategori' : 'Tambah Kategori'}
        </button>
        {editingId && (
          <button type="button" onClick={() => setEditingId(null)}>
            Batal
          </button>
        )}
      </form>

      <div className="category-list">
        <h3>Daftar Kategori</h3>

        <div className="category-tables">
          <div className="expense-categories">
            <h4>Kategori Pengeluaran</h4>
            <table>
              <thead>
                <tr>
                  <th>Nama</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {categories
                  .filter((c) => c.type === 'expense')
                  .map((category) => (
                    <tr key={category.id}>
                      <td>{category.name}</td>
                      <td>
                        <button onClick={() => handleEdit(category)}>
                          Edit
                        </button>
                        <button onClick={() => deleteCategory(category.id)}>
                          Hapus
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          <div className="income-categories">
            <h4>Kategori Pendapatan</h4>
            <table>
              <thead>
                <tr>
                  <th>Nama</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {categories
                  .filter((c) => c.type === 'income')
                  .map((category) => (
                    <tr key={category.id}>
                      <td>{category.name}</td>
                      <td>
                        <button onClick={() => handleEdit(category)}>
                          Edit
                        </button>
                        <button onClick={() => deleteCategory(category.id)}>
                          Hapus
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
