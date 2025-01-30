import React from "react";
import Status from "./Status";
import { Avatar } from "@mui/material";
import profilePic from "../assets/images/profile_picture.png";

const Conversation = ({userInfo}) => {
  const {firstname, lastname} = userInfo;

  return (
    <div className="flex flex-row items-center justify-between py-2.5 px-3.5 rounded-2xl hover:bg-ACA9E721">
      <div className="flex items-center">
        <Avatar
          src={profilePic}
          alt="Profile Picture"
          sx={{ width: 60, height: 60, borderRadius: "20px" }}
        />
        <div className="flex flex-col ml-4">
          <div className="flex flex-row items-center">
            <p className="font-robotoBold mr-3">{firstname} {lastname}</p>
            <Status showStatusLabel={false} />
          </div>
          <p className="text-sm text-BDBABA truncate max-w-36">Vien dès que tu peux</p>
        </div>
      </div>
      <p className="text-sm text-BDBABA">12m</p>
    </div>
  );
};

export default Conversation;
