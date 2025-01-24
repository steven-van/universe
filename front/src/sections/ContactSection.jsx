import React, { useContext, useState, useEffect } from "react";
import { IconButton } from "@mui/material";
import { CustomTextField } from "../components/CustomTextField";
import { Icon } from "@iconify/react";
import Contact from "../components/Contact";
import { AuthContext } from "../contexts/AuthProvider";
import axios from 'axios';
import { jwtDecode } from "jwt-decode";

const ContactSection = () => {
  const { authToken } = useContext(AuthContext);
  const [contacts, setContacts] = useState([]);

  const getUserIdFromToken = (token) => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        return decoded.userID;
      } catch (err) {
        console.error('Invalid token', err);
        return null;
      }
    }
    return null;
  };

  const getUserContacts = async (token) => {
    const userID = getUserIdFromToken(token);
    const response = await axios.get(`http://localhost:8000/contacts/${userID}`);
    setContacts(response.data);
  }

  useEffect(() => {
    getUserContacts(authToken);
  }, [])

  return (
    <div className="min-w-80 h-full flex">
      <div className="w-full h-full flex flex-col border-r border-D8D8D8">
        <div className="flex flex-row justify-between items-center space-x-2 p-4">
          <CustomTextField fullWidth={true} label="Recherche" />
          <IconButton color="inherit">
            <Icon
              icon="solar:add-circle-bold"
              width="30"
              height="30"
              style={{ color: "#645CF4" }}
            />
          </IconButton>
        </div>
        <div className="flex justify-evenly border-b border-D8D8D8">
            <button className="text-sm text-8F8F8F hover:text-645CF4 hover:border-b hover:border-645CF4 px-4 py-2 ">Amis</button>
            <button className="text-sm text-8F8F8F hover:text-645CF4 hover:border-b hover:border-645CF4 px-4 py-2 ">Demandes</button>

        </div>
        <div className="min-w-80 flex flex-col mt-4 px-4">
          {contacts.map((contact) => {
            return <Contact contact={contact}/>
          })}

        </div>
      </div>
    </div>
  );
};

export default ContactSection;
