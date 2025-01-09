import React from "react";
import { useState } from "react";

const StatusEnum = {
  ONLINE: "Online",
  OFFLINE: "Offline",
  AWAY: "Away",
};

const Status = () => {
  const [status] = useState(StatusEnum.OFFLINE);

  const statusColors = {
    [StatusEnum.ONLINE]: "bg-green-700", // Green
    [StatusEnum.OFFLINE]: "bg-red-700", // Red
    [StatusEnum.AWAY]: "bg-orange-400", // Orange
  };

  return (
    <div className="flex flex-row items-center space-x-2">
      <div className={`w-4 h-4 ${statusColors[status]} rounded-full`}></div>
      <span className="text-sm">{status}</span>
    </div>
  );
};

export default Status;
