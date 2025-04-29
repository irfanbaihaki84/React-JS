import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';

const Item = ({ item }) => {
  const { deleteItem } = useAppContext();
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/edit-item/${item.id}`);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      deleteItem(item.id);
    }
  };

  return (
    <tr>
      <td>{item.id}</td>
      <td>{item.nama}</td>
      <td>Rp {item.hargaItem.toLocaleString()}</td>
      <td>{item.isActive ? 'Active' : 'Inactive'}</td>
      <td>{item.created_At}</td>
      <td>
        <button onClick={handleEdit}>Edit</button>
        <button onClick={handleDelete} className="delete">
          Delete
        </button>
      </td>
    </tr>
  );
};

export default Item;
