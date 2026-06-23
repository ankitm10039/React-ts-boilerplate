import axiosInstance from '../api/axiosInstance';
import type { User } from '../context/AuthContext';

interface LoginResponse {
  user: User;
  token: string;
}

export const authService = {
  /**
   * Dummy/Mock login API call
   */
  login: async (email: string, _password?: string): Promise<LoginResponse> => {
    // In production, replace with: const response = await axiosInstance.post('/auth/login', { email, password });
    // return response.data;
    
    // Simulating API latency
    await new Promise((resolve) => setTimeout(resolve, 800));
    
    return {
      user: {
        id: '1',
        name: email.split('@')[0],
        email,
        role: 'USER',
      },
      token: 'mock-jwt-token-string',
    };
  },

  /**
   * Fetch current user profile details
   */
  getProfile: async (): Promise<User> => {
    const response = await axiosInstance.get('/auth/profile');
    return response.data;
  },
};
