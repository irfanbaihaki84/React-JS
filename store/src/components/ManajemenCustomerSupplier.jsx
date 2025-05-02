import React, { useState } from 'react';
import { useStore } from '../contexts/StoreContext';

const CustomerSupplier = () => {
  const { transactions, businessInfo } = useStore();
  const [activeTab, setActiveTab] = useState('customers');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    type: 'customer',
  });
  const [editingId, setEditingId] = useState(null);

  // Data dummy untuk customer/supplier (bisa diganti dengan data dari localStorage)
  const [contacts, setContacts] = useState(() => {
    const saved = localStorage.getItem('store-contacts');
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 1,
            name: 'Pelanggan Umum',
            phone: '-',
            type: 'customer',
            transactionCount: transactions.filter((t) => t.type === 'income')
              .length,
          },
          {
            id: 2,
            name: 'Supplier Utama',
            phone: '08123456789',
            type: 'supplier',
            transactionCount: transactions.filter((t) => t.type === 'expense')
              .length,
          },
        ];
  });

  // Simpan ke localStorage ketika contacts berubah
  React.useEffect(() => {
    localStorage.setItem('store-contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert('Nama harus diisi!');
      return;
    }

    if (editingId) {
      // Update existing contact
      setContacts(
        contacts.map((c) => (c.id === editingId ? { ...c, ...formData } : c))
      );
      setEditingId(null);
    } else {
      // Add new contact
      const newContact = {
        ...formData,
        id: Date.now(),
        transactionCount: 0,
      };
      setContacts([...contacts, newContact]);
    }

    // Reset form
    setFormData({
      name: '',
      phone: '',
      email: '',
      address: '',
      type: activeTab === 'customers' ? 'customer' : 'supplier',
    });
  };

  const handleEdit = (contact) => {
    setFormData({
      name: contact.name,
      phone: contact.phone || '',
      email: contact.email || '',
      address: contact.address || '',
      type: contact.type,
    });
    setEditingId(contact.id);
  };

  const handleDelete = (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus data ini?')) {
      setContacts(contacts.filter((c) => c.id !== id));
    }
  };

  // Filter contacts by type
  const filteredContacts = contacts.filter((c) =>
    activeTab === 'customers' ? c.type === 'customer' : c.type === 'supplier'
  );

  // Get transactions for a specific contact
  const getContactTransactions = (contactId) => {
    const contact = contacts.find((c) => c.id === contactId);
    if (!contact) return [];

    return transactions.filter(
      (t) =>
        (contact.type === 'customer' &&
          t.type === 'income' &&
          t.customerId === contactId) ||
        (contact.type === 'supplier' &&
          t.type === 'expense' &&
          t.supplierId === contactId)
    );
  };

  return (
    <div className="customer-supplier-container">
      <div className="tabs">
        <button
          className={activeTab === 'customers' ? 'active' : ''}
          onClick={() => {
            setActiveTab('customers');
            setFormData((prev) => ({ ...prev, type: 'customer' }));
          }}
        >
          Pelanggan
        </button>
        <button
          className={activeTab === 'suppliers' ? 'active' : ''}
          onClick={() => {
            setActiveTab('suppliers');
            setFormData((prev) => ({ ...prev, type: 'supplier' }));
          }}
        >
          Supplier
        </button>
      </div>

      <div className="form-section">
        <h3>
          {editingId ? 'Edit' : 'Tambah'}{' '}
          {activeTab === 'customers' ? 'Pelanggan' : 'Supplier'}
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nama *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Telepon</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Alamat</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleInputChange}
            />
          </div>

          <input type="hidden" name="type" value={formData.type} />

          <div className="form-actions">
            <button type="submit" className="primary">
              {editingId ? 'Update' : 'Simpan'}
            </button>
            {editingId && (
              <button
                type="button"
                className="secondary"
                onClick={() => {
                  setEditingId(null);
                  setFormData({
                    name: '',
                    phone: '',
                    email: '',
                    address: '',
                    type: activeTab === 'customers' ? 'customer' : 'supplier',
                  });
                }}
              >
                Batal
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="list-section">
        <h3>Daftar {activeTab === 'customers' ? 'Pelanggan' : 'Supplier'}</h3>

        <div className="search-bar">
          <input type="text" placeholder="Cari..." />
          <button>Filter</button>
        </div>

        <table>
          <thead>
            <tr>
              <th>Nama</th>
              <th>Telepon</th>
              <th>Transaksi</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredContacts.map((contact) => (
              <tr key={contact.id}>
                <td>{contact.name}</td>
                <td>{contact.phone || '-'}</td>
                <td>{contact.transactionCount} transaksi</td>
                <td className="actions">
                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(contact)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(contact.id)}
                  >
                    Hapus
                  </button>
                  <button
                    className="detail-btn"
                    onClick={() => {
                      // Navigasi ke detail transaksi
                      alert(`Menampilkan transaksi untuk ${contact.name}`);
                    }}
                  >
                    Detail
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerSupplier;
