import React, {useState, useEffect} from "react";
import { IconButton } from "@mui/material";
import { CustomTextField } from "../components/CustomTextField";
import { Icon } from "@iconify/react";
import Conversation from "../components/Conversation";
import ChatSection from "./ChatSection";
import {useAuth} from "../contexts/AuthProvider";
 
import { getUserConversationsService } from "../services/conversationService";

const ConversationSection = () => {
    const { authToken, getUserIdFromToken } = useAuth();
    const [conversations, setConversations] = useState([]);
    const [selectedConversation, setSelectedConversation] = useState(null);
    

    const getUserConversations = async (token) => {
      const userId = getUserIdFromToken(token);
      const conversations = await getUserConversationsService(userId);
      setConversations(conversations);
    };

    useEffect(() => {
        getUserConversations(authToken);
      }, []);


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
              <div className="min-w-80 flex flex-col mt-4 px-4">
                { conversations.map((conversation) => {
                  return (
                    <button onClick={() => setSelectedConversation(conversation)}>
                      <Conversation userInfo={conversation.user_info} />
                    </button>
                  );
                })}
              </div>
          </div>
        </div>
      </div>
      {selectedConversation ? <ChatSection conversation={selectedConversation} /> : <div className="flex-1"></div>}
    </>
  );
};

export default ConversationSection;
