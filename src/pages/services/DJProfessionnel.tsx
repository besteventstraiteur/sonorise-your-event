
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import SectionTitle from '@/components/ui/SectionTitle';
import { Download, CalendarCheck, Music, Headphones, Mic, Speaker } from 'lucide-react';
import { Link } from 'react-router-dom';

const DJProfessionnel = () => {
  const serviceDescription = "Notre service de DJ professionnel offre bien plus qu'une simple animation musicale. Nos DJ, forts d'une expérience internationale, transforment chaque événement en une expérience unique et mémorable. Équipés de matériel de dernière génération et d'un répertoire musical ultra complet, ils s'adaptent instantanément à votre public et à l'ambiance souhaitée. Que ce soit pour un mariage élégant, une soirée d'entreprise dynamique ou un anniversaire festif, nos professionnels garantissent une prestation sur-mesure. Leur expertise technique et leur sens du rythme assureront le succès de votre événement, en créant une ambiance parfaitement maîtrisée du début à la fin.";

  return (
    <>
      <Helmet>
        <title>DJ Professionnel | Sonorisation 83 - Animation et Sonorisation dans le Var</title>
        <meta name="description" content={serviceDescription} />
        <meta name="keywords" content="DJ professionnel, animation soirée, DJ var, DJ événementiel, animation musicale, sonorisation" />
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
                DJ Professionnel
              </h1>
              <p className="text-xl md:text-2xl max-w-3xl mx-auto text-white">
                Des DJs expérimentés pour animer vos événements avec un équipement haut de gamme
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
                  <a href="/brochures/dj-professionnel.pdf" download>
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
              title="Pourquoi choisir nos DJs ?"
              subtitle="Une prestation de qualité"
              description="Nos DJ professionnels sauront s'adapter à vos goûts musicaux et à l'ambiance souhaitée pour votre événement."
              centered
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              {[
                {
                  icon: <Music className="w-8 h-8 text-pink-600" />,
                  title: "Répertoire varié",
                  description: "Un vaste répertoire musical pour satisfaire tous les goûts et générations : hits actuels, années 80, rock, électro, variété française..."
                },
                {
                  icon: <Headphones className="w-8 h-8 text-pink-600" />,
                  title: "Expérience internationale",
                  description: "Nos DJs se produisent régulièrement en France et à l'international, apportant une touche professionnelle à votre événement."
                },
                {
                  icon: <Speaker className="w-8 h-8 text-pink-600" />,
                  title: "Matériel haut de gamme",
                  description: "Des équipements son et lumière de dernière génération pour une prestation de qualité irréprochable."
                },
                {
                  icon: <Mic className="w-8 h-8 text-pink-600" />,
                  title: "Animation personnalisée",
                  description: "Nos DJs s'adaptent à votre public et vos attentes pour créer une ambiance sur mesure."
                },
                {
                  icon: <CalendarCheck className="w-8 h-8 text-pink-600" />,
                  title: "Ponctualité garantie",
                  description: "Installation et préparation en amont de votre événement pour assurer un déroulement sans faille."
                },
                {
                  icon: <Music className="w-8 h-8 text-pink-600" />,
                  title: "Adaptabilité totale",
                  description: "Du mariage à la soirée d'entreprise, en passant par les anniversaires, nos DJs s'adaptent à tout type d'événement."
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

        {/* Gallery Section */}
        <div className="py-20">
          <div className="container mx-auto px-4">
            <SectionTitle
              title="Nos DJs en action"
              subtitle="Références"
              description="Découvrez nos DJs lors de précédents événements"
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
                    alt={`DJ professionnel en action ${item}`} 
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
              description="Ils nous ont fait confiance pour leurs événements"
              centered
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              {[
                {
                  name: "Sophie et Marc",
                  event: "Mariage",
                  testimonial: "Notre DJ a su créer une ambiance magique pour notre mariage. Tous nos invités ont dansé jusqu'au bout de la nuit !"
                },
                {
                  name: "Entreprise Méditerranée",
                  event: "Soirée d'entreprise",
                  testimonial: "Prestation impeccable pour notre soirée annuelle. Le DJ a parfaitement compris nos attentes et a su animer la soirée avec professionnalisme."
                },
                {
                  name: "Association Les Palmiers",
                  event: "Gala de charité",
                  testimonial: "Une prestation de DJ de grande qualité pour notre gala. Nous recommandons vivement Sonorisation 83 pour tous vos événements."
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
              Prêt à animer votre événement ?
            </h2>
            <p className="text-xl max-w-3xl mx-auto mb-10">
              Contactez-nous dès maintenant pour réserver votre DJ professionnel et faire de votre événement un moment inoubliable.
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

export default DJProfessionnel;
