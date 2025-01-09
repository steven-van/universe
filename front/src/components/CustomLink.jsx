import { Link, styled } from "@mui/material";

export const CustomLink = styled(Link)(() => ({
    color: "#645CF4",
    fontSize: "0.875rem",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
      textDecorationColor: "#645CF4",
    },
  }))