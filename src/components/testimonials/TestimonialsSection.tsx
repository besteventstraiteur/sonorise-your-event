
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
import { Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Marie et Jean",
    event: "Mariage à Saint-Raphaël",
    content: "Une prestation exceptionnelle ! Le DJ a parfaitement su animer notre soirée de mariage, avec un choix musical qui a fait danser toutes les générations. Le matériel était de grande qualité et l'équipe très professionnelle.",
  },
  {
    id: 2,
    name: "Casino Barrière",
    event: "Soirée de gala",
    content: "Nous faisons régulièrement appel à leurs services pour nos événements. La qualité de la sonorisation et l'expertise technique sont toujours au rendez-vous. Une équipe fiable et réactive.",
  },
  {
    id: 3,
    name: "Sophie D.",
    event: "Anniversaire 40 personnes",
    content: "Super ambiance pour mes 40 ans ! Le système de son était parfait pour notre salle, et l'animateur a su créer une atmosphère festive tout au long de la soirée. Je recommande vivement !",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="Ils nous font confiance"
          subtitle="Témoignages"
          description="Découvrez les retours de nos clients sur nos prestations"
          centered
        />

        <div className="mt-12">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-5xl mx-auto"
          >
            <CarouselContent>
              {testimonials.map((testimonial) => (
                <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/3">
                  <Card className="bg-white border border-gray-200">
                    <CardContent className="p-6">
                      <Quote className="h-8 w-8 text-pink-600 mb-4" />
                      <p className="text-gray-700 italic mb-4">
                        "{testimonial.content}"
                      </p>
                      <div className="mt-4">
                        <p className="font-semibold text-gray-900">{testimonial.name}</p>
                        <p className="text-sm text-gray-600">{testimonial.event}</p>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
