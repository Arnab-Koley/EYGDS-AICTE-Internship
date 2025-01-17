
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';

const GoogleCallback = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);


  useEffect(() => {
    const queryParams = new URLSearchParams(search);
    const token = queryParams.get('token');
    const error = queryParams.get('error');
    
    if (error) {
      toast.error('Google login failed');
      navigate('/auth/login');
    } else if (token) {

      login(token); 
      navigate('/home'); 
    }
  }, [search, navigate, login]);

  return (
    <div>
      <h2>Logging you in...</h2>
    </div>
  );
};

export default GoogleCallback;
