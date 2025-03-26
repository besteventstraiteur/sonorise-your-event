
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import SectionTitle from '@/components/ui/SectionTitle';
import { Download, Music, Mic, Star, Award, Users, CalendarCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const Artistes = () => {
  return (
    <>
      <Helmet>
        <title>Artistes | Sonorisation 83 - Performers et Musiciens dans le Var</title>
        <meta name="description" content="Découvrez notre sélection d'artistes professionnels pour votre événement: musiciens, danseurs, performers... Des talents adaptés à tout budget." />
        <meta name="keywords" content="artistes var, musiciens événementiel, danseurs, performers, animation artistique, concert privé" />
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
                Artistes
              </h1>
              <p className="text-xl md:text-2xl max-w-3xl mx-auto text-white">
                Musiciens, danseurs, performers... Un large choix d'artistes pour sublimer votre événement
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
                  <a href="/brochures/artistes.pdf" download>
                    <Download className="mr-2 h-5 w-5" /> Télécharger la brochure
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Categories Section */}
        <div className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <SectionTitle
              title="Nos catégories d'artistes"
              subtitle="Des talents pour tous les goûts"
              description="Découvrez notre sélection d'artistes professionnels pour votre événement"
              centered
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              {[
                {
                  icon: <Music className="w-8 h-8 text-pink-600" />,
                  title: "Musiciens",
                  description: "Pianistes, guitaristes, violonistes, saxophonistes... Des musiciens talentueux pour une ambiance live unique."
                },
                {
                  icon: <Mic className="w-8 h-8 text-pink-600" />,
                  title: "Chanteurs",
                  description: "Solistes, duos ou groupes vocaux pour interpréter les plus grandes chansons lors de votre événement."
                },
                {
                  icon: <Star className="w-8 h-8 text-pink-600" />,
                  title: "Danseurs",
                  description: "Danse contemporaine, classique, hip-hop, latine... Des performances chorégraphiées qui éblouiront vos invités."
                },
                {
                  icon: <Award className="w-8 h-8 text-pink-600" />,
                  title: "Performers",
                  description: "Artistes de cirque, acrobates, jongleurs, magiciens... Des performances spectaculaires et originales."
                },
                {
                  icon: <Users className="w-8 h-8 text-pink-600" />,
                  title: "Groupes",
                  description: "Orchestres, groupes de jazz, rock, pop ou variété... Une formation complète pour animer votre soirée."
                },
                {
                  icon: <CalendarCheck className="w-8 h-8 text-pink-600" />,
                  title: "Performances sur mesure",
                  description: "Une prestation artistique unique et personnalisée selon le thème de votre événement."
                }
              ].map((category, index) => (
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
                          {category.icon}
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold text-center mb-2 text-pink-700">{category.title}</h3>
                      <p className="text-gray-700 text-center">{category.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Gallery Section */}
        <div className="py-20">
          <div className="container mx-auto px-4">
            <SectionTitle
              title="Nos artistes en action"
              subtitle="Références"
              description="Quelques exemples de nos performances lors d'événements passés"
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
                    alt={`Artiste en performance ${item}`} 
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <SectionTitle
              title="Ce qu'en disent nos clients"
              subtitle="Témoignages"
              description="Ils ont fait appel à nos artistes pour leurs événements"
              centered
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              {[
                {
                  name: "Hôtel Royal Riviera",
                  event: "Soirée de gala",
                  testimonial: "Les performances artistiques ont été le point fort de notre soirée. Un niveau d'excellence qui a impressionné tous nos convives."
                },
                {
                  name: "Julie et Romain",
                  event: "Mariage",
                  testimonial: "Le trio de jazz que nous avons engagé pour notre cocktail de mariage a créé une ambiance parfaite et élégante."
                },
                {
                  name: "Casino de Bandol",
                  event: "Soirée thématique",
                  testimonial: "Des artistes talentueux et professionnels qui ont su s'adapter parfaitement à notre thématique et à notre public."
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
              Besoin d'artistes pour votre événement ?
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

export default Artistes;
