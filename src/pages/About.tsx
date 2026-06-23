import React from 'react';
import { Box, Typography, Paper, Divider, Button } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const About: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ maxWidth: '800px', mx: 'auto' }}>
      <Button
        startIcon={<ArrowBack />}
        onClick={() => navigate('/')}
        sx={{ mb: 4, color: 'text.secondary' }}
      >
        Back to Home
      </Button>

      <Paper sx={{ p: 5 }}>
        <Typography variant="h3" gutterBottom sx={{ fontWeight: 700 }}>
          About this Boilerplate
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 3, fontSize: '1.1rem' }}>
          This boilerplate is crafted to be a robust foundation for building high-quality,
          performant React applications with TypeScript. It provides a standardized framework,
          preventing architectural mistakes early on and optimizing package bundles for production.
        </Typography>
        
        <Divider sx={{ my: 4 }} />

        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
          Why use Vite + MUI + React Router?
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 3 }}>
          Vite replaces standard build pipelines like Webpack by serving source code over native ES Modules
          during development, making Hot Module Replacement (HMR) virtually instant. Material UI (MUI)
          accelerates design implementation through modern component library configurations. React Router DOM
          offers dynamic, client-side routing structures that scale perfectly for multi-page web applications.
        </Typography>
      </Paper>
    </Box>
  );
};

export default About;
