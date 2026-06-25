import React, { useState, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Typography, InputBase } from '@mui/material';
import { Search } from '@mui/icons-material';
import Sidebar from '@/components/common/Sidebar';
import TerminalToast from '@/components/common/TerminalToast';

// ── Rich Tooltip Content Components ──────────────────────────────────────────

const DbTooltipContent: React.FC = () => (
  <Box
    sx={{
      bgcolor: 'background.paper',
      border: '1px solid',
      borderColor: 'divider',
      p: 2,
      boxShadow: '10px 10px 0px rgba(15,23,42,0.06)',
      minWidth: 240,
      borderRadius: 0,
    }}
  >
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
      <Typography
        sx={{
          fontSize: '10px',
          fontFamily: '"JetBrains Mono", monospace',
          fontWeight: 700,
          color: 'text.secondary',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
        }}
      >
        DATABASE_STATS
      </Typography>
      <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#10b981' }} />
    </Box>
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
      {[
        { label: 'Active Nodes', value: '12 / 12' },
        { label: 'Query Latency', value: '4.2ms' },
        { label: 'Uptime', value: '99.98%' },
      ].map((item) => (
        <Box key={item.label} sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography sx={{ fontSize: '11px', color: 'text.secondary' }}>{item.label}</Typography>
          <Typography sx={{ fontSize: '11px', fontWeight: 700 }}>{item.value}</Typography>
        </Box>
      ))}
      <Box sx={{ width: '100%', bgcolor: '#f1f5f9', height: 4, mt: 0.75 }}>
        <Box sx={{ bgcolor: '#10b981', height: '100%', width: '94%' }} />
      </Box>
    </Box>
  </Box>
);

const InfraTooltipContent: React.FC = () => (
  <Box
    sx={{
      bgcolor: 'background.paper',
      border: '1px solid',
      borderColor: 'divider',
      p: 2,
      boxShadow: '10px 10px 0px rgba(15,23,42,0.06)',
      minWidth: 240,
      borderRadius: 0,
    }}
  >
    <Typography
      sx={{
        fontSize: '10px',
        fontFamily: '"JetBrains Mono", monospace',
        fontWeight: 700,
        color: 'text.secondary',
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        mb: 1.5,
      }}
    >
      INFRASTRUCTURE
    </Typography>
    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0.5 }}>
      {['#10b981', '#10b981', '#f59e0b', '#10b981', '#10b981', '#ef4444', '#10b981', '#e2e8f0'].map(
        (color, i) => (
          <Box key={i} sx={{ height: 16, bgcolor: color }} />
        )
      )}
    </Box>
    <Typography
      sx={{
        fontSize: '10px',
        color: 'text.secondary',
        mt: 1,
        fontFamily: '"JetBrains Mono", monospace',
      }}
    >
      1 node failure detected · US-EAST
    </Typography>
  </Box>
);

