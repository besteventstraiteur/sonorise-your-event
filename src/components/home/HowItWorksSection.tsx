
import React from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '@/components/ui/SectionTitle';
import { Calendar, CheckCircle, MessageCircle, Truck } from 'lucide-react';

const steps = [
  {
    icon: Calendar,
    title: "1. Choisissez vos dates",
    description: "Sélectionnez les dates de votre événement et le matériel dont vous avez besoin"
  },
  {
    icon: MessageCircle,
    title: "2. Demandez un devis",
    description: "Recevez une offre personnalisée adaptée à vos besoins spécifiques"
  },
  {
    icon: CheckCircle,
    title: "3. Confirmez votre réservation",
    description: "Validez votre commande et effectuez le paiement en toute sécurité"
  },
  {
    icon: Truck,
    title: "4. Livraison et installation",
    description: "Notre équipe s'occupe de tout : livraison, installation et récupération"
  }
];

const HowItWorksSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="Comment ça marche ?"
          subtitle="Processus simple"
          description="Location de matériel son et lumière en 4 étapes simples"
          centered
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 rounded-full bg-pink-100 flex items-center justify-center mb-4">
                <step.icon className="w-8 h-8 text-pink-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
