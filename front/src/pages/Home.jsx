import React, { useContext } from "react";
import ContactSection from "../sections/ContactSection";
import ConversationSection from "../sections/ConversationSection";
import Sidebar from "../sections/Sidebar";
import { SIDEBAR_MENU } from "../enums";
import { MenuContext } from "../contexts/MenuContext";

const Home = () => {
  const [activeItem] = useContext(MenuContext);

  return (
    <div className="container bg-white w-full h-full flex flex-row justify-center items-center">
      <Sidebar />
      {activeItem === SIDEBAR_MENU.CONVERSATIONS && <ConversationSection />}
      {activeItem === SIDEBAR_MENU.CONTACTS && <ContactSection />}
    </div>
  );
};

export default Home;
