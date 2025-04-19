import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { 
  LayoutDashboard, 
  Users, 
  Package, 
  Calendar, 
  Boxes, 
  Settings,
  LogOut,
  LifeBuoy
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import AdminOverview from './AdminOverview';
import AdminCustomers from './AdminCustomers';
import AdminOrders from './AdminOrders';
import AdminCalendar from './AdminCalendar';
import AdminInventory from './AdminInventory';
import { motion } from 'framer-motion';

const AdminDashboard = () => {
  const location = useLocation();
  const { currentUser, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      // Redirect is handled by AuthContext
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    }
  };

  const navItems = [
    { id: 'overview', label: 'Tableau de bord', icon: <LayoutDashboard className="h-5 w-5" />, component: <AdminOverview /> },
    { id: 'customers', label: 'Clients', icon: <Users className="h-5 w-5" />, component: <AdminCustomers /> },
    { id: 'orders', label: 'Commandes', icon: <Package className="h-5 w-5" />, component: <AdminOrders /> },
    { id: 'calendar', label: 'Calendrier', icon: <Calendar className="h-5 w-5" />, component: <AdminCalendar /> },
    { id: 'inventory', label: 'Stock', icon: <Boxes className="h-5 w-5" />, component: <AdminInventory /> },
    { id: 'sav', label: 'SAV', icon: <LifeBuoy className="h-5 w-5" />, path: '/admin/sav' },
    { id: 'customizer', label: 'Personnalisation', icon: <Settings className="h-5 w-5" />, path: '/admin/customizer' }
  ];

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        <motion.div 
          className="bg-white rounded-xl shadow-sm overflow-hidden"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="grid grid-cols-1 md:grid-cols-[250px_1fr]">
            {/* Sidebar */}
            <div className="bg-gray-100 p-4">
              <div className="mb-6 p-4">
                <h2 className="text-lg font-semibold text-gray-800">Administration</h2>
                <div className="flex items-center mt-3 p-3 bg-white rounded-lg shadow-sm">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-pink-100 flex items-center justify-center text-pink-600">
                    {currentUser?.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-800">{currentUser?.name}</p>
                    <p className="text-xs text-gray-500">{currentUser?.email}</p>
                  </div>
                </div>
              </div>

              <nav className="space-y-1">
                {navItems.map((item) => {
                  const isActive = item.path 
                    ? location.pathname === item.path 
                    : activeTab === item.id;
                  
                  return item.path ? (
                    <Link 
                      key={item.id}
                      to={item.path}
                      className={cn(
                        "flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all",
                        isActive
                          ? "bg-pink-100 text-pink-800"
                          : "text-gray-700 hover:bg-pink-50 hover:text-pink-700"
                      )}
                    >
                      {item.icon}
                      <span className="ml-3">{item.label}</span>
                    </Link>
                  ) : (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={cn(
                        "w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all",
                        isActive
                          ? "bg-pink-100 text-pink-800"
                          : "text-gray-700 hover:bg-pink-50 hover:text-pink-700"
                      )}
                    >
                      {item.icon}
                      <span className="ml-3">{item.label}</span>
                    </button>
                  );
                })}

                <div className="pt-4 mt-4 border-t border-gray-200">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-700 transition-all"
                  >
                    <LogOut className="h-5 w-5" />
                    <span className="ml-3">Déconnexion</span>
                  </button>
                </div>
              </nav>
            </div>

            {/* Main Content */}
            <div className="p-6">
              {location.pathname === '/admin' && (
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsContent value="overview" className="mt-0">
                    <motion.div variants={itemVariants}>{navItems[0].component}</motion.div>
                  </TabsContent>
                  <TabsContent value="customers" className="mt-0">
                    <motion.div variants={itemVariants}>{navItems[1].component}</motion.div>
                  </TabsContent>
                  <TabsContent value="orders" className="mt-0">
                    <motion.div variants={itemVariants}>{navItems[2].component}</motion.div>
                  </TabsContent>
                  <TabsContent value="calendar" className="mt-0">
                    <motion.div variants={itemVariants}>{navItems[3].component}</motion.div>
                  </TabsContent>
                  <TabsContent value="inventory" className="mt-0">
                    <motion.div variants={itemVariants}>{navItems[4].component}</motion.div>
                  </TabsContent>
                  <TabsContent value="sav" className="mt-0">
                    <motion.div variants={itemVariants}>{navItems[5].component}</motion.div>
                  </TabsContent>
                </Tabs>
              )}
              {location.pathname !== '/admin' && <Outlet />}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
