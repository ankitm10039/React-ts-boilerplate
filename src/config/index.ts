/**
 * Global configuration settings for the application.
 * All environment variables are validated and centralized here.
 */
export const CONFIG = {
  APP_NAME: 'VibeApp',
  ENV: import.meta.env.MODE || 'development',
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'https://api.example.com',
  API_TIMEOUT: 10000,
  
  // Feature flags
  FEATURES: {
    MAINTENANCE_MODE: false,
    ENABLE_SIGNUP: true,
  },
  
  // Storage keys
  STORAGE_KEYS: {
    AUTH_TOKEN: 'vibe_auth_token',
    USER_DATA: 'vibe_user_data',
    THEME_MODE: 'vibe_theme_mode',
  },
} as const;

export type AppConfig = typeof CONFIG;
