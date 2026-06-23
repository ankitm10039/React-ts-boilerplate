import React, { useState } from 'react';
import { Box, Typography, Paper, Divider, Stack, Card, CardContent } from '@mui/material';
import {
  ArrowBack,
  CloudDownload,
  Terminal,
  Settings,
  PlayArrow,
  Visibility,
  Security,
  Info,
  OpenInNew,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { CustomButton, CustomDialog } from '@/components/common';

interface SetupStep {
  title: string;
  description: string;
  icon: React.ReactNode;
  details: string;
  securityGuidelines: string[];
  docUrl: string;
}

const GettingStarted: React.FC = () => {
  const navigate = useNavigate();
  const [selectedStep, setSelectedStep] = useState<SetupStep | null>(null);

  const steps: SetupStep[] = [
    {
      title: '1. Initialize Project (Single Command)',
      description: 'Initialize a fresh React + TS project using npx degit with a single command.',
      icon: <CloudDownload sx={{ color: '#0062ff', fontSize: 32 }} />,
      details: 'Open your terminal in your projects directory and execute the single degit command. This clones the latest state of the template code directly into your custom folder name without carrying over git commit logs from the template.\n\nCommand:\n`npx degit ankitm10039/React-ts-boilerplate my-new-app`',
      securityGuidelines: [
        'Ensure you verify the template repo source URL is authentic before running npx commands.',
        'Never run degit on directories containing private keys or uncommitted changes without backup.',
        'Verify template files after initialization to ensure no malicious scripts were fetched.',
      ],
      docUrl: 'https://github.com/Rich-Harris/degit',
    },
    {
      title: '2. Install Dependencies',
      description: 'Run package installation scripts to download and install all pre-configured npm packages locally.',
      icon: <Terminal sx={{ color: '#ffb300', fontSize: 32 }} />,
      details: 'Navigate to the project root directory and install dependencies. Because React 19 is active, we recommend installing packages with the legacy-peer-deps flag to bypass version conflict alerts.\n\nCommand:\n`npm install --legacy-peer-deps`',
      securityGuidelines: [
        'Regularly run `npm audit` to check for security vulnerabilities (CVEs) in downloaded dependencies.',
        'Do not install unverified third-party packages to prevent supply chain malware injections.',
        'Avoid editing files inside the `node_modules` directory directly—make custom config overrides.',
      ],
      docUrl: 'https://docs.npmjs.com/cli/v10/commands/npm-install',
    },
    {
      title: '3. Setup Environment Variables',
      description: 'Copy and configure .env profiles with local variables and server API endpoints.',
      icon: <Settings sx={{ color: '#10b981', fontSize: 32 }} />,
      details: 'Create local environment profile files (e.g. `.env.local` or `.env.development.local`) at the project root. Configure custom environment keys using the `VITE_` prefix so they can be loaded by the config managers.\n\nExample variables:\n`VITE_API_BASE_URL=https://dev-api.example.com`',
      securityGuidelines: [
        'Confirm that `.env.local` and similar secret files are listed in `.gitignore` before making any commits.',
        'Never hardcode tokens, API passwords, or client credentials inside public `.env.development` templates.',
        'Rotate API tokens regularly in development environments to block leaked key access.',
      ],
      docUrl: 'https://vite.dev/guide/env-and-mode',
    },
    {
      title: '4. Start Development Server',
      description: 'Spin up Vite development server locally to write code with instant Hot Module Replacement (HMR).',
      icon: <PlayArrow sx={{ color: '#3b82f6', fontSize: 32 }} />,
      details: 'Launch the local dev server. Vite will serve the client application at a local port (usually http://localhost:5173). Any edits you make to components will immediately update in the browser without reloading state.\n\nCommand:\n`npm run dev`',
      securityGuidelines: [
        'Run development servers bound to localhost interface (`127.0.0.1`) only—avoid exposing ports to public networks (`--host`).',
        'Verify there are no security warnings appearing in browser console reports during execution.',
        'Shut down local development servers when not actively coding to prevent port probing.',
      ],
      docUrl: 'https://vite.dev/guide/cli',
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
          Getting Started & Developer Onboarding Guide
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 4, fontSize: '1.1rem', lineHeight: 1.6 }}>
          Step-by-step documentation for new developers joining the team to setup their workspaces and spin up the boilerplate.
        </Typography>

        <Divider sx={{ my: 4 }} />

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: 3,
          }}
        >
          {steps.map((item, idx) => (
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
                    onClick={() => setSelectedStep(item)}
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
        open={!!selectedStep}
        onClose={() => setSelectedStep(null)}
        sx={{
          '& .MuiDialog-paper': {
            borderRadius: 0, // Square design
            border: '2px solid #0062ff',
            p: 1.5,
          },
        }}
        title={
          <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
            {selectedStep?.icon}
            <Typography variant="h6" sx={{ fontWeight: 800 }}>
              {selectedStep?.title} Setup Details
            </Typography>
          </Stack>
        }
      >
        {selectedStep && (
          <Stack spacing={3.5}>
            {/* Overview */}
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 750, color: 'text.primary', mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                <Info sx={{ color: 'primary.main', fontSize: 20 }} /> Setup Instructions
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6, whiteSpace: 'pre-line' }}>
                {selectedStep.details}
              </Typography>
            </Box>

            {/* Code Security Guidelines */}
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 750, color: 'error.main', mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                <Security sx={{ fontSize: 20 }} /> Security Guidelines
              </Typography>
              <Stack spacing={1.5}>
                {selectedStep.securityGuidelines.map((guideline, index) => (
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
                <OpenInNew sx={{ color: 'primary.main', fontSize: 20 }} /> Official Reference
              </Typography>
              <a
                href={selectedStep.docUrl}
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
                {selectedStep.docUrl} <OpenInNew sx={{ fontSize: 14 }} />
              </a>
            </Box>
          </Stack>
        )}
      </CustomDialog>
    </Box>
  );
};

export default GettingStarted;
