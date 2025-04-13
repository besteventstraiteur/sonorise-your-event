
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, supabaseClient } from '@/integrations/supabase/client';

export type UserRole = 'customer' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  address?: string;
}

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Données fictives pour la démo
const MOCK_USERS = [
  {
    id: '1',
    name: 'Admin Test',
    email: 'admin@sonorisation83.fr',
    password: 'admin123',
    role: 'admin' as UserRole,
    phone: '0123456789',
    address: '123 Admin Street'
  },
  {
    id: '2',
    name: 'Client Test',
    email: 'client@example.com',
    password: 'client123',
    role: 'customer' as UserRole,
    phone: '0987654321',
    address: '456 Client Avenue'
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Configure auth state listener
  useEffect(() => {
    const setupAuthListener = async () => {
      // Set up the auth state change listener
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        (_event, session) => {
          if (session?.user) {
            // For demo purposes, convert Supabase user to our User type
            // In a real app, we would fetch user details from a profiles table
            const mockUser = MOCK_USERS.find(u => u.email === session.user.email);
            if (mockUser) {
              const { password: _, ...userWithoutPassword } = mockUser;
              setCurrentUser(userWithoutPassword);
            } else {
              // Default to customer role if not found in mock data
              setCurrentUser({
                id: session.user.id,
                name: session.user.email?.split('@')[0] || 'User',
                email: session.user.email || '',
                role: 'customer'
              });
            }
          } else {
            setCurrentUser(null);
          }
          setLoading(false);
        }
      );

      // Check for existing session
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        // For demo purposes, convert Supabase user to our User type
        const mockUser = MOCK_USERS.find(u => u.email === session.user.email);
        if (mockUser) {
          const { password: _, ...userWithoutPassword } = mockUser;
          setCurrentUser(userWithoutPassword);
        } else {
          // Default to customer role if not found in mock data
          setCurrentUser({
            id: session.user.id,
            name: session.user.email?.split('@')[0] || 'User',
            email: session.user.email || '',
            role: 'customer'
          });
        }
      }
      setLoading(false);

      return () => {
        subscription.unsubscribe();
      };
    };

    setupAuthListener();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // For demo, find the mock user first
      const mockUser = MOCK_USERS.find(
        (u) => u.email === email && u.password === password
      );

      if (!mockUser) {
        throw new Error("Email ou mot de passe incorrect");
      }

      // In a real application, we would use Supabase auth
      const { error } = await supabaseClient.auth.signIn(email, password);
      
      if (error) throw error;
      
      // The auth state listener will update the user state
    } catch (error) {
      console.error("Erreur de connexion:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setLoading(true);
    try {
      // Vérifier si l'email existe déjà
      if (MOCK_USERS.some((u) => u.email === email)) {
        throw new Error("Cet email est déjà utilisé");
      }

      // In a real application, we would use Supabase auth
      const { error } = await supabaseClient.auth.signUp(email, password, {
        name: name
      });
      
      if (error) throw error;
      
      // The auth state listener will update the user state
    } catch (error) {
      console.error("Erreur d'inscription:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await supabaseClient.auth.signOut();
      // The auth state listener will update the user state
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    }
  };

  const isAuthenticated = !!currentUser;
  const isAdmin = currentUser?.role === 'admin';

  const value = {
    currentUser,
    isAuthenticated,
    isAdmin,
    login,
    register,
    logout,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
