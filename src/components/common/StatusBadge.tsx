import React from 'react';
import { Box, Typography } from '@mui/material';

export type StatusType = 'success' | 'warning' | 'error' | 'info' | 'default';

export interface StatusBadgeProps {
  label: string;
  type?: StatusType;
}

const statusColorMap: Record<StatusType, { bg: string; text: string; border: string }> = {
  success: {
    bg: 'transparent',
    text: '#10b981',
    border: '#10b981',
  },
  warning: {
    bg: '#fffbeb',
    text: '#f59e0b',
    border: '#f59e0b',
  },
  error: {
    bg: 'transparent',
    text: '#ef4444',
    border: '#ef4444',
  },
  info: {
    bg: 'transparent',
    text: '#0062ff',
    border: '#0062ff',
  },
  default: {
    bg: 'transparent',
    text: '#475569',
    border: '#cbd5e1',
  },
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ label, type = 'default' }) => {
  const colors = statusColorMap[type] || statusColorMap.default;

  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        px: 1,
        py: 0.25,
        borderRadius: 0,
        backgroundColor: colors.bg,
        border: '1px solid',
        borderColor: colors.border,
      }}
    >
      <Typography
        sx={{
          fontFamily: '"JetBrains Mono", monospace',
          fontWeight: 700,
          color: colors.text,
          fontSize: '10px',
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          lineHeight: 1.4,
        }}
      >
        {label}
      </Typography>
    </Box>
  );
};

export default StatusBadge;
