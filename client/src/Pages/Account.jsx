import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MyInfo from "../Components/Account/MyInfo";
import Verify from "../Components/Account/Verify";

import { IoIosArrowRoundBack } from "react-icons/io";

const Account = (props) => {
  // Define state for user
  const user = props.user;
  const setUser = props.setUser;
  const isLoading = props.isLoading;

  const navigate = useNavigate();

  

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className=" p-5">
      <div className="w-full mb-5">
        <IoIosArrowRoundBack
          size={40}
          className="bg-primarycolor p-1 rounded-full text-white"
          onClick={() => navigate(-1)}
        />
      </div>
      <div className="flex md:space-x-3 max-md:flex-col max-md:space-y-3">
        <div>
          <MyInfo user={user} />
        </div>
        {/* Render user information */}
        <div>
          <Verify user={user} setUser={setUser} />
        </div>
      </div>
    </div>
  );
};

export default Account;
