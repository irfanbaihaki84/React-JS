import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';

const SignOut = () => {
  const { signOut } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    signOut();
    navigate('/signin');
  }, [signOut, navigate]);

  return <div>Signing out...</div>;
};

export default SignOut;
