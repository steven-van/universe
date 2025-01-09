import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

export const CustomTextField = styled(TextField)(() => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: "16px",
    backgroundColor: "#F5F5F5",
    "& fieldset": {
      border: 0,
    },
    "&:hover fieldset": {
      border: "solid 2px",
      borderColor: "#645CF4",
    },
    "&.Mui-focused fieldset": {
      border: "solid 2px",
      borderColor: "#645CF4",
    },
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#645CF4",
  },
}));
