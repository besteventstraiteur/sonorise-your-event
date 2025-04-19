
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function useNavigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return {
    mobileMenuOpen,
    toggleMobileMenu,
    closeMobileMenu: () => setMobileMenuOpen(false)
  };
}
