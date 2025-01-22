import React, { useState } from "react";
import ChatSection from "../sections/ChatSection";
import Sidebar from "../sections/Sidebar";
import ConversationSection from "../sections/ConversationSection";
import ContactSection from "../sections/ContactSection";
import { MenuContext } from "../contexts/MenuContext";
import { MENU_ITEMS } from "../enums";

const Home = () => {
  const [activeItem, setActiveItem] = useState(MENU_ITEMS.CONVERSATIONS);

  return (
    <div className="container bg-white w-full h-full flex flex-row justify-center items-center">
      <MenuContext.Provider value={[activeItem, setActiveItem]}>
        <Sidebar />
        {activeItem === MENU_ITEMS.CONVERSATIONS && <ConversationSection />}
        {activeItem === MENU_ITEMS.CONTACTS && <ContactSection />}
        <ChatSection />
      </MenuContext.Provider>
    </div>
  );
};

export default Home;
