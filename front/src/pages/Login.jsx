import React from "react";
import { useState, useEffect } from "react";
import { Button, styled } from "@mui/material";
import { CustomTextField } from "../components/CustomTextField";
import { CustomLink } from "../components/CustomLink";
import { useAuth } from "../contexts/AuthProvider";
import { useNavigate } from "react-router-dom";

const LoginButton = styled(Button)(() => ({
  backgroundColor: "#645CF4",
  padding: "12px 24px",
  color: "#F5F5F5",
  borderRadius: "12px",
}));

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {authToken, login} = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (authToken) {
      navigate('/home');
    }
  }, [authToken, navigate]);
  
  return (
    <div className="container bg-white h-full w-full flex flex-col justify-center items-center">
      <div className="w-1/4 min-w-80 flex flex-col justify-center items-center rounded-2xl shadow-xl">
        <div className="flex justify-center items-center bg-gradient-to-r from-645CF4 to-blue-400 p-4 w-full text-white rounded-t-2xl font-robotoBold">
          Universe
        </div>
        <div className="flex flex-col justify-center items-center p-8 space-y-4">
          <CustomTextField
            onChange={(e) => setEmail(e.target.value)}
            required
            label="Email"
            value={email}
          />
          <CustomTextField
            onChange={(e) => setPassword(e.target.value)}
            required
            label="Password"
            type="password"
            value={password}
          />
          <CustomLink href="https://google.com">Forgot password ?</CustomLink>
          <LoginButton onClick={() => login(email,password)} variant="contained">
            Login
          </LoginButton>
        </div>
      </div>
    </div>
  );
};

export default Login;
