import React from 'react';
import type { ReactNode } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  Box,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import type { DialogProps } from '@mui/material';
import CustomButton from './CustomButton';

export interface CustomDialogProps extends Omit<DialogProps, 'title'> {
  open: boolean;
  onClose: () => void;
  title?: ReactNode;
  children: ReactNode;
  actions?: ReactNode;
  showCloseIcon?: boolean;
  onConfirm?: () => void;
  confirmText?: string;
  confirmLoading?: boolean;
}

const CustomDialog: React.FC<CustomDialogProps> = ({
  open,
  onClose,
  title,
  children,
  actions,
  showCloseIcon = true,
  onConfirm,
  confirmText = 'Confirm',
  confirmLoading = false,
  maxWidth = 'sm',
  fullWidth = true,
  ...dialogProps
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
      sx={{
        '& .MuiDialog-paper': {
          borderRadius: 3,
          p: 1,
        },
      }}
      {...dialogProps}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pr: 1 }}>
        <DialogTitle sx={{ m: 0, p: 2, fontWeight: 700, flexGrow: 1 }}>
          {typeof title === 'string' ? (
            <Typography variant="h6" component="span" sx={{ fontWeight: 700 }}>
              {title}
            </Typography>
          ) : (
            title
          )}
        </DialogTitle>
        {showCloseIcon && (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              color: 'text.secondary',
            }}
          >
            <Close />
          </IconButton>
        )}
      </Box>

      <DialogContent dividers sx={{ borderTop: '1px solid', borderBottom: '1px solid', borderColor: 'divider', px: 3, py: 2.5 }}>
        {children}
      </DialogContent>

      <DialogActions sx={{ p: 2, gap: 1 }}>
        {actions ? (
          actions
        ) : (
          <>
            <CustomButton onClick={onClose} color="inherit" variant="text">
              Cancel
            </CustomButton>
            {onConfirm && (
              <CustomButton
                onClick={onConfirm}
                variant="contained"
                color="primary"
                loading={confirmLoading}
              >
                {confirmText}
              </CustomButton>
            )}
          </>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default CustomDialog;
