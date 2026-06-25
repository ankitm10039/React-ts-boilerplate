import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#0062ff',
      light: '#4d91ff',
      dark: '#004dc9',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#10b981',
      light: '#34d399',
      dark: '#059669',
      contrastText: '#ffffff',
    },
    warning: {
      main: '#f59e0b',
      light: '#fbbf24',
      dark: '#d97706',
      contrastText: '#000000',
    },
    error: {
      main: '#ef4444',
      light: '#f87171',
      dark: '#dc2626',
      contrastText: '#ffffff',
    },
    success: {
      main: '#10b981',
      light: '#34d399',
      dark: '#059669',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
    },
    text: {
      primary: '#0f172a',
      secondary: '#475569',
      disabled: '#94a3b8',
    },
    divider: 'rgba(15, 23, 42, 0.08)',
    grey: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
    },
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
    h1: { fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.15 },
    h2: { fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.2 },
    h3: { fontWeight: 600, letterSpacing: '-0.01em' },
    h4: { fontWeight: 600, letterSpacing: '-0.01em' },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    body1: { fontSize: '0.875rem', lineHeight: 1.6 },
    body2: { fontSize: '0.8125rem', lineHeight: 1.6 },
    button: { textTransform: 'none', fontWeight: 600, letterSpacing: '0.02em' },
    caption: { fontSize: '0.75rem', letterSpacing: '0.03em' },
  },
  shape: {
    borderRadius: 0,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          padding: '7px 16px',
          boxShadow: 'none',
          transition: 'all 0.15s ease',
          fontSize: '12px',
          fontWeight: 700,
          letterSpacing: '0.04em',
          '&:hover': { boxShadow: 'none' },
        },
        sizeSmall: {
          padding: '5px 12px',
          fontSize: '11px',
        },
        sizeLarge: {
          padding: '10px 24px',
          fontSize: '13px',
        },
        contained: {
          '&.MuiButton-containedPrimary': {
            background: '#0062ff',
            '&:hover': { background: '#004dc9' },
          },
        },
        outlined: {
          '&.MuiButton-outlinedPrimary': {
            borderColor: 'rgba(0, 98, 255, 0.4)',
            borderWidth: '1px',
            '&:hover': { borderColor: '#0062ff', backgroundColor: 'rgba(0, 98, 255, 0.03)' },
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          boxShadow: 'none',
          border: '1px solid rgba(15, 23, 42, 0.08)',
          borderRadius: 0,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          boxShadow: 'none',
          border: '1px solid rgba(15, 23, 42, 0.08)',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 0,
          border: '1px solid rgba(15, 23, 42, 0.12)',
          boxShadow: '12px 12px 0px rgba(15, 23, 42, 0.06)',
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          borderRadius: 0,
          backgroundColor: '#0f172a',
          fontSize: '11px',
          fontFamily: '"JetBrains Mono", monospace',
          fontWeight: 700,
          letterSpacing: '0.04em',
          padding: '6px 10px',
        },
        arrow: {
          color: '#0f172a',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: '12px 16px',
          borderBottom: '1px solid rgba(15, 23, 42, 0.06)',
          fontFamily: 'Inter, sans-serif',
          fontSize: '12px',
        },
        head: {
          backgroundColor: '#f8fafc',
          color: '#475569',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          fontSize: '10px',
          fontFamily: '"JetBrains Mono", Inter, monospace',
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          transition: 'background-color 0.1s ease',
          '&:hover': { backgroundColor: '#f8fafc' },
          '&.Mui-selected, &.Mui-selected:hover': { backgroundColor: '#eff6ff' },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          fontSize: '13px',
          fontFamily: 'Inter, sans-serif',
        },
        notchedOutline: {
          borderColor: 'rgba(15, 23, 42, 0.15)',
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          fontFamily: 'Inter, sans-serif',
          fontSize: '13px',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          fontFamily: '"JetBrains Mono", monospace',
          fontWeight: 700,
          fontSize: '10px',
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          height: 22,
        },
      },
    },
    MuiBadge: {
      styleOverrides: {
        badge: {
          borderRadius: 0,
          fontFamily: '"JetBrains Mono", monospace',
          fontWeight: 700,
          fontSize: '10px',
          minWidth: 16,
          height: 16,
          padding: '0 4px',
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          backgroundColor: '#f1f5f9',
        },
        bar: {
          borderRadius: 0,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: 'rgba(15, 23, 42, 0.08)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          boxShadow: 'none',
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          borderRadius: 0,
        },
        indicator: {
          height: 2,
          borderRadius: 0,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          fontFamily: '"JetBrains Mono", monospace',
          fontWeight: 700,
          fontSize: '11px',
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
          minHeight: 44,
        },
      },
    },
    MuiTablePagination: {
      styleOverrides: {
        root: {
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: '11px',
        },
        selectIcon: {
          color: '#475569',
        },
      },
    },
  },
});

export default theme;
