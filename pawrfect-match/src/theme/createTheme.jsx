import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      light: "#4a6382",
      main: "#253d5c", // deep blue background
      dark: "#15293d",
      contrastText: "#ffffff", // white text on blue buttons
    },
    secondary: {
      light: "#f1c6c1",
      main: "#c6878e", // muted pink accent
      dark: "#8f5c62",
      contrastText: "#ffffff", // text visible on secondary buttons
    },
    error: {
      light: "#f28b82",
      main: "#d32f2f",
      dark: "#9a0007",
      contrastText: "#ffffff",
    },
    warning: {
      light: "#ffd54f",
      main: "#ed6c02",
      dark: "#e65100",
      contrastText: "#000000",
    },
    info: {
      light: "#9ec2ff",
      main: "#5a7fa6", // softer blue for info alerts
      dark: "#2e4c73",
      contrastText: "#ffffff",
    },
    success: {
      light: "#81c784",
      main: "#2e7d32",
      dark: "#1b5e20",
      contrastText: "#ffffff",
    },
    background: {
      default: "#253d5c", // deep blue page background
      paper: "#fde6de", // soft cream for cards/forms
      secondary: "#969696",
    },
    text: {
      primary: "#ffffff", // white for main text
      secondary: "#f0e6dc", // cream/soft text for secondary
      disabled: "#c4c4c4", // muted gray
    },
  },
});
