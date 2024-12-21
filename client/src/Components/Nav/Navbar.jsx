import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/fulllogo.png";
import { GoArrowSwitch } from "react-icons/go";
import { IoIosMenu } from "react-icons/io";
import { AuthContext } from "../../Context/AuthContext";

const Navbar = ({ toggleSidebar }) => {
  const { auth, logout } = useContext(AuthContext);
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  const navigate = useNavigate();

  return (
    <div className=" h-16 shadow-md flex items-center justify-between w-full px-5 bg-white top-0 sticky z-20 ">
      <IoIosMenu size={30} className="md:hidden" onClick={toggleSidebar} />
      <div className="w-1/3 justify-start flex max-md:hidden">
        <img src={logo} className="h-10" />
      </div>
      <div className="w-1/3 flex justify-center text-xl space-x-10 text-gray-1 max-md:hidden ">
        <Link
          to="/home"
          className={`${isActive("/home") ? "font-semibold text-dark-1" : ""}`}
        >
          Home
        </Link>
        <Link
          to="/tour"
          className={`${isActive("/tour") ? "font-semibold text-dark-1" : ""}`}
        >
          Tour
        </Link>
      </div>
      <div className="w-1/3 flex items-center justify-end space-x-6 max-md:hidden">
        <button className="flex items-center space-x-1 text-dark-1 font-semibold">
          <GoArrowSwitch size={18} />
          <span className="text-sm">Switch to Host</span>
        </button>
        {auth.isLoggedIn ? (
          <div>
            <img src={auth.profileImg} alt="Profile" className="h-8 w-8 rounded-full" />
          </div>
        ) : (
          <button
            className="bg-primarycolor px-4 py-2 rounded-full text-sm  text-white"
            onClick={() => {
              navigate("/auth/login");
            }}
          >
            Sign in
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
