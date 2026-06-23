import React from 'react';
import { Box, Typography, Paper, Divider, Stack, Card, CardContent } from '@mui/material';
import {
  ArrowBack,
  Folder,
  InsertDriveFile,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../components/common/CustomButton';

interface DirectoryNode {
  name: string;
  description: string;
  files?: string[];
  subfolders?: DirectoryNode[];
}

const Architecture: React.FC = () => {
  const navigate = useNavigate();

  const folderStructure: DirectoryNode[] = [
    {
      name: 'src/api',
      description: 'Contains global HTTP clients. This is where centralized interceptors and base configurations are set.',
      files: ['axiosInstance.ts'],
    },
    {
      name: 'src/components',
      description: 'Contains shared, reusable UI elements. Divided into common utility components.',
      subfolders: [
        {
          name: 'common',
          description: 'Global components (e.g. CustomButton, DataTable, ErrorBoundary, FormInput, StatusBadge).',
          files: ['index.ts', 'CustomButton.tsx', 'DataTable.tsx', 'FormInput.tsx'],
        },
      ],
    },
    {
      name: 'src/config',
      description: 'Handles environment configurations and dynamic feature flags parsed from .env profiles.',
      files: ['index.ts'],
    },
    {
      name: 'src/constants',
      description: 'Stores immutable system-wide constants (e.g. HTTP status codes, user roles, default date formats).',
      files: ['index.ts'],
    },
    {
      name: 'src/context',
      description: 'Stores React contexts providing global states like Authentication, UI themes, or permissions.',
      files: ['AuthContext.tsx'],
    },
    {
      name: 'src/hooks',
      description: 'Contains custom React hooks for stateful logic (e.g. storage caching, debouncing, auth triggers).',
      files: ['useAuth.ts', 'useDebounce.ts', 'useLocalStorage.ts'],
    },
    {
      name: 'src/layouts',
      description: 'Defines layout frame shells (e.g., sidebars, app bars, footer blocks) containing page outlets.',
      files: ['MainLayout.tsx'],
    },
    {
      name: 'src/pages',
      description: 'Defines view pages associated with application routes (e.g. Home, About, NotFound).',
      files: ['Home.tsx', 'About.tsx', 'NotFound.tsx'],
    },
    {
      name: 'src/routes',
      description: 'Centralizes the application router mappings and guards.',
      files: ['index.tsx'],
    },
    {
      name: 'src/services',
      description: 'Handles server API endpoints communication layer mapping to axios instances.',
      files: ['authService.ts', 'userService.ts'],
    },
    {
      name: 'src/store',
      description: 'Client state management store engines powered by Zustand.',
      files: ['useAppStore.ts'],
    },
    {
      name: 'src/utils',
      description: 'Contains stateless helper utilities (e.g. date formatters, safe local storage wrappers).',
      files: ['format.ts', 'storage.ts'],
    },
  ];

  return (
    <Box sx={{ width: '100%' }}>
      <CustomButton
        variant="text"
        startIcon={<ArrowBack />}
        onClick={() => navigate('/')}
        sx={{ mb: 4, color: 'text.secondary' }}
      >
        Back to Home
      </CustomButton>

      <Paper sx={{ p: { xs: 3, md: 5 }, borderRadius: 4, mb: 6 }}>
        <Typography variant="h3" gutterBottom sx={{ fontWeight: 800, letterSpacing: '-0.02em' }}>
          Folder Directory & Architecture Blueprint
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 4, fontSize: '1.1rem', lineHeight: 1.6 }}>
          Learn where each module lives in the codebase. Your team should follow this directory schema to ensure high scaling capabilities and easy refactors.
        </Typography>

        <Divider sx={{ my: 4 }} />

        <Stack spacing={4}>
          {folderStructure.map((folder, index) => (
            <Card key={index} variant="outlined" sx={{ borderRadius: 3, border: '1px solid rgba(0,0,0,0.06)' }}>
              <CardContent sx={{ p: 3 }}>
                {/* Folder Header */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                  <Folder sx={{ color: '#0062ff', fontSize: 28 }} />
                  <Typography variant="h6" sx={{ fontWeight: 700, fontFamily: 'monospace' }}>
                    {folder.name}/
                  </Typography>
                </Box>

                {/* Description */}
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2, pl: 5.5, lineHeight: 1.6 }}>
                  {folder.description}
                </Typography>

                {/* Files & Subfolders */}
                <Box sx={{ pl: 5.5 }}>
                  {folder.files && folder.files.length > 0 && (
                    <Box sx={{ mb: folder.subfolders ? 2 : 0 }}>
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1, fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                        Typical Files
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                        {folder.files.map((file, idx) => (
                          <Box
                            key={idx}
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 0.5,
                              px: 1.5,
                              py: 0.5,
                              bgcolor: 'rgba(0, 0, 0, 0.03)',
                              borderRadius: 1.5,
                              border: '1px solid rgba(0, 0, 0, 0.05)',
                            }}
                          >
                            <InsertDriveFile sx={{ fontSize: 14, color: 'text.secondary' }} />
                            <Typography variant="caption" sx={{ fontFamily: 'monospace', fontWeight: 600 }}>
                              {file}
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                    </Box>
                  )}

                  {folder.subfolders && folder.subfolders.map((sub, idx) => (
                    <Box key={idx} sx={{ borderLeft: '2px dashed rgba(0,0,0,0.1)', pl: 2, py: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <Folder sx={{ color: '#3381ff', fontSize: 20 }} />
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, fontFamily: 'monospace' }}>
                          {sub.name}/
                        </Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5, pl: 3.5 }}>
                        {sub.description}
                      </Typography>
                      {sub.files && (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, pl: 3.5 }}>
                          {sub.files.map((file, fileIdx) => (
                            <Box
                              key={fileIdx}
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 0.5,
                                px: 1,
                                py: 0.25,
                                bgcolor: 'rgba(0, 0, 0, 0.03)',
                                borderRadius: 1,
                              }}
                            >
                              <InsertDriveFile sx={{ fontSize: 12, color: 'text.secondary' }} />
                              <Typography variant="caption" sx={{ fontFamily: 'monospace' }}>
                                {file}
                              </Typography>
                            </Box>
                          ))}
                        </Box>
                      )}
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          ))}
        </Stack>
      </Paper>
    </Box>
  );
};

export default Architecture;
