import React from 'react';

const Navbar = ({ userRole, setUserRole }) => {
  return (
    <header className="navbar">
      <div className="navbar-brand">Restaurant Management</div>
      <nav className="navbar-nav">
        <select
          value={userRole}
          onChange={(e) => setUserRole(e.target.value)}
          className="role-selector"
        >
          <option value="admin">Admin</option>
          <option value="cashier">Cashier</option>
          <option value="waiter">Waiter</option>
          <option value="chef">Chef</option>
          <option value="customer">Customer</option>
        </select>
      </nav>
    </header>
  );
};

export default Navbar;
