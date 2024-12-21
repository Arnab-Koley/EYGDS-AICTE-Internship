// import React, { useState,useContext } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import logo from "../../assets/fulllogo.png";
// import { GoArrowSwitch } from "react-icons/go";
// import { IoIosMenu } from "react-icons/io";
// import { AuthContext } from "../../Context/AuthContext";
// import ProfilePopup from "../Popup/ProfilePopup";

// const Navbar = ({ toggleSidebar }) => {
//   const { auth } = useContext(AuthContext);
//   const location = useLocation();
//   const isActive = (path) => location.pathname === path;
//   const navigate = useNavigate();

//   const [showProfileMenu, setShowProfileMenu] = useState(false);


//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (profileMenuRef.current && !profileMenuRef.current.contains(e.target)) {
//         setShowProfileMenu(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);

//     // Cleanup event listener on unmount
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   return (
//     <div className=" h-16 shadow-md flex items-center justify-between w-full px-5 bg-white top-0 sticky z-20 ">
//       <IoIosMenu size={30} className="md:hidden" onClick={toggleSidebar} />
//       <div className="w-1/3 justify-start flex max-md:hidden">
//         <img src={logo} className="h-10" />
//       </div>
//       <div className="w-1/3 flex justify-center text-xl space-x-10 text-gray-1 max-md:hidden ">
//         <Link
//           to="/home"
//           className={`${isActive("/home") ? "font-semibold text-dark-1" : ""}`}
//         >
//           Home
//         </Link>
//         <Link
//           to="/tour"
//           className={`${isActive("/tour") ? "font-semibold text-dark-1" : ""}`}
//         >
//           Tour
//         </Link>
//       </div>
//       <div className="w-1/3 flex items-center justify-end space-x-6 max-md:hidden">
//         <button className="flex items-center space-x-1 text-dark-1 font-semibold">
//           <GoArrowSwitch size={18} />
//           <span className="text-sm">Switch to Host</span>
//         </button>
//         {auth.isLoggedIn ? (
//           <div className="relative">
//             <div className="flex items-center justify-center border-2 px-2 py-1 rounded-full space-x-2 cursor-pointer"  onClick={() => setShowProfileMenu(!showProfileMenu)}>
//             <IoIosMenu size={20} />
//             <img
//               src={auth.profileImg}
//               alt="Profile"
//               className="h-8 w-8 rounded-full cursor-pointer"
             
//             />
            
//             </div>

//             {showProfileMenu && (
//               <ProfilePopup />
//             )}
//           </div>
//         ): (
//           <button
//             className="bg-primarycolor px-4 py-2 rounded-full text-sm  text-white"
//             onClick={() => {
//               navigate("/auth/login");
//             }}
//           >
//             Sign in
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Navbar;

import React, { useState, useContext, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/fulllogo.png";
import { GoArrowSwitch } from "react-icons/go";
import { IoIosMenu } from "react-icons/io";
import { AuthContext } from "../../Context/AuthContext";
import ProfilePopup from "../Popup/ProfilePopup";

const Navbar = ({ toggleSidebar }) => {
  const { auth } = useContext(AuthContext);
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  const navigate = useNavigate();

  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileMenuRef = useRef(null);
  const profileButtonRef = useRef(null);

  const [profileImg, setProfileImg] = useState(auth.profileImg);
  const handleImageError = () => {
    setProfileImg("/assets/icon/profile.png");
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
      <IoIosMenu size={30} className="md:hidden" onClick={toggleSidebar} />
      <div className="w-1/3 justify-start flex max-md:hidden">
        <img src={logo} className="h-10" />
      </div>
      <div className="w-1/3 flex justify-center text-xl space-x-10 text-gray-1 max-md:hidden">
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
                <ProfilePopup />
              </div>
            )}
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
    </div>
  );
};

export default Navbar;
