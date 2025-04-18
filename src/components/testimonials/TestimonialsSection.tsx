
import React from 'react';
import { motion } from 'framer-motion';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import SectionTitle from '@/components/ui/SectionTitle';
import { Card, CardContent } from '@/components/ui/card';
import { Quote, Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Marie et Jean",
    event: "Mariage à Saint-Raphaël",
    content: "Une prestation exceptionnelle ! Le DJ a parfaitement su animer notre soirée de mariage, avec un choix musical qui a fait danser toutes les générations. Le matériel était de grande qualité et l'équipe très professionnelle.",
    rating: 5
  },
  {
    id: 2,
    name: "Casino Barrière",
    event: "Soirée de gala",
    content: "Nous faisons régulièrement appel à leurs services pour nos événements. La qualité de la sonorisation et l'expertise technique sont toujours au rendez-vous. Une équipe fiable et réactive.",
    rating: 5
  },
  {
    id: 3,
    name: "Sophie D.",
    event: "Anniversaire 40 personnes",
    content: "Super ambiance pour mes 40 ans ! Le système de son était parfait pour notre salle, et l'animateur a su créer une atmosphère festive tout au long de la soirée. Je recommande vivement !",
    rating: 5
  },
  {
    id: 4,
    name: "Restaurant La Plage",
    event: "Soirées estivales",
    content: "Un partenaire de confiance pour nos soirées d'été. Installation impeccable, son de qualité et réactivité au top. Merci pour votre professionnalisme !",
    rating: 5
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="Ils nous font confiance"
          subtitle="Témoignages"
          description="Découvrez ce que nos clients disent de nos services"
          centered
        />

        <div className="mt-12">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-6xl mx-auto"
          >
            <CarouselContent>
              {testimonials.map((testimonial) => (
                <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/3 pl-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <Card className="bg-white border border-gray-200 h-full">
                      <CardContent className="p-6">
                        <Quote className="h-8 w-8 text-pink-600 mb-4" />
                        <div className="flex gap-1 mb-4">
                          {Array.from({ length: testimonial.rating }).map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <p className="text-gray-700 italic mb-6 line-clamp-4">
                          "{testimonial.content}"
                        </p>
                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <p className="font-semibold text-gray-900">{testimonial.name}</p>
                          <p className="text-sm text-gray-600">{testimonial.event}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
