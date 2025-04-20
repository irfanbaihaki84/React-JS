import { Link } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';

const PelangganDashboard = () => {
  const { state } = useAppContext();
  const { trans, dt_trans, alamat, currentUser } = state;

  const userTransactions = trans.filter((t) =>
    t.cusId.includes(currentUser?.id)
  );
  const userAddresses = alamat.filter((a) =>
    a.userId.includes(currentUser?.id)
  );

  return (
    <div className="dashboard">
      <header>
        <h2>Pelanggan Dashboard</h2>
        <div className="user-info">
          <span>Welcome, {currentUser?.username}</span>
          <Link to="/signout" className="btn-signout">
            Sign Out
          </Link>
        </div>
      </header>

      <div className="pelanggan-container">
        <div className="user-info-section">
          <h3>Your Information</h3>
          <div className="info-card">
            <p>
              <strong>Username:</strong> {currentUser?.username}
            </p>
            <p>
              <strong>Email:</strong> {currentUser?.email}
            </p>
            <p>
              <strong>Role:</strong> {currentUser?.role}
            </p>
          </div>

          <h3>Your Addresses</h3>
          {userAddresses.length === 0 ? (
            <p>No addresses found</p>
          ) : (
            <ul className="address-list">
              {userAddresses.map((addr) => (
                <li key={addr.id}>
                  <p>
                    <strong>Phone:</strong> {addr.phone}
                  </p>
                  <p>
                    <strong>Address:</strong> {addr.alamat}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="transactions-section">
          <h3>Your Transactions</h3>
          {userTransactions.length === 0 ? (
            <p>No transactions found</p>
          ) : (
            <div className="transactions-list">
              {userTransactions.map((t) => {
                const transactionItems = dt_trans.filter(
                  (dt) => dt.buyId === t.buyId
                );
                return (
                  <div key={t.id} className="transaction-card">
                    <div className="transaction-header">
                      <span>
                        <strong>ID:</strong> {t.buyId}
                      </span>
                      <span>
                        <strong>Date:</strong> {t.buyTanggal}
                      </span>
                      <span>
                        <strong>Total:</strong> Rp{t.total.toLocaleString()}
                      </span>
                    </div>
                    <div className="transaction-items">
                      <h4>Items:</h4>
                      <ul>
                        {transactionItems.map((dt) => {
                          const item = state.items.find(
                            (i) => i.id === dt.item[0]
                          );
                          return (
                            <li key={dt.id}>
                              {item?.nama} - {dt.qty} x Rp
                              {dt.harga.toLocaleString()} = Rp
                              {dt.jumlah.toLocaleString()}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PelangganDashboard;
