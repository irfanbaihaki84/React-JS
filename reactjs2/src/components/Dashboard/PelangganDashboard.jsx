import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';

const PelangganDashboard = () => {
  const { currentUser, trans, dt_trans, alamat, signOut } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser || currentUser.role !== 'pelanggan') {
      navigate('/signin');
      return null;
    }
  }, []);

  const userTransactions = trans.filter(
    (tran) => tran.cusId && tran.cusId.includes(currentUser.id)
  );

  const getUserAddress = () => {
    return alamat.find(
      (addr) => addr.userId && addr.userId.includes(currentUser.id)
    );
  };

  return (
    <div className="dashboard">
      <header>
        <h1>Pelanggan Dashboard</h1>
        <div className="user-info">
          <span>Welcome, {currentUser.username}</span>
          <button onClick={signOut}>Sign Out</button>
        </div>
      </header>

      <div className="section">
        <section>
          <h2>My Profile</h2>
          <div className="profile-info">
            <p>
              <strong>Username:</strong> {currentUser.username}
            </p>
            <p>
              <strong>Email:</strong> {currentUser.email}
            </p>
            <p>
              <strong>Role:</strong> {currentUser.role}
            </p>
            {getUserAddress() && (
              <>
                <p>
                  <strong>Phone:</strong> {getUserAddress().phone}
                </p>
                <p>
                  <strong>Address:</strong> {getUserAddress().alamat}
                </p>
              </>
            )}
          </div>
        </section>

        <section>
          <h2>My Transactions</h2>
          {userTransactions.length === 0 ? (
            <p>No transactions found</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Buy ID</th>
                  <th>Date</th>
                  <th>Total</th>
                  <th>Payment Method</th>
                  <th>Items</th>
                </tr>
              </thead>
              <tbody>
                {userTransactions.map((tran) => {
                  const transactionItems = dt_trans.filter(
                    (dt) => dt.buyId === tran.buyId
                  );
                  return (
                    <tr key={tran.id}>
                      <td>{tran.id}</td>
                      <td>{tran.buyId}</td>
                      <td>{tran.buyTanggal}</td>
                      <td>Rp {tran.total.toLocaleString()}</td>
                      <td>{tran.bayarCara}</td>
                      <td>
                        <ul>
                          {transactionItems.map((item) => (
                            <li key={item.id}>
                              {item.qty} x Item {item.item} (Rp{' '}
                              {item.harga.toLocaleString()})
                            </li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </section>
      </div>
    </div>
  );
};

export default PelangganDashboard;
