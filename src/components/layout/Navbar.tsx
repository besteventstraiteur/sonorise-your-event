
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { User, LogIn, ShieldCheck, Menu, X } from 'lucide-react';
import CartIcon from '../cart/CartIcon';
import { useIsMobile } from '@/hooks/use-mobile';
import MobileNavMenu from './MobileNavMenu';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, isAdmin } = useAuth();
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    { name: 'Accueil', path: '/', hash: '' },
    { name: 'Services', path: '/#services', hash: 'services' },
    { name: 'Location', path: '/location', hash: '' },
    { name: 'Boutique', path: '/boutique', hash: '' },
    { name: 'Devis', path: '/devis', hash: '' },
    { name: 'Avis', path: '/#testimonials', hash: 'testimonials' },
    { name: 'Contact', path: '/contact', hash: '' },
  ];

  const handleNavigation = (path: string, hash: string) => {
    if (hash && location.pathname === '/') {
      const element = document.getElementById(hash);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const isActive = (path: string) => {
    if (path.includes('#')) {
      const hash = path.split('#')[1];
      return location.hash === `#${hash}`;
    }
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
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center">
          <div className="relative group overflow-hidden rounded-lg transition-all duration-300">
            <img 
              src="/lovable-uploads/0a939514-8590-4565-9a7a-44a0ef0b1c79.png" 
              alt="Sonorisation 83" 
              className="h-12 relative z-10 transition-all duration-300 group-hover:scale-105" 
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white/70 via-white/30 to-transparent backdrop-blur-[1px] z-0"></div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          {navigationItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => handleNavigation(item.path, item.hash)}
              className={cn(
                "font-medium text-sm transition-all duration-300 relative hover:text-pink-500",
                isActive(item.path) ? "text-pink-600 font-semibold" : "text-gray-800"
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

        {/* Auth Buttons and Cart */}
        <div className="flex items-center space-x-4">
          <CartIcon />
          
          {!isMobile && (
            isAuthenticated ? (
              <Link 
                to={isAdmin ? "/admin" : "/mon-compte"} 
                className={cn(
                  "flex items-center gap-2 px-3 py-1.5 text-sm font-medium transition-colors",
                  isAdmin 
                    ? "text-pink-700 bg-pink-50 hover:bg-pink-100 rounded-md"
                    : "text-gray-700 hover:text-pink-600"
                )}
              >
                {isAdmin ? (
                  <>
                    <ShieldCheck className="h-4 w-4" />
                    <span>Administration</span>
                  </>
                ) : (
                  <>
                    <User className="h-4 w-4" />
                    <span>Mon compte</span>
                  </>
                )}
              </Link>
            ) : (
              <Link 
                to="/login" 
                className="flex items-center gap-2 px-4 py-2 rounded-md bg-pink-50 text-pink-600 hover:bg-pink-100 transition-colors text-sm font-medium"
              >
                <LogIn className="h-4 w-4" />
                <span>Connexion</span>
              </Link>
            )
          )}

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-800 focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <MobileNavMenu 
        navigationItems={navigationItems}
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        onNavigate={handleNavigation}
      />
    </motion.header>
  );
};

export default Navbar;
