import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import QuestList from '../Quest/QuestList';

const AdminDashboard = () => {
  const { quests, users, currentUser } = useAppContext();
  console.log('adminDashboard1 ', currentUser);
  const navigate = useNavigate();

  const handleSignOut = () => {
    navigate('/signin');
  };

  return (
    <div className="dashboard">
      <h1>Admin Dashboard</h1>
      <div className="stats">
        <h3>{currentUser.username}</h3>
        <button className="btn-logout" onClick={handleSignOut}>
          Sign Out
        </button>
      </div>
      <div className="stats">
        <div>Total Quests: {quests.length}</div>
        <div>Total Users: {users.length}</div>
      </div>
      <QuestList showAll={true} />
    </div>
  );
};

export default AdminDashboard;
