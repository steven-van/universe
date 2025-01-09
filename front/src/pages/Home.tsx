import React from "react";
import ChatSection from "../components/ChatSection";
import ContactSection from "../components/ContactSection";
import Sidebar from "../components/Sidebar";

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
