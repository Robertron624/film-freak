import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#6D28D9",
    },
    secondary: {
      main: "rgb(216, 165, 87)",
    },
  },

  // make breakpoints coincide with Tailwind CSS breakpoints
  breakpoints: {
    values: {
      xs: 0,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
    },
  },
});

export default theme;
