import React, { useEffect } from "react";
import HostError from "../Errors/HostError";
import { useHost } from "./HostContext";

const ProtectedHost = ({ user, children }) => {
  const { isHost, setIsHost } = useHost();

  let msg = "";
  if (!user.isMailVerified) {
    msg += "Your email is not verified. ";
  }
  if (!user.isPhoneVerified) {
    msg += "Your phone number is not verified.";
  }

  useEffect(() => {
    if (!msg && !isHost) {
      setIsHost(true);
    }
  }, [msg]);

  if (msg) {
    return <HostError msg={msg} />;
  }

  return children;
};

export default ProtectedHost;
