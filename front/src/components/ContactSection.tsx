import React from "react";
import { IconButton } from "@mui/material";
import { CustomTextField } from "./CustomTextField";
import { Icon } from "@iconify/react";

const ContactSection = () => {
  return (
    <div className="h-full flex">
      <div className="min-w-fit w-1/3 max-w-md h-full flex flex-col p-4 border-r border-D8D8D8">
        <div className="flex flex-row justify-between items-center space-x-2">
          <CustomTextField fullWidth={true} label="Recherche" />
          <IconButton color="inherit">
            <Icon
              icon="solar:add-circle-bold"
              width="30"
              height="30"
              style={{ color: "#645CF4" }}
            />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
