
import React from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '@/components/ui/SectionTitle';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Comment réserver vos services ?",
    answer: "Pour réserver nos services, vous pouvez utiliser notre formulaire de devis en ligne, nous appeler directement ou nous envoyer un email. Nous vous répondrons dans les 24h avec une proposition personnalisée."
  },
  {
    question: "Quelle est la zone géographique couverte ?",
    answer: "Nous intervenons principalement dans le Var (83) et les Bouches-du-Rhône (13), mais nous pouvons également nous déplacer dans toute la région PACA selon vos besoins."
  },
  {
    question: "Quels types d'événements prenez-vous en charge ?",
    answer: "Nous animons tous types d'événements : mariages, anniversaires, soirées d'entreprise, festivals, concerts, inaugurations, et bien plus encore. Chaque prestation est adaptée à votre événement."
  },
  {
    question: "Quel est le délai de réservation recommandé ?",
    answer: "Nous vous conseillons de réserver au minimum 3 mois à l'avance, particulièrement pour les événements en haute saison (mai à septembre). Cependant, n'hésitez pas à nous contacter même pour des demandes de dernière minute."
  },
  {
    question: "Comment se déroule l'installation du matériel ?",
    answer: "Notre équipe se charge de toute l'installation et des tests avant votre événement. Nous arrivons suffisamment à l'avance pour garantir une mise en place parfaite et un démarrage à l'heure prévue."
  },
  {
    question: "Proposez-vous une solution de secours en cas de panne ?",
    answer: "Oui, nous disposons toujours d'un équipement de secours et notre matériel est régulièrement entretenu et vérifié. En cas de problème, nous avons des solutions de backup immédiatement disponibles."
  }
];

const FAQSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="Questions fréquentes"
          subtitle="FAQ"
          description="Retrouvez les réponses aux questions les plus courantes"
          centered
        />
        
        <motion.div 
          className="max-w-3xl mx-auto mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
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
      </div>
    </section>
  );
};

export default FAQSection;
