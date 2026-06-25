import React, { useState } from 'react';
import { Box, Typography, Paper, Stack, Grid, Slider, TextField, ToggleButton, ToggleButtonGroup, MenuItem, Select, FormControl, InputLabel, Divider } from '@mui/material';
import { FontDownload, Settings, FormatSize } from '@mui/icons-material';

const TypographyShowcase: React.FC = () => {
  // Playground state
  const [text, setText] = useState('The quick brown fox jumps over the lazy dog.');
  const [fontFamily, setFontFamily] = useState('Inter');
  const [fontWeight, setFontWeight] = useState('400');
  const [fontSize, setFontSize] = useState(24);
  const [letterSpacing, setLetterSpacing] = useState(0);
  const [lineHeight, setLineHeight] = useState(1.5);
  const [fontStyle, setFontStyle] = useState<'normal' | 'italic'>('normal');

  const weights = [
    { label: 'Thin (100)', value: '100' },
    { label: 'Extra Light (200)', value: '200' },
    { label: 'Light (300)', value: '300' },
    { label: 'Regular (400)', value: '400' },
    { label: 'Medium (500)', value: '500' },
    { label: 'Semi Bold (600)', value: '600' },
    { label: 'Bold (700)', value: '700' },
    { label: 'Extra Bold (800)', value: '800' },
    { label: 'Black (900)', value: '900' },
  ];

  const scaleElements = [
    { variant: 'h1' as const, label: 'Heading 1 (h1)', desc: 'Used for main page titles' },
    { variant: 'h2' as const, label: 'Heading 2 (h2)', desc: 'Used for major section headers' },
    { variant: 'h3' as const, label: 'Heading 3 (h3)', desc: 'Used for sub-section headers' },
    { variant: 'h4' as const, label: 'Heading 4 (h4)', desc: 'Used for small titles' },
    { variant: 'h5' as const, label: 'Heading 5 (h5)', desc: 'Used for card or small module titles' },
    { variant: 'h6' as const, label: 'Heading 6 (h6)', desc: 'Used for detail headings' },
    { variant: 'body1' as const, label: 'Body Text 1 (body1)', desc: 'Primary body & paragraph copy' },
    { variant: 'body2' as const, label: 'Body Text 2 (body2)', desc: 'Secondary body or smaller details' },
    { variant: 'subtitle1' as const, label: 'Subtitle 1', desc: 'Featured subtitle metadata' },
    { variant: 'subtitle2' as const, label: 'Subtitle 2', desc: 'Small sidebar metadata' },
    { variant: 'caption' as const, label: 'Caption', desc: 'Tiny image details or context labels' },
  ];

  return (
    <Box sx={{ width: '100%' }}>
      {/* Page Title */}
      <Paper sx={{ p: { xs: 3, md: 5 }, borderRadius: 4, mb: 4 }}>
        <Typography variant="h3" gutterBottom sx={{ fontWeight: 800, letterSpacing: '-0.02em' }}>
          Typography & Global Font Showcase
        </Typography>
        <Typography color="text.secondary" sx={{ fontSize: '1.1rem', lineHeight: 1.6 }}>
          Explore the typography system, configured with the local <strong>Inter</strong> font files and Google <strong>Outfit</strong>. 
          Modify weights, letter spacing, styles, and sizes to inspect font behavior dynamically.
        </Typography>
      </Paper>

      {/* Grid Layout */}
      <Grid container spacing={4}>
        {/* Interactive Playground (Left Panel) */}
        <Grid size={{ xs: 12, lg: 7 }}>
          <Paper sx={{ p: 4, borderRadius: 4, height: '100%' }}>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
              <FontDownload color="primary" /> Interactive Font Playground
            </Typography>

            {/* Custom Input */}
            <TextField
              fullWidth
              multiline
              rows={3}
              variant="outlined"
              label="Type Custom Preview Text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              sx={{ mb: 4 }}
            />

            {/* Live Preview Pane */}
            <Box
              sx={{
                p: 3,
                minHeight: '180px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#f1f5f9',
                borderRadius: 3,
                border: '1.5px dashed #cbd5e1',
                mb: 4,
                overflow: 'hidden'
              }}
            >
              <Typography
                sx={{
                  fontFamily: fontFamily === 'Inter' ? '"Inter", sans-serif' : '"Outfit", sans-serif',
                  fontWeight: Number(fontWeight),
                  fontSize: `${fontSize}px`,
                  letterSpacing: `${letterSpacing}em`,
                  lineHeight: lineHeight,
                  fontStyle: fontStyle,
                  textAlign: 'center',
                  wordBreak: 'break-word',
                  transition: 'all 0.15s ease',
                  color: 'text.primary'
                }}
              >
                {text || 'Type something to preview...'}
              </Typography>
            </Box>

            {/* Control Dashboard */}
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FormControl fullWidth>
                  <InputLabel>Font Family</InputLabel>
                  <Select
                    value={fontFamily}
                    label="Font Family"
                    onChange={(e) => setFontFamily(e.target.value)}
                  >
                    <MenuItem value="Inter">Inter (Local Font Files)</MenuItem>
                    <MenuItem value="Outfit">Outfit (Google Font)</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <FormControl fullWidth>
                  <InputLabel>Font Weight</InputLabel>
                  <Select
                    value={fontWeight}
                    label="Font Weight"
                    onChange={(e) => setFontWeight(e.target.value)}
                  >
                    {weights.map((w) => (
                      <MenuItem key={w.value} value={w.value}>
                        {w.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Stack spacing={0.5}>
                  <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                    Font Style
                  </Typography>
                  <ToggleButtonGroup
                    value={fontStyle}
                    exclusive
                    onChange={(_, val) => val && setFontStyle(val)}
                    size="small"
                    fullWidth
                  >
                    <ToggleButton value="normal">Normal</ToggleButton>
                    <ToggleButton value="italic" sx={{ fontStyle: 'italic' }}>
                      Italic
                    </ToggleButton>
                  </ToggleButtonGroup>
                </Stack>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, display: 'block', mb: 1 }}>
                  Font Size ({fontSize}px)
                </Typography>
                <Slider
                  min={12}
                  max={80}
                  value={fontSize}
                  onChange={(_, val) => setFontSize(val as number)}
                  valueLabelDisplay="auto"
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, display: 'block', mb: 1 }}>
                  Letter Spacing ({letterSpacing}em)
                </Typography>
                <Slider
                  min={-0.05}
                  max={0.2}
                  step={0.01}
                  value={letterSpacing}
                  onChange={(_, val) => setLetterSpacing(val as number)}
                  valueLabelDisplay="auto"
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, display: 'block', mb: 1 }}>
                  Line Height ({lineHeight})
                </Typography>
                <Slider
                  min={0.8}
                  max={2.5}
                  step={0.1}
                  value={lineHeight}
                  onChange={(_, val) => setLineHeight(val as number)}
                  valueLabelDisplay="auto"
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Weights Showcase & System Scales (Right Panel) */}
        <Grid size={{ xs: 12, lg: 5 }}>
          <Paper sx={{ p: 4, borderRadius: 4, height: '100%' }}>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
              <Settings color="primary" /> Font Weight Visualizer (Inter Local)
            </Typography>

            <Stack spacing={2.5}>
              {weights.map((w) => (
                <Box key={w.value}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="caption" color="text.secondary">
                      {w.label}
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      fontFamily: '"Inter", sans-serif',
                      fontWeight: Number(w.value),
                      fontSize: '1.25rem',
                      lineHeight: 1.2
                    }}
                  >
                    VibeApp Design System
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Paper>
        </Grid>

        {/* System Scale Catalog */}
        <Grid size={{ xs: 12 }}>
          <Paper sx={{ p: 4, borderRadius: 4 }}>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 4, display: 'flex', alignItems: 'center', gap: 1 }}>
              <FormatSize color="primary" /> Boilerplate Theme Scale Catalog
            </Typography>

            <Stack spacing={3}>
              {scaleElements.map((el, index) => (
                <Box key={index}>
                  <Grid container spacing={2} sx={{ alignItems: 'center' }}>
                    <Grid size={{ xs: 12, md: 3 }}>
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', fontWeight: 700 }}>
                        {el.label}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {el.desc}
                      </Typography>
                    </Grid>
                    <Grid size={{ xs: 12, md: 9 }}>
                      <Typography variant={el.variant}>
                        Modern UI experiences must feel extremely premium
                      </Typography>
                    </Grid>
                  </Grid>
                  {index < scaleElements.length - 1 && <Divider sx={{ mt: 3 }} />}
                </Box>
              ))}
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TypographyShowcase;
