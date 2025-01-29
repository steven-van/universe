import React, { useContext, createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginService, signupService } from "../services/authService";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useSocket } from "./SocketProvider";
import { io } from "socket.io-client";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem("authToken"));
  const navigate = useNavigate();

  const login = async (email, password) => {
    try {
      const response = await loginService(email, password);

      const { token } = response.data;

      if (response.data.success) {

        const socket = io.connect("http://localhost:8000");
        socket.connect();
        socket.emit("login", { email: email });
        
      } else {
        alert("Échec de l'authentification");
      }

      localStorage.setItem("authToken", token);
      setAuthToken(token);
      navigate("/home");
    } catch (error) {
      console.error("Error logging in:", error.response.data);
      alert("Login failed, please check your email and password");
    }
  };

  const signup = async (user) => {
    try {
      const response = await signupService(user);
      const { firstname, lastname } = response.data
      alert(`User account ${firstname} ${lastname} created`);
      navigate("/login");
    } catch (error) {
      console.error("Error signing up:", error.response.data);
      alert("Login failed, please check your email and password");
    }
  };

  const logout = () => {
    setAuthToken(null);
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  const getUserIdFromToken = (token) => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        return decoded.user_id;
      } catch (err) {
        console.error("Invalid token", err);
        return null;
      }
    }
    return null;
  };

  useEffect(() => {
    if (authToken) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${authToken}`;
    }
  }, [authToken]);

  return (
    <AuthContext.Provider value={{ authToken, signup, login, logout, getUserIdFromToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
