import { createContext, useReducer, useContext } from 'react';
import { authReducer } from '../reducers/authReducer';
import { questReducer } from '../reducers/questReducer';

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
    title: 'Complete React Project',
    description: 'Build a quest manager app',
    assignedTo: [3],
    dueDate: '2025-04-31',
    status: 'pending',
    createdBy: 2,
  },
  {
    id: 2,
    title: 'Learn Redux',
    description: 'Study state management',
    assignedTo: [3],
    dueDate: '2025-04-30',
    status: 'in-progress',
    createdBy: 2,
  },
  {
    id: 3,
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
  const [authState, authDispatch] = useReducer(authReducer, {
    users: initialUsers,
    currentUser: null,
    isAuthenticated: false,
  });

  const [userState, userDispatch] = useReducer(authReducer, {
    users: initialUsers,
  });

  const [questState, questDispatch] = useReducer(questReducer, {
    quests: initialQuests,
  });

  const login = (username, password) => {
    const user = authState.users.find(
      (u) => u.username === username && u.password === password
    );
    if (user) {
      authDispatch({ type: 'LOGIN', payload: { user } });
      return true;
    }
    return false;
  };

  const logout = () => {
    authDispatch({ type: 'LOGOUT' });
  };

  const register = (username, password, role) => {
    const newUser = {
      id: authState.users.length + 1,
      username,
      password,
      role,
    };
    authDispatch({ type: 'REGISTER', payload: { newUser } });
    return newUser;
  };

  const addUser = (newUser) => {
    userDispatch({ type: 'ADD_USER', payload: { newUser } });
  };

  const addQuest = (newQuest) => {
    questDispatch({ type: 'ADD_QUEST', payload: { newQuest } });
  };

  const updateUser = (userId, updates) => {
    userDispatch({ type: 'UPDATE_USER', payload: { userId, updates } });
  };

  const updateQuest = (questId, updates) => {
    questDispatch({ type: 'UPDATE_QUEST', payload: { questId, updates } });
  };

  const deleteUser = (userId) => {
    userDispatch({ type: 'DELETE_USER', payload: { userId } });
  };

  const deleteQuest = (questId) => {
    questDispatch({ type: 'DELETE_QUEST', payload: { questId } });
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
