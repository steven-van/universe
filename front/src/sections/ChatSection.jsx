import React, {useEffect} from "react";
import { Avatar, IconButton } from "@mui/material";
import { Icon } from "@iconify/react";
import profilePic from "../assets/images/profile_picture.png";
import { CustomTextField } from "../components/CustomTextField";
import Status from "../components/Status";
import MessageBubble from "../components/MessageBubble";
import { useState } from "react";
import { useSocket } from "../contexts/SocketProvider";

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

  const {socket} = useSocket();
  const [message, setMessage] = useState("");

  const addMessage = (text, fromMe, isError = false) => {
    setMessagesList((prevMessages) => [
      ...prevMessages,
      {
        text: text,
        fromMe: fromMe,
        isError: isError,
      },
    ]);
  };

  const handleSend = () => {
    
    if (message) {

      // comment récupérer toutes les informations pour l'envoi de message ??? 
      const messageData = {
        email_receiver: "", 
        message: message,
        sender_id: "",
        recipient_id: "",
        conversation_id: "",
      };

      socket.emit("send-message", messageData, (response) => {
        if (response.success) {
          addMessage(message, true); 
        } else {
          consolel.log(response.errorMessage);
          addMessage(response.error, false, true); // Optionnel : Afficher l'erreur dans la liste des messages OU notification d'erreur
        }
      });

      setMessage("");
    }
  };

  useEffect(() => {

    if (socket) {
      
      // on reçoit un message d'un autre socket
      socket.on("receive-message", ({ newMessage }) => {
        addMessage(newMessage.text_message, false);
      });
      
      // aucun message n'a été rçu mais une notification d'erreur
      socket.on("error-notification", (notification) => {
        addMessage(notification.text, true, true);
      });

      return () => {
        socket.off("receive-message");
        socket.off("error-notification");
      };
    }
  }, [socket]);



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
