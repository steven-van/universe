import React from "react";
import profilePic from "../assets/images/profile_picture.png";
import InfoField from "../components/InfoField";
import { Avatar, IconButton } from "@mui/material";
import { Icon } from "@iconify/react";

const ContactInfoSection = ({ contact }) => {
  const formattedBirthday = new Date(contact.birthday).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const contactInfo = {
    Mail: contact.email,
    Anniversaire: contact.formattedBirthday,
    Mobile: contact.phone,
  };
  return <div className="flex justify-center items-center flex-1 bg-FDFAFA h-full">
    <div className="w-5/6 flex flex-col justify-center items-center">
      <Avatar
        src={profilePic}
        alt="Profile Picture"
        sx={{ width: 120, height: 120, borderRadius: "20px" }}
      />
      <p className="font-robotoBold text-xl mt-6">{contact.firstname} {contact.lastname}</p>
      <div className="w-full flex flew-row space-x-8 mt-10 mb-8">
        <IconButton style={{ flex: "1 1 0%", backgroundColor: "#EFFFEF", borderRadius: "6px", padding: "25px 0" }}>
          <Icon icon="solar:chat-dots-linear" width="30" height="30" color="#14AE5C" />
        </IconButton>
        <IconButton style={{ flex: "1 1 0%", backgroundColor: "#EAF6FF", borderRadius: "6px", padding: "25px 0" }}>
          <Icon icon="solar:phone-linear" width="30" height="30" style={{ color: "5C78F4" }} />
        </IconButton>
        <IconButton style={{ flex: "1 1 0%", backgroundColor: "#FAEFFF", borderRadius: "6px", padding: "25px 0" }}>
          <Icon icon="solar:videocamera-linear" width="30" height="30" style={{ color: "9747FF" }} />
        </IconButton>
      </div>
      <div className="w-full space-y-2">
        {Object.keys(contactInfo).map((key) => (
          <InfoField key={key} label={key.charAt(0).toUpperCase() + key.slice(1)} text={contactInfo[key]} />
        ))}

      </div>

      <div className="flex flex-1"></div>
    </div>
  </div>
}

export default ContactInfoSection;