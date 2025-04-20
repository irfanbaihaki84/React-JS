import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';

const UserForm = () => {
  const { id } = useParams();
  const isEditing = !!id;
  const navigate = useNavigate();
  const { state, dispatch } = useAppContext();
  const { users } = state;

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    role: 'pelanggan',
    status: true,
    isActive: true,
  });

  useEffect(() => {
    if (isEditing) {
      const userToEdit = users.find((user) => user.id === parseInt(id));
      if (userToEdit) {
        setFormData({
          username: userToEdit.username,
          password: userToEdit.password,
          email: userToEdit.email,
          role: userToEdit.role,
          status: userToEdit.status,
          isActive: userToEdit.isActive,
        });
      }
    }
  }, [id, isEditing, users]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      dispatch({
        type: 'UPDATE_USER',
        payload: {
          id: parseInt(id),
          ...formData,
        },
      });
    } else {
      const newUser = {
        ...formData,
        id: users.length + 1,
        created_At: new Date().toLocaleDateString('en-GB'),
        updated_At: null,
      };
      dispatch({ type: 'ADD_USER', payload: newUser });
    }
    navigate('/admin/users');
  };

  return (
    <div className="form-container">
      <h2>{isEditing ? 'Edit User' : 'Add New User'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Role</label>
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
        <div className="form-group checkbox">
          <label>Status</label>
          <input
            type="checkbox"
            name="status"
            checked={formData.status}
            onChange={handleChange}
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
        <button type="submit">{isEditing ? 'Update User' : 'Add User'}</button>
        <button type="button" onClick={() => navigate('/admin/users')}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default UserForm;
