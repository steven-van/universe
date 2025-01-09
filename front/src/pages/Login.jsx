import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, styled } from "@mui/material";
import { CustomTextField } from "../components/CustomTextField";
import { CustomLink } from "../components/CustomLink";

const LoginButton = styled(Button)(() => ({
  backgroundColor: "#645CF4",
  padding: "12px 24px",
  color: "#F5F5F5",
  borderRadius: "12px",
}));

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <div className="container bg-white h-full w-full flex flex-col justify-center items-center">
      <div className="w-1/4 min-w-80 flex flex-col justify-center items-center rounded-2xl shadow-xl">
        <div className="flex justify-center items-center bg-gradient-to-r from-645CF4 to-blue-400 p-4 w-full text-white rounded-t-2xl font-robotoBold">
          Universe
        </div>
        <div className="flex flex-col justify-center items-center p-8 space-y-4">
          <CustomTextField
            onChange={(e) => setUsername(e.target.value)}
            required
            label="Username"
            value={username}
          />
          <CustomTextField
            onChange={(e) => setPassword(e.target.value)}
            required
            label="Password"
            value={password}
          />
          <CustomLink href="https://google.com">Forgot password ?</CustomLink>
          <LoginButton onClick={() => navigate("/home")} variant="contained">
            Login
          </LoginButton>
        </div>
      </div>
    </div>
  );
};

export default Login;
