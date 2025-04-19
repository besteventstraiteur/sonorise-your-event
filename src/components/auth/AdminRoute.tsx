
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const { isAdmin, loading } = useAuth();

  // Add debugging console.log
  console.log("AdminRoute check - isAdmin:", isAdmin, "loading:", loading);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Chargement...</div>;
  }

  if (!isAdmin) {
    console.log("User is not admin, redirecting to home");
    return <Navigate to="/" />;
  }

  console.log("User is admin, rendering admin content");
  return <>{children}</>;
};

export default AdminRoute;
