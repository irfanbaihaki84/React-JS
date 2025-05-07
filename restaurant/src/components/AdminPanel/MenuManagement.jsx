import React, { useState } from 'react';
import MenuItem from '../Shared/MenuItem';
import './admin.css';

const MenuManagement = ({ data, updateData }) => {
  const [newMenu, setNewMenu] = useState({
    name: '',
    category: 'Main Course',
    price: 0,
    description: '',
    stock: 0,
    isAvailable: true,
  });

  const handleAddMenu = (e) => {
    e.preventDefault();
    const updatedMenus = [
      ...data.menus,
      {
        ...newMenu,
        id: Math.max(0, ...data.menus.map((m) => m.id)) + 1,
      },
    ];
    updateData({ ...data, menus: updatedMenus });
    setNewMenu({
      name: '',
      category: 'Main Course',
      price: 0,
      description: '',
      stock: 0,
      isAvailable: true,
    });
  };

  const handleDeleteMenu = (id) => {
    const updatedMenus = data.menus.filter((menu) => menu.id !== id);
    updateData({ ...data, menus: updatedMenus });
  };

  return (
    <div className="menu-management">
      <div className="add-menu-form">
        <h3>Add New Menu</h3>
        <form onSubmit={handleAddMenu}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              value={newMenu.name}
              onChange={(e) => setNewMenu({ ...newMenu, name: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Category</label>
            <select
              value={newMenu.category}
              onChange={(e) =>
                setNewMenu({ ...newMenu, category: e.target.value })
              }
            >
              <option value="Main Course">Main Course</option>
              <option value="Appetizer">Appetizer</option>
              <option value="Dessert">Dessert</option>
              <option value="Beverage">Beverage</option>
            </select>
          </div>
          <div className="form-group">
            <label>Price</label>
            <input
              type="text"
              value={newMenu.price}
              onChange={(e) =>
                setNewMenu({ ...newMenu, price: e.target.value })
              }
              required
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <input
              type="text"
              value={newMenu.description}
              onChange={(e) =>
                setNewMenu({ ...newMenu, description: e.target.value })
              }
              required
            />
          </div>
          <div className="form-group">
            <label>Stock</label>
            <input
              type="text"
              value={newMenu.stock}
              onChange={(e) =>
                setNewMenu({ ...newMenu, stock: e.target.value })
              }
              required
            />
          </div>

          <button type="submit" className="btn-add">
            Add Menu
          </button>
        </form>
      </div>

      <div className="menu-list">
        <h3>Current Menu Items</h3>
        <div className="menu-grid">
          {data.menus.map((menu) => (
            <MenuItem
              key={menu.id}
              item={menu}
              onDelete={() => handleDeleteMenu(menu.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuManagement;
