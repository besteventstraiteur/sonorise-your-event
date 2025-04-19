
import React from 'react';
import { Routes, Route, NavLink, Navigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Package, LifeBuoy } from 'lucide-react';
import CustomerDashboard from './CustomerDashboard';
import CustomerOrders from './CustomerOrders';
import CustomerSav from './CustomerSav';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';

const CustomerAccount: React.FC = () => {
  const { logout } = useAuth();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-8">
          {/* Sidebar */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h2 className="text-xl font-semibold mb-6 text-gray-800">Mon Compte</h2>
            <nav className="space-y-1">
              <NavLink 
                to="/mon-compte" 
                end
                className={({ isActive }) => cn(
                  "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                  isActive 
                    ? "bg-pink-50 text-pink-700" 
                    : "text-gray-700 hover:bg-pink-50 hover:text-pink-700"
                )}
              >
                <User className="mr-3 h-5 w-5" />
                Tableau de bord
              </NavLink>
              <NavLink 
                to="/mon-compte/commandes" 
                className={({ isActive }) => cn(
                  "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                  isActive 
                    ? "bg-pink-50 text-pink-700" 
                    : "text-gray-700 hover:bg-pink-50 hover:text-pink-700"
                )}
              >
                <Package className="mr-3 h-5 w-5" />
                Mes commandes
              </NavLink>
              <NavLink 
                to="/mon-compte/sav" 
                className={({ isActive }) => cn(
                  "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                  isActive 
                    ? "bg-pink-50 text-pink-700" 
                    : "text-gray-700 hover:bg-pink-50 hover:text-pink-700"
                )}
              >
                <LifeBuoy className="mr-3 h-5 w-5" />
                Service après-vente
              </NavLink>
              <div className="pt-4 mt-4 border-t border-gray-200">
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-3 py-2 text-sm font-medium rounded-md text-red-700 hover:bg-red-50 transition-colors"
                >
                  Se déconnecter
                </button>
              </div>
            </nav>
          </div>
          
          {/* Main content */}
          <motion.div 
            className="bg-white rounded-lg shadow-sm p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Routes>
              <Route path="/" element={<CustomerDashboard />} />
              <Route path="/commandes" element={<CustomerOrders />} />
              <Route path="/sav" element={<CustomerSav />} />
              <Route path="*" element={<Navigate to="/mon-compte" replace />} />
            </Routes>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CustomerAccount;
