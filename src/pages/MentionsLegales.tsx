
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import SectionTitle from '@/components/ui/SectionTitle';

const MentionsLegales = () => {
  return (
    <>
      <Helmet>
        <title>Mentions Légales | Sonorisation 83 - Services Professionnels dans le Var</title>
        <meta name="description" content="Mentions légales de Sonorisation 83. Consultez nos informations légales, notre politique concernant vos données et les conditions d'utilisation de notre site." />
        <meta name="keywords" content="mentions légales, sonorisation var, informations légales, politique données, CGU" />
      </Helmet>

      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <SectionTitle title="Mentions Légales" subtitle="Informations juridiques concernant notre activité" />
        
        <motion.div 
          className="mt-8 space-y-8 bg-white p-8 rounded-lg shadow-sm border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">1. Informations générales</h2>
            <p className="text-gray-700">
              Le présent site, sonorisation-83.com, est édité par la société Sonorisation 83, entreprise individuelle
              dont le siège social est situé au 123 Rue de la Musique, 83000 Toulon, France.
            </p>
            <ul className="list-disc list-inside mt-4 space-y-2 text-gray-700">
              <li>SIRET : XX XXX XXX XXXXX</li>
              <li>Directeur de la publication : Nom du Directeur</li>
              <li>Téléphone : +33 4 94 XX XX XX</li>
              <li>Email : contact@sonorisation-83.com</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">2. Hébergement</h2>
            <p className="text-gray-700">
              Ce site est hébergé par Hébergeur, dont le siège social est situé à [adresse de l'hébergeur].
              Téléphone : +33 X XX XX XX XX.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">3. Propriété intellectuelle</h2>
            <p className="text-gray-700">
              L'ensemble du contenu de ce site (textes, images, vidéos, logos, etc.) est protégé par le droit d'auteur.
              Toute reproduction, représentation, modification, publication ou adaptation de tout ou partie des éléments du site,
              quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable de Sonorisation 83.
            </p>
            <p className="text-gray-700 mt-4">
              Toute exploitation non autorisée du site ou de l'un quelconque des éléments qu'il contient sera considérée
              comme constitutive d'une contrefaçon et poursuivie conformément aux dispositions des articles L.335-2 et suivants du Code de Propriété Intellectuelle.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">4. Liens hypertextes</h2>
            <p className="text-gray-700">
              Les liens hypertextes mis en place dans le cadre du présent site internet en direction d'autres ressources
              présentes sur le réseau Internet ont fait l'objet d'une autorisation préalable expresse et écrite.
            </p>
            <p className="text-gray-700 mt-4">
              Sonorisation 83 ne saurait être responsable de l'accès par les utilisateurs par les liens hypertextes
              mis en place dans le cadre du site internet en direction d'autres ressources présentes sur le réseau.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">5. Droit applicable et juridiction compétente</h2>
            <p className="text-gray-700">
              Tout litige en relation avec l'utilisation du site sonorisation-83.com est soumis au droit français.
              Il est fait attribution exclusive de juridiction aux tribunaux compétents de Toulon.
            </p>
          </section>
        </motion.div>
      </div>
    </>
  );
};

export default MentionsLegales;
