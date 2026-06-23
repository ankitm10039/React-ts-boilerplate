import React from 'react';
import type { ReactNode } from 'react';
import { Paper, Typography, Box } from '@mui/material';
import type { PaperProps } from '@mui/material';

interface CardContainerProps extends PaperProps {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  headerAction?: ReactNode;
}

const CardContainer: React.FC<CardContainerProps> = ({
  title,
  subtitle,
  children,
  headerAction,
  ...paperProps
}) => {
  return (
    <Paper
      {...paperProps}
      sx={{
        p: 3,
        display: 'flex',
        flexDirection: 'column',
        gap: 2.5,
        position: 'relative',
        overflow: 'hidden',
        ...paperProps.sx,
      }}
    >
      {(title || subtitle || headerAction) && (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 1.5 }}>
          <Box>
            {title && (
              <Typography variant="h5" sx={{ fontWeight: 700, letterSpacing: '-0.01em' }}>
                {title}
              </Typography>
            )}
            {subtitle && (
              <Typography variant="body2" color="text.secondary">
                {subtitle}
              </Typography>
            )}
          </Box>
          {headerAction && <Box>{headerAction}</Box>}
        </Box>
      )}
      <Box sx={{ flexGrow: 1 }}>{children}</Box>
    </Paper>
  );
};

export default CardContainer;
