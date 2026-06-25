import React, { useState } from 'react';
import { Box, Typography, Grid, Paper, Chip, Button, Tabs, Tab } from '@mui/material';
import CardContainer from '../components/common/CardContainer';
import { Terminal, Settings, Extension, Shield, Speed, Bolt } from '@mui/icons-material';

interface ToolItem {
  name: string;
  category: 'Extension' | 'CLI Tool' | 'SaaS' | 'API Client';
  description: string;
  vsCodeId?: string;
  whyUseful: string;
  importance: 'Highly Recommended' | 'Essential' | 'Optional';
  icon?: React.ReactNode;
}

export const DeveloperTools: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  const extensions: ToolItem[] = [
    {
      name: 'ES7+ React/Redux/React-Native snippets',
      category: 'Extension',
      description: 'JavaScript and React templates & code snippets for modern React development.',
      vsCodeId: 'dsznajder.es7-react-js-snippets',
      whyUseful: 'Speeds up creation of components, hooks, and imports using short codes (e.g. rfce, rsc).',
      importance: 'Essential',
      icon: <Bolt sx={{ color: '#0062ff' }} />,
    },
    {
      name: 'Prettier - Code formatter',
      category: 'Extension',
      description: 'An opinionated code formatter that enforces consistent style across all files.',
      vsCodeId: 'esbenp.prettier-vscode',
      whyUseful: 'Enforces clean code guidelines automatically on save, keeping code style consistent.',
      importance: 'Essential',
      icon: <Settings sx={{ color: '#10b981' }} />,
    },
    {
      name: 'ESLint',
      category: 'Extension',
      description: 'Integrates ESLint into VS Code to analyze code statically and detect patterns/bugs.',
      vsCodeId: 'dbaeumer.vscode-eslint',
      whyUseful: 'Displays real-time linting errors, warnings, and auto-fixes code issues on the fly.',
      importance: 'Essential',
      icon: <Shield sx={{ color: '#ef4444' }} />,
    },
    {
      name: 'Thunder Client',
      category: 'Extension',
      description: 'A clean, lightweight Rest API Client extension for VS Code.',
      vsCodeId: 'rangav.vscode-thunder-client',
      whyUseful: 'Allows testing REST APIs directly inside VS Code without launching external heavy tools like Postman.',
      importance: 'Highly Recommended',
      icon: <Terminal sx={{ color: '#f59e0b' }} />,
    },
    {
      name: 'TypeScript Error Translator',
      category: 'Extension',
      description: 'Translates complex, long TypeScript compiler errors into human-readable language.',
      vsCodeId: 'mattpocock.ts-error-translator',
      whyUseful: 'Provides a clean translation of TypeScript exceptions, simplifying debugging for junior developers.',
      importance: 'Highly Recommended',
      icon: <Extension sx={{ color: '#a855f7' }} />,
    },
    {
      name: 'GitLens — Git supercharged',
      category: 'Extension',
      description: 'Visualizes code authorship via Git blame annotations and repository history navigation.',
      vsCodeId: 'eamodio.gitlens',
      whyUseful: 'Helps developers trace changes, perform audits, and understand code history instantly.',
      importance: 'Highly Recommended',
      icon: <Speed sx={{ color: '#06b6d4' }} />,
    },
  ];

  const qualityChecks: ToolItem[] = [
    {
      name: 'ESLint & Prettier (Linter & Formatter)',
      category: 'CLI Tool',
      description: 'Statically checks your codebase for syntactic bugs, best practices, and code styling.',
      whyUseful: 'Pre-configured in Vite boilerplate. Run "npm run lint" before raising Pull Requests.',
      importance: 'Essential',
      icon: <Settings sx={{ color: '#10b981' }} />,
    },
    {
      name: 'Husky & lint-staged (Git Hooks)',
      category: 'CLI Tool',
      description: 'Runs linter, tests, and formatting checks automatically on git commit.',
      whyUseful: 'Prevents developers from committing bad code or unformatted code into the remote Bitbucket repo.',
      importance: 'Highly Recommended',
      icon: <Bolt sx={{ color: '#0062ff' }} />,
    },
    {
      name: 'npm audit (Security Audit)',
      category: 'CLI Tool',
      description: 'Checks installed node packages for known security vulnerabilities.',
      whyUseful: 'Run "npm audit" before build. Run "npm audit fix" to automatically upgrade compromised dependencies.',
      importance: 'Essential',
      icon: <Shield sx={{ color: '#ef4444' }} />,
    },
    {
      name: 'Google Lighthouse (Web Audits)',
      category: 'CLI Tool',
      description: 'Measures page performance, accessibility, SEO metrics, and best practices.',
      whyUseful: 'Allows testing production builds locally using Chrome DevTools or CLI before deploying to production.',
      importance: 'Highly Recommended',
      icon: <Speed sx={{ color: '#f59e0b' }} />,
    },
    {
      name: 'SonarQube (Static Analysis)',
      category: 'SaaS',
      description: 'Continuous code quality inspection tool to discover bugs, vulnerabilities, and code smells.',
      whyUseful: 'Integrates with CI/CD pipelines to block deployments if code quality gate conditions fail.',
      importance: 'Optional',
      icon: <Extension sx={{ color: '#94a3b8' }} />,
    },
  ];

  const handleInstallExtension = (vsCodeId: string) => {
    window.open(`vscode:extension/${vsCodeId}`);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, maxWidth: 1200, mx: 'auto' }}>
      {/* HEADER BANNER */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: '8px',
          border: '1px solid #e2e8f0',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
          color: '#ffffff',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 2,
        }}
      >
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, letterSpacing: '-0.02em', fontFamily: 'Outfit, sans-serif' }}>
            🛠️ Dev Tools & Quality Hub
          </Typography>
          <Typography variant="body2" sx={{ color: '#94a3b8', mt: 0.5, fontFamily: 'Outfit, sans-serif' }}>
            VS Code productivity extensions, API testing, and pre-production codebase analysis tools.
          </Typography>
        </Box>
        
        {/* TAB SWITCHER WITHIN HEADER FOR PREMIUM LOOK */}
        <Tabs
          value={activeTab}
          onChange={(_, val) => setActiveTab(val)}
          sx={{
            bgcolor: 'rgba(255,255,255,0.06)',
            borderRadius: '24px',
            p: 0.5,
            '& .MuiTabs-indicator': {
              bgcolor: '#0062ff',
              height: '100%',
              borderRadius: '20px',
              zIndex: 0,
            },
          }}
        >
          <Tab
            label="IDE Extensions"
            sx={{
              color: '#94a3b8',
              textTransform: 'none',
              fontSize: '13px',
              fontWeight: 700,
              px: 3,
              borderRadius: '20px',
              zIndex: 1,
              '&.Mui-selected': { color: '#ffffff' },
            }}
          />
          <Tab
            label="Quality Scanners"
            sx={{
              color: '#94a3b8',
              textTransform: 'none',
              fontSize: '13px',
              fontWeight: 700,
              px: 3,
              borderRadius: '20px',
              zIndex: 1,
              '&.Mui-selected': { color: '#ffffff' },
            }}
          />
        </Tabs>
      </Paper>

      {/* ACTIVE CONTENT VIEW - MINIMIZING SCROLL DEPTH */}
      {activeTab === 0 && (
        <CardContainer
          title="VS Code Extensions"
          subtitle="Increase coding efficiency and test API logic directly within your editor workspace."
        >
          <Grid container spacing={2.5}>
            {extensions.map((ext) => (
              <Grid item xs={12} sm={6} md={4} key={ext.name}>
                <Paper
                  variant="outlined"
                  sx={{
                    p: 2.5,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    borderRadius: '8px',
                    borderColor: '#e2e8f0',
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      borderColor: '#0062ff',
                      transform: 'translateY(-3px)',
                      boxShadow: '0 8px 20px rgba(0,98,255,0.06)',
                    },
                  }}
                >
                  <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {ext.icon}
                        <Typography sx={{ fontSize: '10px', color: '#94a3b8', fontWeight: 700, fontFamily: 'monospace' }}>
                          {ext.category}
                        </Typography>
                      </Box>
                      <Chip
                        label={ext.importance}
                        size="small"
                        sx={{
                          fontSize: '9px',
                          fontWeight: 700,
                          fontFamily: 'Outfit, sans-serif',
                          bgcolor:
                            ext.importance === 'Essential'
                              ? '#fee2e2'
                              : ext.importance === 'Highly Recommended'
                              ? '#dbeafe'
                              : '#f1f5f9',
                          color:
                            ext.importance === 'Essential'
                              ? '#ef4444'
                              : ext.importance === 'Highly Recommended'
                              ? '#2563eb'
                              : '#64748b',
                        }}
                      />
                    </Box>

                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, fontSize: '14px', color: '#0f172a', fontFamily: 'Outfit, sans-serif' }}>
                      {ext.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#64748b', mb: 2, fontSize: '12px', fontFamily: 'Outfit, sans-serif', lineHeight: 1.4 }}>
                      {ext.description}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                    <Box sx={{ bgcolor: '#f8fafc', p: 1.25, borderRadius: '6px' }}>
                      <Typography sx={{ fontSize: '10px', fontWeight: 800, color: '#475569', textTransform: 'uppercase', mb: 0.25, fontFamily: 'Outfit, sans-serif' }}>
                        Benefit:
                      </Typography>
                      <Typography sx={{ fontSize: '10px', color: '#64748b', fontFamily: 'Outfit, sans-serif', lineHeight: 1.3 }}>
                        {ext.whyUseful}
                      </Typography>
                    </Box>

                    {ext.vsCodeId && (
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => handleInstallExtension(ext.vsCodeId!)}
                        sx={{
                          width: '100%',
                          borderRadius: '4px',
                          textTransform: 'none',
                          fontSize: '11px',
                          fontWeight: 700,
                          borderColor: '#cbd5e1',
                          color: '#334155',
                          fontFamily: 'Outfit, sans-serif',
                          '&:hover': {
                            borderColor: '#0f172a',
                            bgcolor: '#f1f5f9',
                          },
                        }}
                      >
                        Install Extension
                      </Button>
                    )}
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </CardContainer>
      )}

      {activeTab === 1 && (
        <CardContainer
          title="Code Quality & Security Scanners"
          subtitle="Mandatory verification pipelines and auditing procedures for production builds."
        >
          <Grid container spacing={2.5}>
            {qualityChecks.map((check) => (
              <Grid item xs={12} sm={6} key={check.name}>
                <Paper
                  variant="outlined"
                  sx={{
                    p: 2.5,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    borderRadius: '8px',
                    borderColor: '#e2e8f0',
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      borderColor: '#0062ff',
                      boxShadow: '0 8px 20px rgba(0,98,255,0.04)',
                    },
                  }}
                >
                  <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {check.icon}
                        <Typography sx={{ fontSize: '10px', color: '#0062ff', fontWeight: 800, fontFamily: 'monospace' }}>
                          [{check.category}]
                        </Typography>
                      </Box>
                      <Chip
                        label={check.importance}
                        size="small"
                        sx={{
                          fontSize: '9px',
                          fontWeight: 700,
                          fontFamily: 'Outfit, sans-serif',
                          bgcolor:
                            check.importance === 'Essential'
                              ? '#fee2e2'
                              : check.importance === 'Highly Recommended'
                              ? '#dbeafe'
                              : '#f1f5f9',
                          color:
                            check.importance === 'Essential'
                              ? '#ef4444'
                              : check.importance === 'Highly Recommended'
                              ? '#2563eb'
                              : '#64748b',
                        }}
                      />
                    </Box>

                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, fontSize: '15px', color: '#0f172a', fontFamily: 'Outfit, sans-serif' }}>
                      {check.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#64748b', mb: 2, fontSize: '12px', fontFamily: 'Outfit, sans-serif', lineHeight: 1.4 }}>
                      {check.description}
                    </Typography>

                    <Box sx={{ borderLeft: '3px solid #0062ff', pl: 1.5, py: 0.25 }}>
                      <Typography sx={{ fontSize: '10px', fontWeight: 700, color: '#334155', textTransform: 'uppercase', mb: 0.25, fontFamily: 'Outfit, sans-serif' }}>
                        Usage / Setup:
                      </Typography>
                      <Typography sx={{ fontSize: '10px', color: '#64748b', fontFamily: 'Outfit, sans-serif', lineHeight: 1.3 }}>
                        {check.whyUseful}
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </CardContainer>
      )}
    </Box>
  );
};

export default DeveloperTools;
