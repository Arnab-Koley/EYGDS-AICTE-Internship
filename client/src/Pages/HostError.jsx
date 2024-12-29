import React from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { TiInfoOutline } from "react-icons/ti";
import { useNavigate } from "react-router-dom";

const HostError = (props) => {
  const navigate = useNavigate();
  return (

      <div className="w-full flex flex-col items-center mt-20">
 
        <div className="flex items-center space-x-2">
          <TiInfoOutline size={25} />
          <h2 className="text-lg font-semibold">
            Host access can't be possible
          </h2>
        </div>
        <h3 className="text-gray-700 mt-3">{props.msg}</h3>
        <button
          onClick={() => {
            navigate("/account");
          }}
          className="mt-4 bg-primarycolor text-white py-2 px-4 rounded-full"
        >
          Verify Now
        </button>
      </div>
 
  );
};

export default HostError;