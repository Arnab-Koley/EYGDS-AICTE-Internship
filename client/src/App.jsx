import React ,{useState} from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import NavigationError from './Pages/NavigationError';
import Layout from './Pages/Layout';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/:section" element={<Layout sidebarOpen={sidebarOpen}  toggleSidebar={toggleSidebar} />} />
        <Route path="*" element={<NavigationError />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
