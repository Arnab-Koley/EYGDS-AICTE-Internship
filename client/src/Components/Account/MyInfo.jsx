import React, { useState } from "react";
import fallbackimg from "../../assets/icon/profile.png";

const MyInfo = (props) => {
  const user = props.user;

  const [profileImg, setProfileImg] = useState(user.profileImg);
  const handleImageError = () => {
    setProfileImg(fallbackimg);
  };

  return (
    <div className="bg-white flex flex-col shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] rounded-lg p-5 max-w-96">
      {user.profileImg && (
        <img
          src={profileImg}
          alt="Profile"
          className="shadow-md border-2 rounded-full h-20 w-20 mx-auto"
          onError={handleImageError}
        />
      )}
      <h3 className="text-center text-2xl font-semibold my-3">{user.name}</h3>
      <h3 className="font-semibold">
        Email : <span className="font-normal">{user.email}</span>
      </h3>
      <h3 className="font-semibold">
        Phone : <span className="font-normal">{user.phone || "Not added"}</span>
      </h3>
      <h3 className="font-semibold">
        Gender : <span className="font-normal">{user.gender}</span>
      </h3>
      <h3 className="font-semibold">
        Login Type :{" "}
        <span className="font-normal">
          {user.account === "google" ? "Google" : "Email-Password"}
        </span>
      </h3>
    </div>
  );
};

export default MyInfo;
