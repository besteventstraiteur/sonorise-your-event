
import { useState } from 'react';
import { User } from '@/types/auth';
import { MOCK_USERS } from '@/data/mockUsers';

export const useAuthentication = () => {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const mockUser = MOCK_USERS.find(
        (u) => u.email === email && u.password === password
      );

      if (!mockUser) {
        throw new Error("Email ou mot de passe incorrect");
      }

      const { password: _, ...userWithoutPassword } = mockUser;
      console.log("User logged in:", userWithoutPassword);
      setCurrentUser(userWithoutPassword);
      
      localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
      
      return userWithoutPassword;
    } catch (error) {
      console.error("Erreur de connexion:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setCurrentUser(null);
      localStorage.removeItem('currentUser');
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    }
  };

  return {
    currentUser,
    setCurrentUser,
    loading,
    setLoading,
    login,
    logout
  };
};
