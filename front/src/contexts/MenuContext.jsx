import React, { createContext, useState } from "react";
import { MENU_ITEMS } from "../enums";

export const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
  const [activeItem, setActiveItem] = useState(MENU_ITEMS.CONVERSATIONS);

  return (
    <MenuContext.Provider value={[ activeItem, setActiveItem ]}>
      {children}
    </MenuContext.Provider>
  );
};
