
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import SectionTitle from '@/components/ui/SectionTitle';

const PolitiqueConfidentialite = () => {
  return (
    <>
      <Helmet>
        <title>Politique de Confidentialité | Sonorisation 83 - Protection de vos données</title>
        <meta name="description" content="Découvrez comment Sonorisation 83 protège vos données personnelles. Notre politique de confidentialité explique la collecte, l'utilisation et la protection de vos informations." />
        <meta name="keywords" content="politique confidentialité, RGPD, données personnelles, sonorisation var, protection données" />
      </Helmet>

      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <SectionTitle title="Politique de Confidentialité" subtitle="Protection de vos données personnelles" />
        
        <motion.div 
          className="mt-8 space-y-8 bg-white p-8 rounded-lg shadow-sm border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <section>
            <p className="text-gray-700">
              Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
            
            <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-4">1. Introduction</h2>
            <p className="text-gray-700">
              Sonorisation 83 s'engage à protéger vos données personnelles et votre vie privée. La présente politique de confidentialité 
              explique comment nous collectons, utilisons et protégeons vos informations lorsque vous utilisez notre site web 
              et nos services.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">2. Collecte des données personnelles</h2>
            <p className="text-gray-700">
              Nous collectons différents types d'informations personnelles pour diverses raisons, notamment pour :
            </p>
            <ul className="list-disc list-inside mt-4 space-y-2 text-gray-700 ml-4">
              <li>Vous permettre de créer un compte client</li>
              <li>Traiter vos commandes et réservations</li>
              <li>Vous envoyer des informations relatives à nos services</li>
              <li>Améliorer nos services et votre expérience utilisateur</li>
              <li>Répondre à vos demandes et questions</li>
            </ul>
            
            <p className="text-gray-700 mt-4">
              Les informations que nous collectons peuvent inclure :
            </p>
            <ul className="list-disc list-inside mt-4 space-y-2 text-gray-700 ml-4">
              <li>Informations d'identification (nom, prénom, adresse email, numéro de téléphone)</li>
              <li>Informations de facturation et de livraison</li>
              <li>Historique d'achat et de location</li>
              <li>Informations de connexion et d'utilisation du site</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">3. Utilisation des données collectées</h2>
            <p className="text-gray-700">
              Nous utilisons vos données personnelles pour les finalités suivantes :
            </p>
            <ul className="list-disc list-inside mt-4 space-y-2 text-gray-700 ml-4">
              <li>Fournir nos services et répondre à vos demandes</li>
              <li>Gérer votre compte client et vos transactions</li>
              <li>Personnaliser votre expérience sur notre site</li>
              <li>Vous informer sur nos offres et nouveautés, si vous avez consenti à recevoir ces communications</li>
              <li>Améliorer nos produits et services</li>
              <li>Assurer la sécurité de notre site et de nos services</li>
              <li>Respecter nos obligations légales et réglementaires</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">4. Conservation des données</h2>
            <p className="text-gray-700">
              Nous conservons vos données personnelles aussi longtemps que nécessaire pour atteindre les finalités pour lesquelles 
              nous les avons collectées, notamment pour satisfaire aux exigences légales, comptables ou de déclaration.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">5. Partage de vos données</h2>
            <p className="text-gray-700">
              Nous ne vendons pas vos données personnelles à des tiers. Nous pouvons partager vos informations avec :
            </p>
            <ul className="list-disc list-inside mt-4 space-y-2 text-gray-700 ml-4">
              <li>Nos prestataires de services qui nous aident à exploiter notre site et à fournir nos services</li>
              <li>Les autorités compétentes, si la loi l'exige</li>
            </ul>
            <p className="text-gray-700 mt-4">
              Tout partage de données est effectué dans le respect des lois applicables en matière de protection des données.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">6. Vos droits</h2>
            <p className="text-gray-700">
              Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez des droits suivants concernant vos données personnelles :
            </p>
            <ul className="list-disc list-inside mt-4 space-y-2 text-gray-700 ml-4">
              <li>Droit d'accès à vos données</li>
              <li>Droit de rectification des données inexactes</li>
              <li>Droit à l'effacement (droit à l'oubli)</li>
              <li>Droit à la limitation du traitement</li>
              <li>Droit à la portabilité des données</li>
              <li>Droit d'opposition au traitement</li>
            </ul>
            <p className="text-gray-700 mt-4">
              Pour exercer ces droits ou pour toute question concernant le traitement de vos données, veuillez nous contacter à l'adresse suivante : contact@sonorisation-83.com.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">7. Sécurité des données</h2>
            <p className="text-gray-700">
              Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données personnelles 
              contre la perte, l'accès non autorisé, la divulgation, l'altération et la destruction.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">8. Cookies et technologies similaires</h2>
            <p className="text-gray-700">
              Notre site utilise des cookies et des technologies similaires pour améliorer votre expérience de navigation.
              Pour plus d'informations sur notre utilisation des cookies, veuillez consulter notre politique en matière de cookies.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">9. Modifications de la politique de confidentialité</h2>
            <p className="text-gray-700">
              Nous pouvons mettre à jour cette politique de confidentialité de temps à autre. Toute modification sera publiée sur cette page
              avec une date de mise à jour révisée. Nous vous encourageons à consulter régulièrement cette page pour rester informé de nos pratiques.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">10. Contact</h2>
            <p className="text-gray-700">
              Si vous avez des questions ou des préoccupations concernant cette politique de confidentialité ou le traitement de vos données personnelles,
              veuillez nous contacter à l'adresse suivante :
            </p>
            <p className="text-gray-700 mt-4">
              Sonorisation 83<br />
              123 Rue de la Musique<br />
              83000 Toulon, France<br />
              Email : contact@sonorisation-83.com<br />
              Téléphone : +33 4 94 XX XX XX
            </p>
          </section>
        </motion.div>
      </div>
    </>
  );
};

export default PolitiqueConfidentialite;
