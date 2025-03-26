
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import SectionTitle from '@/components/ui/SectionTitle';
import { Download, Speaker, Settings, FileCheck, Sparkles, CalendarCheck, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';

const Sonorisation = () => {
  return (
    <>
      <Helmet>
        <title>Sonorisation Complète | Sonorisation 83 - Prestations Audio dans le Var</title>
        <meta name="description" content="Une solution complète pour la sonorisation de votre événement, avec installation et assistance technique professionnelle incluses." />
        <meta name="keywords" content="sonorisation événementielle, matériel son, technique audio, sonorisation var, système audio professionnel" />
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
              <h1 className="text-5xl md:text-6xl font-display font-bold mb-6 text-white">
                Sonorisation Complète
              </h1>
              <p className="text-xl md:text-2xl max-w-3xl mx-auto text-white">
                Une solution complète pour la sonorisation de votre événement, installation et assistance technique incluses
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

        {/* Features Section */}
        <div className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <SectionTitle
              title="Notre offre de sonorisation"
              subtitle="Une prestation technique complète"
              description="Des équipements haut de gamme et une équipe technique expérimentée pour la réussite de votre événement"
              centered
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              {[
                {
                  icon: <Speaker className="w-8 h-8 text-pink-600" />,
                  title: "Équipement haut de gamme",
                  description: "Des systèmes audio de dernière génération pour une qualité sonore irréprochable, adaptés à la taille de votre événement."
                },
                {
                  icon: <Settings className="w-8 h-8 text-pink-600" />,
                  title: "Installation professionnelle",
                  description: "Mise en place et réglage de tout le matériel par nos techniciens qualifiés avant votre événement."
                },
                {
                  icon: <FileCheck className="w-8 h-8 text-pink-600" />,
                  title: "Étude technique préalable",
                  description: "Analyse de votre lieu et de vos besoins pour une configuration sonore optimale et adaptée."
                },
                {
                  icon: <Sparkles className="w-8 h-8 text-pink-600" />,
                  title: "Effets spéciaux sonores",
                  description: "Possibilité d'intégrer des effets spéciaux sonores pour une ambiance personnalisée."
                },
                {
                  icon: <CalendarCheck className="w-8 h-8 text-pink-600" />,
                  title: "Support technique",
                  description: "Présence d'un technicien pendant toute la durée de votre événement pour assurer le bon fonctionnement."
                },
                {
                  icon: <Truck className="w-8 h-8 text-pink-600" />,
                  title: "Livraison et reprise",
                  description: "Transport, installation et démontage inclus dans notre prestation pour une tranquillité totale."
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="hover-lift h-full border border-gray-200 shadow-sm">
                    <CardContent className="pt-6">
                      <div className="mb-4 flex justify-center">
                        <div className="p-3 bg-pink-50 rounded-lg text-pink-700">
                          {feature.icon}
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold text-center mb-2 text-pink-700">{feature.title}</h3>
                      <p className="text-gray-700 text-center">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Our Equipment Section */}
        <div className="py-20">
          <div className="container mx-auto px-4">
            <SectionTitle
              title="Notre matériel"
              subtitle="Équipements professionnels"
              description="Découvrez notre gamme d'équipements audio professionnels"
              centered
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              {[
                {
                  category: "Systèmes de diffusion",
                  items: ["Enceintes actives Line Array", "Caissons de basses", "Systèmes de retour", "Enceintes de façade"]
                },
                {
                  category: "Consoles de mixage",
                  items: ["Consoles numériques professionnelles", "Tables de mixage analogiques", "Contrôleurs MIDI", "Interfaces audio"]
                },
                {
                  category: "Microphones",
                  items: ["Microphones filaires et sans fil", "Systèmes HF", "Microphones spécifiques", "Casques et ear monitors"]
                },
                {
                  category: "Accessoires",
                  items: ["Câblage et connectique", "Pieds et supports", "Flight cases", "Distribution électrique"]
                }
              ].map((category, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
                >
                  <h3 className="text-xl font-semibold mb-4 text-pink-700">{category.category}</h3>
                  <ul className="space-y-2">
                    {category.items.map((item, i) => (
                      <li key={i} className="flex items-center text-gray-700">
                        <span className="text-pink-600 mr-2">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Gallery Section */}
        <div className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <SectionTitle
              title="Nos installations"
              subtitle="Références"
              description="Quelques exemples de nos installations sonores réalisées"
              centered
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-12">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="aspect-video bg-gray-200 rounded-lg overflow-hidden"
                >
                  <img 
                    src={`/placeholder.svg`} 
                    alt={`Installation sonore ${item}`} 
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="py-20">
          <div className="container mx-auto px-4">
            <SectionTitle
              title="Ce qu'en disent nos clients"
              subtitle="Témoignages"
              description="Ils nous ont fait confiance pour la sonorisation de leurs événements"
              centered
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              {[
                {
                  name: "Festival Jazz à Toulon",
                  event: "Concert en plein air",
                  testimonial: "Une sonorisation parfaite pour notre scène principale. Excellent travail technique et une équipe très réactive."
                },
                {
                  name: "Mairie de Hyères",
                  event: "Événement municipal",
                  testimonial: "Installation impeccable et son de qualité pour notre cérémonie officielle. Un grand professionnalisme."
                },
                {
                  name: "Salle de spectacle Le Forum",
                  event: "Concert",
                  testimonial: "Une prestation technique de haut niveau qui a satisfait aussi bien les artistes que le public."
                }
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
                >
                  <div className="flex items-center mb-4">
                    <div className="ml-3">
                      <p className="font-semibold text-gray-900">{testimonial.name}</p>
                      <p className="text-sm text-gray-600">{testimonial.event}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 italic">"{testimonial.testimonial}"</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-20 bg-pink-700 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              Besoin d'une sonorisation professionnelle ?
            </h2>
            <p className="text-xl max-w-3xl mx-auto mb-10">
              Contactez-nous dès maintenant pour discuter de vos besoins et obtenir un devis personnalisé.
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
