
import React from 'react';
import { MessageCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';

const WHATSAPP_NUMBER = '+33483110181'; // Sonorisation 83's phone number

const WhatsAppButton = () => {
  const handleWhatsAppClick = () => {
    // Track the WhatsApp button click
    console.log('Analytics event: WhatsApp button clicked');
    
    const url = `https://wa.me/${WHATSAPP_NUMBER.replace(/\+|\s/g, '')}`;
    window.open(url, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="fixed bottom-4 right-4 z-50"
    >
      <Button 
        size="icon" 
        className="bg-[#25D366] hover:bg-[#1DAE53] text-white rounded-full shadow-lg"
        onClick={handleWhatsAppClick}
        aria-label="Contact via WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
      </Button>
    </motion.div>
  );
};

export default WhatsAppButton;
