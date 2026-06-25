import React from 'react';
import { Box, Typography } from '@mui/material';
import { useAppStore } from '@/store/useAppStore';
import type { ToastType } from '@/store/useAppStore';

const BORDER_COLORS: Record<ToastType, string> = {
  success: '#0062ff',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#10b981',
};

const LABEL_COLORS: Record<ToastType, string> = {
  success: '#0062ff',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#10b981',
};

const TerminalToast: React.FC = () => {
  const { toasts, removeToast } = useAppStore();

  if (toasts.length === 0) return null;

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 24,
        left: 80, // 64px sidebar + 16px gap
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        zIndex: 9999,
        pointerEvents: 'none',
      }}
    >
      {toasts.map((toast, index) => (
        <Box
          key={toast.id}
          className="animate-slide-in-kombai"
          onClick={() => removeToast(toast.id)}
          sx={{
            bgcolor: '#000000',
            color: 'white',
            p: 2,
            borderLeft: '4px solid',
            borderColor: BORDER_COLORS[toast.type],
            width: 288,
            boxShadow: '12px 12px 0px rgba(0,0,0,0.08)',
            opacity: 1 - index * 0.12,
            transform: `scale(${1 - index * 0.02})`,
            transformOrigin: 'left bottom',
            cursor: 'pointer',
            transition: 'opacity 0.2s, transform 0.2s',
            pointerEvents: 'auto',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              mb: 0.75,
            }}
          >
            <Typography
              sx={{
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: '11px',
                fontWeight: 700,
                color: LABEL_COLORS[toast.type],
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                lineHeight: 1,
              }}
            >
              {toast.label}
            </Typography>
            <Typography
              sx={{
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: '10px',
                opacity: 0.35,
                lineHeight: 1,
              }}
            >
              {toast.timestamp}
            </Typography>
          </Box>
          <Typography
            sx={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: '11px',
              opacity: 0.85,
              lineHeight: 1.55,
            }}
          >
            {toast.message}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default TerminalToast;