const MainLayout: React.FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);

  // CMD+K shortcut to focus search
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Configure routes & icons passed via dialkit to Sidebar
  const dialkitConfig = {
    routes: [
      { label: 'Home', path: '/', icon: 'ti ti-layout-dashboard', richTooltip: <DbTooltipContent /> },
      { label: 'Why Vibe / Features', path: '/features', icon: 'ti ti-sparkles' },
      { label: 'Architecture', path: '/architecture', icon: 'ti ti-database', richTooltip: <InfraTooltipContent /> },
      { label: 'Dev Practices', path: '/development', icon: 'ti ti-server' },
      { label: 'Deploy Guide', path: '/deployment', icon: 'ti ti-cloud-upload' },
      { label: 'Getting Started', path: '/getting-started', icon: 'ti ti-player-play' },
      { label: 'Dev Tools & Quality', path: '/developer-tools', icon: 'ti ti-tool' },
      { label: 'About', path: '/about', icon: 'ti ti-info-circle' },
      { label: 'Typography', path: '/typography', icon: 'ti ti-typography' },
    ]
  };

  return (
    <Box
      sx={{
        display: 'flex',
        height: '100vh',
        overflow: 'hidden',
        bgcolor: 'background.default',
      }}
    >
      {/* Reusable Expandable Sidebar with Dialkit Config */}
      <Sidebar dialkit={dialkitConfig} />

      {/* ── Main Content Area ─────────────────────────────────────────────── */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Command Bar */}
        <Box
          component="header"
          sx={{
            height: 56,
            bgcolor: 'background.paper',
            borderBottom: '1px solid',
            borderColor: 'divider',
            display: 'flex',
            alignItems: 'center',
            px: 3,
            gap: 3,
            position: 'sticky',
            top: 0,
            zIndex: 40,
            flexShrink: 0,
          }}
        >
          {/* Search / Command Palette */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              bgcolor: '#f1f5f9',
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: '24px',
              px: 2,
              py: 0.75,
              width: 380,
              flexShrink: 0,
              transition: 'all 0.2s ease-in-out',
              '&:hover': { bgcolor: '#e2e8f0' },
              '&:focus-within': { borderColor: 'primary.main', bgcolor: '#ffffff', boxShadow: '0 0 0 3px rgba(0, 98, 255, 0.15)' },
            }}
          >
            <Search sx={{ color: 'text.secondary', fontSize: 16 }} />
            <InputBase
              inputRef={searchRef}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search resources or execute command..."
              sx={{
                flex: 1,
                fontSize: '12px',
                fontFamily: 'Outfit, sans-serif',
                fontWeight: 500,
                '& input': { p: 0 },
                '& input::placeholder': { color: '#94a3b8', opacity: 1 },
              }}
            />
            <Box sx={{ display: 'flex', gap: 0.5 }}>
              {['⌘', 'K'].map((k) => (
                <Box
                  key={k}
                  sx={{
                    fontSize: '9px',
                    bgcolor: 'white',
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: '4px',
                    px: 0.75,
                    py: 0.25,
                    fontFamily: '"JetBrains Mono", monospace',
                    fontWeight: 700,
                    color: 'text.secondary',
                    lineHeight: 1.4,
                  }}
                >
                  {k}
                </Box>
              ))}
            </Box>
          </Box>

          {/* Spacer to align profile to the right since ticker is removed */}
          <Box sx={{ flexGrow: 1 }} />

          {/* User Profile */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              borderLeft: '1px solid',
              borderColor: 'divider',
              pl: 3,
              flexShrink: 0,
              cursor: 'pointer',
              transition: 'opacity 0.2s',
              '&:hover': { opacity: 0.85 },
            }}
          >
            <Box sx={{ textAlign: 'right' }}>
              <Typography sx={{ fontSize: '12px', fontWeight: 800, fontFamily: 'Outfit, sans-serif', lineHeight: 1.2 }}>
                Admin_User
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.25, justifyContent: 'flex-end' }}>
                <Box sx={{ width: 6, height: 6, bgcolor: '#10b981', borderRadius: '50%' }} />
                <Typography
                  sx={{
                    fontSize: '10px',
                    color: 'text.secondary',
                    fontFamily: 'Outfit, sans-serif',
                    lineHeight: 1.4,
                  }}
                >
                  root@system
                </Typography>
              </Box>
            </Box>
            <Box
              component="img"
              src="https://i.pravatar.cc/40?u=admin-vibeapp"
              alt="User"
              sx={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                border: '2px solid #0062ff',
                display: 'block',
              }}
            />
          </Box>
        </Box>

        {/* Page Content */}
        <Box
          component="main"
          sx={{ flex: 1, overflow: 'auto', p: 3 }}
        >
          <Outlet />
        </Box>
      </Box>

      {/* Terminal Toasts */}
      <TerminalToast />
    </Box>
  );
};

export default MainLayout;
