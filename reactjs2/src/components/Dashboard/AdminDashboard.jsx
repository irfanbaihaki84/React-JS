import { Link } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';

const AdminDashboard = () => {
  const { state } = useAppContext();
  const { users, items, trans, dt_trans, alamat, currentUser } = state;

  return (
    <div className="dashboard">
      <header>
        <h2>Admin Dashboard</h2>
        <div className="user-info">
          <span>Welcome, {currentUser?.username}</span>
          <Link to="/signout" className="btn-signout">
            Sign Out
          </Link>
        </div>
      </header>

      <div className="stats">
        <div className="stat-card">
          <h3>Users</h3>
          <p>{users.length}</p>
        </div>
        <div className="stat-card">
          <h3>Items</h3>
          <p>{items.length}</p>
        </div>
        <div className="stat-card">
          <h3>Transactions</h3>
          <p>{trans.length}</p>
        </div>
        <div className="stat-card">
          <h3>Transaction Details</h3>
          <p>{dt_trans.length}</p>
        </div>
      </div>

      <div className="dashboard-links">
        <Link to="/admin/users" className="dashboard-link">
          Manage Users
        </Link>
        <Link to="/admin/items" className="dashboard-link">
          Manage Items
        </Link>
      </div>

      <div className="recent-data">
        <div className="data-section">
          <h3>Recent Users</h3>
          <ul>
            {users.slice(0, 5).map((user) => (
              <li key={user.id}>
                {user.username} - {user.role}
              </li>
            ))}
          </ul>
        </div>
        <div className="data-section">
          <h3>Recent Items</h3>
          <ul>
            {items.slice(0, 5).map((item) => (
              <li key={item.id}>
                {item.nama} - Rp{item.hargaItem.toLocaleString()}
              </li>
            ))}
          </ul>
        </div>
        <div className="data-section">
          <h3>Recent Transactions</h3>
          <ul>
            {trans.slice(0, 5).map((t) => (
              <li key={t.id}>
                {t.buyId} - Rp{t.total.toLocaleString()}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
