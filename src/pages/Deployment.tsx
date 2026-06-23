import React, { useState } from 'react';
import { Box, Typography, Paper, Divider, Stack, Card, CardContent } from '@mui/material';
import {
  ArrowBack,
  Security,
  CloudUpload,
  CheckCircle,
  Timeline,
  Visibility,
  Info,
  OpenInNew,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { CustomButton, CustomDialog } from '@/components/common';

interface DeploymentGuideline {
  title: string;
  description: string;
  icon: React.ReactNode;
  details: string;
  securityGuidelines: string[];
  docUrl: string;
}

const Deployment: React.FC = () => {
  const navigate = useNavigate();
  const [selectedGuideline, setSelectedGuideline] = useState<DeploymentGuideline | null>(null);

  const guidelines: DeploymentGuideline[] = [
    {
      title: 'Environment Variables Protection',
      description: 'Never hardcode credentials. Store API endpoints, authorization tokens, and credentials in secure .env files and load them using CONFIG helper wrappers.',
      icon: <Security sx={{ color: '#0062ff', fontSize: 32 }} />,
      details: 'Environment variables allow the same code build to run in development, staging, or production without modification. In Vite, environment variables prefixed with `VITE_` are exposed to the client application dynamically.',
      securityGuidelines: [
        'Add `.env`, `.env.local`, `.env.development.local` to `.gitignore` to prevent committing secrets to repository history.',
        'Never store high-risk credentials (like database passwords, secret keys) in frontend env configurations.',
        'Use fallback default values inside CONFIG configuration managers to handle missing environment contexts gracefully.',
      ],
      docUrl: 'https://vite.dev/guide/env-and-mode',
    },
    {
      title: 'Production Build Compilation',
      description: 'Run npm run build to compile production chunks. Vite compresses build files to minimize initial bundle loads.',
      icon: <CloudUpload sx={{ color: '#ffb300', fontSize: 32 }} />,
      details: 'Production builds run bundling algorithms to minify JavaScript, extract and compress CSS, and split code chunks. This minimizes initial payload sizes and improves First Contentful Paint (FCP) rendering speeds.',
      securityGuidelines: [
        'Validate build compilation locally by running `npm run build` and checking console logs before staging code changes.',
        'Ensure React compilation compiler rules do not output developer logs (like `console.log`) or source maps in production build directories.',
        'Double-check asset cache headers on hosting CDN targets to guarantee updates serve fresh code versions.',
      ],
      docUrl: 'https://vite.dev/guide/build',
    },
    {
      title: 'Continuous Integration (CI/CD)',
      description: 'Set up automated pipelines (like GitHub Actions) to run test validations, Prettier styling verification, and building on branch commits.',
      icon: <CheckCircle sx={{ color: '#10b981', fontSize: 32 }} />,
      details: 'Automated pipelines act as quality gatekeepers. Every time code is committed to branches, the CI runner compiles the application, runs linters, and executes tests to prevent deployment regressions.',
      securityGuidelines: [
        'Protect secrets in pipeline scripts by storing them inside GitHub repository secrets configuration settings.',
        'Enforce branch protection rules on main/master branches requiring successful CI statuses before enabling pull-request merges.',
        'Pin GitHub Actions to specific release versions (e.g. actions/checkout@v4) to prevent supply chain injections.',
      ],
      docUrl: 'https://github.com/features/actions',
    },
    {
      title: 'Error Monitoring & Performance Checks',
      description: 'Integrate performance monitor analytics (e.g. Lighthouse audits, Sentry tracking) to capture client-side run-time exceptions.',
      icon: <Timeline sx={{ color: '#3b82f6', fontSize: 32 }} />,
      details: 'Client-side monitoring tools capture runtime exceptions that occur on customer browsers. Integrating tools like Sentry helps developers track down bugs and evaluate performance health across various client devices.',
      securityGuidelines: [
        'Avoid capturing or logging Personally Identifiable Information (PII) like names, emails, or phone numbers in crash reports.',
        'Configure alert thresholds in monitoring dashboards to prevent email spam floods during peak usage traffic.',
        'Wipe out local state snapshots inside crash logs before dispatching logs to analytics endpoints.',
      ],
      docUrl: 'https://sentry.io',
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
            <Card key={idx} variant="outlined" sx={{ borderRadius: 3, border: '1px solid rgba(0,0,0,0.06)' }}>
              <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%', p: 3, gap: 2 }}>
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
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
                </Box>
                
                <Box sx={{ mt: 'auto', pt: 1 }}>
                  <CustomButton
                    variant="text"
                    size="small"
                    startIcon={<Visibility fontSize="small" />}
                    onClick={() => setSelectedGuideline(item)}
                    sx={{ p: 0, minWidth: 0, fontWeight: 700, color: 'primary.main' }}
                  >
                    View Details
                  </CustomButton>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Paper>

      {/* Detail Modal */}
      <CustomDialog
        open={!!selectedGuideline}
        onClose={() => setSelectedGuideline(null)}
        sx={{
          '& .MuiDialog-paper': {
            borderRadius: 0, // Square design
            border: '2px solid #0062ff',
            p: 1.5,
          },
        }}
        title={
          <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
            {selectedGuideline?.icon}
            <Typography variant="h6" sx={{ fontWeight: 800 }}>
              {selectedGuideline?.title} Detail Guide
            </Typography>
          </Stack>
        }
      >
        {selectedGuideline && (
          <Stack spacing={3.5}>
            {/* Overview */}
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 750, color: 'text.primary', mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                <Info sx={{ color: 'primary.main', fontSize: 20 }} /> Overview & Standards
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                {selectedGuideline.details}
              </Typography>
            </Box>

            {/* Code Security Guidelines */}
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 750, color: 'error.main', mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                <Security sx={{ fontSize: 20 }} /> Security Checklist
              </Typography>
              <Stack spacing={1.5}>
                {selectedGuideline.securityGuidelines.map((guideline, index) => (
                  <Box key={index} sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start' }}>
                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 700, color: 'error.light' }}>
                      {index + 1}.
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.5 }}>
                      {guideline}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Box>

            {/* Official Link */}
            <Box sx={{ pt: 1 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 750, color: 'text.primary', mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                <OpenInNew sx={{ color: 'primary.main', fontSize: 20 }} /> Reference Documentation
              </Typography>
              <a
                href={selectedGuideline.docUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: '#0062ff',
                  textDecoration: 'none',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                {selectedGuideline.docUrl} <OpenInNew sx={{ fontSize: 14 }} />
              </a>
            </Box>
          </Stack>
        )}
      </CustomDialog>
    </Box>
  );
};

export default Deployment;
