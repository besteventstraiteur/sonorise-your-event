
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import SectionTitle from '@/components/ui/SectionTitle';
import { Download, Speaker, Settings, FileCheck, Sparkles, CalendarCheck, Truck, Shield, Users, Music, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const Sonorisation = () => {
  const serviceDescription = "Notre expertise en sonorisation professionnelle vous garantit une qualité audio exceptionnelle pour tous vos événements. De l'étude acoustique préalable à l'assistance technique le jour J, nous mettons à votre disposition un équipement haut de gamme et une équipe expérimentée pour une diffusion sonore parfaitement maîtrisée. Que ce soit pour un mariage, un concert, une conférence ou un festival, nous vous accompagnons avec des solutions sur-mesure adaptées à vos besoins.";

  const formules = [
    {
      title: "Pack Essential",
      description: "Idéal pour les petits événements jusqu'à 100 personnes",
      features: [
        "2 enceintes actives 1000W",
        "1 caisson de basse 1200W",
        "1 console de mixage numérique",
        "2 microphones sans fil",
        "Câblage et pieds inclus",
        "Installation et assistance technique"
      ],
      price: "À partir de 290€"
    },
    {
      title: "Pack Performance",
      description: "Solution complète pour événements jusqu'à 300 personnes",
      features: [
        "4 enceintes actives 1500W",
        "2 caissons de basse 2000W",
        "1 console numérique professionnelle",
        "4 microphones sans fil",
        "Système de monitoring",
        "Technicien dédié sur toute la durée"
      ],
      price: "À partir de 590€"
    },
    {
      title: "Pack Premium",
      description: "Configuration professionnelle pour grands événements",
      features: [
        "Système Line Array complet",
        "Amplification Crown/Lab Gruppen",
        "Console numérique haut de gamme",
        "Kit microphones complet",
        "Système intercom",
        "2 techniciens professionnels"
      ],
      price: "Sur devis"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Sonorisation Professionnelle | Sonorisation 83 - Solutions audio dans le Var</title>
        <meta name="description" content={serviceDescription} />
        <meta name="keywords" content="sonorisation professionnelle, location sono, système audio, concert, événementiel, var, paca" />
      </Helmet>

      <div className="min-h-screen">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-pink-800 to-pink-700 text-white py-24">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
                Sonorisation Professionnelle
              </h1>
              <p className="text-xl md:text-2xl max-w-3xl mx-auto">
                Des solutions audio sur-mesure pour sublimer vos événements
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <Button 
                  className="bg-white text-pink-700 hover:bg-gray-100"
                  size="lg"
                  asChild
                >
                  <Link to="/devis">
                    Demander un devis
                  </Link>
                </Button>
                <Button 
                  variant="outline" 
                  className="border-white text-white hover:bg-white/10"
                  size="lg"
                  asChild
                >
                  <a href="/brochures/sonorisation-complete.pdf" download>
                    <Download className="mr-2 h-5 w-5" /> Télécharger la brochure
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="py-20">
          <div className="container mx-auto px-4">
            <SectionTitle
              title="Une prestation complète"
              subtitle="Notre expertise à votre service"
              description="Découvrez nos services de sonorisation professionnelle"
              centered
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              {[
                {
                  icon: <Settings className="w-8 h-8 text-pink-600" />,
                  title: "Installation & réglages",
                  description: "Installation professionnelle, paramétrage optimal et test complet du système avant votre événement"
                },
                {
                  icon: <Shield className="w-8 h-8 text-pink-600" />,
                  title: "Assistance technique",
                  description: "Un technicien qualifié présent pendant toute la durée de votre événement"
                },
                {
                  icon: <Music className="w-8 h-8 text-pink-600" />,
                  title: "Matériel professionnel",
                  description: "Un parc de matériel haut de gamme régulièrement entretenu et renouvelé"
                },
                {
                  icon: <Star className="w-8 h-8 text-pink-600" />,
                  title: "Sur-mesure",
                  description: "Une configuration adaptée à votre lieu et vos besoins spécifiques"
                },
                {
                  icon: <Users className="w-8 h-8 text-pink-600" />,
                  title: "Expertise",
                  description: "Plus de 15 ans d'expérience dans l'événementiel professionnel"
                },
                {
                  icon: <Truck className="w-8 h-8 text-pink-600" />,
                  title: "Livraison incluse",
                  description: "Transport, installation et démontage inclus dans nos prestations"
                }
              ].map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="hover-lift h-full">
                    <CardContent className="pt-6">
                      <div className="mb-4 flex justify-center">
                        <div className="p-3 bg-pink-50 rounded-lg">
                          {service.icon}
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold text-center mb-2 text-pink-700">{service.title}</h3>
                      <p className="text-gray-700 text-center">{service.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Formules Section */}
        <div className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <SectionTitle
              title="Nos formules de sonorisation"
              subtitle="Forfaits adaptés"
              description="Choisissez la configuration qui correspond à vos besoins"
              centered
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              {formules.map((formule, index) => (
                <motion.div
                  key={formule.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex flex-col"
                >
                  <Card className="flex-1">
                    <CardContent className="pt-6">
                      <h3 className="text-2xl font-semibold mb-2 text-pink-700">{formule.title}</h3>
                      <p className="text-gray-600 mb-4">{formule.description}</p>
                      <ul className="space-y-2 mb-6">
                        {formule.features.map((feature, i) => (
                          <li key={i} className="flex items-center text-gray-700">
                            <span className="text-pink-600 mr-2">✓</span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <p className="text-lg font-semibold text-pink-700">{formule.price}</p>
                      <Button 
                        className="w-full mt-4 bg-pink-600 hover:bg-pink-700"
                        asChild
                      >
                        <Link to="/devis">
                          Demander un devis
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-20 bg-pink-700 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              Un projet de sonorisation ?
            </h2>
            <p className="text-xl max-w-3xl mx-auto mb-10">
              Contactez-nous pour discuter de vos besoins et obtenir un devis personnalisé
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                className="bg-white text-pink-700 hover:bg-gray-100"
                size="lg"
                asChild
              >
                <Link to="/devis">
                  Demander un devis
                </Link>
              </Button>
              <Button 
                variant="outline" 
                className="border-white text-white hover:bg-white/10"
                size="lg"
                asChild
              >
                <Link to="/contact">
                  Nous contacter
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sonorisation;
