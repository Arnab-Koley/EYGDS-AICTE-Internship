import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';

const ProtectedRoute = ({ element: Component }) => {
  const { auth } = useContext(AuthContext);

  return auth.isLoggedIn ? <Component /> : <Navigate to="/auth/login" replace />;
};

export default ProtectedRoute;