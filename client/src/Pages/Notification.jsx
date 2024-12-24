import React from 'react'
import { useNavigate } from 'react-router-dom'

import { IoIosArrowRoundBack } from "react-icons/io";

const Notification = () => {
    const navigate = useNavigate();
  return (
    <div className=" p-5">
    <div className="w-full mb-5">
      <IoIosArrowRoundBack
        size={40}
        className="bg-primarycolor p-1 rounded-full text-white"
        onClick={() => navigate(-1)}
      />
    </div>
    <div className="">
      Notification
    </div>
  </div>
  )
}

export default Notification