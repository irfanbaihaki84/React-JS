import React, { useState } from 'react';
import './admin.css';

const EmployeeManagement = ({ data, updateData }) => {
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    email: '',
    role: 'waiter',
    password: '',
  });
  const [editingId, setEditingId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      // Update existing employee
      const updatedEmployees = data.employees.map((emp) =>
        emp.id === editingId ? { ...newEmployee, id: editingId } : emp
      );
      updateData({ ...data, employees: updatedEmployees });
    } else {
      // Add new employee
      const updatedEmployees = [
        ...data.employees,
        {
          ...newEmployee,
          id: Math.max(0, ...data.employees.map((e) => e.id)) + 1,
        },
      ];
      updateData({ ...data, employees: updatedEmployees });
    }
    resetForm();
  };

  const handleEdit = (employee) => {
    setNewEmployee({
      name: employee.name,
      email: employee.email,
      role: employee.role,
      password: '',
    });
    setEditingId(employee.id);
  };

  const handleDelete = (id) => {
    const updatedEmployees = data.employees.filter((emp) => emp.id !== id);
    updateData({ ...data, employees: updatedEmployees });
  };

  const resetForm = () => {
    setNewEmployee({
      name: '',
      email: '',
      role: 'waiter',
      password: '',
    });
    setEditingId(null);
  };

  return (
    <div className="employee-management">
      <div className="employee-form">
        <h3>{editingId ? 'Edit Employee' : 'Add New Employee'}</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              value={newEmployee.name}
              onChange={(e) =>
                setNewEmployee({ ...newEmployee, name: e.target.value })
              }
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={newEmployee.email}
              onChange={(e) =>
                setNewEmployee({ ...newEmployee, email: e.target.value })
              }
              required
            />
          </div>
          <div className="form-group">
            <label>Role</label>
            <select
              value={newEmployee.role}
              onChange={(e) =>
                setNewEmployee({ ...newEmployee, role: e.target.value })
              }
            >
              <option value="admin">Admin</option>
              <option value="cashier">Cashier</option>
              <option value="waiter">Waiter</option>
              <option value="chef">Chef</option>
            </select>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={newEmployee.password}
              onChange={(e) =>
                setNewEmployee({ ...newEmployee, password: e.target.value })
              }
              required={!editingId}
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="btn-save">
              {editingId ? 'Update' : 'Add'} Employee
            </button>
            {editingId && (
              <button type="button" className="btn-cancel" onClick={resetForm}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="employee-list">
        <h3>Employee List</h3>
        <table className="employee-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.employees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>{employee.role}</td>
                <td className="actions">
                  <button
                    className="btn-edit"
                    onClick={() => handleEdit(employee)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(employee.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeManagement;
