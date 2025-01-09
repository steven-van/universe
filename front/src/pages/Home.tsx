import React from "react";
import ChatSection from "../sections/ChatSection";
import ContactSection from "../sections/ContactSection";
import Sidebar from "../sections/Sidebar";

const Home = () => {
  return (
    <div
      className="container bg-white w-full h-full flex flex-row justify-center items-center"
    >
        <Sidebar/>
        <ContactSection/>
        <ChatSection/>
    </div>
  );
};

export default Home;
