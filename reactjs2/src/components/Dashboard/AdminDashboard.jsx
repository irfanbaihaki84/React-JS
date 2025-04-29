import React from 'react';
// import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import UserList from '../User/UserList';
import ItemList from '../Item/ItemList';
// import { useEffect } from 'react';

const AdminDashboard = () => {
  const { currentUser, users, items, trans, dt_trans, alamat, signOut } =
    useAppContext();
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (!currentUser || currentUser.role !== 'admin') {
  //     navigate('/signin');
  //   }
  // }, [currentUser, navigate]);

  if (!currentUser || currentUser.role !== 'admin') {
    return null; // atau tampilkan loading spinner
  }

  return (
    <div className="dashboard">
      <header>
        <h1>Admin Dashboard</h1>
        <div className="user-info">
          <span>Welcome, {currentUser.username}</span>
          <button onClick={signOut}>Sign Out</button>
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

      <div className="sections">
        <section>
          <h2>Users</h2>
          <UserList />
        </section>

        <section>
          <h2>Items</h2>
          <ItemList />
        </section>

        <section>
          <h2>Transactions</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Buy ID</th>
                <th>Date</th>
                <th>Total</th>
                <th>Payment Method</th>
              </tr>
            </thead>
            <tbody>
              {trans.map((tran) => (
                <tr key={tran.id}>
                  <td>{tran.id}</td>
                  <td>{tran.buyId}</td>
                  <td>{tran.buyTanggal}</td>
                  <td>{tran.total}</td>
                  <td>{tran.bayarCara}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section>
          <h2>Addresses</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>User ID</th>
                <th>Phone</th>
                <th>Address</th>
              </tr>
            </thead>
            <tbody>
              {alamat.map((addr) => (
                <tr key={addr.id}>
                  <td>{addr.id}</td>
                  <td>{addr.userId}</td>
                  <td>{addr.phone}</td>
                  <td>{addr.alamat}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;
