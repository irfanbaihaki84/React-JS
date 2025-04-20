import { useAppContext } from '../../context/AppContext';
import QuestList from '../Quest/QuestList';
import QuestForm from '../Quest/QuestForm';
import { useNavigate } from 'react-router-dom';

const LecturerDashboard = () => {
  const { currentUser, quests, logout } = useAppContext();
  const lecturerQuests = quests.filter((q) => q.createdBy === currentUser.id);
  console.log('lecturerDashboard1 ', currentUser);
  const navigate = useNavigate();

  const handleSignOut = () => {
    logout();
    navigate('/signin');
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Lecturer Dashboard</h1>
        <div className="user-info">
          <span>Welcome, {currentUser?.username}</span>
          <button onClick={handleSignOut} className="sign-out-btn">
            Sign Out
          </button>
        </div>
      </div>
      {/* <h1>Lecturer Dashboard</h1>
      <div className="stats">
        <h3>{currentUser.username}</h3>
        <button className="btn-logout" onClick={handleSignOut}>
          Sign Out
        </button>
      </div> */}
      <div className="stats">
        <div>Your Quests: {lecturerQuests.length}</div>
      </div>
      <QuestForm />
      <QuestList quests={lecturerQuests} />
    </div>
  );
};

export default LecturerDashboard;
