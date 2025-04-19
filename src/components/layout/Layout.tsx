
import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const checkScrollPosition = () => {
      const scrollY = window.scrollY;
      setShowScrollToTop(scrollY > 500);
    };

    window.addEventListener('scroll', checkScrollPosition);
    return () => window.removeEventListener('scroll', checkScrollPosition);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-white overflow-x-hidden">
      <Navbar />
      <main className="flex-grow pt-16 md:pt-20 text-gray-800 min-h-[calc(100vh-80px)] w-full px-4 md:px-6">
        {children}
      </main>
      <Footer />
      
      <AnimatePresence>
        {showScrollToTop && (
          <motion.div
            className={cn(
              "fixed z-50",
              isMobile ? "bottom-4 right-4" : "bottom-6 right-6"
            )}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <Button 
              onClick={scrollToTop} 
              size="icon" 
              className={cn(
                "rounded-full shadow-lg bg-primary hover:bg-primary/90",
                isMobile ? "h-10 w-10" : "h-12 w-12"
              )}
              aria-label="Back to top"
            >
              <ArrowUp className={cn(
                isMobile ? "h-4 w-4" : "h-5 w-5"
              )} />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Layout;
