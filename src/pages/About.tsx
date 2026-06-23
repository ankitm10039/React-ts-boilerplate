import React, { useState } from 'react';
import { Box, Typography, Paper, Divider, Stack, Card, CardContent } from '@mui/material';
import {
  ArrowBack,
  Speed,
  Code,
  Router,
  Http,
  Settings,
  Bolt,
  Rule,
  FolderOpen,
  SyncAlt,
  Visibility,
  Security,
  Info,
  OpenInNew,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { CustomButton, CustomDialog } from '@/components/common';

interface TechnologyDetail {
  title: string;
  description: string;
  icon: React.ReactNode;
  details: string;
  securityGuidelines: string[];
  docUrl: string;
}

const About: React.FC = () => {
  const navigate = useNavigate();
  const [selectedTech, setSelectedTech] = useState<TechnologyDetail | null>(null);

  const technologies: TechnologyDetail[] = [
    {
      title: 'Vite Bundler',
      description: 'Provides instant server starts and lightning-fast Hot Module Replacement (HMR) for development.',
      icon: <Speed sx={{ color: '#646cff', fontSize: 32 }} />,
      details: 'Vite uses native ES Modules to serve source files during development, meaning the browser does the bundling work. For production, it leverages Rollup to produce highly optimized, minified, and tree-shaken static assets.',
      securityGuidelines: [
        'Disable sourcemaps in production builds (`sourcemap: false` in vite.config.ts) to prevent source code leaks.',
        'Use build.minify to compress JavaScript and obscure logic.',
        'Validate third-party plugins in vite.config.ts before importing them to prevent build-time script injections.',
      ],
      docUrl: 'https://vite.dev',
    },
    {
      title: 'Material UI (MUI)',
      description: 'Pre-configured custom light design system with premium Outfit typography and standardized inputs.',
      icon: <Code sx={{ color: '#0062ff', fontSize: 32 }} />,
      details: 'Material UI is a robust React component library implementing Google Material Design. The project theme is customized with soft borders, Outfit and Inter Google fonts, and interactive micro-animations.',
      securityGuidelines: [
        'Sanitize any HTML content rendered within MUI Typography or Box components using libraries like DOMPurify to prevent XSS (Cross-Site Scripting).',
        'Avoid rendering raw, unescaped user-input values inside text fields.',
        'Set autocomplete="off" on sensitive form fields (e.g. OTPs, passwords) to block browser cache harvesting.',
      ],
      docUrl: 'https://mui.com/material-ui/',
    },
    {
      title: 'Zustand Client Store',
      description: 'Ultra-lightweight hook-based state manager to maintain global UI state cleanly without boilerplate.',
      icon: <Bolt sx={{ color: '#ffb300', fontSize: 32 }} />,
      details: 'Zustand provides a simple, boilerplate-free state container. It uses hooks as the primary interface, enabling atomic updates to prevent unnecessary component re-renders.',
      securityGuidelines: [
        'Never store sensitive user credentials, plain passwords, or cryptographic keys inside the Zustand store.',
        'If store persistence is configured (via persist middleware), encrypt the storage payload before writing it to local storage.',
        'Clear store state entirely on user logout to prevent session state pollution.',
      ],
      docUrl: 'https://zustand-demo.pmnd.rs/',
    },
    {
      title: 'TanStack Query (React Query)',
      description: 'Handles server state management, caching, automatic synchronization, and background updates.',
      icon: <SyncAlt sx={{ color: '#ff4154', fontSize: 32 }} />,
      details: 'TanStack Query eliminates manual useEffect requests. It fetches, caches, and automatically updates server data in the background, keeping UI state synchronized with the API state.',
      securityGuidelines: [
        'Prevent query key parameter collision. Make sure query keys are isolated so users cannot fetch unauthorized cache segments.',
        'Handle API exceptions gracefully using query error boundaries to block detail trace leakage.',
        'Set query staleness periods conservatively on sensitive data to ensure credentials expire quickly.',
      ],
      docUrl: 'https://tanstack.com/query/latest',
    },
    {
      title: 'React Hook Form & Zod',
      description: 'High-performance schema-validated form controller. Validates runtime inputs using type-safe schemas.',
      icon: <Rule sx={{ color: '#10b981', fontSize: 32 }} />,
      details: 'React Hook Form manages form states with minimum re-renders by utilizing uncontrolled inputs. Zod defines the schema constraints and parses payloads, ensuring runtime types match TypeScript types.',
      securityGuidelines: [
        'Always validate data structure shapes using Zod safeParse before dispatching them to endpoint servers.',
        'Define strict constraints (e.g. email checks, character range lengths) in schemas to block malicious payloads early.',
        'Combine frontend validation with backend validation—never trust client-side checks alone.',
      ],
      docUrl: 'https://react-hook-form.com',
    },
    {
      title: 'Axios Instance & Interceptors',
      description: 'Configured HTTP client setup with request and response interceptors for global authentication handling.',
      icon: <Http sx={{ color: '#3b82f6', fontSize: 32 }} />,
      details: 'Axios interceptors act as middleware. The request interceptor appends JWT tokens to authorization headers automatically, while the response interceptor acts as a global error filter (handling 401, 403, and 500 errors).',
      securityGuidelines: [
        'Validate the target URL in request interceptors before appending JWT tokens, ensuring credentials are never sent to external domains.',
        'Wipe out local session tokens immediately when intercepting 401/403 unauthorized responses.',
        'Configure network timeouts on Axios instances to prevent Denial of Service (DoS) vulnerability hangs.',
      ],
      docUrl: 'https://axios-http.com',
    },
    {
      title: 'React Router DOM',
      description: 'Declarative routing structure with layout routing wrapper, NotFound handles, and nested views.',
      icon: <Router sx={{ color: '#f59e0b', fontSize: 32 }} />,
      details: 'React Router DOM handles client-side routing. We have configured nested route configurations under layouts to separate authenticated pages from public views.',
      securityGuidelines: [
        'Protect paths by wrapping router components in authentication route guards (HOCs) to prevent unauthorized access.',
        'Sanitize route parameters (e.g. /users/:id) before passing them to queries or displaying them.',
        'Configure catch-all routes (*) to prevent directory path probing.',
      ],
      docUrl: 'https://reactrouter.com',
    },
    {
      title: 'Absolute Path Aliasing',
      description: 'Custom path mappings allowing developers to import dependencies using clean `@/*` imports.',
      icon: <FolderOpen sx={{ color: '#6366f1', fontSize: 32 }} />,
      details: 'Vite and TypeScript are pre-configured to resolve absolute paths starting with `@/` directly to the `/src` folder, eliminating ugly relative paths like `../../../components`.',
      securityGuidelines: [
        'Strictly decouple domain logics to avoid circular dependencies.',
        'Do not expose private server-side directories within aliases configurations.',
        'Regularly monitor import paths to avoid referencing unused legacy files.',
      ],
      docUrl: 'https://typescriptlang.org/docs/handbook/module-resolution.html',
    },
    {
      title: 'CI/CD Pipeline & Code Quality',
      description: 'Pre-configured Prettier formatting rules and GitHub Actions test verification on commits.',
      icon: <Settings sx={{ color: '#475569', fontSize: 32 }} />,
      details: 'GitHub Actions automatically runs quality checks (ESLint, Prettier formatting, and compilation builds) on code pushes. This guarantees only valid, bug-free code gets merged into main branches.',
      securityGuidelines: [
        'Store all API tokens and environment secrets securely in GitHub Repository Secrets instead of hardcoding them in workflow scripts.',
        'Run security audit checks (`npm audit` or tools like Snyk) in CI workflows to flag insecure dependencies.',
        'Block commits containing plain-text keys or secrets using automated pre-commit scanners.',
      ],
      docUrl: 'https://github.com/features/actions',
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
          Architecture Stack Overview
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 4, fontSize: '1.1rem', lineHeight: 1.6 }}>
          This boilerplate integrates modern frontend architectures to save development time, enforce clean coding patterns, and optimize production bundler outputs. Here is a breakdown of the custom modules pre-configured for your team.
        </Typography>
        
        <Divider sx={{ my: 4 }} />

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
            gap: 3,
          }}
        >
          {technologies.map((tech, idx) => (
            <Card key={idx} variant="outlined" sx={{ borderRadius: 3, border: '1px solid rgba(0,0,0,0.06)' }}>
              <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%', p: 3, gap: 2 }}>
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                  <Box sx={{ p: 1, borderRadius: 2, bgcolor: 'rgba(0, 0, 0, 0.02)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {tech.icon}
                  </Box>
                  <Stack spacing={0.5}>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      {tech.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.5 }}>
                      {tech.description}
                    </Typography>
                  </Stack>
                </Box>
                
                <Box sx={{ mt: 'auto', pt: 1 }}>
                  <CustomButton
                    variant="text"
                    size="small"
                    startIcon={<Visibility fontSize="small" />}
                    onClick={() => setSelectedTech(tech)}
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

      {/* Tech Details Modal (Customized as Square Geometric Design) */}
      <CustomDialog
        open={!!selectedTech}
        onClose={() => setSelectedTech(null)}
        sx={{
          '& .MuiDialog-paper': {
            borderRadius: 0, // Perfectly square corners
            border: '2px solid #0062ff', // Sleek primary accent border
            p: 1.5,
          },
        }}
        title={
          <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
            {selectedTech?.icon}
            <Typography variant="h6" sx={{ fontWeight: 800 }}>
              {selectedTech?.title} Detail Guide
            </Typography>
          </Stack>
        }
      >
        {selectedTech && (
          <Stack spacing={3.5}>
            {/* Overview Section */}
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 750, color: 'text.primary', mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                <Info sx={{ color: 'primary.main', fontSize: 20 }} /> Technical Overview
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                {selectedTech.details}
              </Typography>
            </Box>

            {/* Code Security Guidelines */}
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 750, color: 'error.main', mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                <Security sx={{ fontSize: 20 }} /> Code Security Best Practices
              </Typography>
              <Stack spacing={1.5}>
                {selectedTech.securityGuidelines.map((guideline, index) => (
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

            {/* Official Documentation Link */}
            <Box sx={{ pt: 1 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 750, color: 'text.primary', mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                <OpenInNew sx={{ color: 'primary.main', fontSize: 20 }} /> Reference Documentation
              </Typography>
              <a
                href={selectedTech.docUrl}
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
                {selectedTech.docUrl} <OpenInNew sx={{ fontSize: 14 }} />
              </a>
            </Box>
          </Stack>
        )}
      </CustomDialog>
    </Box>
  );
};

export default About;
