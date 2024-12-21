import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from "../../Context/AuthContext";
import { RiLogoutCircleLine } from "react-icons/ri";

const ProfilePopup = () => {
    const { auth, logout } = useContext(AuthContext);
  return (
    <div className="absolute right-0 mt-5 w-48 bg-white rounded-md text-sm z-10   shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]">
      <ul>
        <li className="p-3 hover:bg-gray-100 cursor-pointer">
          <Link to="/account">Account</Link>
        </li>
        <li className="p-3 hover:bg-gray-100 cursor-pointer">
          <Link to="/help">Help Centre</Link>
        </li>
        <div className='w-full h-[1px] bg-gray-400'></div>
        <li className="p-3 hover:bg-red-600 hover:text-white cursor-pointer text-red-600 font-semibold space-x-2 flex items-center rounded-b-md" onClick={logout}>
        <RiLogoutCircleLine size={20} />
          <span>Logout</span>
        </li>
      </ul>
    </div>
  );
};

export default ProfilePopup;
