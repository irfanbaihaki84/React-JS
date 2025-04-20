import { useEffect } from 'react';
import { useAppContext } from './AppContext';

export const StorageNotification = () => {
  const { state, dispatch } = useAppContext();

  useEffect(() => {
    if (state.notification) {
      const timer = setTimeout(() => {
        dispatch({ type: 'CLEAR_NOTIFICATION' });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [state.notification, dispatch]);

  if (!state.notification) return null;

  return (
    <div className={`notification ${state.notification.type}`}>
      {state.notification.message}
    </div>
  );
};
