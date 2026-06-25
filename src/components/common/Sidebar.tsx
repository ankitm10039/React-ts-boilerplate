import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Typography,
  IconButton,
  Tooltip,
} from '@mui/material';

export interface DialkitRoute {
  label: string;
  path: string;
  icon: React.ReactElement | string;
  richTooltip?: React.ReactNode;
}

export interface DialkitConfig {
  routes: DialkitRoute[];
}

export interface SidebarProps {
  dialkit: DialkitConfig;
}

export const Sidebar: React.FC<SidebarProps> = ({ dialkit }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(false);

  // Tooltip content states when collapsed
  const [activeHoverIndex, setActiveHoverIndex] = useState<number | null>(null);

  const currentPath = location.pathname;
  const isActive = (path: string) =>
    path === '/' ? currentPath === '/' : currentPath.startsWith(path);

  return (
    <Box
      component="aside"
      sx={{
        width: isExpanded ? 240 : 64,
        height: '100vh',
        bgcolor: '#ffffff',
        borderRight: '1px solid #e2e8f0',
        display: 'flex',
        flexDirection: 'column',
        py: 3,
        gap: 3,
        zIndex: 50,
        flexShrink: 0,
        transition: 'width 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        overflowX: 'hidden',
      }}
    >
      {/* EXPAND/COLLAPSE TOGGLE HEAD */}
      <Box sx={{ display: 'flex', alignItems: 'center', px: isExpanded ? 2.5 : 1.5, gap: 2, mb: 1, width: '100%' }}>
        <IconButton
          onClick={() => setIsExpanded(!isExpanded)}
          sx={{
            width: 40,
            height: 40,
            backgroundColor: '#0062ff',
            borderRadius: 0,
            color: '#ffffff',
            '&:hover': { backgroundColor: '#004dc9' },
          }}
        >
          <i className={isExpanded ? "ti ti-chevron-left" : "ti ti-menu-2"} style={{ fontSize: '20px' }} />
        </IconButton>
        {isExpanded && (
          <Typography
            sx={{
              fontFamily: 'Outfit, sans-serif',
              fontWeight: 800,
              fontSize: '15px',
              color: '#0062ff',
              whiteSpace: 'nowrap',
            }}
          >
            VIBE CORE
          </Typography>
        )}
      </Box>

      {/* NAVIGATION LINKS */}
      <Box
        component="nav"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1.5,
          width: '100%',
          flex: 1,
        }}
      >
        {dialkit.routes.map((item, index) => {
          const active = isActive(item.path);
          const hasRichTooltip = !!item.richTooltip;

          const linkContent = (
            <Box
              onMouseEnter={() => {
                if (!isExpanded && hasRichTooltip) {
                  setActiveHoverIndex(index);
                }
              }}
              onMouseLeave={() => {
                setActiveHoverIndex(null);
              }}
              onClick={() => navigate(item.path)}
              sx={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                px: isExpanded ? 2.5 : 2.5,
                py: 1.5,
                cursor: 'pointer',
                backgroundColor: active ? 'rgba(0, 98, 255, 0.05)' : 'transparent',
                color: active ? '#0062ff' : '#94a3b8',
                transition: 'all 0.2s',
                '&:hover': {
                  color: '#0062ff',
                  backgroundColor: 'rgba(0, 98, 255, 0.02)',
                },
              }}
            >
              {/* Active Indicator Bar */}
              <Box
                sx={{
                  position: 'absolute',
                  left: 0,
                  width: 4,
                  height: '70%',
                  backgroundColor: '#0062ff',
                  opacity: active ? 1 : 0,
                  transition: 'opacity 0.2s',
                }}
              />

              {typeof item.icon === 'string' ? (
                <i className={item.icon} style={{ fontSize: '20px', minWidth: '24px' }} />
              ) : (
                React.cloneElement(item.icon, { style: { fontSize: '20px', minWidth: '24px' } } as object)
              )}

              {isExpanded && (
                <Typography
                  sx={{
                    fontFamily: 'Outfit, sans-serif',
                    fontSize: '13px',
                    fontWeight: active ? 700 : 500,
                    ml: 2,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {item.label}
                </Typography>
              )}

              {/* Collapsed state rich tooltips */}
              {!isExpanded && hasRichTooltip && activeHoverIndex === index && (
                <Box
                  sx={{
                    position: 'absolute',
                    left: 60,
                    top: 0,
                    zIndex: 100,
                  }}
                >
                  {item.richTooltip}
                </Box>
              )}
            </Box>
          );

          if (!isExpanded && !hasRichTooltip) {
            return (
              <Tooltip key={item.path} title={item.label} placement="right">
                {linkContent}
              </Tooltip>
            );
          }

          return <React.Fragment key={item.path}>{linkContent}</React.Fragment>;
        })}
      </Box>

      {/* SETTINGS / EXTRA AT THE BOTTOM */}
      <Box
        onClick={() => navigate('/development')}
        sx={{
          mt: 'auto',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          px: isExpanded ? 2.5 : 2.5,
          py: 1.5,
          cursor: 'pointer',
          color: '#94a3b8',
          '&:hover': { color: '#0062ff', backgroundColor: 'rgba(0, 98, 255, 0.02)' },
        }}
      >
        <i className="ti ti-settings" style={{ fontSize: '20px', minWidth: '24px' }} />
        {isExpanded ? (
          <Typography sx={{ fontFamily: 'Outfit, sans-serif', fontSize: '13px', fontWeight: 500, ml: 2, whiteSpace: 'nowrap' }}>
            Settings
          </Typography>
        ) : (
          <Box
            sx={{
              position: 'absolute',
              top: 8,
              right: 20,
              width: 10,
              height: 10,
              backgroundColor: '#f59e0b',
              border: '2px solid #ffffff',
            }}
          />
        )}
      </Box>
    </Box>
  );
};

export default Sidebar;
