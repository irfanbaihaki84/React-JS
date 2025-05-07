import React, { useState } from 'react';
import './admin.css';

const InventoryManagement = ({ data, updateData }) => {
  const [newItem, setNewItem] = useState({
    name: '',
    stock: 0,
    unit: 'kg',
    minStock: 5,
    supplier: '',
  });

  const handleAddItem = (e) => {
    e.preventDefault();
    const updatedInventory = [
      ...data.inventory,
      {
        ...newItem,
        id: Math.max(0, ...data.inventory.map((i) => i.id)) + 1,
      },
    ];
    updateData({ ...data, inventory: updatedInventory });
    setNewItem({
      name: '',
      stock: 0,
      unit: 'kg',
      minStock: 5,
      supplier: '',
    });
  };

  const handleStockUpdate = (id, newStock) => {
    const updatedInventory = data.inventory.map((item) =>
      item.id === id ? { ...item, stock: newStock } : item
    );
    updateData({ ...data, inventory: updatedInventory });
  };

  return (
    <div className="inventory-management">
      <div className="inventory-form">
        <h3>Add Inventory Item</h3>
        <form onSubmit={handleAddItem}>
          <div className="form-group">
            <label>Item Name</label>
            <input
              type="text"
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Initial Stock</label>
            <input
              type="number"
              min="0"
              value={newItem.stock}
              onChange={(e) =>
                setNewItem({ ...newItem, stock: parseInt(e.target.value) })
              }
              required
            />
          </div>
          <div className="form-group">
            <label>Unit</label>
            <select
              value={newItem.unit}
              onChange={(e) => setNewItem({ ...newItem, unit: e.target.value })}
            >
              <option value="kg">Kilogram</option>
              <option value="g">Gram</option>
              <option value="l">Liter</option>
              <option value="ml">Milliliter</option>
              <option value="pcs">Pieces</option>
            </select>
          </div>
          <div className="form-group">
            <label>Minimum Stock</label>
            <input
              type="number"
              min="1"
              value={newItem.minStock}
              onChange={(e) =>
                setNewItem({ ...newItem, minStock: parseInt(e.target.value) })
              }
              required
            />
          </div>
          <div className="form-group">
            <label>Supplier</label>
            <input
              type="text"
              value={newItem.supplier}
              onChange={(e) =>
                setNewItem({ ...newItem, supplier: e.target.value })
              }
            />
          </div>
          <button type="submit" className="btn-add">
            Add Item
          </button>
        </form>
      </div>

      <div className="inventory-list">
        <h3>Current Inventory</h3>
        <table className="inventory-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Stock</th>
              <th>Unit</th>
              <th>Min Stock</th>
              <th>Supplier</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.inventory.map((item) => (
              <tr
                key={item.id}
                className={item.stock < item.minStock ? 'low-stock' : ''}
              >
                <td>{item.name}</td>
                <td>
                  <input
                    type="number"
                    value={item.stock}
                    onChange={(e) =>
                      handleStockUpdate(item.id, parseInt(e.target.value))
                    }
                    min="0"
                  />
                </td>
                <td>{item.unit}</td>
                <td>{item.minStock}</td>
                <td>{item.supplier}</td>
                <td>
                  {item.stock < item.minStock ? (
                    <span className="status-warning">Low Stock</span>
                  ) : (
                    <span className="status-ok">OK</span>
                  )}
                </td>
                <td>
                  <button className="btn-order">Order More</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InventoryManagement;
