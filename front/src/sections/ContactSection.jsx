import React, { useContext, useState, useEffect } from "react";
import { IconButton } from "@mui/material";
import { CustomTextField } from "../components/CustomTextField";
import { Icon } from "@iconify/react";
import Contact from "../components/Contact";
import { AuthContext } from "../contexts/AuthProvider";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import ContactInfoSection from "./ContactInfoSection";
import { CONTACTS_MENU } from "../enums";

const ContactSection = () => {
  const { authToken } = useContext(AuthContext);
  const [contacts, setContacts] = useState([]);
  const [activeItem, setActiveItem] = useState(CONTACTS_MENU.CONTACTS);

  const getUserIdFromToken = (token) => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        return decoded.userID;
      } catch (err) {
        console.error("Invalid token", err);
        return null;
      }
    }
    return null;
  };

  const getUserContacts = async (token) => {
    const userID = getUserIdFromToken(token);
    const response = await axios.get(
      `http://localhost:8000/contacts/${userID}`
    );
    setContacts(response.data);
  };

  useEffect(() => {
    getUserContacts(authToken);
  }, []);

  return (
    <>
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
            <button
              onClick={() => setActiveItem(CONTACTS_MENU.CONTACTS)}
              className={`${
                activeItem === CONTACTS_MENU.CONTACTS
                  ? "text-645CF4 border-b-2 border-645CF4"
                  : "hover:text-645CF4 hover:border-b-2 hover:border-645CF4 text-8F8F8F"
              } text-sm px-4 py-2`}
            >
              Amis
            </button>
            <button
              onClick={() => setActiveItem(CONTACTS_MENU.REQUESTS)}
              className={`${
                activeItem === CONTACTS_MENU.REQUESTS
                  ? "text-645CF4 border-b-2 border-645CF4"
                  : "hover:text-645CF4 hover:border-b-2 hover:border-645CF4 text-8F8F8F"
              } text-sm px-4 py-2`}
            >
              Demandes
            </button>
          </div>
          <div className="min-w-80 flex flex-col mt-4 px-4">
            {activeItem === CONTACTS_MENU.CONTACTS &&
              contacts.map((contact) => {
                return <Contact contact={contact} />;
              })}
          </div>
        </div>
      </div>
      <ContactInfoSection />
    </>
  );
};

export default ContactSection;
