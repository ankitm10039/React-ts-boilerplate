import { create } from 'zustand';

interface AppState {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (isOpen: boolean) => void;
  notificationsCount: number;
  incrementNotifications: () => void;
  clearNotifications: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  isSidebarOpen: false,
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  setSidebarOpen: (isOpen) => set({ isSidebarOpen: isOpen }),
  notificationsCount: 2, // Dummy initial notifications
  incrementNotifications: () => set((state) => ({ notificationsCount: state.notificationsCount + 1 })),
  clearNotifications: () => set({ notificationsCount: 0 }),
}));
