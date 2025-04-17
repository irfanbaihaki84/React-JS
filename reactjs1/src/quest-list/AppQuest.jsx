import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { useAppContext } from './context/AppContext';
import SignIn from './components/Auth/SignIn';
import SignUp from './components/Auth/SignUp';
import SignOut from './components/Auth/SignOut';
import AdminDashboard from './components/Dashboard/AdminDashboard';
import LecturerDashboard from './components/Dashboard/LecturerDashboard';
import StudentDashboard from './components/Dashboard/StudentDashboard';
import './styles/App.css';
import QuestDetail from './components/Quest/QuestDetail';

const AppQuest = () => {
  const { isAuthenticated, currentUser } = useAppContext();

  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) {
      return <Navigate to="/signin" replace />;
    }
    return children;
  };

  const RoleBasedRoute = () => {
    if (!currentUser) return <Navigate to="/signin" replace />;

    switch (currentUser.role) {
      case 'admin':
        return <AdminDashboard />;
      case 'lecturer':
        return <LecturerDashboard />;
      case 'student':
        return <StudentDashboard />;
      default:
        return <Navigate to="/signin" replace />;
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signout" element={<SignOut />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <RoleBasedRoute />
            </ProtectedRoute>
          }
        />
        <Route
          path="/quest/:id"
          element={
            <ProtectedRoute>
              <QuestDetail />
            </ProtectedRoute>
          }
        />
        {/* Add a catch-all route for unknown paths */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
};

export default AppQuest;
