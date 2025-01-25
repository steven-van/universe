import React from "react";
import { useState } from "react";

const StatusEnum = {
  ONLINE: "online",
  OFFLINE: "offline",
  BUSY: "busy",
  AWAY: "away",
};

const Status = ({ showStatusLabel = true }) => {
  const [status] = useState(StatusEnum.ONLINE);

  const statusColors = {
    [StatusEnum.ONLINE]: "bg-green-700", // Green
    [StatusEnum.OFFLINE]: "bg-red-700", // Red
    [StatusEnum.BUSY]: "bg-gray-300", // Gray
    [StatusEnum.AWAY]: "bg-orange-400", // Orange
  };

  return (
    <div className="inline-flex flex-row items-center space-x-2">
      <span className={`w-3 h-3 ${statusColors[status]} rounded-full`}></span>
      {showStatusLabel && <span className="text-sm">{status}</span>}
    </div>
  );
};

export default Status;
