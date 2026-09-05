'use client';

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#14301f', // Deep Forest Green
      light: '#2c4a33',
      dark: '#0e2416',
      contrastText: '#d6ee7e',
    },
    secondary: {
      main: '#d6ee7e', // Bright Chartreuse/Lime
      light: '#e6f8a2',
      dark: '#adc853',
      contrastText: '#132a1e',
    },
    background: {
      default: '#fbfaf7', // Warm Linen / Soft Cream
      paper: '#ffffff',
    },
    text: {
      primary: '#14201a',
      secondary: '#6b7568',
    },
    divider: '#e4e5df',
  },
  typography: {
    fontFamily: '"Manrope", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    h1: {
      fontFamily: '"Playfair Display", Georgia, serif',
      fontWeight: 500,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontFamily: '"Playfair Display", Georgia, serif',
      fontWeight: 500,
      letterSpacing: '-0.015em',
    },
    h3: {
      fontFamily: '"Playfair Display", Georgia, serif',
      fontWeight: 500,
      letterSpacing: '-0.01em',
    },
    h4: {
      fontFamily: '"Playfair Display", Georgia, serif',
      fontWeight: 500,
    },
    h5: {
      fontFamily: '"Playfair Display", Georgia, serif',
      fontWeight: 500,
    },
    h6: {
      fontFamily: '"Playfair Display", Georgia, serif',
      fontWeight: 500,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
      fontFamily: '"Manrope", sans-serif',
    },
  },
  shape: {
    borderRadius: 20,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          padding: '12px 24px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 24,
          boxShadow: 'none',
        },
      },
    },
  },
});

export default theme;
