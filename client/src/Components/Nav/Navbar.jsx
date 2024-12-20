import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/fulllogo.png";
import { GoArrowSwitch } from "react-icons/go";
import { IoIosMenu } from "react-icons/io";

const Navbar = ({ toggleSidebar }) => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <div className=" h-16 shadow-md flex items-center justify-between w-full px-5 bg-white top-0 sticky z-20 ">
      <IoIosMenu size={30} className="md:hidden" onClick={toggleSidebar} />
      <div className="w-1/3 justify-start flex max-md:hidden">
        <img src={logo} className="h-10" />
      </div>
      <div className="w-1/3 flex justify-center text-xl space-x-10 text-gray-1 max-md:hidden ">
        <Link to="/home" className={`${isActive("/home") ? "font-semibold text-dark-1" : ""}`}>Home</Link>
        <Link to="/tour"className={`${isActive("/tour") ? "font-semibold text-dark-1" : ""}`}>Tour</Link>
      </div>
      <div className="w-1/3 flex items-center justify-end space-x-4 max-md:hidden">
        <button className="flex items-center space-x-2 text-dark-1 font-semibold">
          <GoArrowSwitch size={20} />
          <span>Switch to Host</span>
        </button>
        <button className="bg-primarycolor px-4 py-2 rounded-full  text-white">
          Sign in
        </button>
      </div>
    </div>
  );
};

export default Navbar;
