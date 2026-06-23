import React, { useState } from 'react';
import { Box, Typography, Paper, Divider, Stack, Card, CardContent } from '@mui/material';
import {
  ArrowBack,
  BugReport,
  Edit,
  VerifiedUser,
  Brush,
  Visibility,
  Security,
  Info,
  OpenInNew,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { CustomButton, CustomDialog } from '@/components/common';

interface DevelopmentPractice {
  title: string;
  description: string;
  icon: React.ReactNode;
  details: string;
  securityGuidelines: string[];
  docUrl: string;
}

const Development: React.FC = () => {
  const navigate = useNavigate();
  const [selectedPractice, setSelectedPractice] = useState<DevelopmentPractice | null>(null);

  const practices: DevelopmentPractice[] = [
    {
      title: 'Linting & Formatting',
      description: 'Enforce Prettier and ESLint. Use npm run lint and Prettier automatic configuration before committing files to align styles.',
      icon: <Brush sx={{ color: '#0062ff', fontSize: 32 }} />,
      details: 'ESLint analyzes your code to find structural problems, while Prettier handles formatting rules automatically. Together, they enforce a unified styling convention across the entire engineering team.',
      securityGuidelines: [
        'Run `npm run lint` locally before making a commit to avoid pushing style warnings.',
        'Use linting configurations to prevent unsafe patterns like the use of `eval()` or unescaped variables.',
        'Set up your IDE to format on save using Prettier for instant alignment.',
      ],
      docUrl: 'https://eslint.org/',
    },
    {
      title: 'Branch Naming Convention',
      description: 'Use standard branch prefixes: feature/ (new features), bugfix/ (resolved bugs), hotfix/ (immediate production fixes), or chore/ (tool configurations).',
      icon: <BugReport sx={{ color: '#ffb300', fontSize: 32 }} />,
      details: 'Clear branch prefixes communicate the nature of the changes to other developers. They integrate with automation pipelines (like branch protection rules) and make git logs easy to audit.',
      securityGuidelines: [
        'Never include user credentials, client names, or sensitive identifiers in branch names.',
        'Use ticket numbers (e.g. feature/VIBE-104-login-page) to link branches to project management boards.',
        'Enforce branch protection rules on GitHub to block force-pushing to critical branches.',
      ],
      docUrl: 'https://git-scm.com/book/en/v2/Git-Branching-Branches-in-a-Nutshell',
    },
    {
      title: 'Type Safety & Strict Null Checks',
      description: 'Avoid using the any type in TypeScript. Declare explicit models, interfaces, and function response definitions.',
      icon: <VerifiedUser sx={{ color: '#10b981', fontSize: 32 }} />,
      details: 'TypeScript prevents runtime exceptions by flagging type mismatches during compilation. Using strict types ensures that undefined or null states are explicitly handled, reducing software crash rates.',
      securityGuidelines: [
        'Avoid casting variables using `as any`—it turns off type protection.',
        'Enable `noImplicitAny` and `strictNullChecks` in your tsconfig configuration to enforce strict type checking.',
        'Use type-guards or schema validations to parse external API response objects securely.',
      ],
      docUrl: 'https://typescriptlang.org',
    },
    {
      title: 'Component Modularization',
      description: 'Break UI down into atomic, reusable components. Keep states local; lift up state only when shared across contexts.',
      icon: <Edit sx={{ color: '#3b82f6', fontSize: 32 }} />,
      details: 'Structuring components modularly makes the UI highly maintainable and testable. Shared elements should reside in the global `/components` directory, while page-specific modules belong inside their respective views folder.',
      securityGuidelines: [
        'Do not hardcode sensitive variables inside components—pass them as props or extract them to configuration objects.',
        'Implement component error boundaries to isolate component exceptions from crashing the whole page view.',
        'Avoid creating heavy components to prevent high browser rendering latency.',
      ],
      docUrl: 'https://react.dev/learn/sharing-state-between-components',
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
                    onClick={() => setSelectedPractice(item)}
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
        open={!!selectedPractice}
        onClose={() => setSelectedPractice(null)}
        sx={{
          '& .MuiDialog-paper': {
            borderRadius: 0, // Square design
            border: '2px solid #0062ff',
            p: 1.5,
          },
        }}
        title={
          <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
            {selectedPractice?.icon}
            <Typography variant="h6" sx={{ fontWeight: 800 }}>
              {selectedPractice?.title} Detail Guide
            </Typography>
          </Stack>
        }
      >
        {selectedPractice && (
          <Stack spacing={3.5}>
            {/* Overview */}
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 750, color: 'text.primary', mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                <Info sx={{ color: 'primary.main', fontSize: 20 }} /> Overview & Standards
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                {selectedPractice.details}
              </Typography>
            </Box>

            {/* Code Security Guidelines */}
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 750, color: 'error.main', mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                <Security sx={{ fontSize: 20 }} /> Security Checklist
              </Typography>
              <Stack spacing={1.5}>
                {selectedPractice.securityGuidelines.map((guideline, index) => (
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
                href={selectedPractice.docUrl}
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
                {selectedPractice.docUrl} <OpenInNew sx={{ fontSize: 14 }} />
              </a>
            </Box>
          </Stack>
        )}
      </CustomDialog>
    </Box>
  );
};

export default Development;
