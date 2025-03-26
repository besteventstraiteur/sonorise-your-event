
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

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
        scrolled ? "bg-white/90 backdrop-blur-md shadow-md py-2" : "bg-transparent py-4"
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <span className="font-display text-2xl font-bold text-sonic-900">
            sonorisation<span className="text-gold-600">-83</span>.com
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          {navigationItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={cn(
                "font-medium text-sm transition-all duration-300 relative",
                isActive(item.path) 
                  ? "text-gold-600" 
                  : "text-sonic-800 hover:text-gold-600"
              )}
            >
              {item.name}
              {isActive(item.path) && (
                <motion.span 
                  className="absolute -bottom-1 left-0 w-full h-0.5 bg-gold-600" 
                  layoutId="navbar-indicator"
                />
              )}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-sonic-900 focus:outline-none"
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
                    ? "bg-gold-100 text-gold-600" 
                    : "text-sonic-800 hover:bg-gold-50 hover:text-gold-600"
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </motion.header>
  );
};

export default Navbar;
