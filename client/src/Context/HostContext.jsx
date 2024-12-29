import React, { createContext, useContext, useState } from "react";

const HostContext = createContext();

export const HostProvider = ({ children }) => {
  const [isHost, setIsHost] = useState(false);
  return (
    <HostContext.Provider value={{ isHost, setIsHost }}>
      {children}
    </HostContext.Provider>
  );
};

export const useHost = () => useContext(HostContext);
