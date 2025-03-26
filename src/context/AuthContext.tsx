
import React, { createContext, useContext, useState, useEffect } from 'react';

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
  logout: () => void;
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

  // Vérifier s'il y a un utilisateur en session au chargement
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Simuler une API d'authentification
      const user = MOCK_USERS.find(
        (u) => u.email === email && u.password === password
      );

      if (!user) {
        throw new Error("Email ou mot de passe incorrect");
      }

      // Omettre le mot de passe pour la sécurité
      const { password: _, ...userWithoutPassword } = user;
      setCurrentUser(userWithoutPassword);
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

      // Simuler l'enregistrement d'un nouvel utilisateur
      const newUser = {
        id: `${MOCK_USERS.length + 1}`,
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

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
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
