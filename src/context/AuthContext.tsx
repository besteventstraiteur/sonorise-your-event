import React, { createContext, useContext, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { AuthContextType } from '@/types/auth';
import { useAuthActions } from '@/hooks/useAuthActions';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const {
    currentUser,
    setCurrentUser,
    loading,
    setLoading,
    login,
    register,
    logout
  } = useAuthActions();

  useEffect(() => {
    const setupAuthListener = async () => {
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        (_event, session) => {
          if (session?.user) {
            const mockUser = MOCK_USERS.find(u => u.email === session.user.email);
            if (mockUser) {
              const { password: _, ...userWithoutPassword } = mockUser;
              console.log("Setting current user from session:", userWithoutPassword);
              setCurrentUser(userWithoutPassword);
            } else {
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

      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const mockUser = MOCK_USERS.find(u => u.email === session.user.email);
        if (mockUser) {
          const { password: _, ...userWithoutPassword } = mockUser;
          console.log("Setting current user from initial session:", userWithoutPassword);
          setCurrentUser(userWithoutPassword);
        } else {
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
  }, [setCurrentUser, setLoading]);

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
  }, [setCurrentUser, setLoading]);

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
