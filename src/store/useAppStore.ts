import { create } from 'zustand';

export type ToastType = 'success' | 'warning' | 'error' | 'info';

export interface Toast {
  id: string;
  type: ToastType;
  label: string;
  message: string;
  timestamp: string;
}

interface AppState {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (isOpen: boolean) => void;
  notificationsCount: number;
  incrementNotifications: () => void;
  clearNotifications: () => void;
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id' | 'timestamp'>) => void;
  removeToast: (id: string) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  isSidebarOpen: false,
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  setSidebarOpen: (isOpen) => set({ isSidebarOpen: isOpen }),

  notificationsCount: 2,
  incrementNotifications: () => {
    set((state) => ({ notificationsCount: state.notificationsCount + 1 }));
    get().addToast({
      type: 'success',
      label: '[success]',
      message: `Alert added. Total alerts: ${get().notificationsCount}.`,
    });
  },
  clearNotifications: () => {
    set({ notificationsCount: 0 });
    get().addToast({
      type: 'info',
      label: '[info]',
      message: 'All notifications cleared. Count reset to 0.',
    });
  },

  toasts: [],
  addToast: (toast) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    const timestamp = new Date().toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
    const newToast: Toast = { ...toast, id, timestamp };
    set((state) => ({
      toasts: [newToast, ...state.toasts].slice(0, 4),
    }));
    setTimeout(() => get().removeToast(id), 5000);
  },
  removeToast: (id) =>
    set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
}));
