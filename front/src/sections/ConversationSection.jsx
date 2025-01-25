import React from "react";
import { IconButton } from "@mui/material";
import { CustomTextField } from "../components/CustomTextField";
import { Icon } from "@iconify/react";
import Conversation from "../components/Conversation";
import ChatSection from "./ChatSection";

const ConversationSection = () => {
  return (
    <>
      <div className="w-80 h-full flex">
        <div className="w-full h-full flex flex-col p-4 border-r border-D8D8D8">
          <div className="flex flex-row justify-between items-center space-x-2">
            <CustomTextField fullWidth={true} label="Recherche" />
            <IconButton color="inherit">
              <Icon
                icon="solar:add-circle-bold"
                width="30"
                height="30"
                style={{ color: "#645CF4" }}
              />
            </IconButton>
          </div>
          <div className="flex flex-col mt-4">
            <Conversation />
            <Conversation />
            <Conversation />
          </div>
        </div>
      </div>
      <ChatSection />
    </>
  );
};

export default ConversationSection;
