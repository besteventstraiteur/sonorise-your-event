
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import SectionTitle from '@/components/ui/SectionTitle';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const Services = () => {
  const services = [
    {
      title: "DJ Professionnel",
      description: "Des DJs expérimentés pour animer vos événements avec un équipement haut de gamme et un répertoire musical varié.",
      icon: "🎧",
      features: ["Expérience internationale", "Matériel premium", "Adaptabilité à tout événement"],
      brochure: "/brochures/dj-professionnel.pdf",
      page: "/services/dj"
    },
    {
      title: "Animation Événementielle",
      description: "Transformez votre événement en une expérience inoubliable avec nos animations personnalisées.",
      icon: "🎭",
      features: ["Animations thématiques", "Jeux interactifs", "Ambiance garantie"],
      brochure: "/brochures/animation-evenementielle.pdf",
      page: "/services/animation-evenementielle"
    },
    {
      title: "Artistes",
      description: "Musiciens, danseurs, performers... Un large choix d'artistes pour sublimer votre événement.",
      icon: "🎻",
      features: ["Artistes professionnels", "Performances uniques", "Adaptés à tout budget"],
      brochure: "/brochures/artistes.pdf",
      page: "/services/artistes"
    },
    {
      title: "Sonorisation Complète",
      description: "Une solution complète pour la sonorisation de votre événement, installation et assistance technique incluses.",
      icon: "🔊",
      features: ["Équipement haut de gamme", "Installation professionnelle", "Support technique"],
      brochure: "/brochures/sonorisation-complete.pdf",
      page: "/services/sonorisation"
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Nos Services | Sonorisation 83 - Prestations événementielles dans le Var</title>
        <meta name="description" content="Découvrez nos services événementiels: DJ professionnel, animation, artistes et sonorisation complète pour tous vos événements dans le Var." />
        <meta name="keywords" content="DJ var, animation événementielle, sonorisation, artistes, événementiel, prestations musicales" />
      </Helmet>

      <div className="bg-gradient-to-r from-pink-800 to-pink-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6 text-white">
              Nos Services
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto text-white">
              Des prestations sur mesure pour faire de votre événement un moment inoubliable
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-20">
        <SectionTitle 
          title="Prestations de qualité" 
          subtitle="Des services événementiels professionnels et personnalisés"
        />
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {services.map((service, index) => (
            <motion.div key={index} variants={item}>
              <Card className="hover-lift h-full border border-gray-200 shadow-md">
                <CardHeader className="bg-white">
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <CardTitle className="text-2xl font-display text-pink-700">{service.title}</CardTitle>
                  <CardDescription className="text-base text-gray-700">{service.description}</CardDescription>
                </CardHeader>
                <CardContent className="bg-white">
                  <ul className="space-y-2">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-gray-800">
                        <span className="text-gold-600 mr-2">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="flex flex-col sm:flex-row gap-3 bg-white">
                  <Button 
                    className="w-full bg-pink-700 hover:bg-pink-600 text-white" 
                    asChild
                  >
                    <Link to={service.page}>
                      En savoir plus
                    </Link>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full border-pink-200 text-pink-700" 
                    asChild
                  >
                    <a href={service.brochure} download>
                      <Download className="mr-2 h-4 w-4" /> Brochure
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="mt-20 text-center">
          <SectionTitle 
            title="Une question ?" 
            subtitle="Notre équipe est disponible pour vous accompagner dans votre projet"
          />
          <Button className="mt-8 bg-gold-600 hover:bg-gold-500 text-gray-900 font-medium" asChild>
            <Link to="/contact">
              Contactez-nous
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Services;
