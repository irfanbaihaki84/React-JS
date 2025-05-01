import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useStore } from '../contexts/StoreContext';

const Navigation = () => {
  const location = useLocation();
  const { businessInfo } = useStore();

  return (
    <nav className="sidebar-navigation">
      <div className="business-info">
        <h2>{businessInfo.name || 'My Store'}</h2>
        <p>{businessInfo.address || 'Alamat toko'}</p>
      </div>

      <ul className="nav-menu">
        <li className={location.pathname === '/' ? 'active' : ''}>
          <Link to="/">
            <i className="fas fa-tachometer-alt"></i>
            <span>Dashboard</span>
          </Link>
        </li>
        <li className={location.pathname === '/products' ? 'active' : ''}>
          <Link to="/products">
            <i className="fas fa-boxes"></i>
            <span>Produk</span>
          </Link>
        </li>
        <li className={location.pathname === '/transactions' ? 'active' : ''}>
          <Link to="/transactions">
            <i className="fas fa-exchange-alt"></i>
            <span>Transaksi</span>
          </Link>
        </li>
        <li className={location.pathname === '/reports' ? 'active' : ''}>
          <Link to="/reports">
            <i className="fas fa-chart-bar"></i>
            <span>Laporan</span>
          </Link>
        </li>
        <li className={location.pathname === '/settings' ? 'active' : ''}>
          <Link to="/settings">
            <i className="fas fa-cog"></i>
            <span>Pengaturan</span>
          </Link>
        </li>
      </ul>

      <div className="nav-footer">
        <p>
          © {new Date().getFullYear()} My {businessInfo.name}
        </p>
      </div>
    </nav>
  );
};

export default Navigation;
