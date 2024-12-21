import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: localStorage.getItem('token'),
    userId: localStorage.getItem('userId'),
    profileImg: localStorage.getItem('profileImg'),
    verified: localStorage.getItem('verified'),
    completed: localStorage.getItem('completed'),
    account: localStorage.getItem('account'),
    isLoggedIn: !!localStorage.getItem('token'),
  });

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const profileImg = localStorage.getItem('profileImg');
    const verified = localStorage.getItem('verified');
    const completed = localStorage.getItem('completed');
    const account = localStorage.getItem('account');
  
    // Update the auth state if valid
    if (token && userId && verified) {
      setAuth({ token, userId,profileImg, verified, completed, account, isLoggedIn: true });
  
      // Redirect to home if the user is already on the login page
      if (window.location.pathname === '/auth/login') {
        navigate(`/home`);
      }
    } else {
      // Redirect only for protected routes
      const isAuthRoute = window.location.pathname.startsWith('/auth');
      const isPublicRoute = ['/home', '/tour'].includes(window.location.pathname); // Add your public routes here
  
      if (!isAuthRoute && !isPublicRoute) {
        navigate('/auth/login');
      }
    }
  }, [navigate]);
  

  const login = (token, userId,profileImg,verified,completed,account) => {
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
    localStorage.setItem('profileImg',profileImg),
    localStorage.setItem('verified', verified);
    localStorage.setItem('completed',completed);
    localStorage.setItem('account',account),
    setAuth({ token, userId,profileImg,verified,completed,account, isLoggedIn: true });
    navigate(`/home`);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('profileImg');
    localStorage.removeItem('verified');
    localStorage.removeItem('completed');
    localStorage.removeItem('account');
    setAuth({ token: null, userId: null,profileImg: null,verified: null,completed:null,account:null, isLoggedIn: false });
    navigate('/auth/login');
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
