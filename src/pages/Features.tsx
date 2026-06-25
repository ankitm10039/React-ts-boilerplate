import React, { useState } from 'react';
import { Box, Typography, Grid, Paper, Link, Dialog, DialogTitle, DialogContent, DialogActions, Button, Chip } from '@mui/material';
import CustomButton from '../components/common/CustomButton';
import { Info, Code, Speed, Security, Storage, Layers, ArrowForward, Launch } from '@mui/icons-material';

interface FeatureItem {
  id: string;
  title: string;
  shortDesc: string;
  longDesc: string;
  techStack: string[];
  benefits: string[];
  icon: React.ReactNode;
  docUrl: string;
  color: string;
}

export const Features: React.FC = () => {
  const [selectedFeature, setSelectedFeature] = useState<FeatureItem | null>(null);

  const features: FeatureItem[] = [
    {
      id: 'stack',
      title: 'Core Stack',
      shortDesc: 'React 19, TypeScript, and Vite for HMR speed.',
      longDesc: 'The core foundations of this boilerplate are built using React 19, TypeScript for static type-safety, and Vite as the build tool. Vite replaces legacy bundlers like Webpack, offering instant dev server start times and highly optimized rollup configurations for production builds.',
      techStack: ['React 19', 'TypeScript', 'Vite'],
      benefits: [
        'Sub-second Hot Module Replacement (HMR) speeds.',
        'Strict type-safety across all UI components.',
        'Extremely lightweight production bundles.',
      ],
      icon: <Code sx={{ fontSize: 28, color: '#0062ff' }} />,
      docUrl: 'https://react.dev/',
      color: '#0062ff',
    },
    {
      id: 'state',
      title: 'State & Cache',
      shortDesc: 'Zustand store & TanStack Query client.',
      longDesc: 'State management is separated cleanly. Local state relies on standard React hooks, global store is powered by Zustand (lightweight and boilerplate-free), and remote API data is fetched and cached automatically using TanStack React Query.',
      techStack: ['Zustand 5', 'Query v5'],
      benefits: [
        'Automatic cache invalidation and query refetching.',
        'Global state store without complex wrappers.',
        'Consistent Axios HTTP configurations.',
      ],
      icon: <Storage sx={{ fontSize: 28, color: '#10b981' }} />,
      docUrl: 'https://tanstack.com/query/latest',
      color: '#10b981',
    },
    {
      id: 'ui',
      title: 'MUI Theme',
      shortDesc: 'Custom theme tokens & Outfit typography.',
      longDesc: 'User interfaces are designed using Material UI. We have built custom theme configurations using outfit/monospaced fonts, harmonized HSL color palettes, custom border treatments, and premium card layouts. The design completely overrides generic Material looks.',
      techStack: ['MUI v6', 'Outfit Fonts'],
      benefits: [
        'Custom interactive hover transitions preset on cards.',
        'Clean typography system using Outfit.',
        'Fully responsive layouts.',
      ],
      icon: <Layers sx={{ fontSize: 28, color: '#a855f7' }} />,
      docUrl: 'https://mui.com/material-ui/getting-started/',
      color: '#a855f7',
    },
    {
      id: 'quality',
      title: 'Code Quality',
      shortDesc: 'Pre-commit hooks & security auditing CLI.',
      longDesc: 'Quality assurance starts before commits hit remote. We pre-install ESLint for lint checking, Prettier for formatting, and pre-configured Git hooks using Husky to verify code formatting and type checks automatically on git commit.',
      techStack: ['ESLint', 'Husky'],
      benefits: [
        'No unformatted or broken code commits allowed.',
        'Real-time feedback on syntax errors.',
        'Dependency vulnerability reports.',
      ],
      icon: <Security sx={{ fontSize: 28, color: '#ef4444' }} />,
      docUrl: 'https://eslint.org/',
      color: '#ef4444',
    },
    {
      id: 'perf',
      title: 'Build Opts',
      shortDesc: 'Tree-shaking and assets compression rule.',
      longDesc: 'We fine-tune internal bundle sizes by separating chunk layers, lazy loading resources, and enforcing strict tree-shaking rules. This ensures high SEO ranks and outstanding Google Lighthouse score results.',
      techStack: ['Vite Opts', 'Rollup'],
      benefits: [
        'Pre-configured code-splitting for chunks.',
        'Optimized assets compressing pipeline.',
        'Top performance metrics on Google PageSpeed.',
      ],
      icon: <Speed sx={{ fontSize: 28, color: '#f59e0b' }} />,
      docUrl: 'https://vite.dev/',
      color: '#f59e0b',
    },
  ];

  return (
    <Box sx={{ width: '100%', py: 2 }}>
      {/* FEATURE CARDS GRID */}
      <Grid container spacing={3}>
        {features.map((feature) => (
          <Grid item xs={12} sm={6} md={4} key={feature.id} sx={{ display: 'flex' }}>
            <Paper
              variant="outlined"
              sx={{
                p: 2.5,
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                borderRadius: '12px',
                borderColor: '#e2e8f0',
                bgcolor: '#ffffff',
                transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                position: 'relative',
                overflow: 'hidden',
                minHeight: 250,
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '4px',
                  height: '100%',
                  bgcolor: feature.color,
                  opacity: 0.8,
                },
                '&:hover': {
                  borderColor: feature.color,
                  transform: 'translateY(-6px)',
                  boxShadow: '0 12px 25px rgba(0, 0, 0, 0.05)',
                },
              }}
            >
              <Box>
                {/* ICON & DOCS */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Box sx={{ p: 0.75, bgcolor: `${feature.color}10`, borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {feature.icon}
                  </Box>
                  <Link
                    href={feature.docUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5,
                      fontSize: '11px',
                      fontWeight: 700,
                      color: 'text.secondary',
                      textDecoration: 'none',
                      fontFamily: 'Outfit, sans-serif',
                      '&:hover': { color: feature.color },
                    }}
                  >
                    Docs <Launch sx={{ fontSize: 11 }} />
                  </Link>
                </Box>

                <Typography variant="h6" sx={{ fontWeight: 800, mb: 1, fontSize: '15px', color: '#0f172a', fontFamily: 'Outfit, sans-serif' }}>
                  {feature.title}
                </Typography>
                <Typography variant="body2" sx={{ color: '#64748b', mb: 2, fontSize: '12px', fontFamily: 'Outfit, sans-serif', lineHeight: 1.5 }}>
                  {feature.shortDesc}
                </Typography>
              </Box>

              {/* ACTION FOOTER */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, borderTop: '1px solid #f1f5f9', pt: 1.5 }}>
                <CustomButton
                  variant="text"
                  size="small"
                  onClick={() => setSelectedFeature(feature)}
                  endIcon={<ArrowForward sx={{ fontSize: 12 }} />}
                  sx={{
                    p: 0,
                    minWidth: 0,
                    alignSelf: 'flex-start',
                    fontSize: '11px',
                    fontWeight: 800,
                    fontFamily: 'Outfit, sans-serif',
                    color: feature.color,
                    '&:hover': {
                      bgcolor: 'transparent',
                      color: '#0f172a',
                    },
                  }}
                >
                  View Details
                </CustomButton>

                <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                  {feature.techStack.map((tech) => (
                    <Chip
                      key={tech}
                      label={tech}
                      size="small"
                      sx={{
                        fontSize: '8px',
                        fontWeight: 700,
                        height: '16px',
                        bgcolor: '#f1f5f9',
                        color: '#475569',
                        fontFamily: 'Outfit, sans-serif',
                      }}
                    />
                  ))}
                </Box>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* VIEW DETAILS DIALOG MODAL */}
      <Dialog
        open={!!selectedFeature}
        onClose={() => setSelectedFeature(null)}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: {
            borderRadius: '16px',
            p: 2,
          },
        }}
      >
        {selectedFeature && (
          <>
            <DialogTitle sx={{ fontWeight: 800, fontFamily: 'Outfit, sans-serif', pb: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
                <Info sx={{ color: selectedFeature.color }} />
                {selectedFeature.title}
              </Box>
              <Button
                component="a"
                href={selectedFeature.docUrl}
                target="_blank"
                rel="noopener"
                variant="outlined"
                size="small"
                startIcon={<Launch sx={{ fontSize: 12 }} />}
                sx={{
                  borderRadius: '24px',
                  textTransform: 'none',
                  fontSize: '11px',
                  fontWeight: 700,
                  fontFamily: 'Outfit, sans-serif',
                  borderColor: '#e2e8f0',
                  color: '#475569',
                  '&:hover': { borderColor: selectedFeature.color, color: selectedFeature.color },
                }}
              >
                Docs
              </Button>
            </DialogTitle>
            <DialogContent sx={{ py: 2 }}>
              <Typography variant="body2" sx={{ color: '#475569', fontSize: '14px', fontFamily: 'Outfit, sans-serif', mb: 3, lineHeight: 1.6 }}>
                {selectedFeature.longDesc}
              </Typography>

              {/* Technologies Badge Group */}
              <Typography sx={{ fontSize: '11px', fontWeight: 800, color: '#1e293b', textTransform: 'uppercase', mb: 1, fontFamily: 'Outfit, sans-serif' }}>
                Tech Stack & Libraries:
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 3 }}>
                {selectedFeature.techStack.map((tech) => (
                  <span
                    key={tech}
                    style={{
                      fontSize: '10px',
                      fontWeight: 'bold',
                      color: selectedFeature.color,
                      backgroundColor: `${selectedFeature.color}15`,
                      padding: '4px 12px',
                      borderRadius: '12px',
                      fontFamily: 'Outfit, sans-serif',
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </Box>

              {/* Benefits Checklist */}
              <Typography sx={{ fontSize: '11px', fontWeight: 800, color: '#1e293b', textTransform: 'uppercase', mb: 1.5, fontFamily: 'Outfit, sans-serif' }}>
                Core Benefits:
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25 }}>
                {selectedFeature.benefits.map((benefit, idx) => (
                  <Box key={idx} sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start' }}>
                    <span style={{ color: '#10b981', fontWeight: 'bold', fontSize: '14px' }}>✓</span>
                    <Typography sx={{ fontSize: '13px', color: '#64748b', fontFamily: 'Outfit, sans-serif', lineHeight: 1.4 }}>
                      {benefit}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </DialogContent>
            <DialogActions sx={{ p: 2, borderTop: '1px solid #f1f5f9', mt: 2 }}>
              <Button
                onClick={() => setSelectedFeature(null)}
                variant="contained"
                sx={{
                  borderRadius: '24px',
                  textTransform: 'none',
                  fontSize: '12px',
                  fontWeight: 700,
                  px: 3.5,
                  bgcolor: '#0f172a',
                  color: '#ffffff',
                  fontFamily: 'Outfit, sans-serif',
                  '&:hover': {
                    bgcolor: '#1e293b',
                  },
                }}
              >
                Close Details
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default Features;
