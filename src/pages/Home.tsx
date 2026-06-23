import React from 'react';
import { Box, Typography, Button, Paper, Stack } from '@mui/material';
import { Speed, Code, Router, SettingsInputComponent, Http } from '@mui/icons-material';

const Home: React.FC = () => {
  const features = [
    {
      title: 'Vite Bundler',
      description: 'Blazing fast Hot Module Replacement (HMR) and instant server starts with Vite.',
      icon: <Speed sx={{ fontSize: 40, color: '#ec4899' }} />,
    },
    {
      title: 'Material UI (MUI)',
      description: 'Pre-configured with a rich dark/light design system, Outfit typography, and custom animations.',
      icon: <Code sx={{ fontSize: 40, color: '#6366f1' }} />,
    },
    {
      title: 'Axios Client',
      description: 'Pre-configured Axios instance ready for authorization interceptors and global error handling.',
      icon: <Http sx={{ fontSize: 40, color: '#10b981' }} />,
    },
    {
      title: 'React Router',
      description: 'Declarative routing with React Router DOM v6, nested layout support, and route guards.',
      icon: <Router sx={{ fontSize: 40, color: '#f59e0b' }} />,
    },
    {
      title: 'Scalable Architecture',
      description: 'Organized folders for API, custom components, page views, layouts, and route definitions.',
      icon: <SettingsInputComponent sx={{ fontSize: 40, color: '#3b82f6' }} />,
    },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box sx={{ textAlign: 'center', py: 8, px: 2, mb: 8 }}>
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: '2.5rem', md: '4.5rem' },
            mb: 3,
            background: 'linear-gradient(135deg, #a5b4fc 0%, #6366f1 50%, #ec4899 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          React + TypeScript Boilerplate
        </Typography>
        <Typography
          variant="h5"
          color="text.secondary"
          sx={{ maxWidth: '700px', mx: 'auto', mb: 5, lineHeight: 1.6 }}
        >
          A highly optimized, production-ready React starter template built on Vite.
          Saves developer hours by bundling modern configurations out of the box.
        </Typography>
        <Stack direction="row" spacing={2} sx={{ justifyContent: 'center' }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            href="https://github.com/ankitm10039/React-ts-boilerplate"
            target="_blank"
          >
            Get Started
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            size="large"
            href="https://vite.dev"
            target="_blank"
          >
            Documentation
          </Button>
        </Stack>
      </Box>

      {/* Features Grid */}
      <Box sx={{ mb: 8 }}>
        <Typography variant="h3" align="center" gutterBottom sx={{ mb: 6, fontWeight: 700 }}>
          Core Features
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
            gap: 4,
            justifyContent: 'center',
          }}
        >
          {features.map((feature, idx) => (
            <Paper
              key={idx}
              sx={{
                p: 4,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 12px 24px rgba(0, 0, 0, 0.2)',
                },
              }}
            >
              <Box>{feature.icon}</Box>
              <Typography variant="h5" sx={{ fontWeight: 650 }}>
                {feature.title}
              </Typography>
              <Typography color="text.secondary" variant="body2" sx={{ lineHeight: 1.6 }}>
                {feature.description}
              </Typography>
            </Paper>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
