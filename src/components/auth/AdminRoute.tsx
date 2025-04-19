
import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const { isAdmin, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  // Logging pour débogage
  console.log("AdminRoute - Auth state:", { isAdmin, isAuthenticated, loading });

  useEffect(() => {
    // Si l'utilisateur est authentifié mais n'est pas admin, afficher un toast
    if (isAuthenticated && !isAdmin && !loading) {
      toast.error("Accès refusé. Vous n'avez pas les droits d'administration.");
    }
  }, [isAuthenticated, isAdmin, loading]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Chargement...</div>;
  }

  // Si l'utilisateur n'est pas authentifié, rediriger vers la page de connexion
  if (!isAuthenticated) {
    console.log("User is not authenticated, redirecting to login");
    return <Navigate to="/login" />;
  }

  // Si l'utilisateur est authentifié mais n'est pas admin, rediriger vers l'accueil
  if (!isAdmin) {
    console.log("User is authenticated but not admin, redirecting to home");
    return <Navigate to="/" />;
  }

  console.log("User is admin, rendering admin content");
  return <>{children}</>;
};

export default AdminRoute;
