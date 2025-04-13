
import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  useEffect(() => {
    // Fonction pour vérifier la position de défilement
    const checkScrollPosition = () => {
      const scrollY = window.scrollY;
      // Afficher le bouton si l'utilisateur a scrollé plus de 500px
      setShowScrollToTop(scrollY > 500);
    };

    // Écouter l'événement de défilement
    window.addEventListener('scroll', checkScrollToTop);

    // Nettoyer l'écouteur d'événement
    return () => window.removeEventListener('scroll', checkScrollToTop);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <main className="flex-grow pt-16 text-gray-800 min-h-[calc(100vh-80px)]">
        {children}
      </main>
      <Footer />
      
      {/* Bouton Retour en haut */}
      <AnimatePresence>
        {showScrollToTop && (
          <motion.div
            className="fixed bottom-6 right-6 z-50"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <Button 
              onClick={scrollToTop} 
              size="icon" 
              className="h-12 w-12 rounded-full shadow-lg bg-primary hover:bg-primary/90"
              aria-label="Retour en haut"
            >
              <ArrowUp className="h-5 w-5" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Layout;
