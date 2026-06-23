import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

interface LoadingSpinnerProps {
  message?: string;
  minHeight?: string | number;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ message = 'Loading...', minHeight = '50vh' }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight,
        gap: 2,
      }}
    >
      <CircularProgress color="primary" size={48} thickness={4} />
      <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
        {message}
      </Typography>
    </Box>
  );
};

export default LoadingSpinner;
