
import React from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '@/components/ui/SectionTitle';

const testimonials = [
  {
    name: "Hôtel Royal Riviera",
    event: "Soirée de gala",
    testimonial: "Les performances artistiques ont été le point fort de notre soirée. Un niveau d'excellence qui a impressionné tous nos convives."
  },
  {
    name: "Julie et Romain",
    event: "Mariage",
    testimonial: "Le trio de jazz que nous avons engagé pour notre cocktail de mariage a créé une ambiance parfaite et élégante."
  },
  {
    name: "Casino de Bandol",
    event: "Soirée thématique",
    testimonial: "Des artistes talentueux et professionnels qui ont su s'adapter parfaitement à notre thématique et à notre public."
  }
];

const TestimonialsSection = () => {
  return (
    <div className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="Ce qu'en disent nos clients"
          subtitle="Témoignages"
          description="Ils ont fait appel à nos artistes pour leurs événements"
          centered
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {testimonials.map((testimonial, index) => (
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
  );
};

export default TestimonialsSection;
