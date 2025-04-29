import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { useAppContext } from './context/AppContext';
import SignIn from './components/Auth/SignIn';
import SignUp from './components/Auth/SignUp';
import SignOut from './components/Auth/SignOut';
import AdminDashboard from './components/Dashboard/AdminDashboard';
import KasirDashboard from './components/Dashboard/KasirDashboard';
import PelangganDashboard from './components/Dashboard/PelangganDashboard';
import ItemList from './components/Item/ItemList';
import ItemForm from './components/Item/ItemForm';
import UserList from './components/User/UserList';
import UserForm from './components/User/UserForm';
import './App.css';

const App = () => {
  return (
    // <AppProvider>
    <Router>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signout" element={<SignOut />} />

        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/kasir-dashboard" element={<KasirDashboard />} />
        <Route path="/pelanggan-dashboard" element={<PelangganDashboard />} />

        <Route path="/items" element={<ItemList />} />
        <Route path="/add-item" element={<ItemForm />} />
        <Route path="/edit-item/:id" element={<ItemForm />} />

        <Route path="/users" element={<UserList />} />
        <Route path="/add-user" element={<UserForm />} />
        <Route path="/edit-user/:id" element={<UserForm />} />

        <Route path="/" element={<SignIn />} />
      </Routes>
    </Router>
    // </AppProvider>
  );
};

export default App;
