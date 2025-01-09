import React from "react";
import { useState } from "react";

interface MessageBubbleProps {
    children: any,
    fromMe: boolean,
}
const MessageBubble = ({ children, fromMe }: MessageBubbleProps) => {
  const [isFromMe] = useState(fromMe);

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
