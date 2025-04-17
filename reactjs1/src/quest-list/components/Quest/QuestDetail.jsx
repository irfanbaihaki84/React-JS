import { Link, useParams } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';

const QuestDetail = () => {
  const { id } = useParams();
  const { quests } = useAppContext();
  const quest = quests.find((q) => q.id === Number(id));

  if (!quest) {
    return <div>Quest not found</div>;
  }

  return (
    <div className="quest-detail">
      <h2>{quest.title}</h2>
      <p className="quest-text">{quest.description}</p>
      <div className="quest-text">Status: {quest.status}</div>
      <div className="quest-text">Due Date: {quest.dueDate}</div>
      <div className="btn-group">
        <Link to={`/studentdashboard/${quest.id}`} className="btn-logout">
          Back
        </Link>
      </div>
    </div>
  );
};

export default QuestDetail;
