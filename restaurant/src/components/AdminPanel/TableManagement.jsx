import React, { useState } from 'react';
import TableCard from '../Shared/TableCard';
import './admin.css';

const TableManagement = ({ data, updateData }) => {
  const [newTable, setNewTable] = useState({
    number: '',
    capacity: 4,
    status: 'available',
  });

  const handleAddTable = (e) => {
    e.preventDefault();
    const updatedTables = [
      ...data.tables,
      {
        ...newTable,
        id: Math.max(0, ...data.tables.map((t) => t.id)) + 1,
      },
    ];
    updateData({ ...data, tables: updatedTables });
    setNewTable({
      number: '',
      capacity: 4,
      status: 'available',
    });
  };

  const handleStatusChange = (tableId, newStatus) => {
    const updatedTables = data.tables.map((table) =>
      table.id === tableId ? { ...table, status: newStatus } : table
    );
    updateData({ ...data, tables: updatedTables });
  };

  return (
    <div className="table-management">
      <div className="add-table-form">
        <h3>Add New Table</h3>
        <form onSubmit={handleAddTable}>
          <div className="form-group">
            <label>Table Number</label>
            <input
              type="text"
              value={newTable.number}
              onChange={(e) =>
                setNewTable({ ...newTable, number: e.target.value })
              }
              required
            />
          </div>
          <div className="form-group">
            <label>Capacity</label>
            <input
              type="number"
              min="1"
              value={newTable.capacity}
              onChange={(e) =>
                setNewTable({ ...newTable, capacity: parseInt(e.target.value) })
              }
              required
            />
          </div>
          <button type="submit" className="btn-add">
            Add Table
          </button>
        </form>
      </div>

      <div className="tables-grid">
        <h3>Current Tables</h3>
        <div className="tables-container">
          {data.tables.map((table) => {
            const tableOrder = data.orders.find(
              (order) =>
                order.tableNumber === table.number && order.status !== 'paid'
            );
            return (
              <TableCard
                key={table.id}
                table={table}
                currentOrder={tableOrder}
                onSelect={() => {}}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TableManagement;
