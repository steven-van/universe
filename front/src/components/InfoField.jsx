import React from "react";

const InfoField = ({label, text}) => {
  return (
    <div className="rounded-md bg-white px-6 py-4">
      <p className="text-8F8F8F text-sm">{label}</p>
      <p className="text-645CF4 mt-2">{text}</p>
    </div>
  );
};

export default InfoField;
