import React, { useEffect } from "react";
import { useState } from "react";
import { Button, styled } from "@mui/material";
import { CustomTextField } from "../components/CustomTextField";
import { CustomLink } from "../components/CustomLink";
import AuthModal from "../components/AuthModal";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";

const SignupButton = styled(Button)(() => ({
  backgroundColor: "#645CF4",
  padding: "12px 24px",
  color: "#F5F5F5",
  borderRadius: "12px",
}));

const Signup = () => {
  const [user, setUser] = useState({});
  const { authToken, signup } = useAuth();
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
          fullWidth={true}
          onChange={(e) => {
            setUser({ ...user, email: e.target.value });
          }}
          required
          label="Email"
        />
        <CustomTextField
          fullWidth={true}
          onChange={(e) => {
            setUser({ ...user, password: e.target.value });
          }}
          required
          type="password"
          label="Password"
        />
        <CustomTextField
          fullWidth={true}
          onChange={(e) => {
            setUser({ ...user, firstname: e.target.value });
          }}
          required
          label="Firstname"
        />
        <CustomTextField
          fullWidth={true}
          onChange={(e) => {
            setUser({ ...user, lastname: e.target.value });
          }}
          required
          label="Lastname"
        />

        <CustomTextField
          type="date"
          fullWidth={true}
          onChange={(e) => {
            setUser({ ...user, birthday: e.target.value });
          }}
          required
          label="Birthdate"
          slotProps={{ inputLabel: { shrink: true } }}
        />
        <CustomTextField
          fullWidth={true}
          onChange={(e) => {
            setUser({ ...user, phone: e.target.value });
          }}
          required
          label="Phone"
        />

        <SignupButton onClick={() => signup(user)} variant="contained">
          Signup
        </SignupButton>

        <div>
          <p className="text-sm text-8F8F8F">
            Already have an account ?{" "}
            <CustomLink onClick={() => navigate("/login")}>
              Login here
            </CustomLink>
          </p>
        </div>
      </div>
    </AuthModal>
  );
};

export default Signup;
