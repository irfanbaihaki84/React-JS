import { Link } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';

const UserList = () => {
  const { state, dispatch } = useAppContext();
  const { users } = state;

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      dispatch({ type: 'DELETE_USER', payload: id });
    }
  };

  return (
    <div className="list-container">
      <div className="list-header">
        <div>
          <h2>User List</h2>
          <Link to="/admin" className="btn-edit">
            Back
          </Link>
        </div>
        <Link to="/admin/users/add" className="btn-add">
          Add New User
        </Link>
      </div>
      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Active</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.status ? 'Active' : 'Inactive'}</td>
              <td>{user.isActive ? 'Yes' : 'No'}</td>
              <td>{user.created_At}</td>
              <td className="actions">
                <Link to={`/admin/users/edit/${user.id}`} className="btn-edit">
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="btn-delete"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
