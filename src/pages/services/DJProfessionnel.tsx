
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Music, Calendar, Users, Star } from 'lucide-react';

const DJProfessionnel = () => {
  return (
    <>
      <Helmet>
        <title>DJ Professionnel | Sonorisation 83 - Animation musicale dans le Var</title>
        <meta name="description" content="DJ professionnel pour vos événements dans le Var. Animation musicale personnalisée, équipement haut de gamme et large répertoire musical pour mariages, soirées d'entreprise et événements privés." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
        {/* Hero Section */}
        <div className="pt-24 pb-16 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-display font-bold text-pink-800 mb-6"
            >
              DJ Professionnel
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-gray-700 mb-8"
            >
              Donnez vie à votre événement avec une animation musicale sur mesure et un équipement sonore haut de gamme
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Button asChild size="lg" className="bg-pink-600 hover:bg-pink-700">
                <Link to="/devis">Demander un devis</Link>
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <Music className="w-12 h-12 text-pink-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Large Répertoire Musical</h3>
              <p className="text-gray-600">
                Plus de 50 000 titres couvrant tous les styles : hits actuels, années 80-90,
                variété française et internationale, rock, latino, électro...
                Personnalisation selon vos préférences.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <Calendar className="w-12 h-12 text-pink-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Types d'Événements</h3>
              <p className="text-gray-600">
                Expertise dans l'animation de mariages, soirées d'entreprise,
                anniversaires, inaugurations et tout autre événement privé ou professionnel.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <Users className="w-12 h-12 text-pink-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Matériel Professionnel</h3>
              <p className="text-gray-600">
                Équipement son et lumière haut de gamme, redondance complète du matériel,
                systèmes Pioneer DJ dernière génération, éclairages LED intelligents.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <Star className="w-12 h-12 text-pink-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Services Inclus</h3>
              <p className="text-gray-600">
                Rendez-vous de préparation, playlist personnalisée,
                installation et désinstallation comprises, coordination avec les autres prestataires.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Description détaillée */}
        <div className="container mx-auto px-4 py-16 max-w-3xl">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Nos Formules DJ</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-medium text-pink-700 mb-3">Formule Essentielle</h3>
                <p className="text-gray-600 mb-4">
                  Animation musicale professionnelle de 6 heures avec un DJ expérimenté,
                  sonorisation adaptée jusqu'à 100 personnes, éclairages de base.
                  Idéale pour les petits événements et soirées privées.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-medium text-pink-700 mb-3">Formule Premium</h3>
                <p className="text-gray-600 mb-4">
                  Prestation complète de 8 heures, système son haut de gamme jusqu'à 200 personnes,
                  show lumière élaboré, machine à fumée, rendez-vous de préparation approfondi.
                  Parfaite pour les mariages et événements d'entreprise.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-medium text-pink-700 mb-3">Formule Excellence</h3>
                <p className="text-gray-600 mb-4">
                  Service VIP de 10 heures, sonorisation ultra-premium, éclairages architecturaux,
                  écrans LED, effets spéciaux, deux DJs. La solution ultime pour les grands
                  événements nécessitant un impact maximal.
                </p>
              </div>
            </div>

            <div className="mt-8 text-center">
              <Button asChild size="lg" className="bg-pink-600 hover:bg-pink-700">
                <Link to="/devis">Réserver votre DJ</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DJProfessionnel;
