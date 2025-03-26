
import React from 'react';
import { motion } from 'framer-motion';
import ServiceCard from '../ui/ServiceCard';
import SectionTitle from '../ui/SectionTitle';

const services = [
  {
    title: "DJ Professionnel",
    description: "Des DJs expérimentés pour animer vos soirées avec style et créer une ambiance inoubliable.",
    icon: (
      <svg className="w-8 h-8 text-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
      </svg>
    ),
    link: "/services/dj"
  },
  {
    title: "Location de Matériel",
    description: "Une large gamme d'équipements professionnels pour tous vos besoins en sonorisation et éclairage.",
    icon: (
      <svg className="w-8 h-8 text-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
      </svg>
    ),
    link: "/location"
  },
  {
    title: "Artistes & Animations",
    description: "Une sélection d'artistes talentueux et d'animations originales pour vos événements.",
    icon: (
      <svg className="w-8 h-8 text-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
    link: "/services/artistes"
  },
  {
    title: "Sonorisation",
    description: "Une solution complète pour la sonorisation de vos événements, avec installation et assistance technique.",
    icon: (
      <svg className="w-8 h-8 text-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 010-7.072m12.728 3.536a3 3 0 00-4.243-4.243m-9.9 12.728a9 9 0 010-12.728" />
      </svg>
    ),
    link: "/services/sonorisation"
  }
];

const ServicesSection: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <SectionTitle
          subtitle="Nos Services"
          title="Des solutions complètes pour vos événements"
          description="Du matériel professionnel à la prestation artistique, nous vous accompagnons dans la réalisation de vos projets."
          centered
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {services.map((service, index) => (
            <ServiceCard
              key={service.title}
              {...service}
              delay={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
