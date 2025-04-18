
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import SectionTitle from '@/components/ui/SectionTitle';
import { 
  Download, 
  Headphones, 
  Music, 
  Star, 
  Disc, 
  MicVocal, 
  Mic, 
  FileCheck 
} from 'lucide-react';
import { Link } from 'react-router-dom';

const DJProfessionnel = () => {
  const serviceDescription = "Notre service de DJ professionnel est bien plus qu'une simple animation musicale. Nous proposons une expérience sonore sur-mesure qui transformera votre événement en moment inoubliable. Avec plus de 15 ans d'expérience dans l'événementiel, nos DJs professionnels s'adaptent à tous types de celebrations : mariages, soirées d'entreprise, anniversaires, festivals. Leur expertise technique et leur sens du rythme garantissent une ambiance parfaitement maîtrisée, du choix des morceaux à la gestion du son et de la lumière.";

  const serviceFeatures = [
    {
      icon: <Headphones className="w-8 h-8 text-pink-600" />,
      title: "Musique sur-mesure",
      description: "Sélection musicale adaptée à votre événement et vos invités"
    },
    {
      icon: <Music className="w-8 h-8 text-pink-600" />,
      title: "Matériel professionnel",
      description: "Sonorisation et éclairage haut de gamme dernier cri"
    },
    {
      icon: <Star className="w-8 h-8 text-pink-600" />,
      title: "Expérience événementielle",
      description: "Plus de 15 ans d'animation pour tous types d'événements"
    }
  ];

  const djFormules = [
    {
      title: "Pack Essentiel",
      description: "Idéal pour petits événements jusqu'à 50 personnes",
      price: "À partir de 490€",
      features: [
        "DJ professionnel",
        "Sonorisation basique",
        "2h de prestation",
        "Répertoire varié",
        "Animation de base"
      ]
    },
    {
      title: "Pack Premium",
      description: "Solution complète pour événements jusqu'à 200 personnes",
      price: "À partir de 890€",
      features: [
        "DJ professionnel confirmé",
        "Sonorisation professionnelle",
        "4h de prestation",
        "Éclairage dynamique",
        "Animation interactive",
        "Choix musical personnalisé"
      ]
    },
    {
      title: "Pack Prestige",
      description: "Configuration haut de gamme pour grands événements",
      price: "Sur devis",
      features: [
        "DJ expert international",
        "Système son & lumière complet",
        "6h de prestation",
        "Écrans & effets spéciaux",
        "Technique de mix avancée",
        "Accompagnement sur-mesure"
      ]
    }
  ];

  return (
    <>
      <Helmet>
        <title>DJ Professionnel | Sonorisation 83 - Animation musicale dans le Var</title>
        <meta name="description" content={serviceDescription} />
        <meta name="keywords" content="DJ mariage, animation soirée, DJ événementiel, musique var, animation professionnelle" />
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
                DJ Professionnel
              </h1>
              <p className="text-xl md:text-2xl max-w-3xl mx-auto">
                Des performances musicales qui transforment vos événements en souvenirs inoubliables
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

        {/* Services Features */}
        <div className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <SectionTitle
              title="Notre expertise DJ"
              subtitle="Services"
              description="Découvrez ce qui fait la différence dans nos prestations DJ"
              centered
            />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              {serviceFeatures.map((feature, index) => (
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

        {/* Formules Section */}
        <div className="py-20">
          <div className="container mx-auto px-4">
            <SectionTitle
              title="Nos formules DJ"
              subtitle="Tarifs"
              description="Choisissez la configuration qui correspond à votre événement"
              centered
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              {djFormules.map((formule, index) => (
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
              Votre DJ pour un événement unique
            </h2>
            <p className="text-xl max-w-3xl mx-auto mb-10">
              Contactez-nous pour discuter de vos attentes et obtenir un devis personnalisé
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
