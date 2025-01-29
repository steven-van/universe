import React from "react";

const WarningBubble = ({ children }) => {
  return (
    <div className={"max-w-2/5 md:max-w-3/5 self-end"}>
      <div className="inline-block">
        <div
          className={
            "py-5 px-6 break-words font-medium bg-red-200 text-red-500 rounded-2xl"
          }
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default WarningBubble;
