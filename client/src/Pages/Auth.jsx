
import React, { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import Login from '../Components/Auth/Login';
import Signup from '../Components/Auth/Signup';
import ForgotPassword from '../Components/Auth/ForgotPassword';
import ResetPassword from '../Components/Auth/ResetPassword';
import NavigationError from './NavigationError';
import { useParams,Navigate } from 'react-router-dom';
import Verify from '../Components/Auth/Verify';

const Auth = () => {
  const { section } = useParams();
  const { auth } = useContext(AuthContext);

  if (auth.isLoggedIn) {
    return <Navigate to="/home" replace />;
  }

  const renderComponent = () => {
    switch (section) {
      case 'login':
        return <Login />;
      case 'signup':
        return <Signup />;
      case 'verify':
        return <Verify/>
      case 'forgotpassword':
        return <ForgotPassword />;
      case 'resetpassword':
        return <ResetPassword />;
      default:
        return <NavigationError />;
    }
  };

  return (
    <div>
    {renderComponent()}
    </div>

  )
};

export default Auth;
