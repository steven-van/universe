import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext();

const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io("http://localhost:8000", {
      withCredentials: true,
    });

    setSocket(newSocket);

    return () => newSocket.close();
  }, []);
  
  const loginSocket = (email) => {
    if (socket) {
      socket.emit("login", { email });
    }
  };

  return (
    <SocketContext.Provider value={{ socket, loginSocket }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;

// Hook socket
export const useSocket = () => {
  return useContext(SocketContext);
};
