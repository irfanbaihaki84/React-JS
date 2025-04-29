import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';

const User = ({ user }) => {
  const { deleteUser } = useAppContext();
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/edit-user/${user.id}`);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      deleteUser(user.id);
    }
  };

  return (
    <tr>
      <td>{user.id}</td>
      <td>{user.username}</td>
      <td>{user.email}</td>
      <td>{user.role}</td>
      <td>{user.status ? 'Active' : 'Inactive'}</td>
      <td>{user.created_At}</td>
      <td>
        <button onClick={handleEdit}>Edit</button>
        <button onClick={handleDelete} className="delete">
          Delete
        </button>
      </td>
    </tr>
  );
};

export default User;
