import React from "react";
import logo from "../../assets/fulllogo.png";
import { Link, useLocation } from "react-router-dom";

import { HiOutlineChevronLeft } from "react-icons/hi";


const Sidebar = ({ sidebarOpen, toggleSidebar }) => {
  const location = useLocation();
  return (
    <div
      className={`fixed  cursor-pointer inset-0 z-40 bg-white md:hidden transform ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform max-md:w-[40%] max-sm:w-[60%]`}
    >
      <div className="w-full flex flex-col  p-5 shadow-md shadow-gray-300">
        <div className=" flex justify-end">
          <HiOutlineChevronLeft size={25} onClick={toggleSidebar} />
        </div>
        <div className="w-full flex items-center justify-center  p-5">
          <img
            src={logo}
            alt="logo"
            className="w-full object-contain px-5"
          />
        </div>
      </div>

      <ul className="mt-20 space-y-4 flex flex-col w-full items-center  text-xl text-gray-1 ">
        <li>
        <Link 
            to="/" 
            onClick={toggleSidebar}
            className={`${location.pathname === '/home' ? 'font-semibold text-dark-1 ' : ''} `}>
            Home
        </Link>
        </li>
        <div className="my-5 w-[90%] relative">
          <div className="overflow-hidden h-[10px]">
            <div className="block -mt-[25px] mx-auto w-full h-[25px] rounded-[125px/12px] shadow-md shadow-[rgb(161,157,157)]"></div>
          </div>
        </div>
        <li>
        <Link 
            to="/tour" 
            onClick={toggleSidebar}
            className={`${location.pathname === '/tour' ? 'font-semibold text-dark-1 ' : ''} `}>
            Tour
        </Link>
        </li>
 
 

      </ul>
    </div>
  );
};

export default Sidebar;
