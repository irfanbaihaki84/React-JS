import { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const {
    currentUser,
    quests,
    users,
    addQuest,
    updateQuest,
    deleteQuest,
    addUser,
    updateUser,
    deleteUser,
    logout,
  } = useAppContext();

  // State for quest management
  const [questForm, setQuestForm] = useState({
    id: null,
    title: '',
    description: '',
    assignedTo: [],
    dueDate: '',
    status: 'pending',
    createdBy: currentUser.id,
  });

  // State for user management
  const [userForm, setUserForm] = useState({
    id: null,
    username: '',
    password: '',
    role: 'student',
  });
  console.log('handleChange ', JSON.stringify({ ...userForm }));

  // State for active tab
  const [activeTab, setActiveTab] = useState('quests');

  // Handle quest form changes
  const handleQuestChange = (e) => {
    const { name, value } = e.target;
    setQuestForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle user form changes
  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setUserForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit quest form
  const handleQuestSubmit = (e) => {
    e.preventDefault();
    if (questForm.id) {
      // Update existing quest
      updateQuest(questForm.id, questForm);
    } else {
      // Add new quest
      addQuest({
        ...questForm,
        id: Date.now(),
        createdBy: currentUser.id,
      });
    }
    resetQuestForm();
  };

  // Submit user form
  const handleUserSubmit = (e) => {
    e.preventDefault();
    if (userForm.id) {
      // Update existing user
      updateUser(userForm.id, userForm);
    } else {
      // Add new user
      addUser({
        id: Date.now(),
        ...userForm,
      });
      console.log('tes ', addUser);
    }
    resetUserForm();
  };

  // Edit quest
  const editQuest = (quest) => {
    setQuestForm({
      id: quest.id,
      title: quest.title,
      description: quest.description,
      assignedTo: quest.assignedTo,
      dueDate: quest.dueDate,
      status: quest.status,
    });
  };

  // Edit user
  const editUser = (user) => {
    setUserForm({
      id: user.id,
      username: user.username,
      password: user.password,
      role: user.role,
    });
  };

  // Reset quest form
  const resetQuestForm = () => {
    setQuestForm({
      id: null,
      title: '',
      description: '',
      assignedTo: [],
      dueDate: '',
      status: 'pending',
    });
  };

  // Reset user form
  const resetUserForm = () => {
    setUserForm({
      id: null,
      username: '',
      password: '',
      role: 'student',
    });
  };

  // Toggle user assignment to quest
  const toggleAssignment = (userId) => {
    setQuestForm((prev) => ({
      ...prev,
      assignedTo: prev.assignedTo.includes(userId)
        ? prev.assignedTo.filter((id) => id !== userId)
        : [...prev.assignedTo, userId],
    }));
  };

  const handleSignOut = () => {
    logout();
    navigate('/signin');
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <div className="user-info">
          <span>Welcome, {currentUser?.username}</span>
          <button onClick={handleSignOut} className="sign-out-btn">
            Sign Out
          </button>
        </div>
      </div>
      {/* <h1>Admin Dashboard</h1>
      <button className="btn-logout" onClick={handleSignOut}>
        Sign Out
      </button> */}

      {/* Navigation Tabs */}
      <div className="tabs">
        <button
          className={activeTab === 'quests' ? 'active' : ''}
          onClick={() => setActiveTab('quests')}
        >
          Manage Quests
        </button>
        <button
          className={activeTab === 'users' ? 'active' : ''}
          onClick={() => setActiveTab('users')}
        >
          Manage Users
        </button>
      </div>

      {/* Quests Management */}
      {activeTab === 'quests' && (
        <div className="quest-management">
          <h2>Quest Management</h2>

          {/* Quest Form */}
          <form onSubmit={handleQuestSubmit} className="admin-form">
            <h3>{questForm.id ? 'Edit Quest' : 'Add New Quest'}</h3>

            <div className="form-group">
              <label>Title:</label>
              <input
                type="text"
                name="title"
                value={questForm.title}
                onChange={handleQuestChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Description:</label>
              <textarea
                name="description"
                value={questForm.description}
                onChange={handleQuestChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Due Date:</label>
              <input
                type="date"
                name="dueDate"
                value={questForm.dueDate}
                onChange={handleQuestChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Status:</label>
              <select
                name="status"
                value={questForm.status}
                onChange={handleQuestChange}
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div className="form-group">
              <label>Assign To:</label>
              <div className="assignee-list">
                {users
                  .filter((u) => u.role !== 'admin')
                  .map((user) => (
                    <div key={user.id} className="assignee-item">
                      <input
                        type="checkbox"
                        id={`user-${user.id}`}
                        checked={questForm.assignedTo.includes(user.id)}
                        onChange={() => toggleAssignment(user.id)}
                      />
                      <label htmlFor={`user-${user.id}`}>
                        {user.username} ({user.role})
                      </label>
                    </div>
                  ))}
              </div>
            </div>

            <div className="form-actions">
              <button type="submit">
                {questForm.id ? 'Update Quest' : 'Add Quest'}
              </button>
              {questForm.id && (
                <button type="button" onClick={resetQuestForm}>
                  Cancel
                </button>
              )}
            </div>
          </form>

          {/* Quest List */}
          <div className="admin-list">
            <h3>All Quests ({quests.length})</h3>
            {quests.length === 0 ? (
              <p>No quests found</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Due Date</th>
                    <th>Status</th>
                    <th>Assigned To</th>
                    <th>CreatedBy</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {quests.map((quest) => (
                    <tr key={quest.id}>
                      <td>{quest.title}</td>
                      <td>{quest.description}</td>
                      <td>{quest.dueDate}</td>
                      <td>
                        <span className={`status-badge ${quest.status}`}>
                          {quest.status}
                        </span>
                      </td>
                      <td>
                        {quest.assignedTo.map((id) => {
                          const user = users.find((u) => u.id === id);
                          return user ? (
                            <span key={id} className="user-badge">
                              {user.username}
                            </span>
                          ) : null;
                        })}
                      </td>
                      <td>{quest.createdBy}</td>
                      <td className="actions">
                        <button onClick={() => editQuest(quest)}>Edit</button>
                        <button
                          onClick={() => deleteQuest(quest.id)}
                          className="delete"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}

      {/* Users Management */}
      {activeTab === 'users' && (
        <div className="user-management">
          <h2>User Management</h2>

          {/* User Form */}
          <form onSubmit={handleUserSubmit} className="admin-form">
            <h3>{userForm.id ? 'Edit User' : 'Add New User'}</h3>

            <div className="form-group">
              <label>Username:</label>
              <input
                type="text"
                name="username"
                value={userForm.username}
                onChange={handleUserChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                name="password"
                value={userForm.password}
                onChange={handleUserChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Role:</label>
              <select
                name="role"
                value={userForm.role}
                onChange={handleUserChange}
              >
                <option value="admin">Admin</option>
                <option value="lecturer">Lecturer</option>
                <option value="student">Student</option>
              </select>
            </div>

            <div className="form-actions">
              <button type="submit">
                {userForm.id ? 'Update User' : 'Add User'}
              </button>
              {userForm.id && (
                <button type="button" onClick={resetUserForm}>
                  Cancel
                </button>
              )}
            </div>
          </form>

          {/* User List */}
          <div className="admin-list">
            <h3>All Users ({users.length})</h3>
            {users.length === 0 ? (
              <p>No users found</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Role</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.username}</td>
                      <td>
                        <span className={`role-badge ${user.role}`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="actions">
                        <button onClick={() => editUser(user)}>Edit</button>
                        <button
                          onClick={() => deleteUser(user.id)}
                          className="delete"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
