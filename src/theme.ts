import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#0062ff', // Vibrant blue primary
      light: '#4d91ff',
      dark: '#0043b3',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#f0f7ff',
      light: '#ffffff',
      dark: '#d0e5ff',
      contrastText: '#0062ff',
    },
    background: {
      default: '#f8fafc', // Light slate background
      paper: '#ffffff',
    },
    text: {
      primary: '#0f172a', // Slate 900
      secondary: '#475569', // Slate 600
    },
    divider: 'rgba(15, 23, 42, 0.06)',
  },
  typography: {
    fontFamily: [
      'Outfit',
      'Inter',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      'sans-serif',
    ].join(','),
    h1: {
      fontWeight: 850,
      letterSpacing: '-0.03em',
      lineHeight: 1.15,
    },
    h2: {
      fontWeight: 800,
      letterSpacing: '-0.025em',
      lineHeight: 1.2,
    },
    h3: {
      fontWeight: 750,
      letterSpacing: '-0.02em',
    },
    h4: {
      fontWeight: 700,
      letterSpacing: '-0.015em',
    },
    h5: {
      fontWeight: 650,
      letterSpacing: '-0.01em',
    },
    h6: {
      fontWeight: 600,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
      letterSpacing: '0.01em',
    },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: '10px 20px',
          boxShadow: 'none',
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            boxShadow: '0 8px 16px -4px rgba(0, 98, 255, 0.2)',
          },
        },
      },
      variants: [
        {
          props: { variant: 'contained', color: 'primary' },
          style: {
            background: 'linear-gradient(135deg, #0062ff 0%, #0043b3 100%)',
            color: '#ffffff',
            '&:hover': {
              transform: 'translateY(-1px)',
              background: 'linear-gradient(135deg, #1a73ff 0%, #0052cc 100%)',
            },
          },
        },
        {
          props: { variant: 'outlined', color: 'primary' },
          style: {
            borderWidth: '1.5px',
            borderColor: 'rgba(0, 98, 255, 0.4)',
            '&:hover': {
              borderWidth: '1.5px',
              backgroundColor: 'rgba(0, 98, 255, 0.03)',
              borderColor: '#0062ff',
            },
          },
        },
      ],
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)',
          border: '1px solid rgba(15, 23, 42, 0.05)',
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        },
        elevation1: {
          boxShadow: '0 4px 20px -2px rgba(15, 23, 42, 0.04), 0 2px 8px -1px rgba(15, 23, 42, 0.02)',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: '16px',
          borderBottom: '1px solid rgba(15, 23, 42, 0.05)',
        },
        head: {
          backgroundColor: '#f8fafc',
          color: '#475569',
          fontWeight: 700,
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          transition: 'background-color 0.15s ease',
          '&.Mui-selected, &.Mui-selected:hover': {
            backgroundColor: '#f0f7ff',
          },
        },
      },
    },
  },
});

export default theme;
