import React from "react";

const AuthModal = ({ children }) => {
  return (
    <div className="container bg-white h-full w-full flex flex-col justify-center items-center">
      <div className="w-1/4 min-w-96 rounded-2xl shadow-xl">
        <div className="flex justify-center items-center bg-645CF4 p-4 w-full text-white rounded-t-2xl font-robotoBold">
          Universe
        </div>
        {children}
      </div>
    </div>
  );
};

export default AuthModal;
