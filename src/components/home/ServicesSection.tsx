
import React from 'react';
import { motion } from 'framer-motion';
import ServiceCard from '../ui/ServiceCard';
import SectionTitle from '../ui/SectionTitle';
import { Music4, Speaker, Sparkles, Boxes } from 'lucide-react';

const services = [
  {
    title: "DJ Professionnel",
    description: "Des DJs expérimentés pour animer vos soirées avec style et créer une ambiance inoubliable.",
    icon: <Music4 className="w-8 h-8 text-pink-600" />,
    link: "/services/dj",
    color: "from-pink-500 to-pink-700"
  },
  {
    title: "Location de Matériel",
    description: "Une large gamme d'équipements professionnels pour tous vos besoins en sonorisation et éclairage.",
    icon: <Boxes className="w-8 h-8 text-pink-600" />,
    link: "/location",
    color: "from-purple-500 to-purple-700"
  },
  {
    title: "Artistes & Animations",
    description: "Une sélection d'artistes talentueux et d'animations originales pour vos événements.",
    icon: <Sparkles className="w-8 h-8 text-pink-600" />,
    link: "/services/artistes",
    color: "from-gold-500 to-gold-600"
  },
  {
    title: "Sonorisation",
    description: "Une solution complète pour la sonorisation de vos événements, avec installation et assistance technique.",
    icon: <Speaker className="w-8 h-8 text-pink-600" />,
    link: "/services/sonorisation",
    color: "from-teal-500 to-teal-700"
  }
];

const ServicesSection: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-white to-pink-50/20 pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <SectionTitle
            subtitle="Nos Services"
            title="Des solutions complètes pour vos événements"
            description="Du matériel professionnel à la prestation artistique, nous vous accompagnons dans la réalisation de vos projets."
            centered
          />
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {services.map((service, index) => (
            <ServiceCard
              key={service.title}
              {...service}
              delay={index}
            />
          ))}
        </motion.div>
      </div>

      {/* Background decorative elements */}
      <motion.div 
        className="absolute top-20 left-0 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        animate={{
          x: [0, 30, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      <motion.div 
        className="absolute bottom-20 right-0 w-80 h-80 bg-gold-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        animate={{
          x: [0, -40, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10"
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
    </section>
  );
};

export default ServicesSection;
