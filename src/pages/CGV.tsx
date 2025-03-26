
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import SectionTitle from '@/components/ui/SectionTitle';

const CGV = () => {
  return (
    <>
      <Helmet>
        <title>Conditions Générales de Vente | Sonorisation 83 - Location et Services</title>
        <meta name="description" content="Consultez les conditions générales de vente de Sonorisation 83. Informations sur les tarifs, conditions de location, livraison, paiement et garanties pour nos services de sonorisation professionnelle." />
        <meta name="keywords" content="CGV, conditions générales, sonorisation professionnelle, location matériel, DJ var, services événementiels" />
      </Helmet>

      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <SectionTitle title="Conditions Générales de Vente" subtitle="Applicables à l'ensemble de nos prestations et services" />
        
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
            
            <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-4">Article 1 - Champ d'application</h2>
            <p className="text-gray-700">
              Les présentes conditions générales de vente (CGV) s'appliquent à toutes les prestations et ventes conclues par la société 
              Sonorisation 83, dont le siège social est situé au 123 Rue de la Musique, 83000 Toulon, France, auprès des clients 
              professionnels ou particuliers, quel que soit le lieu de livraison ou d'exécution de la prestation.
            </p>
            <p className="text-gray-700 mt-4">
              Toute commande de produits ou services implique l'acceptation sans réserve par le client et son adhésion pleine et entière 
              aux présentes CGV qui prévalent sur tout autre document du client.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Article 2 - Commandes</h2>
            <p className="text-gray-700">
              Les commandes peuvent être passées par téléphone, par courrier électronique ou via notre site internet.
              Toute commande est ferme et définitive dès la confirmation écrite par Sonorisation 83 et le versement de l'acompte demandé.
            </p>
            <p className="text-gray-700 mt-4">
              Les informations contractuelles sont présentées en langue française et font l'objet d'une confirmation au plus tard 
              au moment de la validation de la commande par le client.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Article 3 - Tarifs</h2>
            <p className="text-gray-700">
              Les prix de nos produits et services sont indiqués en euros toutes taxes comprises (TTC).
              Les frais de livraison ou de déplacement sont facturés en supplément et clairement indiqués avant la validation de la commande.
            </p>
            <p className="text-gray-700 mt-4">
              Sonorisation 83 se réserve le droit de modifier ses prix à tout moment, mais les produits et services seront facturés 
              sur la base des tarifs en vigueur au moment de l'enregistrement des commandes.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Article 4 - Conditions de location</h2>
            <p className="text-gray-700">
              4.1. Durée de location : La durée minimale de location est d'une journée (24 heures). Toute journée entamée est due.
            </p>
            <p className="text-gray-700 mt-4">
              4.2. Dépôt de garantie : Un dépôt de garantie sera demandé pour toute location de matériel. Son montant varie selon 
              la valeur du matériel loué. Ce dépôt de garantie n'est pas encaissé sauf en cas de détérioration, de vol ou de perte 
              du matériel.
            </p>
            <p className="text-gray-700 mt-4">
              4.3. État du matériel : Le matériel est testé avant chaque location et est réputé être en bon état de fonctionnement. 
              Le client doit vérifier le matériel à sa réception et signaler immédiatement tout dysfonctionnement éventuel.
            </p>
            <p className="text-gray-700 mt-4">
              4.4. Responsabilité : Pendant toute la durée de la location, le client est responsable du matériel loué. 
              Il s'engage à l'utiliser conformément à sa destination et aux instructions fournies.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Article 5 - Conditions de prestation</h2>
            <p className="text-gray-700">
              5.1. Réservation : Toute prestation (DJ, sonorisation, animation, etc.) doit faire l'objet d'une réservation confirmée 
              par écrit par Sonorisation 83 et le versement d'un acompte.
            </p>
            <p className="text-gray-700 mt-4">
              5.2. Annulation : En cas d'annulation par le client, l'acompte versé reste acquis à Sonorisation 83 à titre d'indemnité 
              forfaitaire. Si l'annulation intervient moins de 30 jours avant la date prévue de la prestation, la totalité du prix 
              est due.
            </p>
            <p className="text-gray-700 mt-4">
              5.3. Force majeure : Sonorisation 83 ne pourra être tenue responsable de l'inexécution de ses obligations en cas de 
              force majeure (intempéries, catastrophes naturelles, incendie, grèves, etc.).
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Article 6 - Paiement</h2>
            <p className="text-gray-700">
              6.1. Modalités : Le paiement peut être effectué par carte bancaire, virement bancaire ou chèque.
            </p>
            <p className="text-gray-700 mt-4">
              6.2. Acompte : Un acompte de 30% minimum est demandé à la commande. Le solde est payable au plus tard le jour de 
              la livraison ou de la prestation, sauf accord préalable écrit.
            </p>
            <p className="text-gray-700 mt-4">
              6.3. Retard de paiement : Tout retard de paiement entraînera l'application de pénalités de retard calculées au taux 
              d'intérêt légal majoré de 5 points, ainsi qu'une indemnité forfaitaire de 40€ pour frais de recouvrement.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Article 7 - Livraison et installation</h2>
            <p className="text-gray-700">
              7.1. Délais : Les délais de livraison sont donnés à titre indicatif. Tout retard de livraison ne pourra donner lieu 
              à des dommages et intérêts ou à l'annulation de la commande.
            </p>
            <p className="text-gray-700 mt-4">
              7.2. Installation : Si le service d'installation est inclus dans la prestation, le client doit s'assurer que le lieu 
              est accessible et sécurisé, et dispose des branchements électriques nécessaires.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Article 8 - Garantie et responsabilité</h2>
            <p className="text-gray-700">
              8.1. Garantie : Tous nos produits bénéficient de la garantie légale de conformité et de la garantie contre les vices cachés.
            </p>
            <p className="text-gray-700 mt-4">
              8.2. Limitation de responsabilité : La responsabilité de Sonorisation 83 ne pourra être engagée en cas d'utilisation 
              non conforme du matériel ou en cas de dommages indirects tels que perte de clients, de chiffre d'affaires ou de bénéfices.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Article 9 - Droit de rétractation</h2>
            <p className="text-gray-700">
              Conformément aux dispositions du Code de la Consommation, le client particulier dispose d'un délai de 14 jours à compter de 
              la livraison de sa commande pour exercer son droit de rétractation sans avoir à justifier de motifs ni à payer de pénalités.
            </p>
            <p className="text-gray-700 mt-4">
              Toutefois, le droit de rétractation ne s'applique pas aux prestations de services de loisirs qui doivent être fournis à une 
              date ou selon une périodicité déterminée (réservation pour un événement spécifique).
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Article 10 - Propriété intellectuelle</h2>
            <p className="text-gray-700">
              Tous les éléments du site sonorisation-83.com et les documents techniques fournis au client sont et restent la propriété 
              intellectuelle et exclusive de Sonorisation 83. Personne n'est autorisé à reproduire, exploiter, rediffuser, ou utiliser 
              à quelque titre que ce soit, même partiellement, ces éléments sans l'accord préalable écrit de Sonorisation 83.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Article 11 - Loi applicable et juridiction compétente</h2>
            <p className="text-gray-700">
              Les présentes CGV sont soumises au droit français. En cas de litige, les tribunaux de Toulon seront seuls compétents.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Article 12 - Contact</h2>
            <p className="text-gray-700">
              Pour toute question relative aux présentes CGV, vous pouvez nous contacter à :
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

export default CGV;
