
import React, { useState } from 'react';
import { Routes, Route, NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { 
  ChevronRight,
  LayoutDashboard,
  Users,
  Calendar,
  ShoppingCart,
  Package,
  Truck,
  Settings,
  BarChart,
  LogOut
} from 'lucide-react';

// Sous-pages
import AdminOverview from './AdminOverview';
import AdminCustomers from './AdminCustomers';
import AdminOrders from './AdminOrders';
import AdminCalendar from './AdminCalendar';
import AdminInventory from './AdminInventory';

const AdminDashboard = () => {
  const { currentUser, logout } = useAuth();
  const location = useLocation();

  const navigationItems = [
    { path: '/admin', name: 'Tableau de bord', icon: <LayoutDashboard className="h-5 w-5" /> },
    { path: '/admin/clients', name: 'Clients', icon: <Users className="h-5 w-5" /> },
    { path: '/admin/commandes', name: 'Commandes', icon: <ShoppingCart className="h-5 w-5" /> },
    { path: '/admin/calendrier', name: 'Calendrier', icon: <Calendar className="h-5 w-5" /> },
    { path: '/admin/stock', name: 'Inventaire', icon: <Package className="h-5 w-5" /> },
  ];

  const isActive = (path: string) => {
    if (path === '/admin') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white min-h-screen border-r shadow-sm fixed left-0 top-0 pt-16">
          <div className="p-4 border-b">
            <div className="flex items-center space-x-3">
              <div className="bg-pink-100 rounded-full p-2">
                <BarChart className="h-5 w-5 text-pink-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Administration</p>
                <p className="text-xs text-gray-500">{currentUser?.name}</p>
              </div>
            </div>
          </div>
          
          <nav className="p-4 space-y-1">
            {navigationItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    "flex items-center space-x-3 px-3 py-2 rounded-md transition-colors",
                    isActive(item.path)
                      ? "bg-pink-50 text-pink-600"
                      : "hover:bg-gray-50 text-gray-700"
                  )
                }
                end={item.path === '/admin'}
              >
                {item.icon}
                <span className="text-sm">{item.name}</span>
              </NavLink>
            ))}
            
            <div className="pt-4 border-t mt-4">
              <NavLink
                to="/admin/parametres"
                className={({ isActive }) =>
                  cn(
                    "flex items-center space-x-3 px-3 py-2 rounded-md transition-colors",
                    isActive
                      ? "bg-pink-50 text-pink-600"
                      : "hover:bg-gray-50 text-gray-700"
                  )
                }
              >
                <Settings className="h-5 w-5" />
                <span className="text-sm">Paramètres</span>
              </NavLink>
              
              <button
                onClick={logout}
                className="flex w-full items-center space-x-3 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <LogOut className="h-5 w-5" />
                <span className="text-sm">Déconnexion</span>
              </button>
            </div>
          </nav>
        </div>
        
        {/* Contenu principal */}
        <div className="ml-64 flex-1 pt-16">
          <div className="p-6">
            <div className="flex items-center text-sm text-gray-500 mb-8">
              <NavLink to="/" className="hover:text-pink-500">Accueil</NavLink>
              <ChevronRight className="h-4 w-4 mx-2" />
              <NavLink to="/admin" className="hover:text-pink-500">Administration</NavLink>
              {location.pathname !== '/admin' && (
                <>
                  <ChevronRight className="h-4 w-4 mx-2" />
                  <span className="text-pink-500">
                    {navigationItems.find(item => location.pathname.startsWith(item.path))?.name || ''}
                  </span>
                </>
              )}
            </div>
            
            <Routes>
              <Route path="/" element={<AdminOverview />} />
              <Route path="/clients" element={<AdminCustomers />} />
              <Route path="/commandes" element={<AdminOrders />} />
              <Route path="/calendrier" element={<AdminCalendar />} />
              <Route path="/stock" element={<AdminInventory />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
