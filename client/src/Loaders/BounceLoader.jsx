import React from "react";

const BounceLoader = () => {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center">
      <div className="flex space-x-2 justify-center items-center">
        <div className="h-5 w-5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="h-5 w-5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="h-5 w-5 bg-gray-400 rounded-full animate-bounce"></div>
      </div>
      <h1 className="text-gray-400 font-semibold text-center mt-3">Loading...</h1>
    </div>
  );
};

export default BounceLoader;
