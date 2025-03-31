// client/src/theme.ts
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4A90E2', // vibrant blue
    },
    secondary: {
      main: '#F5A623', // warm orange
    },
    background: {
      default: '#F0F4F8', // light background (used by CssBaseline)
    },
  },
  typography: {
    fontFamily: 'Poppins, sans-serif',
    h4: {
      fontWeight: 700,
      color: '#333',
    },
  },
});

export default theme;
