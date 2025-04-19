
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from '@/context/AuthContext';
import { ShieldCheck, User, LogIn } from 'lucide-react';

interface MobileNavMenuProps {
  navigationItems: Array<{ name: string; path: string }>;
  isOpen: boolean;
  onClose: () => void;
}

const MobileNavMenu: React.FC<MobileNavMenuProps> = ({ 
  navigationItems, 
  isOpen, 
  onClose 
}) => {
  const { isAuthenticated, isAdmin } = useAuth();

  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div 
      className="md:hidden fixed top-[64px] left-0 w-full bg-white/95 backdrop-blur-md shadow-lg z-50"
      initial="closed"
      animate={isOpen ? "open" : "closed"}
      variants={menuVariants}
    >
      <div className="container mx-auto px-4 py-4 flex flex-col space-y-2">
        {navigationItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className="py-2 px-4 rounded-md text-sm font-medium transition-colors hover:bg-pink-50 hover:text-pink-600"
            onClick={onClose}
          >
            {item.name}
          </Link>
        ))}
        
        {isAuthenticated ? (
          <Link
            to={isAdmin ? "/admin" : "/mon-compte"}
            className={cn(
              "py-2 px-4 rounded-md flex items-center font-medium text-sm",
              isAdmin 
                ? "bg-pink-100 text-pink-700" 
                : "bg-pink-50 text-pink-600"
            )}
            onClick={onClose}
          >
            {isAdmin ? (
              <>
                <ShieldCheck className="h-4 w-4 mr-2" />
                Administration
              </>
            ) : (
              <>
                <User className="h-4 w-4 mr-2" />
                Mon compte
              </>
            )}
          </Link>
        ) : (
          <Link
            to="/login"
            className="py-2 px-4 rounded-md flex items-center font-medium text-sm bg-pink-50 text-pink-600"
            onClick={onClose}
          >
            <LogIn className="h-4 w-4 mr-2" />
            Connexion
          </Link>
        )}
      </div>
    </motion.div>
  );
};

export default MobileNavMenu;
