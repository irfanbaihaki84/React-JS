import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';

const ItemForm = ({ itemToEdit }) => {
  const [formData, setFormData] = useState(
    itemToEdit || {
      nama: '',
      hargaItem: 0,
    }
  );
  const { addItem, updateItem } = useAppContext();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (itemToEdit) {
      updateItem(formData);
    } else {
      addItem(formData);
    }
    navigate('/admin-dashboard');
  };

  return (
    <div className="form-container">
      <h2>{itemToEdit ? 'Edit Item' : 'Add New Item'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="nama"
            value={formData.nama}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Price:</label>
          <input
            type="number"
            name="hargaItem"
            value={formData.hargaItem}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">{itemToEdit ? 'Update' : 'Add'} Item</button>
        <button
          type="button"
          onClick={() => navigate('/admin-dashboard')}
          className="cancel"
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default ItemForm;
