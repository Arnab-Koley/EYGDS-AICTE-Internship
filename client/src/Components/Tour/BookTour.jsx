import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { IoIosArrowRoundBack } from "react-icons/io";

const BookTour = (props) => {
  const user = props.user;
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const tourId = params.get("id");
  // const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div className="p-5">
      <div className="w-full mb-5">
        <IoIosArrowRoundBack
          size={40}
          className="bg-primarycolor p-1 rounded-full text-white"
          onClick={() => navigate(`/viewtour?id=${tourId}`)}
        />
      </div>
    </div>
  )
}

export default BookTour