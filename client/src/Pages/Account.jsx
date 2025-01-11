import React, {useContext} from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import MyInfo from "../Components/Account/MyInfo";
import Verify from "../Components/Account/Verify";

import { IoIosArrowRoundBack } from "react-icons/io";
import { RiLogoutCircleLine } from "react-icons/ri";

const Account = (props) => {
  const user = props.user;
  const setUser = props.setUser;
  const isLoading = props.isLoading;
   const {logout } = useContext(AuthContext);

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
      <div className="flex max-md:flex-col gap-3">
        <div>
          <MyInfo user={user} />
        </div>
        <div>
          <Verify user={user} setUser={setUser} />
        </div>
      </div>

      
    </div>
  );
};

export default Account;
