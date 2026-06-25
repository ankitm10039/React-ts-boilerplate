import React from 'react';
import { TextField } from '@mui/material';
import type { TextFieldProps } from '@mui/material';

export type CustomTextFieldProps = TextFieldProps & {
  errorMessage?: string;
};

const CustomTextField: React.FC<CustomTextFieldProps> = ({
  errorMessage,
  error,
  helperText,
  variant = 'outlined',
  fullWidth = true,
  size = 'small',
  ...props
}) => {
  return (
    <TextField
      {...props}
      variant={variant}
      fullWidth={fullWidth}
      size={size}
      error={error || !!errorMessage}
      helperText={errorMessage || helperText}
      sx={{
        '& .MuiOutlinedInput-root': {
          borderRadius: 0,
        },
        ...props.sx,
      }}
    />
  );
};

export default CustomTextField;
