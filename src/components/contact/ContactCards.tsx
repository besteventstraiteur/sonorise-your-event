
import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import ContactCard from './ContactCard';

const ContactCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      <ContactCard
        icon={Phone}
        title="Appelez-nous"
        description="Réponse immédiate du lundi au samedi"
        contact="04 94 XX XX XX"
        href="tel:+33494XXXXXX"
      />
      <ContactCard
        icon={Mail}
        title="Écrivez-nous"
        description="Réponse garantie sous 24h"
        contact="contact@sonorisation-83.fr"
        href="mailto:contact@sonorisation-83.fr"
      />
      <ContactCard
        icon={MapPin}
        title="Zone d'intervention"
        description="Tout le Var et PACA"
        contact="Toulon, Var (83)"
        href="#"
      />
    </div>
  );
};

export default ContactCards;
