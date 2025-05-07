import React, { useState } from 'react';
import TableCard from '../Shared/TableCard';
import OrderForm from './OrderForm';
import './waiter.css';

const TableManagement = ({ menus, tables, orders, updateData }) => {
  const [selectedTable, setSelectedTable] = useState(null);
  const [showOrderForm, setShowOrderForm] = useState(false);

  const handleTableSelect = (table) => {
    setSelectedTable(table);
    setShowOrderForm(true);
  };

  const handleCleanTable = (tableId) => {
    const updatedTables = tables.map((table) =>
      table.id === tableId ? { ...table, status: 'available' } : table
    );
    updateData((prevData) => ({
      ...prevData,
      tables: updatedTables,
    }));
  };

  return (
    <div className="table-management">
      <div className="tables-section">
        <h3>Restaurant Tables</h3>
        <div className="tables-grid">
          {tables.map((table) => {
            const tableOrder = orders.find(
              (o) => o.tableNumber === table.number && o.status !== 'paid'
            );
            return (
              <TableCard
                key={table.id}
                table={table}
                currentOrder={tableOrder}
                onSelect={() => handleTableSelect(table)}
              />
            );
          })}
        </div>
      </div>

      {showOrderForm && (
        <OrderForm
          table={selectedTable}
          menus={menus}
          onClose={() => setShowOrderForm(false)}
          onSubmit={(newOrder) => {
            const updatedOrders = [...orders, newOrder];
            const updatedTables = tables.map((t) =>
              t.id === selectedTable.id ? { ...t, status: 'occupied' } : t
            );
            updateData((prevData) => ({
              ...prevData,
              orders: updatedOrders,
              tables: updatedTables,
            }));
            setShowOrderForm(false);
          }}
        />
      )}
    </div>
  );
};

export default TableManagement;
