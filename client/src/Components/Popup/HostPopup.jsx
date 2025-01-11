import React from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { TiInfoOutline } from "react-icons/ti";
import { useNavigate } from "react-router-dom";

const HostPopup = ({ msg, onClose }) => {
  const navigate = useNavigate();
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 cursor-pointer px-5">
      <div className="bg-white rounded-lg p-6 w-96 relative shadow-lg">
        <IoClose
          size={25}
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
        />

        <div className="flex items-center space-x-2 mt-3">
          <TiInfoOutline size={25} />
          <h2 className="text-lg font-semibold">
            Host access can't be possible
          </h2>
        </div>
        <h3 className="text-gray-700 mt-3">{msg}</h3>
        <button
          onClick={() => {
            onClose();
            navigate("/account");
          }}
          className="mt-4 bg-primarycolor text-white py-2 px-4 rounded-full"
        >
          Verify Now
        </button>
      </div>
    </div>
  );
};

export default HostPopup;
