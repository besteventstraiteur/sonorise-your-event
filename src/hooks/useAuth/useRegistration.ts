
import { useState } from 'react';
import { User } from '@/types/auth';
import { MOCK_USERS } from '@/data/mockUsers';

export const useRegistration = () => {
  const [loading, setLoading] = useState(false);

  const register = async (name: string, email: string, password: string): Promise<User | null> => {
    setLoading(true);
    try {
      if (MOCK_USERS.some((u) => u.email === email)) {
        throw new Error("Cet email est déjà utilisé");
      }

      const newUser = {
        id: `mock-${Date.now()}`,
        name,
        email,
        role: 'customer' as const
      };
      
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      return newUser;
      
    } catch (error) {
      console.error("Erreur d'inscription:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    register,
    loading
  };
};
