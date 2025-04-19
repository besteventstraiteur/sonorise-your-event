
import React from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '@/components/ui/SectionTitle';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Marie et Pierre",
      event: "Mariage",
      testimonial: "Les animations ont rendu notre mariage encore plus magique. Les invités en parlent encore !"
    },
    {
      name: "Société TechVision",
      event: "Team Building",
      testimonial: "Une journée exceptionnelle qui a renforcé la cohésion de nos équipes. Merci pour votre professionnalisme."
    },
    {
      name: "Sophie D.",
      event: "Anniversaire",
      testimonial: "Des animations originales qui ont su captiver petits et grands. Un anniversaire mémorable !"
    }
  ];

  return (
    <section className="section section-alt">
      <div className="section-content">
        <SectionTitle
          title="Ils nous font confiance"
          subtitle="Témoignages"
          description="Ce que nos clients disent de nos prestations"
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
              <p className="text-gray-700 italic">&ldquo;{testimonial.testimonial}&rdquo;</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
