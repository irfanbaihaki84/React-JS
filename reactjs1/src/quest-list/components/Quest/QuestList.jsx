import { useAppContext } from '../../context/AppContext';
import QuestItem from './QuestItem';

const QuestList = ({ quests, showAll }) => {
  const { quests: allQuests } = useAppContext();
  const displayedQuests = showAll ? allQuests : quests;

  return (
    <div className="quest-list">
      <h2>{showAll ? 'All Quests' : 'Your Quests'}</h2>
      {displayedQuests.length === 0 ? (
        <p>No quests found</p>
      ) : (
        displayedQuests.map((quest) => (
          <QuestItem key={quest.id} quest={quest} />
        ))
      )}
    </div>
  );
};

export default QuestList;
