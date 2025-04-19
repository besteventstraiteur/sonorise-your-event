
import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import CustomerDashboard from './CustomerDashboard';
import CustomerOrders from './CustomerOrders';
import CustomerSupport from './CustomerSupport';
import CustomerSav from './CustomerSav'; // Nouveau composant SAV
import { 
  LayoutDashboard, 
  ShoppingCart, 
  HelpCircle, 
  FileText 
} from 'lucide-react';
import { cn } from '@/lib/utils';

const CustomerAccount: React.FC = () => {
  const navItems = [
    { path: '', icon: <LayoutDashboard className="h-5 w-5" />, label: 'Tableau de bord' },
    { path: 'commandes', icon: <ShoppingCart className="h-5 w-5" />, label: 'Mes commandes' },
    { path: 'sav', icon: <FileText className="h-5 w-5" />, label: 'SAV' },
    { path: 'support', icon: <HelpCircle className="h-5 w-5" />, label: 'Support' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-8">
          {/* Sidebar Navigation */}
          <nav className="bg-white rounded-lg shadow-sm p-4">
            <div className="space-y-2">
              {navItems.map((item) => (
                <NavLink 
                  key={item.path} 
                  to={`/mon-compte/${item.path}`} 
                  className={({ isActive }) => cn(
                    "flex items-center px-4 py-2 rounded-lg transition-all",
                    isActive 
                      ? "bg-pink-100 text-pink-800" 
                      : "text-gray-700 hover:bg-pink-50 hover:text-pink-700"
                  )}
                  end
                >
                  {item.icon}
                  <span className="ml-3">{item.label}</span>
                </NavLink>
              ))}
            </div>
          </nav>

          {/* Route Content */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <Routes>
              <Route path="" element={<CustomerDashboard />} />
              <Route path="commandes" element={<CustomerOrders />} />
              <Route path="sav" element={<CustomerSav />} />
              <Route path="support" element={<CustomerSupport />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerAccount;
