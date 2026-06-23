import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  IconButton,
  Tooltip,
  Tabs,
  Tab,
} from '@mui/material';
import { GitHub, Home, Info, Speed, AccountTree, Build, CloudUpload, PlayCircle } from '@mui/icons-material';

const MainLayout: React.FC = () => {
  const navigate = navigateFn();
  const location = useLocation();

  function navigateFn() {
    try {
      return useNavigate();
    } catch {
      return (_path: string) => {};
    }
  }

  const navItems = [
    { label: 'Home', path: '/', icon: <Home /> },
    { label: 'About', path: '/about', icon: <Info /> },
    { label: 'Architecture', path: '/architecture', icon: <AccountTree /> },
    { label: 'Dev Practices', path: '/development', icon: <Build /> },
    { label: 'Deploy Guide', path: '/deployment', icon: <CloudUpload /> },
    { label: 'Getting Started', path: '/getting-started', icon: <PlayCircle /> },
  ];

  // Determine current tab index
  const currentPath = location.pathname;
  const currentTab = navItems.some(item => item.path === currentPath) ? currentPath : '/';

  const handleTabChange = (_event: React.SyntheticEvent, newValue: string) => {
    navigate(newValue);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
      {/* Glow Blur Blobs */}
      <Box
        sx={{
          position: 'fixed',
          top: '-15%',
          right: '-10%',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0, 98, 255, 0.05) 0%, rgba(0, 98, 255, 0) 70%)',
          zIndex: -1,
          pointerEvents: 'none',
        }}
      />
      <Box
        sx={{
          position: 'fixed',
          bottom: '-10%',
          left: '-15%',
          width: '700px',
          height: '700px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(51, 129, 255, 0.04) 0%, rgba(51, 129, 255, 0) 70%)',
          zIndex: -1,
          pointerEvents: 'none',
        }}
      />

      {/* Main Top Header */}
      <AppBar
        position="static"
        color="transparent"
        elevation={0}
        sx={{
          borderBottom: '1px solid',
          borderColor: 'divider',
          backgroundColor: '#ffffff',
        }}
      >
        <Container maxWidth={false} sx={{ px: { xs: 2, sm: 4, md: 6 } }}>
          <Toolbar disableGutters sx={{ justifyContent: 'space-between', minHeight: '64px' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer' }} onClick={() => navigate('/')}>
              <Speed sx={{ color: 'primary.main', fontSize: 32 }} />
              <Typography
                variant="h6"
                noWrap
                sx={{
                  fontWeight: 800,
                  background: 'linear-gradient(135deg, #0062ff 0%, #3381ff 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  letterSpacing: '-0.02em',
                }}
              >
                VibeApp
              </Typography>
            </Box>

            <Tooltip title="GitHub Repository">
              <IconButton
                color="inherit"
                href="https://github.com/ankitm10039/React-ts-boilerplate"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: 'text.secondary',
                  '&:hover': { color: 'primary.main', backgroundColor: 'rgba(0, 98, 255, 0.04)' },
                }}
              >
                <GitHub />
              </IconButton>
            </Tooltip>
          </Toolbar>
        </Container>
      </AppBar>

      {/* SubHeader Tab Navigation */}
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          borderBottom: '1px solid',
          borderColor: 'divider',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(16px)',
        }}
      >
        <Container maxWidth={false} sx={{ px: { xs: 2, sm: 4, md: 6 } }}>
          <Tabs
            value={currentTab}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            indicatorColor="primary"
            textColor="primary"
            sx={{
              minHeight: '48px',
              '& .MuiTabs-indicator': {
                height: '3px',
                borderRadius: '3px 3px 0 0',
              },
              '& .MuiTab-root': {
                minHeight: '48px',
                fontWeight: 600,
                fontSize: '0.9rem',
                textTransform: 'none',
                color: 'text.secondary',
                px: 3,
                '&:hover': {
                  color: 'primary.main',
                  backgroundColor: 'rgba(0, 98, 255, 0.02)',
                },
                '&.Mui-selected': {
                  color: 'primary.main',
                },
              },
            }}
          >
            {navItems.map((item) => (
              <Tab
                key={item.path}
                value={item.path}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {React.cloneElement(item.icon, { fontSize: 'small' })}
                    <span>{item.label}</span>
                  </Box>
                }
              />
            ))}
          </Tabs>
        </Container>
      </Box>

      {/* Main Content Area */}
      <Box component="main" sx={{ flexGrow: 1, py: 6 }}>
        <Container maxWidth={false} sx={{ px: { xs: 2, sm: 4, md: 6 } }}>
          <Outlet />
        </Container>
      </Box>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          py: 4,
          px: 2,
          mt: 'auto',
          borderTop: '1px solid',
          borderColor: 'divider',
          backgroundColor: 'background.paper',
        }}
      >
        <Container maxWidth={false} sx={{ px: { xs: 2, sm: 4, md: 6 } }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
            <Typography variant="body2" color="text.secondary">
              © {new Date().getFullYear()} React + TS Boilerplate. Built with Vite and MUI.
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Created by <a href="https://github.com/ankitm10039" target="_blank" rel="noreferrer" style={{ color: '#0062ff', textDecoration: 'none', fontWeight: 600 }}>ankitm10039</a>
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default MainLayout;
