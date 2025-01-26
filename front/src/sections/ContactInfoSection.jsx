import React from "react";
import profilePic from "../assets/images/profile_picture.png";
import InfoField from "../components/InfoField";
import { Avatar, IconButton } from "@mui/material";
import { Icon } from "@iconify/react";

const buttonStyles = (bgColor, iconColor) => ({
  flex: "1 1 0%",
  backgroundColor: bgColor,
  borderRadius: "6px",
  padding: "25px 0",
  color: iconColor,
});

const ContactInfoSection = ({ contact }) => {
  const { firstname, lastname, email, phone, birthday } = contact;

  const formattedBirthday = formatBirthday(birthday);

  const contactInfo = [
    { label: 'Email', value: email },
    { label: 'Birthday', value: formattedBirthday },
    { label: 'Phone', value: phone }
  ];

  return (
    <div className="flex justify-center items-center flex-1 bg-FDFAFA h-full">
      <div className="w-5/6 flex flex-col justify-center items-center">
        <Avatar
          src={profilePic}
          alt="Profile Picture"
          sx={{ width: 120, height: 120, borderRadius: "20px" }}
        />
        <p className="font-robotoBold text-xl mt-6">{firstname} {lastname}</p>

        <div className="w-full flex space-x-8 mt-10 mb-8">
          <IconButton style={buttonStyles("#EFFFEF", "#14AE5C")}>
            <Icon icon="solar:chat-dots-linear" width="30" height="30" />
          </IconButton>
          <IconButton style={buttonStyles("#EAF6FF", "#5C78F4")}>
            <Icon icon="solar:phone-linear" width="30" height="30" />
          </IconButton>
          <IconButton style={buttonStyles("#FAEFFF", "#9747FF")}>
            <Icon icon="solar:videocamera-linear" width="30" height="30" />
          </IconButton>
        </div>

        <div className="w-full space-y-2">
          {contactInfo.map(({ label, value }) => (
            <InfoField key={label} label={label} text={value} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactInfoSection;
