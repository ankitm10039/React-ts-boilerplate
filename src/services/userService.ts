import axiosInstance from '../api/axiosInstance';
import type { User } from '../context/AuthContext';

export const userService = {
  /**
   * Fetch list of users
   */
  getUsers: async (): Promise<User[]> => {
    const response = await axiosInstance.get('/users');
    return response.data;
  },

  /**
   * Update user info
   */
  updateUser: async (id: string, data: Partial<User>): Promise<User> => {
    const response = await axiosInstance.patch(`/users/${id}`, data);
    return response.data;
  },
};
