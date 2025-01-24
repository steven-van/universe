import React, { useContext } from "react";
import ContactSection from "../sections/ContactSection";
import ConversationSection from "../sections/ConversationSection";
import Sidebar from "../sections/Sidebar";
import { MENU_ITEMS } from "../enums";
import { MenuContext } from "../contexts/MenuContext";

const Home = () => {
  const [activeItem] = useContext(MenuContext);

  return (
    <div className="container bg-white w-full h-full flex flex-row justify-center items-center">
      <Sidebar />
      {activeItem === MENU_ITEMS.CONVERSATIONS && <ConversationSection />}
      {activeItem === MENU_ITEMS.CONTACTS && <ContactSection />}
    </div>
  );
};

export default Home;
