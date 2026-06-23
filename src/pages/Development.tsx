import React from 'react';
import { Box, Typography, Paper, Divider, Card, CardContent, Stack } from '@mui/material';
import {
  ArrowBack,
  BugReport,
  Edit,
  VerifiedUser,
  Brush,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../components/common/CustomButton';

const Development: React.FC = () => {
  const navigate = useNavigate();

  const practices = [
    {
      title: 'Linting & Formatting',
      description: 'Enforce Prettier and ESLint. Use npm run lint and Prettier automatic configuration before committing files to align styles.',
      icon: <Brush sx={{ color: '#0062ff', fontSize: 32 }} />,
    },
    {
      title: 'Branch Naming Convention',
      description: 'Use standard branch prefixes: feature/ (new features), bugfix/ (resolved bugs), hotfix/ (immediate production fixes), or chore/ (tool configurations).',
      icon: <BugReport sx={{ color: '#ffb300', fontSize: 32 }} />,
    },
    {
      title: 'Type Safety & Strict Null Checks',
      description: 'Avoid using the any type in TypeScript. Declare explicit models, interfaces, and function response definitions.',
      icon: <VerifiedUser sx={{ color: '#10b981', fontSize: 32 }} />,
    },
    {
      title: 'Component Modularization',
      description: 'Break UI down into atomic, reusable components. Keep states local; lift up state only when shared across contexts.',
      icon: <Edit sx={{ color: '#3b82f6', fontSize: 32 }} />,
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
          Development Best Practices
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 4, fontSize: '1.1rem', lineHeight: 1.6 }}>
          Standard guidelines for the development team to ensure code consistency, fast load times, and high scaling capabilities.
        </Typography>

        <Divider sx={{ my: 4 }} />

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: 3,
          }}
        >
          {practices.map((item, idx) => (
            <Card key={idx} variant="outlined" sx={{ height: '100%', borderRadius: 3, border: '1px solid rgba(0,0,0,0.06)' }}>
              <CardContent sx={{ display: 'flex', gap: 2, alignItems: 'flex-start', p: 3 }}>
                <Box sx={{ p: 1, borderRadius: 2, bgcolor: 'rgba(0, 98, 255, 0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {item.icon}
                </Box>
                <Stack spacing={0.5}>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.5 }}>
                    {item.description}
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Paper>
    </Box>
  );
};

export default Development;
