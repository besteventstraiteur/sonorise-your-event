
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import SectionTitle from '@/components/ui/SectionTitle';
import { Download, Party, Users, Trophy, Sparkles, Laugh, CalendarCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const AnimationEvenementielle = () => {
  // Create a custom Party icon since it's not in lucide-react
  const PartyIcon = (props: any) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5.8 11.3 2 22l10.7-3.79" />
      <path d="M4 3h.01" />
      <path d="M22 8h.01" />
      <path d="M15 2h.01" />
      <path d="M22 20h.01" />
      <path d="m22 2-2.24.75a2.9 2.9 0 0 0-1.96 3.12v0c.1.86-.57 1.63-1.45 1.63h-.38c-.86 0-1.6.6-1.76 1.44L14 10" />
      <path d="m22 13-.82-.33c-.86-.34-1.82.2-1.98 1.11v0c-.11.7-.72 1.22-1.43 1.22H17" />
      <path d="m11 2 .33.82c.34.86-.2 1.82-1.11 1.98v0C9.52 4.9 9 5.52 9 6.23V7" />
      <path d="M11 13c1.93 1.93 2.83 4.17 2 5-.83.83-3.07-.07-5-2-1.93-1.93-2.83-4.17-2-5 .83-.83 3.07.07 5 2Z" />
    </svg>
  );
  
  // Custom Laugh icon
  const LaughIcon = (props: any) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M18 13a6 6 0 0 1-6 5 6 6 0 0 1-6-5h12Z" />
      <line x1="9" y1="9" x2="9.01" y2="9" />
      <line x1="15" y1="9" x2="15.01" y2="9" />
    </svg>
  );
  
  return (
    <>
      <Helmet>
        <title>Animation Événementielle | Sonorisation 83 - Animation Professionnelle dans le Var</title>
        <meta name="description" content="Transformez votre événement avec nos animations personnalisées: animations thématiques, jeux interactifs et une ambiance garantie pour tous vos événements." />
        <meta name="keywords" content="animation événementielle, animation soirée, animation var, jeux interactifs, animation thématique" />
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
                Animation Événementielle
              </h1>
              <p className="text-xl md:text-2xl max-w-3xl mx-auto text-white">
                Transformez votre événement en une expérience inoubliable avec nos animations personnalisées
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
                  <a href="/brochures/animation-evenementielle.pdf" download>
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
              title="Nos animations"
              subtitle="Des animations pour tous les goûts"
              description="Découvrez notre large gamme d'animations pour tous types d'événements: mariages, anniversaires, soirées d'entreprise..."
              centered
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              {[
                {
                  icon: <PartyIcon className="w-8 h-8 text-pink-600" />,
                  title: "Animations thématiques",
                  description: "Soirées à thème, années 80, disco, mousse, halloween... Nous créons l'ambiance parfaite pour votre événement."
                },
                {
                  icon: <Users className="w-8 h-8 text-pink-600" />,
                  title: "Jeux interactifs",
                  description: "Des jeux participatifs pour tous les âges qui favorisent les échanges et la bonne humeur."
                },
                {
                  icon: <Trophy className="w-8 h-8 text-pink-600" />,
                  title: "Challenges et quiz",
                  description: "Stimulez la créativité et l'esprit de compétition de vos invités avec nos quiz et défis originaux."
                },
                {
                  icon: <Sparkles className="w-8 h-8 text-pink-600" />,
                  title: "Animations visuelles",
                  description: "Projection sur écran géant, mapping vidéo, effets spéciaux... Des animations visuelles spectaculaires."
                },
                {
                  icon: <LaughIcon className="w-8 h-8 text-pink-600" />,
                  title: "Animations humoristiques",
                  description: "Des moments de rire et de convivialité avec nos animations comiques et décalées."
                },
                {
                  icon: <CalendarCheck className="w-8 h-8 text-pink-600" />,
                  title: "Animations sur mesure",
                  description: "Une idée particulière ? Nous créons des animations personnalisées selon vos envies et le thème de votre événement."
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
              title="Nos animations en action"
              subtitle="Références"
              description="Quelques exemples de nos animations lors d'événements passés"
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
                    alt={`Animation événementielle ${item}`} 
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
                  name: "Marine et Thomas",
                  event: "Mariage",
                  testimonial: "Les animations proposées pendant notre mariage ont été un véritable succès ! Nos invités en parlent encore."
                },
                {
                  name: "Groupe Azur Technologies",
                  event: "Séminaire d'entreprise",
                  testimonial: "Des animations team building parfaitement adaptées à notre équipe. Un grand moment de cohésion et de bonne humeur."
                },
                {
                  name: "Comité des fêtes de Saint-Maximin",
                  event: "Fête locale",
                  testimonial: "Professionnalisme et créativité pour animer notre fête locale. Petits et grands ont été conquis !"
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
              Une animation pour votre événement ?
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

export default AnimationEvenementielle;
