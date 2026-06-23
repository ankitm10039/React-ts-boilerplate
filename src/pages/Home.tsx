import React, { useState } from 'react';
import { Box, Typography, Paper, Stack, Badge, IconButton } from '@mui/material';
import { Speed, Code, Router, SettingsInputComponent, Http, Add, Settings, Notifications, DeleteSweep } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

// Demonstration of Absolute Path Aliasing (@/*)
import { CONFIG } from '@/config';
import { formatDate } from '@/utils/format';
import { useAppStore } from '@/store/useAppStore';
import {
  CustomButton,
  CustomDialog,
  StatusBadge,
  DataTable,
  FormInput
} from '@/components/common';
import type { StatusType, Column } from '@/components/common';

// Define Validation Schema using Zod
const userSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  email: z.string().email('Please enter a valid email address'),
});

type UserFormValues = z.infer<typeof userSchema>;

interface DemoUser {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'pending' | 'inactive';
  registeredAt: string;
}

const Home: React.FC = () => {
  // Access Zustand Store State
  const { notificationsCount, incrementNotifications, clearNotifications } = useAppStore();

  const [users, setUsers] = useState<DemoUser[]>([
    {
      id: '1',
      name: 'Ankit Meena',
      email: 'ankit@example.com',
      role: 'ADMIN',
      status: 'active',
      registeredAt: '2026-06-20T10:00:00Z',
    },
    {
      id: '2',
      name: 'Jane Doe',
      email: 'jane@example.com',
      role: 'USER',
      status: 'pending',
      registeredAt: '2026-06-22T14:30:00Z',
    },
    {
      id: '3',
      name: 'John Smith',
      email: 'john@example.com',
      role: 'USER',
      status: 'inactive',
      registeredAt: '2026-06-15T09:15:00Z',
    },
  ]);

  const [openAddModal, setOpenAddModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize React Hook Form with Zod schema resolver
  const { control, handleSubmit, reset } = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: '',
      email: '',
    },
  });

  const onSubmit = (data: UserFormValues) => {
    setIsSubmitting(true);
    // Simulate API delay
    setTimeout(() => {
      const newUser: DemoUser = {
        id: (users.length + 1).toString(),
        name: data.name,
        email: data.email,
        role: 'USER',
        status: 'active',
        registeredAt: new Date().toISOString(),
      };
      setUsers([newUser, ...users]);
      setIsSubmitting(false);
      setOpenAddModal(false);
      reset(); // Reset form values
      incrementNotifications(); // Trigger Zustand Store Action
    }, 1000);
  };

  const columns: Column<DemoUser>[] = [
    { id: 'name', label: 'Name', minWidth: 150 },
    { id: 'email', label: 'Email', minWidth: 180 },
    { id: 'role', label: 'Role', minWidth: 100 },
    {
      id: 'status',
      label: 'Status',
      minWidth: 120,
      render: (row) => {
        const typeMap: Record<DemoUser['status'], StatusType> = {
          active: 'success',
          pending: 'warning',
          inactive: 'error',
        };
        return <StatusBadge label={row.status} type={typeMap[row.status]} />;
      },
    },
    {
      id: 'registeredAt',
      label: 'Registered On',
      minWidth: 150,
      render: (row) => formatDate(row.registeredAt),
    },
  ];

  const features = [
    {
      title: 'Vite Bundler',
      description: 'Blazing fast Hot Module Replacement (HMR) and instant server starts with Vite.',
      icon: <Speed sx={{ fontSize: 40, color: '#0062ff' }} />,
    },
    {
      title: 'Material UI (MUI)',
      description: 'Pre-configured with a clean light theme system, Outfit typography, and custom animations.',
      icon: <Code sx={{ fontSize: 40, color: '#0288d1' }} />,
    },
    {
      title: 'Axios Client',
      description: 'Pre-configured Axios instance ready for authorization interceptors and global error handling.',
      icon: <Http sx={{ fontSize: 40, color: '#10b981' }} />,
    },
    {
      title: 'React Router',
      description: 'Declarative routing with React Router DOM v6, nested layout support, and route guards.',
      icon: <Router sx={{ fontSize: 40, color: '#f59e0b' }} />,
    },
    {
      title: 'Scalable Architecture',
      description: 'Organized folders for API, custom components, page views, layouts, and route definitions.',
      icon: <SettingsInputComponent sx={{ fontSize: 40, color: '#6366f1' }} />,
    },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box sx={{ textAlign: 'center', py: 6, px: 2, mb: 6 }}>
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: '2.5rem', md: '4rem' },
            mb: 2,
            background: 'linear-gradient(135deg, #3b82f6 0%, #0062ff 50%, #0288d1 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          React + TypeScript Starter Template
        </Typography>
        <Typography
          variant="h5"
          color="text.secondary"
          sx={{ maxWidth: '700px', mx: 'auto', mb: 4, lineHeight: 1.6 }}
        >
          A highly optimized, production-ready React starter template built on Vite & Material UI.
          Configured with light theme aesthetics, Axios interceptors, custom hooks, and helpers.
        </Typography>
        <Stack direction="row" spacing={2} sx={{ justifyContent: 'center' }}>
          <CustomButton
            variant="contained"
            color="primary"
            size="large"
            href="https://github.com/ankitm10039/React-ts-boilerplate"
            target="_blank"
          >
            Get Started
          </CustomButton>
          <CustomButton
            variant="outlined"
            color="primary"
            size="large"
            href="https://vite.dev"
            target="_blank"
          >
            Documentation
          </CustomButton>
        </Stack>
      </Box>

      {/* Zustand Store State Showcase */}
      <Paper sx={{ p: 3, mb: 4, display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px solid rgba(0, 0, 0, 0.08)' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Badge badgeContent={notificationsCount} color="error" showZero>
            <Notifications color="action" />
          </Badge>
          <Typography variant="body1" sx={{ fontWeight: 600 }}>
            Zustand Store Notifications: {notificationsCount} active alerts
          </Typography>
        </Box>
        <Stack direction="row" spacing={1.5}>
          <CustomButton variant="outlined" size="small" onClick={incrementNotifications}>
            Add Mock Alert
          </CustomButton>
          <IconButton color="error" onClick={clearNotifications} size="small" title="Clear All">
            <DeleteSweep />
          </IconButton>
        </Stack>
      </Paper>

      {/* Global Config Section */}
      <Paper sx={{ p: 4, mb: 6, border: '1px solid rgba(0, 98, 255, 0.15)', background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)' }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: 1, color: '#0369a1' }}>
          <Settings /> Global configurations (Env & Props)
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Values below are fetched dynamically from the configuration manager linked with <code>.env</code> files.
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr 1fr' },
            gap: 3,
          }}
        >
          <Box>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>APPLICATION NAME</Typography>
            <Typography variant="body1" sx={{ fontWeight: 600 }}>{CONFIG.APP_NAME}</Typography>
          </Box>
          <Box>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>ENVIRONMENT</Typography>
            <Typography variant="body1" sx={{ fontWeight: 600, textTransform: 'capitalize' }}>{CONFIG.ENV}</Typography>
          </Box>
          <Box>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>API BASE URL</Typography>
            <Typography variant="body1" sx={{ fontWeight: 600, wordBreak: 'break-all' }}>{CONFIG.API_BASE_URL}</Typography>
          </Box>
        </Box>
      </Paper>

      {/* Live Component Demo Section */}
      <Box sx={{ mb: 8 }}>
        <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Dynamic Component Demos
          </Typography>
          <CustomButton
            variant="contained"
            color="primary"
            startIcon={<Add />}
            onClick={() => setOpenAddModal(true)}
          >
            Add New User
          </CustomButton>
        </Stack>

        <DataTable columns={columns} data={users} />
      </Box>

      {/* Core Features Grid */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" align="center" gutterBottom sx={{ mb: 4, fontWeight: 700 }}>
          Core Infrastructure
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
            gap: 4,
            justifyContent: 'center',
          }}
        >
          {features.map((feature, idx) => (
            <Paper
              key={idx}
              sx={{
                p: 4,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 12px 24px rgba(0, 0, 0, 0.08)',
                },
              }}
            >
              <Box>{feature.icon}</Box>
              <Typography variant="h5" sx={{ fontWeight: 650 }}>
                {feature.title}
              </Typography>
              <Typography color="text.secondary" variant="body2" sx={{ lineHeight: 1.6 }}>
                {feature.description}
              </Typography>
            </Paper>
          ))}
        </Box>
      </Box>

      {/* Add User Dialog with React Hook Form & Zod Schema Validation */}
      <CustomDialog
        open={openAddModal}
        onClose={() => {
          setOpenAddModal(false);
          reset();
        }}
        title="Create New User Account"
        onConfirm={handleSubmit(onSubmit)}
        confirmText="Save User"
        confirmLoading={isSubmitting}
      >
        <Stack spacing={3} sx={{ pt: 1 }}>
          <FormInput
            name="name"
            control={control}
            label="Full Name"
            placeholder="John Doe"
            required
          />
          <FormInput
            name="email"
            control={control}
            label="Email Address"
            type="email"
            placeholder="john@example.com"
            required
          />
        </Stack>
      </CustomDialog>
    </Box>
  );
};

export default Home;
