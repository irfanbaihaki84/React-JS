import { createContext, useReducer, useContext, useEffect } from 'react';
import { authReducer } from '../reducers/authReducer';
import { questReducer } from '../reducers/questReducer';

const STORAGE_KEY = 'quest_manager_data';
const EXPIRY_TIME = 60 * 60 * 1000; // 1 hour in milliseconds

const loadFromLocalStorage = () => {
  const storedData = localStorage.getItem(STORAGE_KEY);
  if (!storedData) return null;

  const { data, timestamp } = JSON.parse(storedData);
  const now = new Date().getTime();

  if (now - timestamp > EXPIRY_TIME) {
    localStorage.removeItem(STORAGE_KEY);
    return null;
  }

  return data;
};

const saveToLocalStorage = (data) => {
  const storageData = {
    data,
    timestamp: new Date().getTime(),
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(storageData));
};

const initialUsers = [
  {
    id: 1,
    username: 'admin',
    password: 'admin123',
    role: 'admin',
    status: true,
  },
  {
    id: 2,
    username: 'lecturer1',
    password: 'lecturer123',
    role: 'lecturer',
    status: true,
  },
  {
    id: 3,
    username: 'student1',
    password: 'student123',
    role: 'student',
    status: true,
  },
  {
    id: 4,
    username: 'student2',
    password: 'student234',
    role: 'student',
    status: true,
  },
];

const initialQuests = [
  {
    id: 1,
    title: 'HTML Basic #1',
    description: 'Learning basic HTML for beginner student',
    assignedTo: [3],
    dueDate: '2025-04-31',
    status: 'completed',
    createdBy: 2,
  },
  {
    id: 2,
    title: 'HTML Basic #1',
    description: 'Learning basic HTML for beginner student',
    assignedTo: [4],
    dueDate: '2025-04-31',
    status: 'completed',
    createdBy: 2,
  },
  {
    id: 3,
    title: 'CSS Basic #1',
    description: 'Learning basic CSS for beginner student',
    assignedTo: [3],
    dueDate: '2025-04-30',
    status: 'in-progress',
    createdBy: 1,
  },
  {
    id: 4,
    title: 'CSS Basic #1',
    description: 'Learning basic CSS for beginner student',
    assignedTo: [4],
    dueDate: '2025-04-30',
    status: 'in-progress',
    createdBy: 1,
  },
  {
    id: 5,
    title: 'Review Assignments',
    description: 'Grade student submissions',
    assignedTo: [2],
    dueDate: '2025-04-15',
    status: 'completed',
    createdBy: 1,
  },
];

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const loadedData = loadFromLocalStorage();

  const [authState, authDispatch] = useReducer(authReducer, {
    users: loadedData?.users || initialUsers,
    currentUser: loadedData?.currentUser || null,
    isAuthenticated: loadedData?.isAuthenticated || false,
    // users: initialUsers,
    // currentUser: null,
    // isAuthenticated: false,
  });

  const [userState, userDispatch] = useReducer(authReducer, {
    users: initialUsers,
  });

  const [questState, questDispatch] = useReducer(questReducer, {
    quests: loadedData?.quests || initialQuests,
    // quests: initialQuests,
  });

  // Save to localStorage whenever state changes
  useEffect(() => {
    const dataToStore = {
      users: authState.users,
      currentUser: authState.currentUser,
      isAuthenticated: authState.isAuthenticated,
      quests: questState.quests,
    };
    saveToLocalStorage(dataToStore);
    // console.log('appContext ', authState);
  }, [authState, questState]);

  const login = (username, password) => {
    const user = authState.users.find(
      (u) => u.username === username && u.password === password
    );
    if (user) {
      authDispatch({ type: 'LOGIN', payload: user });
      return true;
    }
    return false;
  };

  const logout = () => {
    authDispatch({ type: 'LOGOUT' });
    localStorage.removeItem(STORAGE_KEY);
  };

  const register = (username, password, role, status) => {
    const newUser = {
      id: authState.users.length + 1,
      username,
      password,
      role,
      status,
    };
    authDispatch({ type: 'REGISTER', payload: { newUser } });
    return newUser;
  };

  const addQuest = (newQuest) => {
    questDispatch({ type: 'ADD_QUEST', payload: { newQuest } });
  };

  const updateQuest = (questId, updates) => {
    questDispatch({ type: 'UPDATE_QUEST', payload: { questId, updates } });
  };

  const deleteQuest = (questId) => {
    questDispatch({ type: 'DELETE_QUEST', payload: { questId } });
  };

  const addUser = (newUser) => {
    userDispatch({ type: 'ADD_USER', payload: { newUser } });
  };

  const updateUser = (userId, updates) => {
    userDispatch({ type: 'UPDATE_USER', payload: { userId, updates } });
  };

  const deleteUser = (userId) => {
    userDispatch({ type: 'DELETE_USER', payload: userId });
  };

  return (
    <AppContext.Provider
      value={{
        ...authState,
        ...userState,
        ...questState,
        login,
        logout,
        register,
        addUser,
        updateUser,
        deleteUser,
        addQuest,
        updateQuest,
        deleteQuest,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
