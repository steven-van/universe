import React, { useContext, createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginService } from "../services/authService";
import axios from 'axios';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));
  const navigate = useNavigate();

  const login = async (username, password) => {
  try {
    const response = await loginService(username, password);

    const { token } = response.data;

    localStorage.setItem("authToken", token);
    setAuthToken(token);
    navigate("/home");
  } catch (error) {
    console.error("Error logging in:", error.response.data);
    alert("Login failed, please check your username and password");
  }

  };

  const logout = () => {
    setAuthToken(null);
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  useEffect(() => {
    if (authToken) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
    }
}, [authToken]);

  return (
    <AuthContext.Provider value={{authToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};