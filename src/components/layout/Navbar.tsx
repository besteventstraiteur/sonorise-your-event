
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { User, LogIn } from 'lucide-react';
import CartIcon from '../cart/CartIcon';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, isAdmin } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    { name: 'Accueil', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Location', path: '/location' },
    { name: 'Boutique', path: '/boutique' },
    { name: 'Devis', path: '/devis' },
    { name: 'À propos', path: '/a-propos' },
    { name: 'Contact', path: '/contact' },
  ];

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <motion.header 
      className={cn(
        "fixed w-full z-50 transition-all duration-300",
        scrolled ? "bg-white/95 backdrop-blur-md shadow-md py-2" : "bg-white/70 backdrop-blur-sm py-4"
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img src="/lovable-uploads/0a939514-8590-4565-9a7a-44a0ef0b1c79.png" alt="Sonorisation 83" className="h-12" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          {navigationItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={cn(
                "font-medium text-sm transition-all duration-300 relative",
                isActive(item.path) 
                  ? "text-pink-600 font-semibold" 
                  : "text-gray-800 hover:text-pink-500"
              )}
            >
              {item.name}
              {isActive(item.path) && (
                <motion.span 
                  className="absolute -bottom-1 left-0 w-full h-0.5 bg-pink-500" 
                  layoutId="navbar-indicator"
                />
              )}
            </Link>
          ))}
        </nav>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Cart Icon - Now positioned between Contact and Login */}
          <CartIcon />
          
          {isAuthenticated ? (
            <Link 
              to={isAdmin ? "/admin" : "/mon-compte"} 
              className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-pink-600 transition-colors"
            >
              <User className="h-4 w-4" />
              <span>Mon compte</span>
            </Link>
          ) : (
            <Link 
              to="/login" 
              className="flex items-center gap-2 px-4 py-2 rounded-md bg-pink-50 text-pink-600 hover:bg-pink-100 transition-colors text-sm font-medium"
            >
              <LogIn className="h-4 w-4" />
              <span>Connexion</span>
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-800 focus:outline-none"
          onClick={toggleMobileMenu}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            {mobileMenuOpen ? (
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M6 18L18 6M6 6l12 12" 
              />
            ) : (
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4 6h16M4 12h16M4 18h16" 
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <motion.div 
          className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg py-4"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="container mx-auto px-4 flex flex-col space-y-4">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "py-2 px-4 rounded-md font-medium text-sm transition-all duration-300",
                  isActive(item.path) 
                    ? "bg-pink-100 text-pink-600" 
                    : "text-gray-800 hover:bg-pink-50 hover:text-pink-500"
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}

            {/* Cart Icon in Mobile Menu */}
            <div className="py-2 px-4">
              <CartIcon />
            </div>

            {/* Auth Mobile */}
            {isAuthenticated ? (
              <Link
                to={isAdmin ? "/admin" : "/mon-compte"}
                className="py-2 px-4 rounded-md flex items-center font-medium text-sm bg-pink-50 text-pink-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                <User className="h-4 w-4 mr-2" />
                Mon compte
              </Link>
            ) : (
              <Link
                to="/login"
                className="py-2 px-4 rounded-md flex items-center font-medium text-sm bg-pink-50 text-pink-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                <LogIn className="h-4 w-4 mr-2" />
                Connexion
              </Link>
            )}
          </div>
        </motion.div>
      )}
    </motion.header>
  );
};

export default Navbar;
