import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';

const SignOut = () => {
  const { dispatch } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch({ type: 'LOGOUT' });
    navigate('/signin');
  }, [dispatch, navigate]);

  return null;
};

export default SignOut;
