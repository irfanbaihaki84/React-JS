import { useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';

const SignOut = () => {
  const { logout } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    logout();
    navigate('/signin');
  }, [logout, navigate]);

  return null;
};

export default SignOut;
