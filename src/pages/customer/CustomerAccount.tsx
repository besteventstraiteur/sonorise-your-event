
import React from 'react';
import { Routes, Route, NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { 
  User, 
  ShoppingCart, 
  HeadphonesIcon, 
  Clock, 
  MapPin, 
  LogOut,
  ChevronRight
} from 'lucide-react';

// Sous-pages
import CustomerDashboard from './CustomerDashboard';
import CustomerOrders from './CustomerOrders';
import CustomerSupport from './CustomerSupport';

const CustomerAccount = () => {
  const { currentUser, logout } = useAuth();
  const location = useLocation();

  const navigationItems = [
    { path: '/mon-compte', name: 'Tableau de bord', icon: <User className="h-5 w-5" /> },
    { path: '/mon-compte/commandes', name: 'Mes commandes', icon: <ShoppingCart className="h-5 w-5" /> },
    { path: '/mon-compte/service-client', name: 'SAV & Support', icon: <HeadphonesIcon className="h-5 w-5" /> },
  ];

  const isActive = (path: string) => {
    if (path === '/mon-compte') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="bg-gray-50 min-h-screen pt-16 pb-24">
      <div className="container mx-auto px-4 py-8">
        {/* Titre de la page et indicateur de route */}
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-pink-600">Mon Compte</h1>
          <div className="flex items-center text-sm text-gray-500 mt-2">
            <NavLink to="/" className="hover:text-pink-500">Accueil</NavLink>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="text-pink-500">Mon Compte</span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <div className="flex items-center space-x-4 mb-6 pb-6 border-b">
                <div className="bg-pink-100 rounded-full p-3">
                  <User className="h-6 w-6 text-pink-600" />
                </div>
                <div>
                  <h3 className="font-medium">{currentUser?.name}</h3>
                  <p className="text-sm text-gray-500">{currentUser?.email}</p>
                </div>
              </div>

              <nav className="space-y-1">
                {navigationItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      cn(
                        "flex items-center space-x-3 px-4 py-3 rounded-md transition-colors",
                        isActive(item.path)
                          ? "bg-pink-50 text-pink-600"
                          : "hover:bg-gray-50 text-gray-700"
                      )
                    }
                    end={item.path === '/mon-compte'}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </NavLink>
                ))}

                <button
                  onClick={logout}
                  className="flex w-full items-center space-x-3 px-4 py-3 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Déconnexion</span>
                </button>
              </nav>
            </div>

            {/* Coordonnées */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-display text-lg font-medium mb-4">Mes coordonnées</h3>
              <div className="space-y-3 text-gray-600">
                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="font-medium">Compte créé le</p>
                    <p className="text-sm">01/01/2023</p>
                  </div>
                </div>
                
                {currentUser?.phone && (
                  <div className="flex items-start space-x-3">
                    <HeadphonesIcon className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="font-medium">Téléphone</p>
                      <p className="text-sm">{currentUser.phone}</p>
                    </div>
                  </div>
                )}
                
                {currentUser?.address && (
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="font-medium">Adresse</p>
                      <p className="text-sm">{currentUser.address}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Contenu principal */}
          <div className="lg:w-3/4">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <Routes>
                <Route path="/" element={<CustomerDashboard />} />
                <Route path="/commandes" element={<CustomerOrders />} />
                <Route path="/service-client" element={<CustomerSupport />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerAccount;
