import React from 'react';
import { Box, Typography } from '@mui/material';

export type StatusType = 'success' | 'warning' | 'error' | 'info' | 'default';

export interface StatusBadgeProps {
  label: string;
  type?: StatusType;
}

const statusColorMap: Record<StatusType, { bg: string; text: string }> = {
  success: {
    bg: '#e1f5fe', // light blue background
    text: '#0288d1', // blue text
  },
  warning: {
    bg: '#fff3e0',
    text: '#f57c00',
  },
  error: {
    bg: '#ffebee',
    text: '#d32f2f',
  },
  info: {
    bg: '#e0f2fe',
    text: '#0369a1',
  },
  default: {
    bg: '#f1f5f9',
    text: '#475569',
  },
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ label, type = 'default' }) => {
  const colors = statusColorMap[type] || statusColorMap.default;

  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        px: 1.5,
        py: 0.5,
        borderRadius: 50,
        backgroundColor: colors.bg,
      }}
    >
      <Typography
        variant="caption"
        sx={{
          fontWeight: 700,
          color: colors.text,
          fontSize: '0.75rem',
          textTransform: 'uppercase',
          letterSpacing: '0.03em',
        }}
      >
        {label}
      </Typography>
    </Box>
  );
};

export default StatusBadge;
