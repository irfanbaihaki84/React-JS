import { useAppContext } from '../../context/AppContext';
import { Link } from 'react-router-dom';

const QuestItem = ({ quest }) => {
  const { currentUser, updateQuest, deleteQuest } = useAppContext();
  const { users } = useAppContext();

  const getCreatorName = (id) => {
    const creator = users.find((u) => u.id === id);
    return creator ? creator.username : 'Unknown';
  };

  const handleStatusChange = (newStatus) => {
    updateQuest(quest.id, { status: newStatus });
  };

  return (
    <div className={`quest-item ${quest.status}`}>
      <h3>
        <Link to={`/quest/${quest.id}`}>{quest.title}</Link>
      </h3>
      <p>{quest.description}</p>
      <div className="quest-meta">
        <span>Due: {quest.dueDate}</span>
        <span>Created by: {getCreatorName(quest.createdBy)}</span>
        <span>Status: {quest.status}</span>
      </div>

      {currentUser.role === 'student' && (
        <div className="status-actions">
          <button onClick={() => handleStatusChange('pending')}>Pending</button>
          <button onClick={() => handleStatusChange('in-progress')}>
            In Progress
          </button>
          <button onClick={() => handleStatusChange('completed')}>
            Complete
          </button>
        </div>
      )}

      {(currentUser.role === 'admin' || currentUser.id === quest.createdBy) && (
        <button onClick={() => deleteQuest(quest.id)} className="delete-btn">
          Delete
        </button>
      )}
    </div>
  );
};

export default QuestItem;
