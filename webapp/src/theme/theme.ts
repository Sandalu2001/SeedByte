import { createTheme } from "@mui/material/styles";
import "../index.css";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#3354F4",
    },
    info: {
      main: "#fff",
    },
    error: {
      main: "#D35D6E",
    },
    success: {
      main: "#4caf50",
    },
    warning: {
      main: "#EFB495",
    },
    background: {
      default: "#F1F2F6",
      paper: "#FFFFFF",
    },
  },
  typography: {
    fontFamily: ["Lexend", "Poppins", "sans-serif"].join(","),
    fontSize: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {},
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiInputBase-root": {
            size: "small",
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        root: {
          backdropFilter: "blur(5px)",
        },
        paper: {
          width: "90vw",
          borderRadius: 4,
          maxHeight: "90vh",
          "& .MuiDialogTitle-root": {
            fontWeight: "bold",
          },
        },
      },
    },
  },
});
