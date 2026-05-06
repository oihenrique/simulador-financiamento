import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "light",

    primary: {
      main: "#155EEF",
      light: "#528BFF",
      dark: "#0040C1",
      contrastText: "#FFFFFF",
    },

    secondary: {
      main: "#0F172A",
      light: "#334155",
      dark: "#020617",
      contrastText: "#FFFFFF",
    },

    success: {
      main: "#16A34A",
    },

    warning: {
      main: "#F59E0B",
    },

    error: {
      main: "#DC2626",
    },

    background: {
      default: "#F5F7FA",
      paper: "#FFFFFF",
    },

    text: {
      primary: "#0F172A",
      secondary: "#475569",
    },

    divider: "#E2E8F0",
  },

  shape: {
    borderRadius: 8,
  },

  typography: {
    fontFamily: `"Inter", "Roboto", "Arial", sans-serif`,

    h3: {
      fontWeight: 800,
      letterSpacing: "-0.04em",
      lineHeight: 1.1,
    },

    h4: {
      fontWeight: 800,
      letterSpacing: "-0.03em",
    },

    h5: {
      fontWeight: 700,
      letterSpacing: "-0.02em",
    },

    h6: {
      fontWeight: 700,
      letterSpacing: "-0.01em",
    },

    subtitle1: {
      fontWeight: 600,
    },

    button: {
      fontWeight: 700,
      textTransform: "none",
      letterSpacing: "-0.01em",
    },
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: "linear-gradient(to bottom, #F8FAFC 0%, #F5F7FA 100%)",
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          borderRadius: 8,
          border: "1px solid #E2E8F0",
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          border: "1px solid #E2E8F0",
          boxShadow: "0 4px 12px rgba(15, 23, 42, 0.04)",
          transition: "all 0.2s ease",

          "&:hover": {
            boxShadow: "0 8px 24px rgba(15, 23, 42, 0.08)",
          },
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          boxShadow: "none",
          paddingTop: 12,
          paddingBottom: 12,

          "&.MuiButton-containedPrimary": {
            background: "linear-gradient(135deg, #155EEF 0%, #0040C1 100%)",
          },

          "&.MuiButton-containedPrimary:hover": {
            background: "linear-gradient(135deg, #0040C1 0%, #00359E 100%)",
            boxShadow: "none",
          },
        },
      },
    },

    MuiTextField: {
      defaultProps: {
        variant: "outlined",
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          backgroundColor: "#FFFFFF",

          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#155EEF",
          },

          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderWidth: 2,
            borderColor: "#155EEF",
          },
        },

        notchedOutline: {
          borderColor: "#CBD5E1",
        },
      },
    },

    MuiTableContainer: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          border: "1px solid #E2E8F0",
        },
      },
    },

    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: "#F8FAFC",
        },
      },
    },
  },
});
