import React, { createContext, useState } from "react";
import { SIDEBAR_MENU } from "../enums";

export const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
  const [activeItem, setActiveItem] = useState(SIDEBAR_MENU.CONVERSATIONS);

  return (
    <MenuContext.Provider value={[ activeItem, setActiveItem ]}>
      {children}
    </MenuContext.Provider>
  );
};
