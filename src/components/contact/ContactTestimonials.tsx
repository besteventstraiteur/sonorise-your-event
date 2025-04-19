
import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    id: 1,
    name: "Sophie & Thomas",
    event: "Mariage à Hyères",
    content: "Une équipe à l'écoute et très professionnelle. La sonorisation était parfaite pour notre mariage et le DJ a su créer une ambiance exceptionnelle !",
    rating: 5,
    image: "/lovable-uploads/photo-1581091226825-a6a2a5aee158"
  },
  {
    id: 2,
    name: "Restaurant Le Mistral",
    event: "Soirées d'été",
    content: "Partenaire fiable pour nos animations estivales. Installation impeccable et réactivité au top. L'équipe s'adapte parfaitement à nos besoins.",
    rating: 5
  }
];

const ContactTestimonials = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-pink-50/50 to-transparent">
      <div className="container mx-auto px-4">
        <motion.header 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
            Ils nous font confiance
          </h2>
          <p className="text-gray-600">
            Découvrez l'expérience de nos clients satisfaits
          </p>
        </motion.header>

        <div 
          role="list" 
          className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto"
        >
          {testimonials.map((testimonial, index) => (
            <motion.article
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              role="listitem"
              className="will-change-transform"
            >
              <Card className="h-full bg-white">
                <CardContent className="p-6">
                  <Quote className="h-8 w-8 text-pink-600 mb-4" aria-hidden="true" />
                  <div 
                    className="flex gap-1 mb-4" 
                    role="group" 
                    aria-label={`Note: ${testimonial.rating} sur 5`}
                  >
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star 
                        key={i} 
                        className="h-4 w-4 fill-yellow-400 text-yellow-400" 
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <blockquote className="text-gray-700 italic mb-6">
                    {testimonial.content}
                  </blockquote>
                  <footer className="flex items-center gap-4 pt-4 border-t border-gray-100">
                    {testimonial.image && (
                      <img
                        src={testimonial.image}
                        alt={`Photo de ${testimonial.name}`}
                        className="w-12 h-12 rounded-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                    )}
                    <div>
                      <cite className="font-semibold text-gray-900 not-italic">
                        {testimonial.name}
                      </cite>
                      <p className="text-sm text-gray-600">{testimonial.event}</p>
                    </div>
                  </footer>
                </CardContent>
              </Card>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactTestimonials;
