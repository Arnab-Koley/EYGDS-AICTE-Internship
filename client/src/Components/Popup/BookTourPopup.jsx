import React from 'react'
import { IoClose } from "react-icons/io5";
import { TiInfoOutline } from "react-icons/ti";
import { useNavigate } from "react-router-dom";

const BookTourPopup = ({ type, msg, onClose }) => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    onClose();
    if (type === "authentication") {
      navigate("/auth/login");
    } else {
      navigate("/account");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 cursor-pointer">
      <div className="bg-white rounded-lg p-6 w-96 mx-5 relative shadow-lg">
        <IoClose
          size={25}
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
        />
        
        <div className="flex items-center space-x-2">
          <TiInfoOutline size={25} />
          <h2 className="text-lg font-semibold">
            Tour Booking can't be possible
          </h2>
        </div>
        <h3 className="text-gray-700 mt-3">{msg}</h3>
        
        <button
          onClick={handleButtonClick}
          className="mt-4 bg-primarycolor text-white py-2 px-4 rounded-full"
        >
          {type === "authentication" ? "Sign in" : "Verify Now"}
        </button>
      </div>
    </div>
  );
}

export default BookTourPopup;
