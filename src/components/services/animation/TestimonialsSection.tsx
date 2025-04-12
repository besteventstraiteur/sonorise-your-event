
import React from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '@/components/ui/SectionTitle';

const TestimonialsSection = () => {
  const testimonials = [
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
  ];

  return (
    <div className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="Ce qu'en disent nos clients"
          subtitle="Témoignages"
          description="Ils nous ont fait confiance pour leurs événements"
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
