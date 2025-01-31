import React from "react";
import { useState } from "react";

const MessageBubble = ({ children, isFromMe }) => {
  return (
    <div
      className={`max-w-2/5 md:max-w-3/5 ${
        isFromMe ? "self-end" : "self-start"
      }`}
    >
      <div className="inline-block">
        <div
          className={`py-5 px-6 break-words font-medium  rounded-2xl ${
            isFromMe ? "bg-645CF4 text-white" : "bg-F0F0F0 text-black"
          }`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
