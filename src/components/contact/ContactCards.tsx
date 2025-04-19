
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
        contact="04.83.11.01.81"
        href="tel:0483110181"
      />
      <ContactCard
        icon={Mail}
        title="Écrivez-nous"
        description="Réponse garantie sous 24h"
        contact="contact@sonorisation-83.com"
        href="mailto:contact@sonorisation-83.com"
      />
      <ContactCard
        icon={MapPin}
        title="Zone d'intervention"
        description="Région PACA"
        contact="424 avenue de l'Europe, 83300 Draguignan"
        href="#"
      />
    </div>
  );
};

export default ContactCards;
