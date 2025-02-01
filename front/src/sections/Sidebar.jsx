import React from "react";
import { Avatar, IconButton } from "@mui/material";
import { Icon } from "@iconify/react";
import { useContext } from "react";
import profilePic from "../assets/images/profile_picture.png";
import { MenuContext } from "../contexts/MenuContext";
import { SIDEBAR_MENU } from "../enums";
import { useAuth } from "../contexts/AuthProvider";

const Sidebar = () => {
  const [activeItem, setActiveItem] = useContext(MenuContext);
  const { logout } = useAuth();

  return (
    <div className="h-full w-28 flex flex-col justify-between items-center py-8 shadow-2xl">
      <div className="flex flex-col items-center justify-center space-y-8">
        <Avatar
          src={profilePic}
          sx={{ width: 60, height: 60, borderRadius: "20px" }}
        />
        {activeItem === SIDEBAR_MENU.CONVERSATIONS ? (
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
            onClick={() => setActiveItem(SIDEBAR_MENU.CONVERSATIONS)}
            color="inherit"
          >
            <Icon icon="solar:chat-dots-linear" width="30" height="30" />
          </IconButton>
        )}

        {activeItem === SIDEBAR_MENU.CONTACTS ? (
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
            onClick={() => setActiveItem(SIDEBAR_MENU.CONTACTS)}
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
        <IconButton color="inherit">
          <Icon icon="solar:info-circle-linear" width="30" height="30" />
        </IconButton>
        <IconButton color="inherit">
          <Icon icon="solar:settings-linear" width="30" height="30" />
        </IconButton>
        <IconButton onClick={() => logout()} color="inherit">
          <Icon icon="solar:logout-2-outline" width="30" height="30" />
        </IconButton>
      </div>
    </div>
  );
};

export default Sidebar;
