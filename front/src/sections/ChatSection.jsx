import React, { useEffect } from "react";
import { Avatar, IconButton } from "@mui/material";
import { Icon } from "@iconify/react";
import profilePic from "../assets/images/profile_picture.png";
import { CustomTextField } from "../components/CustomTextField";
import Status from "../components/Status";
import MessageBubble from "../components/MessageBubble";
import WarningBubble from "../components/WarningBubble";
import { useState } from "react";
import { useSocket } from "../contexts/SocketProvider";
import { useAuth } from "../contexts/AuthProvider";
import { getConversationMessageService } from "../services/messageService";

const ChatSection = ({ conversation }) => {
  const { authToken, getUserIdFromToken } = useAuth();
  const [messagesList, setMessagesList] = useState([]);

  const { socket } = useSocket();
  const [message, setMessage] = useState("");
  const conversationInfo = conversation.conversation;
  const userInfo = conversation.user_info;
  const user_id = getUserIdFromToken(authToken);

  const addMessage = (text, sender_id, isError = false) => {
    setMessagesList((prevMessages) => [
      ...prevMessages,
      {
        text_message: text,
        sender_id: sender_id,
        isError: isError,
      },
    ]);
  };

  const handleSend = () => {
    if (message) {
      const messageData = {
        message: message,
        sender_id: user_id,
        receiver_id: userInfo.user_id,
        conversation_id: conversationInfo.conversation_id, // get id_conversation
      };

      socket.emit("send-message", messageData, (response) => {
        if (response.success) {
          addMessage(message, user_id, false);
        } else {
          const errorMessage = response.errorMessage;
          addMessage(errorMessage, user_id, true); // Optionnel : Afficher l'erreur dans la liste des messages OU notification d'erreur
        }
      });

      setMessage("");
    }
  };

  const getConversationMessages = async (conversationInfo) => {
    const messages = await getConversationMessageService(
      conversationInfo.conversation_id,
    );
    setMessagesList(messages);
  };

  useEffect(() => {
    getConversationMessages(conversationInfo);

    if (socket) {
      // on reçoit un message d'un autre socket
      socket.on("receive-message", ({ newMessage }) => {
        addMessage(newMessage.text_message, newMessage.sender_id, false); //message reçu
      });

      // aucun message n'a été rçu mais une notification d'erreur
      socket.on("error-notification", (notification) => {
        addMessage(notification.text, newMessage.sender_id, true); //notification d'erreur
      });

      return () => {
        socket.off("receive-message");
        socket.off("error-notification");
      };
    }
  }, [socket, conversation]);

  return (
    <div className="flex flex-col flex-1 h-full">
      <div className="w-full flex items-center p-5 border-b border-D8D8D8 space-x-5">
        <Avatar
          src={profilePic}
          alt="Profile Picture"
          sx={{ width: 60, height: 60, borderRadius: "20px" }}
        />
        <div className="flex flex-col">
          <p className="font-robotoBold">
            {userInfo.firstname} {userInfo.lastname}
          </p>
          <Status />
        </div>
      </div>
      <div className="flex flex-1 flex-col overflow-y-auto p-7 space-y-2">
        {messagesList.map((message) => {
          if (message.isError === true) {
            return <WarningBubble>{message.text_message}</WarningBubble>;
          } else {
            return (
              <MessageBubble isFromMe={message.sender_id == user_id}>
                {message.text_message}
              </MessageBubble>
            );
          }
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
