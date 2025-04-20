import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';

const ItemForm = () => {
  const { id } = useParams();
  const isEditing = !!id;
  const navigate = useNavigate();
  const { state, dispatch } = useAppContext();
  const { items } = state;

  const [formData, setFormData] = useState({
    nama: '',
    hargaItem: 0,
    isActive: true,
  });

  useEffect(() => {
    if (isEditing) {
      const itemToEdit = items.find((item) => item.id === parseInt(id));
      if (itemToEdit) {
        setFormData({
          nama: itemToEdit.nama,
          hargaItem: itemToEdit.hargaItem,
          isActive: itemToEdit.isActive,
        });
      }
    }
  }, [id, isEditing, items]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]:
        type === 'checkbox'
          ? checked
          : type === 'number'
          ? Number(value)
          : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      dispatch({
        type: 'UPDATE_ITEM',
        payload: {
          id: parseInt(id),
          ...formData,
        },
      });
    } else {
      const newItem = {
        ...formData,
        id: items.length + 1,
        created_At: new Date().toLocaleDateString('en-GB'),
        updated_At: null,
      };
      dispatch({ type: 'ADD_ITEM', payload: newItem });
    }
    navigate('/admin/items');
  };

  return (
    <div className="form-container">
      <h2>{isEditing ? 'Edit Item' : 'Add New Item'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Item Name</label>
          <input
            type="text"
            name="nama"
            value={formData.nama}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Price</label>
          <input
            type="number"
            name="hargaItem"
            value={formData.hargaItem}
            onChange={handleChange}
            required
            min="0"
          />
        </div>
        <div className="form-group checkbox">
          <label>Active</label>
          <input
            type="checkbox"
            name="isActive"
            checked={formData.isActive}
            onChange={handleChange}
          />
        </div>
        <button type="submit">{isEditing ? 'Update Item' : 'Add Item'}</button>
        <button type="button" onClick={() => navigate('/admin/items')}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default ItemForm;
