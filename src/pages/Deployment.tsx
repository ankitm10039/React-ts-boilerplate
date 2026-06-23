import React from 'react';
import { Box, Typography, Paper, Divider, Card, CardContent, Stack } from '@mui/material';
import {
  ArrowBack,
  Security,
  CloudUpload,
  CheckCircle,
  Timeline,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../components/common/CustomButton';

const Deployment: React.FC = () => {
  const navigate = useNavigate();

  const guidelines = [
    {
      title: 'Environment Variables Protection',
      description: 'Never hardcode credentials. Store API endpoints, authorization tokens, and credentials in secure .env files and load them using CONFIG helper wrappers.',
      icon: <Security sx={{ color: '#0062ff', fontSize: 32 }} />,
    },
    {
      title: 'Production Build Compilation',
      description: 'Run npm run build to compile production chunks. Vite compresses build files to minimize initial bundle loads.',
      icon: <CloudUpload sx={{ color: '#ffb300', fontSize: 32 }} />,
    },
    {
      title: 'Continuous Integration (CI/CD)',
      description: 'Set up automated pipelines (like GitHub Actions) to run test validations, Prettier styling verification, and building on branch commits.',
      icon: <CheckCircle sx={{ color: '#10b981', fontSize: 32 }} />,
    },
    {
      title: 'Error Monitoring & Performance Checks',
      description: 'Integrate performance monitor analytics (e.g. Lighthouse audits, Sentry tracking) to capture client-side run-time exceptions.',
      icon: <Timeline sx={{ color: '#3b82f6', fontSize: 32 }} />,
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
          Deployment Best Practices
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 4, fontSize: '1.1rem', lineHeight: 1.6 }}>
          Standard guidelines for deploying the application to staging and production environments safely and securely.
        </Typography>

        <Divider sx={{ my: 4 }} />

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: 3,
          }}
        >
          {guidelines.map((item, idx) => (
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

export default Deployment;
