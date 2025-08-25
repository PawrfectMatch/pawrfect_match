import { createTheme } from "@mui/material/styles";

export const adoptTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      light: "#335981",
      main: "#1f3a5f",    // deep slate-blue
      dark: "#10243e",
      contrastText: "#ffffff",
    },
    secondary: {
      light: "#9a6e7f",
      main: "#7b4f5f",    // muted plum/rosewood
      dark: "#563643",
      contrastText: "#ffffff",
    },
    background: {
      default: "#e9edf3", // πολύ διακριτικά πιο σκούρο από λευκό
      paper: "#f3f4f6",   // γκρι-ανοιχτό αντί για cream
    },
    text: {
      primary: "#1a1f2b",   // σκούρο γραφίτη (καλή αντίθεση)
      secondary: "#384354", // δευτερεύον σκούρο
      disabled: "#9aa4b2",
    },
    info:    { main: "#4a81d4", contrastText: "#ffffff" },
    warning: { main: "#c9832b", contrastText: "#000000" },
    error:   { main: "#c94141", contrastText: "#ffffff" },
    success: { main: "#2f7d4f", contrastText: "#ffffff" },
  },

  // Μικρά καθολικά "γυαλίσματα" για την φόρμα
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: "none",
          fontWeight: 700,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          color: "#1a1f2b", // κείμενο input
          "& .MuiOutlinedInput-notchedOutline": { borderColor: "#1f3a5f" },
          "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#1f3a5f" },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#1f3a5f" },
        },
        input: { color: "#1a1f2b" },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: { color: "#1a1f2b" },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: { color: "#1a1f2b" },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: { color: "#1a1f2b" },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: { color: "#1a1f2b" },
      },
    },
    MuiStepLabel: {
      styleOverrides: {
        label: { color: "#1a1f2b" },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: { color: "#1a1f2b" },
      },
    },
  },
});
