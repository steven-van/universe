import React from "react";
import { useState, useEffect } from "react";
import { Button, styled } from "@mui/material";
import { CustomTextField } from "../components/CustomTextField";
import { CustomLink } from "../components/CustomLink";
import { useAuth } from "../contexts/AuthProvider";
import { useNavigate } from "react-router-dom";
import AuthModal from "../components/AuthModal";

const LoginButton = styled(Button)(() => ({
  backgroundColor: "#645CF4",
  padding: "12px 24px",
  color: "#F5F5F5",
  borderRadius: "12px",
}));

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { authToken, login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (authToken) {
      navigate("/home");
    }
  }, [authToken, navigate]);

  return (
    <AuthModal>
      <div className="flex flex-col justify-center items-center p-8 space-y-4">
        <CustomTextField
          onChange={(e) => setEmail(e.target.value)}
          required
          label="Email"
        />
        <CustomTextField
          onChange={(e) => setPassword(e.target.value)}
          required
          label="Password"
          type="password"
        />
        <CustomLink href="https://google.com">Forgot password ?</CustomLink>
        <div>
          <p className="text-sm text-8F8F8F">
            Don't have an account ?{" "}
            <CustomLink onClick={() => navigate("/signup")}>
              Register here
            </CustomLink>
          </p>
        </div>
        <LoginButton onClick={() => login(email, password)} variant="contained">
          Login
        </LoginButton>
      </div>
    </AuthModal>
  );
};

export default Login;
