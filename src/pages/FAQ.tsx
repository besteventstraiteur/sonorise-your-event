
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const faqSections = [
  {
    title: "Réservation et Organisation",
    questions: [
      {
        question: "Comment réserver vos services ?",
        answer: "Pour réserver nos services, vous pouvez utiliser notre formulaire de devis en ligne, nous appeler directement ou nous envoyer un email. Nous vous répondrons dans les 24h avec une proposition personnalisée."
      },
      {
        question: "Quel est le délai de réservation recommandé ?",
        answer: "Nous vous conseillons de réserver au minimum 3 mois à l'avance, particulièrement pour les événements en haute saison (mai à septembre). Cependant, n'hésitez pas à nous contacter même pour des demandes de dernière minute."
      },
      {
        question: "Quelle est la zone géographique couverte ?",
        answer: "Nous intervenons principalement dans le Var (83) et les Bouches-du-Rhône (13), mais nous pouvons également nous déplacer dans toute la région PACA selon vos besoins."
      }
    ]
  },
  {
    title: "Services et Équipements",
    questions: [
      {
        question: "Quels types d'événements prenez-vous en charge ?",
        answer: "Nous animons tous types d'événements : mariages, anniversaires, soirées d'entreprise, festivals, concerts, inaugurations, et bien plus encore. Chaque prestation est adaptée à votre événement."
      },
      {
        question: "Comment se déroule l'installation du matériel ?",
        answer: "Notre équipe se charge de toute l'installation et des tests avant votre événement. Nous arrivons suffisamment à l'avance pour garantir une mise en place parfaite et un démarrage à l'heure prévue."
      },
      {
        question: "Proposez-vous une solution de secours en cas de panne ?",
        answer: "Oui, nous disposons toujours d'un équipement de secours et notre matériel est régulièrement entretenu et vérifié. En cas de problème, nous avons des solutions de backup immédiatement disponibles."
      }
    ]
  }
];

const FAQ = () => {
  return (
    <>
      <Helmet>
        <title>FAQ - Questions Fréquentes | Sonorisation 83</title>
        <meta 
          name="description" 
          content="Retrouvez les réponses à toutes vos questions sur nos services de sonorisation, animation et DJ dans le Var. Installation, tarifs, équipements..." 
        />
      </Helmet>

      <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Questions Fréquentes
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Retrouvez les réponses aux questions les plus courantes sur nos services
            </p>
          </motion.div>

          {faqSections.map((section, sectionIndex) => (
            <motion.div
              key={sectionIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: sectionIndex * 0.1 }}
              className="mb-8"
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {section.title}
              </h2>
              <Accordion type="single" collapsible className="w-full space-y-4">
                {section.questions.map((faq, index) => (
                  <AccordionItem 
                    key={index} 
                    value={`${sectionIndex}-${index}`}
                    className="border border-gray-200 rounded-lg px-4"
                  >
                    <AccordionTrigger className="text-left text-gray-900 hover:text-pink-600 py-4">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 pb-4">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          ))}

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center mt-12 p-8 bg-gray-50 rounded-lg"
          >
            <HelpCircle className="w-12 h-12 text-pink-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-4">
              Vous n'avez pas trouvé votre réponse ?
            </h3>
            <p className="text-gray-600 mb-6">
              Notre équipe est à votre disposition pour répondre à toutes vos questions
            </p>
            <Button asChild>
              <Link to="/contact">
                Contactez-nous
              </Link>
            </Button>
          </motion.div>
        </div>
      </main>
    </>
  );
};

export default FAQ;
