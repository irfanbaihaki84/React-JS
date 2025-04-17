import { useAppContext } from '../../context/AppContext';
import QuestList from '../Quest/QuestList';
import QuestForm from '../Quest/QuestForm';
import { useNavigate } from 'react-router-dom';

const LecturerDashboard = () => {
  const { currentUser, quests } = useAppContext();
  const lecturerQuests = quests.filter((q) => q.createdBy === currentUser.id);
  console.log('lecturerDashboard1 ', currentUser);
  const navigate = useNavigate();

  const handleSignOut = () => {
    navigate('/signin');
  };

  return (
    <div className="dashboard">
      <h1>Lecturer Dashboard</h1>
      <div className="stats">
        <h3>{currentUser.username}</h3>
        <button className="btn-logout" onClick={handleSignOut}>
          Sign Out
        </button>
      </div>
      <div className="stats">
        <div>Your Quests: {lecturerQuests.length}</div>
      </div>
      <QuestForm />
      <QuestList quests={lecturerQuests} />
    </div>
  );
};

export default LecturerDashboard;
