import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-header">
        <h1>Financial Manager</h1>
        <button
          className="hamburger"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>
      </div>
      <ul className={isMenuOpen ? 'open' : ''}>
        <li>
          <Link to="/" onClick={() => setIsMenuOpen(false)}>
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/transactions" onClick={() => setIsMenuOpen(false)}>
            Transaksi
          </Link>
        </li>
        <li>
          <Link to="/accounts" onClick={() => setIsMenuOpen(false)}>
            Akun
          </Link>
        </li>
        <li>
          <Link to="/categories" onClick={() => setIsMenuOpen(false)}>
            Kategori
          </Link>
        </li>
        <li>
          <Link to="/budgets" onClick={() => setIsMenuOpen(false)}>
            Anggaran
          </Link>
        </li>
        <li>
          <Link to="/reports" onClick={() => setIsMenuOpen(false)}>
            Laporan
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

// import { Link } from 'react-router-dom';

// const Navbar = () => {
//   return (
//     <nav className="navbar">
//       <h1>Financial Manager</h1>
//       <ul>
//         <li><Link to="/">Dashboard</Link></li>
//         <li><Link to="/transactions">Transaksi</Link></li>
//         <li><Link to="/accounts">Akun</Link></li>
//         <li><Link to="/categories">Kategori</Link></li>
//         <li><Link to="/budgets">Anggaran</Link></li>
//         <li><Link to="/reports">Laporan</Link></li>
//       </ul>
//     </nav>
//   );
// };

// export default Navbar;
