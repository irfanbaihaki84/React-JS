import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import QuestList from '../Quest/QuestList';

const StudentDashboard = () => {
  const { currentUser, quests, logout } = useAppContext();
  const studentQuests = quests.filter((q) =>
    q.assignedTo.includes(currentUser.id)
  );
  console.log('lecturerDashboard1 ', currentUser);
  const navigate = useNavigate();

  const handleSignOut = () => {
    logout();
    navigate('/signin');
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Student Dashboard</h1>
        <div className="user-info">
          <span>Welcome, {currentUser?.username}</span>
          <button onClick={handleSignOut} className="sign-out-btn">
            Sign Out
          </button>
        </div>
      </div>
      {/* <h1>Student Dashboard</h1>
      <div className="stats">
        <h3>{currentUser.username}</h3>
        <button className="btn-logout" onClick={handleSignOut}>
          Sign Out
        </button>
      </div> */}

      <div className="stats">
        <div>Your Quests: {studentQuests.length}</div>
        <div>
          Pending: {studentQuests.filter((q) => q.status === 'pending').length}
        </div>
        <div>
          In Progress:{' '}
          {studentQuests.filter((q) => q.status === 'in-progress').length}
        </div>
        <div>
          Completed:{' '}
          {studentQuests.filter((q) => q.status === 'completed').length}
        </div>
      </div>
      <QuestList quests={studentQuests} />
    </div>
  );
};

export default StudentDashboard;
