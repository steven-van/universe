import React from "react";
import { Avatar, IconButton } from "@mui/material";
import { Icon } from "@iconify/react";
import profilePic from "../assets/images/profile_picture.png";
import { CustomTextField } from "../components/CustomTextField";
import Status from "../components/Status";
import MessageBubble from "../components/MessageBubble";
import { useState } from "react";

const ChatSection = () => {

  const [messagesList, setMessagesList] = useState([
    {
      text: "Hello",
      fromMe: false,
    },
    {
      text: "Test",
      fromMe: false,
    },
    {
      text: "123",
      fromMe: false,
    },
    {
      text: "123",
      fromMe: false,
    },
  ]);

  const [message, setMessage] = useState("");
  const handleSend = () => {
    if (message) {
      setMessagesList([
        ...messagesList,
        {
          text: message,
          fromMe: true,
        },
      ]);
      setMessage("");
    }
  };
  return (
    <div className="flex flex-col flex-1 h-full">
      <div className="w-full flex items-center p-5 border-b border-D8D8D8 space-x-5">
        <Avatar
          src={profilePic}
          alt="Profile Picture"
          sx={{ width: 60, height: 60, borderRadius: "20px" }}
        />
        <div className="flex flex-col">
          <p className="font-robotoBold">John Doe</p>
          <Status />
        </div>
      </div>
      <div className="flex flex-1 flex-col overflow-y-auto p-7 space-y-2">
        {messagesList.map((message) => {
          return (
            <MessageBubble fromMe={message.fromMe}>
              {message.text}
            </MessageBubble>
          );
        })}
      </div>
      <div className="w-full flex justify-center items-center space-x-6 p-7">
        <IconButton color="inherit">
          <Icon icon="solar:add-circle-linear" width="30" height="30" />
        </IconButton>

        <CustomTextField
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSend();
            }
          }}
          value={message}
          fullWidth={true}
          label="Ecrivez votre message"
        />
        <IconButton
          color="inherit"
          onClick={() => {
            handleSend();
          }}
        >
          <Icon
            icon="mynaui:send-solid"
            width="30"
            height="30"
            style={{ color: "#645CF4" }}
          />
        </IconButton>
      </div>
    </div>
  );
};

export default ChatSection;
