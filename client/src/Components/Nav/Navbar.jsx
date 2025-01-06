

import React, { useState, useContext, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/fulllogo.png";
import { GoArrowSwitch } from "react-icons/go";
import { IoIosMenu } from "react-icons/io";
import { AuthContext } from "../../Context/AuthContext";
import ProfilePopup from "../Popup/ProfilePopup";
import fallbackimg from "../../assets/icon/profile.png";

import { FaHeart } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import HostPopup from "../Popup/HostPopup";

import { useHost } from "../../Context/HostContext";

const Navbar = (props) => {
  const { isHost, setIsHost } = useHost();
  const toggleSidebar = props.toggleSidebar;
  const user = props.user;

  const { auth } = useContext(AuthContext);
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  const navigate = useNavigate();

  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileMenuRef = useRef(null);
  const profileButtonRef = useRef(null);

  const [profileImg, setProfileImg] = useState(auth.profileImg);
  const [showHostPopup, setShowHostPopup] = useState(false);
  const [popupMsg, setPopupMsg] = useState("");

  const [loading, setLoading] = useState(false); 

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
      setShowHostPopup(true);
    } else {
     if(!isHost){
      setIsHost(true); 
      navigate("/host");
     }
    }
  };

  const handleGuestClick = () => {
    if(isHost){
      setIsHost(false);
      navigate("/home");
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(e.target) &&
        profileButtonRef.current &&
        !profileButtonRef.current.contains(e.target)
      ) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  return (
    <div className="h-16 shadow-md flex items-center justify-between w-full px-5 bg-white top-0 sticky z-20">
     
      {showHostPopup && (
        <HostPopup msg={popupMsg} onClose={() => setShowHostPopup(false)} />
      )}
      <IoIosMenu size={30} className="md:hidden" onClick={toggleSidebar} />
      <div className="w-1/3 justify-start flex max-md:hidden">
        <img src={logo} className="h-10" />
      </div>
      {isHost ? (
        <div className="w-1/3 flex justify-center  space-x-7 text-gray-1 max-md:hidden flex-wrap">
          <Link
            to="/host"
            className={`${
              isActive("/host") ? "font-semibold text-dark-1" : ""
            }`}
          >
            Dashboard
          </Link>
          <Link
            to="/listings"
            className={`${
              isActive("/listings") || isActive("/newlisting") || isActive("/editlisting") ? "font-semibold text-dark-1" : ""
            }`}
          >
            Listings
          </Link>
          <Link
            to="/reservations"
            className={`${
              isActive("/reservations") ? "font-semibold text-dark-1" : ""
            }`}
          >
            Reservations
          </Link>
        </div>
      ) : (
        <div className="w-1/3 flex justify-center text-xl space-x-10 text-gray-1 max-md:hidden">
          <Link
            to="/home"
            className={`${
              isActive("/home") ? "font-semibold text-dark-1" : ""
            }`}
          >
            Home
          </Link>
          <Link
            to="/tour"
            className={`${
              isActive("/tour") || isActive("/viewtour") || isActive("/booktour") ? "font-semibold text-dark-1" : ""
            }`}
          >
            Tour
          </Link>
        </div>
      )}

      <div className="w-1/3 flex items-center justify-end max-md:hidden">
        {auth.isLoggedIn ? (
          <div className="flex items-center justify-center space-x-5">
            {isHost ? (
              <button
              className="flex items-center space-x-1 text-dark-1 font-semibold"
              onClick={handleGuestClick}
            >
              <GoArrowSwitch size={18} />
              <span className="text-sm">Switch to Guest</span>
            </button>
            ):(
              <button
              className="flex items-center space-x-1 text-dark-1 font-semibold"
              onClick={handleHostClick}
            >
              <GoArrowSwitch size={18} />
              <span className="text-sm">Switch to Host</span>
            </button>
            )}
            <FaHeart
              size={25}
              className="text-red-600"
              onClick={() => navigate("/wishlist")}
            />
            <div className="relative">
              <div
                ref={profileButtonRef}
                className="flex items-center justify-center border-2 px-2 py-1 rounded-full space-x-2 cursor-pointer"
                onClick={toggleProfileMenu}
              >
                <IoIosMenu size={20} />
                <img
                  src={profileImg}
                  alt="Profile"
                  className="h-8 w-8 rounded-full cursor-pointer"
                  onError={handleImageError}
                />
              </div>

              {showProfileMenu && (
                <div ref={profileMenuRef}>
                  <ProfilePopup
                    showProfileMenu={showProfileMenu}
                    setShowProfileMenu={setShowProfileMenu}
                  />
                </div>
              )}
            </div>
          </div>
        ) : (
          <button
            className="bg-primarycolor px-4 py-2 rounded-full text-sm text-white"
            onClick={() => {
              navigate("/auth/login");
            }}
          >
            Sign in
          </button>
        )}
      </div>
      <IoIosNotifications
        size={30}
        className="md:hidden"
        onClick={() => navigate("/notification")}
      />
    </div>
  );
};

export default Navbar;
