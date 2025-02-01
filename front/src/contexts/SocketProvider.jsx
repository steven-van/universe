import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useAuth } from "./AuthProvider";

const SocketContext = createContext();

const SocketProvider = ({ children }) => {
  const { authToken, getUserIdFromToken } = useAuth();
  const [socket, setSocket] = useState(null);

  useEffect(() => {

    const userId = getUserIdFromToken(authToken);

    if (authToken){
      const newSocket = io("http://localhost:8000", {
        withCredentials: true,
      });

      setSocket(newSocket);

      newSocket.emit("login", userId);

    return () => newSocket.close();

    }

  }, [authToken]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;

// Hook socket
export const useSocket = () => {
  return useContext(SocketContext);
};
