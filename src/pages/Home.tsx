import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  IconButton,
  LinearProgress,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
} from '@mui/material';
import { Add, Delete, Close, ContentCopy, Check, Download, Terminal } from '@mui/icons-material';

interface Widget {
  id: string;
  title: string;
  type: 'STAT' | 'PROGRESS' | 'LIST' | 'SPARKLINE';
  value: string;
  subtitle: string;
  color: string;
  badge?: string;
  badgeColor?: string;
  // For lists (dependency analytics)
  listData?: { label: string; val: string }[];
}

export const Home: React.FC = () => {
  // Toast visibility
  const [showToasts, setShowToasts] = useState(true);

  // Copy & Download States
  const [copied, setCopied] = useState(false);

  const handleCopyCommand = () => {
    navigator.clipboard.writeText('git clone https://bitbucket.org/ankitm10039/react-ts-boilerplate.git');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadZip = () => {
    // Generate a minimal valid 22-byte base64 ZIP file
    const base64Zip = "UEsFBgAAAAAAAAAAAAAAAAAAAAAAAA==";
    const byteCharacters = atob(base64Zip);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'application/zip' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'react-ts-boilerplate.zip';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Dynamic widgets state list
  const [widgets, setWidgets] = useState<Widget[]>([
    {
      id: 'traffic',
      title: 'LIVE TRAFFIC',
      type: 'SPARKLINE',
      value: '842.1 Mb/s',
      subtitle: 'Active bandwidth load',
      color: '#0062ff',
    },
    {
      id: 'latency',
      title: 'API LATENCY',
      type: 'SPARKLINE',
      value: '24.2 ms',
      subtitle: 'Average response time',
      color: '#10b981',
    },
    {
      id: 'cpu',
      title: 'CPU LOAD',
      type: 'PROGRESS',
      value: '12.4',
      subtitle: 'Core processors activity',
      color: '#0062ff',
    },
    {
      id: 'ram',
      title: 'MEM USAGE',
      type: 'PROGRESS',
      value: '26',
      subtitle: '4.2 GB / 16.0 GB used',
      color: '#0062ff',
    },
    {
      id: 'storage',
      title: 'DISK CAPACITY',
      type: 'PROGRESS',
      value: '45',
      subtitle: '9.0 TB / 20.0 TB used',
      color: '#f59e0b',
    },
    {
      id: 'sessions',
      title: 'ACTIVE CLIENT SESSIONS',
      type: 'STAT',
      value: '1,290 Users',
      subtitle: 'Real-time online connections',
      color: '#10b981',
      badge: 'ONLINE',
      badgeColor: '#10b981',
    },
    {
      id: 'template',
      title: 'TEMPLATE SETUP',
      type: 'STAT',
      value: '12,842',
      subtitle: 'Initialized projects setups',
      color: '#0f172a',
      badge: 'ACTIVE',
      badgeColor: '#0062ff',
    },
    {
      id: 'perf',
      title: 'PERFORMANCE VELOCITY',
      type: 'STAT',
      value: '3.8x Faster',
      subtitle: 'Vite HMR vs Webpack build',
      color: '#10b981',
      badge: '+340%',
      badgeColor: '#10b981',
    },
    {
      id: 'deps',
      title: 'DEPENDENCY DOWNLOADS',
      type: 'LIST',
      value: '',
      subtitle: 'Core package downloads',
      color: '#cbd5e1',
      listData: [
        { label: 'React 19 & DOM', val: '18.4M/mo' },
        { label: 'Zustand 5 (State)', val: '3.5M/mo' },
        { label: 'TanStack Query v5', val: '4.8M/mo' },
        { label: 'Material UI v6', val: '6.2M/mo' },
        { label: 'Axios Client', val: '28.1M/mo' },
      ],
    },
    {
      id: 'deployments',
      title: 'RECENT DEPLOYMENTS',
      type: 'LIST',
      value: '',
      subtitle: 'Git action pipelines',
      color: '#0062ff',
      listData: [
        { label: 'feat: auth handler', val: 'SUCCESS' },
        { label: 'fix: memory leak', val: 'SUCCESS' },
        { label: 'refactor: sidebar logic', val: 'SUCCESS' },
        { label: 'build: prod bundle', val: 'SUCCESS' },
      ],
    },
  ]);

  // Dialog States
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newType, setNewType] = useState<'STAT' | 'PROGRESS' | 'LIST' | 'SPARKLINE'>('STAT');
  const [newValue, setNewValue] = useState('');
  const [newSubtitle, setNewSubtitle] = useState('');
  const [newColor, setNewColor] = useState('#0062ff');
  const [newBadge, setNewBadge] = useState('');
  
  // Custom items list for LIST type dialog input
  const [listInput, setListInput] = useState('');

  const handleAddWidget = () => {
    if (!newTitle.trim()) return;

    let parsedList: { label: string; val: string }[] = [];
    if (newType === 'LIST' && listInput.trim()) {
      // Split list inputs by comma/newline
      parsedList = listInput.split(',').map((item) => {
        const parts = item.split(':');
        return {
          label: parts[0]?.trim() || 'Item',
          val: parts[1]?.trim() || 'N/A',
        };
      });
    }

    const newWidget: Widget = {
      id: Date.now().toString(),
      title: newTitle.toUpperCase(),
      type: newType,
      value: newValue,
      subtitle: newSubtitle,
      color: newColor,
      badge: newBadge ? newBadge : undefined,
      badgeColor: newColor,
      listData: newType === 'LIST' ? parsedList : undefined,
    };

    setWidgets([...widgets, newWidget]);
    resetForm();
  };

  const handleDeleteWidget = (id: string) => {
    setWidgets(widgets.filter((w) => w.id !== id));
  };

  const resetForm = () => {
    setNewTitle('');
    setNewType('STAT');
    setNewValue('');
    setNewSubtitle('');
    setNewColor('#0062ff');
    setNewBadge('');
    setListInput('');
    setOpenAddDialog(false);
  };

  return (
    <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: 3, position: 'relative' }}>
      
      {/* CONTROL BAR */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', fontFamily: 'Outfit, sans-serif' }}>
            Operational Control Grid
          </Typography>
          <Typography variant="body2" sx={{ color: '#64748b', fontFamily: 'Outfit, sans-serif' }}>
            Build telemetry and custom data cards
          </Typography>
        </Box>

        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={() => setOpenAddDialog(true)}
          sx={{
            borderRadius: '24px',
            textTransform: 'none',
            fontSize: '12px',
            fontWeight: 700,
            px: 3,
            fontFamily: 'Outfit, sans-serif',
          }}
        >
          Add Custom Widget
        </Button>
      </Box>
      {/* FIRST-TIME SETUP BANNER */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: '8px',
          border: '1px solid #e2e8f0',
          backgroundColor: '#f8fafc',
          background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 2 }}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 800, color: '#0f172a', fontFamily: 'Outfit, sans-serif' }}>
              🚀 First-Time Project Setup & Control
            </Typography>
            <Typography variant="body2" sx={{ color: '#64748b', mt: 0.5, fontFamily: 'Outfit, sans-serif' }}>
              Follow these simple steps to run this React-TS-Vite application boilerplate locally.
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
            <Button
              variant="outlined"
              color="primary"
              startIcon={copied ? <Check /> : <ContentCopy />}
              onClick={handleCopyCommand}
              sx={{
                borderRadius: '24px',
                textTransform: 'none',
                fontSize: '12px',
                fontWeight: 700,
                px: 2.5,
                borderColor: '#cbd5e1',
                color: '#334155',
                bgcolor: '#ffffff',
                fontFamily: 'Outfit, sans-serif',
                '&:hover': {
                  borderColor: '#0f172a',
                  bgcolor: '#f1f5f9',
                },
              }}
            >
              {copied ? 'Copied Clone Command' : 'Copy Clone Command'}
            </Button>
            
            <Button
              variant="contained"
              color="secondary"
              startIcon={<Download />}
              onClick={handleDownloadZip}
              sx={{
                borderRadius: '24px',
                textTransform: 'none',
                fontSize: '12px',
                fontWeight: 700,
                px: 2.5,
                bgcolor: '#0f172a',
                color: '#ffffff',
                fontFamily: 'Outfit, sans-serif',
                '&:hover': {
                  bgcolor: '#1e293b',
                },
              }}
            >
              Download Project ZIP
            </Button>
          </Box>
        </Box>

        <Grid container spacing={3} sx={{ mt: 0.5 }}>
          {/* STEP 1 */}
          <Grid item xs={12} sm={4}>
            <Box sx={{ p: 2, bgcolor: '#ffffff', borderRadius: '6px', border: '1px solid #e2e8f0', height: '100%' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <Box sx={{ width: 22, height: 22, borderRadius: '50%', bgcolor: '#dbeafe', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 800 }}>1</Box>
                <Typography sx={{ fontSize: '12px', fontWeight: 800, color: '#1e293b', fontFamily: 'Outfit, sans-serif' }}>Clone Repository</Typography>
              </Box>
              <Typography sx={{ fontSize: '11px', color: '#64748b', fontFamily: 'Outfit, sans-serif', mb: 1 }}>Clone the template using your preferred git workflow:</Typography>
              <Box sx={{ p: 1, bgcolor: '#f1f5f9', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography sx={{ fontSize: '10px', fontFamily: 'monospace', color: '#0f172a', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  git clone ...repo.git
                </Typography>
                <IconButton size="small" onClick={handleCopyCommand} sx={{ p: 0.25 }}>
                  <ContentCopy sx={{ fontSize: 12, color: '#64748b' }} />
                </IconButton>
              </Box>
            </Box>
          </Grid>

          {/* STEP 2 */}
          <Grid item xs={12} sm={4}>
            <Box sx={{ p: 2, bgcolor: '#ffffff', borderRadius: '6px', border: '1px solid #e2e8f0', height: '100%' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <Box sx={{ width: 22, height: 22, borderRadius: '50%', bgcolor: '#dbeafe', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 800 }}>2</Box>
                <Typography sx={{ fontSize: '12px', fontWeight: 800, color: '#1e293b', fontFamily: 'Outfit, sans-serif' }}>Install Dependencies</Typography>
              </Box>
              <Typography sx={{ fontSize: '11px', color: '#64748b', fontFamily: 'Outfit, sans-serif', mb: 1 }}>Open the folder and download the node modules packages:</Typography>
              <Box sx={{ p: 1, bgcolor: '#f1f5f9', borderRadius: '4px', display: 'flex', alignItems: 'center' }}>
                <Typography sx={{ fontSize: '10px', fontFamily: 'monospace', color: '#0f172a' }}>
                  npm install
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* STEP 3 */}
          <Grid item xs={12} sm={4}>
            <Box sx={{ p: 2, bgcolor: '#ffffff', borderRadius: '6px', border: '1px solid #e2e8f0', height: '100%' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <Box sx={{ width: 22, height: 22, borderRadius: '50%', bgcolor: '#dbeafe', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 800 }}>3</Box>
                <Typography sx={{ fontSize: '12px', fontWeight: 800, color: '#1e293b', fontFamily: 'Outfit, sans-serif' }}>Run Dev Server</Typography>
              </Box>
              <Typography sx={{ fontSize: '11px', color: '#64748b', fontFamily: 'Outfit, sans-serif', mb: 1 }}>Launch local live reloading development server environment:</Typography>
              <Box sx={{ p: 1, bgcolor: '#f1f5f9', borderRadius: '4px', display: 'flex', alignItems: 'center' }}>
                <Typography sx={{ fontSize: '10px', fontFamily: 'monospace', color: '#0f172a' }}>
                  npm run dev
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* DYNAMIC WIDGETS GRID */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(3, 1fr)' },
          gap: 3,
        }}
      >
        {widgets.map((widget) => (
          <Paper
            className="card-hover-kombai"
            elevation={0}
            key={widget.id}
            sx={{
              p: 2.5,
              border: '1px solid #e2e8f0',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              borderRadius: '8px',
              minHeight: 180,
              position: 'relative',
              transition: 'all 0.2s',
              backgroundColor: '#ffffff',
            }}
          >
            {/* Delete button on hover */}
            <IconButton
              size="small"
              onClick={() => handleDeleteWidget(widget.id)}
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                color: '#cbd5e1',
                '&:hover': { color: '#ef4444' },
              }}
            >
              <Delete fontSize="small" />
            </IconButton>

            {/* Title / Badge */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, mr: 3.5 }}>
              <Typography sx={{ fontSize: '10px', fontWeight: 800, color: '#64748b', fontFamily: 'Outfit, sans-serif', letterSpacing: '1px' }}>
                {widget.title}
              </Typography>
              {widget.badge && (
                <span
                  style={{
                    fontSize: '9px',
                    fontWeight: 'bold',
                    border: `1px solid ${widget.badgeColor || widget.color}`,
                    color: widget.badgeColor || widget.color,
                    padding: '1px 6px',
                    borderRadius: '2px',
                    fontFamily: 'Outfit, sans-serif',
                  }}
                >
                  {widget.badge}
                </span>
              )}
            </Box>

            {/* Content Switcher */}
            <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              {widget.type === 'STAT' && (
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 850, color: '#0f172a', fontFamily: 'Outfit, sans-serif', mb: 0.5 }}>
                    {widget.value}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#94a3b8', fontFamily: 'Outfit, sans-serif' }}>
                    {widget.subtitle}
                  </Typography>
                </Box>
              )}

              {widget.type === 'PROGRESS' && (
                <Box sx={{ width: '100%' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: 'bold', mb: 0.5, fontFamily: 'Outfit, sans-serif' }}>
                    <span style={{ color: '#0f172a' }}>{widget.subtitle}</span>
                    <span style={{ color: widget.color }}>{widget.value}%</span>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={parseFloat(widget.value) || 0}
                    sx={{
                      height: 6,
                      backgroundColor: '#f1f5f9',
                      borderRadius: '3px',
                      '& .MuiLinearProgress-bar': { backgroundColor: widget.color },
                    }}
                  />
                </Box>
              )}

              {widget.type === 'SPARKLINE' && (
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 850, color: '#0f172a', fontFamily: 'Outfit, sans-serif', mb: 0.5 }}>
                    {widget.value}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#94a3b8', display: 'block', mb: 1.5, fontFamily: 'Outfit, sans-serif' }}>
                    {widget.subtitle}
                  </Typography>
                  <Box sx={{ height: 32, width: '100%' }}>
                    <svg width="100%" height="100%" viewBox="0 0 100 40" preserveAspectRatio="none">
                      <path d="M0 35 L15 28 L30 32 L45 15 L60 22 L75 5 L90 18 L100 8" fill="none" stroke={widget.color} strokeWidth="2.5" />
                    </svg>
                  </Box>
                </Box>
              )}

              {widget.type === 'LIST' && (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75, width: '100%', mt: 0.5 }}>
                  {widget.listData?.map((item, idx) => (
                    <Box key={idx} sx={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', fontFamily: 'Outfit, sans-serif' }}>
                      <span style={{ fontWeight: 'bold', color: '#334155' }}>{item.label}</span>
                      <span style={{ color: '#0062ff', fontWeight: 700 }}>{item.val}</span>
                    </Box>
                  ))}
                </Box>
              )}
            </Box>
          </Paper>
        ))}
      </Box>

      {/* ADD WIDGET DIALOG */}
      <Dialog open={openAddDialog} onClose={resetForm} fullWidth maxWidth="xs">
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: 'Outfit, sans-serif', fontWeight: 800 }}>
          Add custom widget card
          <IconButton size="small" onClick={resetForm}><Close /></IconButton>
        </DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, pt: 1 }}>
          <TextField
            label="Widget Title"
            fullWidth
            size="small"
            placeholder="e.g. Memory Load"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />

          <FormControl fullWidth size="small">
            <InputLabel>Widget Type</InputLabel>
            <Select
              value={newType}
              label="Widget Type"
              onChange={(e) => setNewType(e.target.value as Widget['type'])}
            >
              <MenuItem value="STAT">Stat Card (Big Value + Subtitle)</MenuItem>
              <MenuItem value="PROGRESS">Progress Indicator (0 - 100%)</MenuItem>
              <MenuItem value="SPARKLINE">Analytics (Value + Vector Chart)</MenuItem>
              <MenuItem value="LIST">Data list (Custom comma list)</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label={newType === 'PROGRESS' ? 'Value (0-100)' : 'Primary Value'}
            fullWidth
            size="small"
            placeholder="e.g. 78% or 12.8M/mo"
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
          />

          <TextField
            label={newType === 'PROGRESS' ? 'Progress Label' : 'Subtitle Description'}
            fullWidth
            size="small"
            placeholder="e.g. Monthly active downloads"
            value={newSubtitle}
            onChange={(e) => setNewSubtitle(e.target.value)}
          />

          {newType === 'STAT' && (
            <TextField
              label="Glow status badge tag"
              fullWidth
              size="small"
              placeholder="e.g. LIVE or +12%"
              value={newBadge}
              onChange={(e) => setNewBadge(e.target.value)}
            />
          )}

          {newType === 'LIST' && (
            <TextField
              label="List Elements (Label:Value, separated by comma)"
              fullWidth
              multiline
              rows={3}
              size="small"
              placeholder="Zustand:3.2M, React Query:4.8M"
              value={listInput}
              onChange={(e) => setListInput(e.target.value)}
            />
          )}

          <FormControl fullWidth size="small">
            <InputLabel>Color Scheme</InputLabel>
            <Select
              value={newColor}
              label="Color Scheme"
              onChange={(e) => setNewColor(e.target.value)}
            >
              <MenuItem value="#0062ff">Vibrant Blue</MenuItem>
              <MenuItem value="#10b981">Green Uptime</MenuItem>
              <MenuItem value="#f59e0b">Amber Warning</MenuItem>
              <MenuItem value="#ef4444">Critical Red</MenuItem>
              <MenuItem value="#0f172a">Dark Slate</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions sx={{ p: 2.5 }}>
          <Button onClick={resetForm} color="inherit" sx={{ fontWeight: 700 }}>Cancel</Button>
          <Button onClick={handleAddWidget} variant="contained" color="primary" sx={{ fontWeight: 700 }}>Add Card</Button>
        </DialogActions>
      </Dialog>

      {/* TOASTS ABSOLUTE CONTAINER */}
      {showToasts && (
        <Box
          sx={{
            position: 'fixed',
            bottom: 24,
            left: 80,
            display: 'flex',
            flexDirection: 'column',
            gap: 1.5,
            zIndex: 100,
          }}
        >
          {/* TOAST 1 */}
          <Box
            className="animate-slide-in-kombai"
            sx={{
              width: 288,
              backgroundColor: 'rgba(15, 23, 42, 0.95)',
              backdropFilter: 'blur(8px)',
              borderLeft: '4px solid #0062ff',
              p: 2.5,
              color: '#ffffff',
              display: 'flex',
              gap: 2,
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2)',
            }}
          >
            <Box sx={{ width: 32, height: 32, backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#10b981', display: 'flex', alignItems: 'center', justifyItems: 'center', justifyContent: 'center' }}>
              <i className="ti ti-check" style={{ fontSize: '18px' }} />
            </Box>
            <Box sx={{ flexGrow: 1 }}>
              <Typography sx={{ fontSize: '12px', fontWeight: 'bold', fontFamily: 'monospace', color: '#0062ff' }}>[SUCCESS]</Typography>
              <Typography sx={{ fontSize: '11px', color: '#94a3b8', mt: 0.5, fontFamily: 'monospace', lineHeight: 1.4 }}>
                Payload delivery confirmed. NodeID: <span style={{ color: '#0062ff' }}>42x-7B</span>. Latency: 4ms.
              </Typography>
            </Box>
            <IconButton size="small" onClick={() => setShowToasts(false)} sx={{ color: '#64748b', alignSelf: 'flex-start', p: 0 }}>
              <i className="ti ti-x" style={{ fontSize: '14px' }} />
            </IconButton>
          </Box>

          {/* TOAST 2 */}
          <Box
            className="animate-slide-in-kombai"
            sx={{
              width: 288,
              backgroundColor: 'rgba(15, 23, 42, 0.85)',
              backdropFilter: 'blur(8px)',
              borderLeft: '4px solid #f59e0b',
              p: 2.5,
              color: '#ffffff',
              display: 'flex',
              gap: 2,
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2)',
              opacity: 0.8,
              transform: 'scale(0.95)',
            }}
          >
            <Box sx={{ width: 32, height: 32, backgroundColor: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b', display: 'flex', alignItems: 'center', justifyItems: 'center', justifyContent: 'center' }}>
              <i className="ti ti-info-circle" style={{ fontSize: '18px' }} />
            </Box>
            <Box sx={{ flexGrow: 1 }}>
              <Typography sx={{ fontSize: '12px', fontWeight: 'bold', fontFamily: 'monospace', color: '#f59e0b' }}>[WARNING]</Typography>
              <Typography sx={{ fontSize: '11px', color: '#94a3b8', mt: 0.5, fontFamily: 'monospace', lineHeight: 1.4 }}>
                Buffer threshold at 85%. Automated scaling triggered.
              </Typography>
            </Box>
            <IconButton size="small" onClick={() => setShowToasts(false)} sx={{ color: '#64748b', alignSelf: 'flex-start', p: 0 }}>
              <i className="ti ti-x" style={{ fontSize: '14px' }} />
            </IconButton>
          </Box>
        </Box>
      )}

    </Box>
  );
};

export default Home;
