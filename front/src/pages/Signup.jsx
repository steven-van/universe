import React from "react";
import { useState, useEffect } from "react";
import { Button, styled } from "@mui/material";
import { CustomTextField } from "../components/CustomTextField";

const SignupButton = styled(Button)(() => ({
  backgroundColor: "#645CF4",
  padding: "12px 24px",
  color: "#F5F5F5",
  borderRadius: "12px",
}));

const Signup = () => {
  const [user, setUser] = useState({});

  return (
    <div className="container bg-white h-full w-full flex flex-col justify-center items-center">
      <div className="w-1/4 min-w-80 rounded-2xl shadow-xl">
        <div className="flex justify-center items-center bg-gradient-to-r from-645CF4 to-blue-400 p-4 w-full text-white rounded-t-2xl font-robotoBold">
          Universe
        </div>
        <div className="flex flex-col justify-center items-center p-8 space-y-4">
          <CustomTextField
            onChange={(e) => {
              setUser({ ...user, email: e.target.value });
            }}
            required
            label="Email"
            value={user.email}
          />
          <CustomTextField
            onChange={(e) => {
              setUser({ ...user, password: e.target.value });
            }}
            required
            type="password"
            label="Password"
            value={user.password}
          />
          <CustomTextField
            onChange={(e) => {
              setUser({ ...user, firstname: e.target.value });
            }}
            required
            label="Firstname"
            value={user.firstname}
          />
          <CustomTextField
            onChange={(e) => {
              setUser({ ...user, lastname: e.target.value });
            }}
            required
            label="Lastname"
            value={user.lastname}
          />
          <CustomTextField
            onChange={(e) => {
              setUser({ ...user, birthday: e.target.value });
            }}
            required
            label="Birthdate"
            value={user.birthdate}
          />
          <CustomTextField
            onChange={(e) => {
              setUser({ ...user, phone: e.target.value });
            }}
            required
            label="Phone"
            value={user.phone}
          />

          <SignupButton
            onClick={() => ""}
            variant="contained"
          >
            Signup
          </SignupButton>
        </div>
      </div>
    </div>
  );
};

export default Signup;
