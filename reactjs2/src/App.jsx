import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
// import { AppProvider } from './context/AppContext';
import { StorageNotification } from './context/StorageNotification';
import SignIn from './components/Auth/SignIn';
import SignUp from './components/Auth/SignUp';
import SignOut from './components/Auth/SignOut';
import AdminDashboard from './components/Dashboard/AdminDashboard';
import KasirDashboard from './components/Dashboard/KasirDashboard';
import PelangganDashboard from './components/Dashboard/PelangganDashboard';
import ItemForm from './components/Item/ItemForm';
import ItemList from './components/Item/ItemList';
import UserForm from './components/User/UserForm';
import UserList from './components/User/UserList';
import { useAppContext } from './context/AppContext';

const App = () => {
  const { currentUser, isAuthenticated } = useAppContext();

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
      case 'kasir':
        return <KasirDashboard />;
      case 'pelanggan':
        return <PelangganDashboard />;
      default:
        return <Navigate to="/signin" replace />;
    }
  };

  return (
    // <AppProvider>
    <Router>
      <StorageNotification />
      <Routes>
        {/* Auth Routes */}
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

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<UserList />} />
        <Route path="/admin/users/add" element={<UserForm />} />
        <Route path="/admin/users/edit/:id" element={<UserForm />} />
        <Route path="/admin/items" element={<ItemList />} />
        <Route path="/admin/items/add" element={<ItemForm />} />
        <Route path="/admin/items/edit/:id" element={<ItemForm />} />

        {/* Kasir Routes */}
        <Route path="/kasir" element={<KasirDashboard />} />

        {/* Pelanggan Routes */}
        <Route path="/pelanggan" element={<PelangganDashboard />} />

        {/* Default Route */}
        <Route path="/" element={<Navigate to="/signin" />} />
      </Routes>
    </Router>
    // </AppProvider>
  );
};

export default App;
