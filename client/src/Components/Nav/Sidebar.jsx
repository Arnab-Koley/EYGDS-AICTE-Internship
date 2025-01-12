import React, { useState, useContext } from "react";
import logo from "../../assets/fulllogo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import fallbackimg from "../../assets/icon/profile.png";
import { useHost } from "../../Context/HostContext";

import { HiOutlineChevronLeft } from "react-icons/hi";
import { GoArrowSwitch } from "react-icons/go";
import { RiLogoutCircleLine } from "react-icons/ri";

const Sidebar = ({
  sidebarOpen,
  toggleSidebar,
  user,
  setShowHostPopup,
  setPopupMsg,
}) => {
  const { auth, logout } = useContext(AuthContext);
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  const navigate = useNavigate();
  const { isHost, setIsHost } = useHost();
  const [profileImg, setProfileImg] = useState(auth.profileImg);

  const handleImageError = () => {
    setProfileImg(fallbackimg);
  };

  const handleHostClick = () => {
    let msg = "";
    if (!user.isMailVerified) {
      msg += "Your email is not verified. ";
    }
    if (!user.isPhoneVerified) {
      msg += "Your phone number is not verified.";
    }

    if (msg) {
      setPopupMsg(msg);
      toggleSidebar();
      setShowHostPopup(true);
    } else {
      if (!isHost) {
        setIsHost(true);
        toggleSidebar();
        navigate("/host");
      }
    }
  };

  const handleGuestClick = () => {
    if (isHost) {
      setIsHost(false);
      toggleSidebar();
      navigate("/home");
    }
  };

  return (
    <div
      className={`fixed  cursor-pointer inset-0 z-50 bg-white md:hidden transform ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform max-md:w-[40%] max-sm:w-[60%]`}
    >
      <div className="w-full flex flex-col  p-5 shadow-md shadow-gray-300">
        <div className=" flex justify-end">
          <HiOutlineChevronLeft size={25} onClick={toggleSidebar} />
        </div>
        <div className="w-full flex items-center justify-center  p-5">
          <img src={logo} alt="logo" className="w-full object-contain px-5" />
        </div>
      </div>

      <div className=" flex justify-center p-5 shadow-md shadow-gray-300">
        {auth.isLoggedIn ? (
          <div className="flex flex-col justify-center items-center">
            <img
              src={profileImg}
              alt=""
              className="h-16 w-16 rounded-full border-2 shadow-md mb-3"
              onClick={() => {
                toggleSidebar();
                navigate("/account");
              }}
              onError={handleImageError}
            />
            {isHost ? (
              <button
                className="flex items-center bg-primarycolor rounded-full text-white px-5 py-2"
                onClick={handleGuestClick}
              >
                <GoArrowSwitch size={18} />
                <span className="ml-2">Switch to Guest</span>
              </button>
            ) : (
              <button
                className="flex items-center bg-primarycolor rounded-full text-white px-5 py-2"
                onClick={handleHostClick}
              >
                <GoArrowSwitch size={18} />
                <span className="ml-2">Switch to Host</span>
              </button>
            )}
          </div>
        ) : (
          <button
            className="bg-primarycolor px-5 py-3 rounded-full text-xl text-white my-3"
            onClick={() => {
              navigate("/auth/login");
            }}
          >
            Sign in
          </button>
        )}
      </div>

      {isHost ? (
        <div className="flex flex-col items-center text-gray-1 mt-10 text-xl">
          <Link
            to="/host"
            onClick={toggleSidebar}
            className={`${
              isActive("/host") ? "font-semibold text-dark-1" : ""
            }`}
          >
            Dashboard
          </Link>
          <div className="my-5 w-[90%] relative">
            <div className="overflow-hidden h-[10px]">
              <div className="block -mt-[25px] mx-auto w-full h-[25px] rounded-[125px/12px] shadow-md shadow-[rgb(161,157,157)]"></div>
            </div>
          </div>
          <Link
            to="/listings"
            onClick={toggleSidebar}
            className={`${
              isActive("/listings") ||
              isActive("/newlisting") ||
              isActive("/editlisting") ||
              isActive("/managelisting")
                ? "font-semibold text-dark-1"
                : ""
            }`}
          >
            Listings
          </Link>
          <div className="my-5 w-[90%] relative">
            <div className="overflow-hidden h-[10px]">
              <div className="block -mt-[25px] mx-auto w-full h-[25px] rounded-[125px/12px] shadow-md shadow-[rgb(161,157,157)]"></div>
            </div>
          </div>
          <Link
            to="/reservations"
            onClick={toggleSidebar}
            className={`${
              isActive("/reservations") || isActive("/viewmyreservation") ? "font-semibold text-dark-1" : ""
            }`}
          >
            Reservations
          </Link>
        </div>
      ) : (
        <div className="flex flex-col items-center text-gray-1 mt-10 text-xl ">
          <Link
            to="/home"
            onClick={toggleSidebar}
            className={`${
              isActive("/home") ? "font-semibold text-dark-1" : ""
            }`}
          >
            Home
          </Link>
          <div className="my-5 w-[90%] relative">
            <div className="overflow-hidden h-[10px]">
              <div className="block -mt-[25px] mx-auto w-full h-[25px] rounded-[125px/12px] shadow-md shadow-[rgb(161,157,157)]"></div>
            </div>
          </div>
          <Link
            to="/tour"
            onClick={toggleSidebar}
            className={`${
              isActive("/tour") ||
              isActive("/viewtour") ||
              isActive("/booktour")
                ? "font-semibold text-dark-1"
                : ""
            }`}
          >
            Tour
          </Link>
          <div
            className={`my-5 w-[90%] relative ${
              auth.isLoggedIn ? "" : "hidden"
            }`}
          >
            <div className="overflow-hidden h-[10px]">
              <div className="block -mt-[25px] mx-auto w-full h-[25px] rounded-[125px/12px] shadow-md shadow-[rgb(161,157,157)]"></div>
            </div>
          </div>
          <Link
            to="/mytours"
            onClick={toggleSidebar}
            className={`
                  ${
                    isActive("/mytours") || isActive("/viewmytour")
                      ? "font-semibold text-dark-1"
                      : ""
                  }
                  ${auth.isLoggedIn ? "" : "hidden"}
                  `}
          >
            My Tours
          </Link>
        </div>
      )}

      <div className={`flex mt-10 ${auth.isLoggedIn ? "" : "hidden"}`}>
        <button
          className="py-3 px-5 bg-red-600 text-white cursor-pointer font-semibold flex items-center rounded-full space-x-2 absolute bottom-10 left-1/2 transform -translate-x-1/2"
          onClick={logout}
        >
          <RiLogoutCircleLine size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
