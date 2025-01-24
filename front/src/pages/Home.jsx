import React, { useContext } from "react";
import ChatSection from "../sections/ChatSection";
import ContactSection from "../sections/ContactSection";
import { MENU_ITEMS } from "../enums";
import UserInfoSection from "../sections/UserInfoSection";
import { MenuContext } from "../contexts/MenuContext";

const Home = () => {
  const [activeItem] = useContext(MenuContext);


  return (
    <div className="container bg-white w-full h-full flex flex-row justify-center items-center">
      <Sidebar />
      {activeItem === MENU_ITEMS.CONVERSATIONS && (
        <>
          <ConversationSection />
          <ChatSection />
        </>
      )}
      {activeItem === MENU_ITEMS.CONTACTS && (
        <>
          <ContactSection />
          <UserInfoSection />
        </>
      )}
    </div>
  );
};

export default Home;
