
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

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

  // Configuration de l'écouteur d'état d'authentification
  useEffect(() => {
    const setupAuthListener = async () => {
      // Configuration de l'écouteur de changement d'état d'authentification
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        (_event, session) => {
          if (session?.user) {
            // Pour la démo, convertir l'utilisateur Supabase en notre type User
            const mockUser = MOCK_USERS.find(u => u.email === session.user.email);
            if (mockUser) {
              const { password: _, ...userWithoutPassword } = mockUser;
              console.log("Setting current user from session:", userWithoutPassword);
              setCurrentUser(userWithoutPassword);
            } else {
              // Par défaut, définir le rôle "customer" si non trouvé dans les données fictives
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

      // Vérification de la session existante
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        // Pour la démo, convertir l'utilisateur Supabase en notre type User
        const mockUser = MOCK_USERS.find(u => u.email === session.user.email);
        if (mockUser) {
          const { password: _, ...userWithoutPassword } = mockUser;
          console.log("Setting current user from initial session:", userWithoutPassword);
          setCurrentUser(userWithoutPassword);
        } else {
          // Par défaut, définir le rôle "customer" si non trouvé dans les données fictives
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
      // Pour la démo, vérifier d'abord les utilisateurs fictifs
      const mockUser = MOCK_USERS.find(
        (u) => u.email === email && u.password === password
      );

      if (!mockUser) {
        throw new Error("Email ou mot de passe incorrect");
      }

      // Pour la démo, simuler une connexion réussie sans appeler Supabase
      const { password: _, ...userWithoutPassword } = mockUser;
      console.log("User logged in:", userWithoutPassword);
      setCurrentUser(userWithoutPassword);
      
      // Stockez l'utilisateur dans localStorage pour simuler une session persistante
      localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
      
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
      // Pour la démo, simuler un enregistrement réussi
      const newUser = {
        id: `mock-${Date.now()}`,
        name,
        email,
        role: 'customer' as UserRole
      };
      
      setCurrentUser(newUser);
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      
    } catch (error) {
      console.error("Erreur d'inscription:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      // Dans une application réelle, nous utiliserions supabaseClient.auth.signOut()
      // Pour la démo, simplement effacer l'utilisateur
      setCurrentUser(null);
      localStorage.removeItem('currentUser');
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    }
  };

  // Vérifier si un utilisateur est stocké dans localStorage au chargement initial
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        console.log("Loaded user from localStorage:", parsedUser);
        setCurrentUser(parsedUser);
      } catch (e) {
        localStorage.removeItem('currentUser');
      }
    }
    setLoading(false);
  }, []);

  const isAuthenticated = !!currentUser;
  const isAdmin = currentUser?.role === 'admin';

  console.log("Auth context values:", { isAuthenticated, isAdmin, currentUser });

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
