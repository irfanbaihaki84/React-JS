import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import Item from './Item';

const ItemList = () => {
  const { items } = useAppContext();
  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate('/add-item')}>Add New Item</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Status</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <Item key={item.id} item={item} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ItemList;
