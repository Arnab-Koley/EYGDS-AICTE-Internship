import React, { useContext } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { AuthContext } from "../../Context/AuthContext";
import { RiLogoutCircleLine } from "react-icons/ri";

const ProfilePopup = (props) => {
    const { auth, logout } = useContext(AuthContext);
    const navigate = useNavigate();
  return (
    <div className="absolute right-0 mt-5 w-48 rounded-md text-sm z-10 select-none">
      <ul>
        <div className='bg-white rounded-md border-2 shadow-md'>
        <li className="p-3 hover:bg-gray-100 cursor-pointer flex" onClick={()=>{props.setShowProfileMenu(!props.showProfileMenu); navigate('/account')}}>
          Account
        </li>
        <li className="p-3 hover:bg-gray-100 cursor-pointer flex" onClick={()=>{props.setShowProfileMenu(!props.showProfileMenu); navigate('/notification')}}>
          Notification
        </li>
        </div>

        <div className="bg-white rounded-md border-2 shadow-md my-2">
        <li className="p-3 hover:bg-gray-100 cursor-pointer flex" onClick={()=>{props.setShowProfileMenu(!props.showProfileMenu); navigate('/contact')}}>
          Contact Us
        </li>
        <li className="p-3 hover:bg-gray-100 cursor-pointer flex" onClick={()=>{props.setShowProfileMenu(!props.showProfileMenu); navigate('/privacy-policy')}}>
        Privacy
        </li>
        <li className="p-3 hover:bg-gray-100 cursor-pointer flex" onClick={()=>{props.setShowProfileMenu(!props.showProfileMenu); navigate('/terms&conditions')}}>
        Terms
        </li>
        <li className="p-3 hover:bg-gray-100 cursor-pointer flex" onClick={()=>{props.setShowProfileMenu(!props.showProfileMenu); navigate('/help')}}>
          Help Center
        </li>
        </div>

        <li className="p-3 hover:bg-red-600 hover:border-red-600 bg-white hover:text-white cursor-pointer text-red-600 font-semibold space-x-2 flex items-center rounded-md border-2 shadow-md" onClick={logout}>
        <RiLogoutCircleLine size={20} />
          <span>Logout</span>
        </li>
      </ul>
    </div>
  );
};

export default ProfilePopup;
