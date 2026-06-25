import type { ButtonProps } from '@mui/material';
import { Button, CircularProgress } from '@mui/material';
import type { ReactNode } from 'react';
import React from 'react';

export interface CustomButtonProps extends ButtonProps {
  loading?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  children: ReactNode;
  href?: string;
  target?: string;
  rel?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  loading = false,
  disabled = false,
  startIcon,
  endIcon,
  children,
  ...buttonProps
}) => {
  return (
    <Button
      {...buttonProps}
      disabled={disabled || loading}
      startIcon={loading ? <CircularProgress size={16} color="inherit" /> : startIcon}
      endIcon={!loading ? endIcon : undefined}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
