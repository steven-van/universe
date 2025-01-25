import React from "react";
import { Avatar, IconButton } from "@mui/material";
import { Icon } from "@iconify/react";
import { useContext } from "react";
import profilePic from "../assets/images/profile_picture.png";
import { MenuContext } from "../contexts/MenuContext";
import { MENU_ITEMS } from "../enums";

const Sidebar = () => {
  const [activeItem, setActiveItem] = useContext(MenuContext);

  return (
    <div className="h-full w-28 flex flex-col justify-between items-center py-8 shadow-2xl">
      <div className="flex flex-col items-center justify-center space-y-8">
        <Avatar
          src={profilePic}
          sx={{ width: 60, height: 60, borderRadius: "20px" }}
        />
        {activeItem === MENU_ITEMS.CONVERSATIONS ? (
          <IconButton color="inherit">
            <Icon
              icon="solar:chat-dots-bold"
              width="30"
              height="30"
              style={{ color: "#645CF4" }}
            />
          </IconButton>
        ) : (
          <IconButton
            onClick={() => setActiveItem(MENU_ITEMS.CONVERSATIONS)}
            color="inherit"
          >
            <Icon icon="solar:chat-dots-linear" width="30" height="30" />
          </IconButton>
        )}

        {activeItem === MENU_ITEMS.CONTACTS ? (
          <IconButton color="inherit">
            <Icon
              icon="solar:users-group-rounded-bold"
              width="30"
              height="30"
              style={{ color: "#645CF4" }}
            />
          </IconButton>
        ) : (
          <IconButton
            onClick={() => setActiveItem(MENU_ITEMS.CONTACTS)}
            color="inherit"
          >
            <Icon
              icon="solar:users-group-rounded-linear"
              width="30"
              height="30"
            />
          </IconButton>
        )}
      </div>
      <div className="flex flex-col items-center justify-center space-y-8">
        {activeItem === MENU_ITEMS.INFOS ? (
          <IconButton color="inherit">
            <Icon
              icon="solar:info-circle-bold"
              width="30"
              height="30"
              style={{ color: "#645CF4" }}
            />
          </IconButton>
        ) : (
          <IconButton
            onClick={() => setActiveItem(MENU_ITEMS.INFOS)}
            color="inherit"
          >
            <Icon icon="solar:info-circle-linear" width="30" height="30" />
          </IconButton>
        )}

        {activeItem === MENU_ITEMS.SETTINGS ? (
          <IconButton color="inherit">
            <Icon
              icon="solar:settings-bold"
              width="30"
              height="30"
              style={{ color: "#645CF4" }}
            />
          </IconButton>
        ) : (
          <IconButton
            onClick={() => setActiveItem(MENU_ITEMS.SETTINGS)}
            color="inherit"
          >
            <Icon icon="solar:settings-linear" width="30" height="30" />
          </IconButton>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
