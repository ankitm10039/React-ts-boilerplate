import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import { Warning } from '@mui/icons-material';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in application boundary:', error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '80vh',
            p: 3,
          }}
        >
          <Paper
            sx={{
              p: 5,
              maxWidth: '500px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 3,
            }}
          >
            <Warning sx={{ fontSize: 64, color: 'error.main' }} />
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              Something went wrong.
            </Typography>
            <Typography color="text.secondary" variant="body2" sx={{ lineHeight: 1.6 }}>
              An unexpected error occurred in the application. Please reload or try again later.
            </Typography>
            {this.state.error && (
              <Typography
                variant="caption"
                sx={{
                  fontFamily: 'monospace',
                  bgcolor: 'rgba(255,0,0,0.05)',
                  color: 'error.light',
                  p: 2,
                  borderRadius: 1,
                  width: '100%',
                  textAlign: 'left',
                  overflowX: 'auto',
                }}
              >
                {this.state.error.toString()}
              </Typography>
            )}
            <Button variant="contained" color="primary" onClick={this.handleReload}>
              Reload Application
            </Button>
          </Paper>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
