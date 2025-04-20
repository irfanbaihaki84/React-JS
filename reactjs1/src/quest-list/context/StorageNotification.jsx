import { useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';

const StorageNotification = () => {
  const { quests, users } = useAppContext();
  const [showNotification, setShowNotification] = useState(false);
  const [lastAction, setLastAction] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNotification(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [showNotification]);

  useEffect(() => {
    // This would be triggered by your CRUD operations
    // For example, after adding a quest:
    setLastAction('Quest added');
    setShowNotification(true);
  }, [quests, users]);

  if (!showNotification) return null;

  return (
    <div className="storage-notification">
      {lastAction} - Data saved locally (expires in 1 hour)
    </div>
  );
};

export default StorageNotification;
