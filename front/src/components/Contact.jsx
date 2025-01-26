import React from "react";
import { Avatar } from "@mui/material";
import profilePic from "../assets/images/profile_picture.png";

const Contact = ({contact}) => {
  return (
    <div className="flex flex-row items-center justify-between py-2.5 px-3.5 rounded-2xl hover:bg-ACA9E721">
      <div className="flex items-center">
        <Avatar
          src={profilePic}
          alt="Profile Picture"
          sx={{ width: 60, height: 60, borderRadius: "20px" }}
        />
        <p className="font-robotoBold ml-4">{contact.firstname} {contact.lastname}</p>
      </div>
    </div>
  );
};

export default Contact;
