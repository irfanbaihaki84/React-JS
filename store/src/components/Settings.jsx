import React, { useState } from 'react';
import { useStore } from '../contexts/StoreContext';

const Settings = () => {
  const { businessInfo, setBusinessInfo, categories, setCategories } =
    useStore();
  const [newCategory, setNewCategory] = useState('');
  const [businessForm, setBusinessForm] = useState({
    name: businessInfo.name || '',
    address: businessInfo.address || '',
    phone: businessInfo.phone || '',
    email: businessInfo.email || '',
  });

  const handleBusinessInputChange = (e) => {
    const { name, value } = e.target;
    setBusinessForm({
      ...businessForm,
      [name]: value,
    });
  };

  const saveBusinessInfo = (e) => {
    e.preventDefault();
    setBusinessInfo(businessForm);
    alert('Informasi bisnis berhasil disimpan!');
  };

  const addCategory = (e) => {
    e.preventDefault();
    if (setNewCategory) {
      setNewCategory('');
      setCategories([...categories, { name: newCategory, id: Date.now() }]);
    } else {
      setNewCategory('');
    }
  };

  const removeCategory = (categoryToRemove) => {
    setCategories(categories.filter((cat) => cat !== categoryToRemove));
  };

  return (
    <div className="settings-container">
      <h2>Pengaturan</h2>

      <div className="business-info-section">
        <h3>Informasi Bisnis</h3>
        <form onSubmit={saveBusinessInfo}>
          <div className="form-group">
            <label>Nama Bisnis</label>
            <input
              type="text"
              name="name"
              value={businessForm.name}
              onChange={handleBusinessInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Alamat</label>
            <textarea
              name="address"
              value={businessForm.address}
              onChange={handleBusinessInputChange}
            />
          </div>

          <div className="form-group">
            <label>Telepon</label>
            <input
              type="tel"
              name="phone"
              value={businessForm.phone}
              onChange={handleBusinessInputChange}
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={businessForm.email}
              onChange={handleBusinessInputChange}
            />
          </div>

          <button type="submit">Simpan Informasi Bisnis</button>
        </form>
      </div>

      <div className="categories-section">
        <h3>Kategori Produk</h3>
        <form onSubmit={addCategory}>
          <input
            type="text"
            // name="name"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="Tambah kategori baru"
          />
          <button type="submit">Tambah</button>
        </form>

        <div className="categories-list">
          {categories.length > 0 ? (
            <ul>
              {categories.map((category) => (
                <li key={category.id}>
                  {category.name}
                  <button onClick={() => removeCategory(category)}>
                    Hapus
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>Belum ada kategori</p>
          )}
        </div>
      </div>

      <div className="data-management-section">
        <h3>Manajemen Data</h3>
        <div className="buttons-group">
          <button
            onClick={() => {
              if (window.confirm('Anda yakin ingin mencadangkan data?')) {
                alert('Fitur backup akan diimplementasikan');
              }
            }}
          >
            Cadangkan Data
          </button>

          <button
            onClick={() => {
              if (
                window.confirm(
                  'Anda yakin ingin memulihkan data? Data saat ini akan diganti.'
                )
              ) {
                alert('Fitur restore akan diimplementasikan');
              }
            }}
          >
            Pulihkan Data
          </button>

          <button
            className="danger"
            onClick={() => {
              if (
                window.confirm(
                  'PERINGATAN: Ini akan menghapus semua data. Anda yakin?'
                )
              ) {
                alert('Fitur reset akan diimplementasikan');
              }
            }}
          >
            Reset Semua Data
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
