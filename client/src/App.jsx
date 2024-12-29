import React ,{useState} from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import NavigationError from './Pages/NavigationError';
import Layout from './Pages/Layout';
import { Toaster } from 'react-hot-toast';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Auth from './Pages/Auth';
import AuthContextProvider from './Context/AuthContext';
import ProtectedRoute from './Routes/ProtectedRoute';
import { HostProvider } from './Context/HostContext';



function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <BrowserRouter>
    <HostProvider>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <AuthContextProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/:section" element={<Layout sidebarOpen={sidebarOpen}  toggleSidebar={toggleSidebar} />} />
        <Route path="/auth/:section" element={<Auth />} />
        <Route path="*" element={<NavigationError />} />
      </Routes>
      </AuthContextProvider>
      </GoogleOAuthProvider>
      <Toaster/>
      </HostProvider>
    </BrowserRouter>
  );
}

export default App;
