import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';

const UserForm = ({ userToEdit }) => {
  const [formData, setFormData] = useState(
    userToEdit || {
      username: '',
      password: '',
      email: '',
      role: 'pelanggan',
      status: true,
    }
  );
  const { addUser, updateUser } = useAppContext();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userToEdit) {
      updateUser(formData);
    } else {
      addUser(formData);
    }
    navigate('/admin-dashboard');
  };

  return (
    <div className="form-container">
      <h2>{userToEdit ? 'Edit User' : 'Add New User'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required={!userToEdit}
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Role:</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="admin">Admin</option>
            <option value="kasir">Kasir</option>
            <option value="pelanggan">Pelanggan</option>
          </select>
        </div>
        <div className="form-group">
          <label>Status:</label>
          <select
            name="status"
            value={formData.status}
            onChange={(e) =>
              setFormData({ ...formData, status: e.target.value === 'true' })
            }
            required
          >
            <option value={true}>Active</option>
            <option value={false}>Inactive</option>
          </select>
        </div>
        <button type="submit">{userToEdit ? 'Update' : 'Add'} User</button>
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

export default UserForm;
