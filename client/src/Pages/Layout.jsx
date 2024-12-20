import React from "react";
import Navbar from "../Components/Nav/Navbar";
import Home from "./Home";
import Tour from "./Tour";
import Footer from "../Components/Nav/Footer";
import { useParams } from "react-router-dom";
import Sidebar from "../Components/Nav/Sidebar";

const Layout = ({ sidebarOpen, toggleSidebar }) => {
  const { section } = useParams();

  const renderComponent = () => {
    switch (section) {
      case "home":
        return <Home />;
      case "tour":
        return <Tour />;
      default:
        return <Home />;
        
    }
  };

  return (
    <div className="flex relative">
      <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 w-full z-30"
          onClick={toggleSidebar}
        ></div>
      )}
      <div className="w-full h-screen overflow-y-scroll">
        <Navbar toggleSidebar={toggleSidebar} />
        {renderComponent()}
      </div>
    </div>
  );
};

export default Layout;
