
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Le nom doit contenir au moins 2 caractères',
  }),
  email: z.string().email({
    message: 'Veuillez entrer une adresse email valide',
  }),
  phone: z.string().min(10, {
    message: 'Veuillez entrer un numéro de téléphone valide',
  }),
  message: z.string().min(10, {
    message: 'Votre message doit contenir au moins 10 caractères',
  }),
  event_type: z.string().optional(),
  date: z.string().optional(),
  marketing_consent: z.boolean().default(false).optional(),
});

const ContactPage = () => {
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
      event_type: '',
      date: '',
      marketing_consent: false,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: "Message envoyé !",
      description: "Nous vous répondrons dans les plus brefs délais.",
    });
    form.reset();
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-sonic-900 mb-4">
            Contactez<span className="text-gold-600">-nous</span>
          </h1>
          <p className="text-lg text-sonic-700 max-w-2xl mx-auto">
            Une question, un devis, une réservation ? Notre équipe est là pour vous accompagner dans tous vos projets événementiels.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <Card className="hover-scale">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="bg-gold-100 p-4 rounded-full mb-4">
                <Phone className="h-8 w-8 text-gold-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Appelez-nous</h3>
              <p className="text-sonic-700 mb-4">Disponible du lundi au samedi de 9h à 19h</p>
              <a href="tel:+33494XXXXXX" className="text-gold-600 font-semibold text-lg hover:underline">
                +33 4 94 XX XX XX
              </a>
            </CardContent>
          </Card>

          <Card className="hover-scale">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="bg-gold-100 p-4 rounded-full mb-4">
                <Mail className="h-8 w-8 text-gold-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Écrivez-nous</h3>
              <p className="text-sonic-700 mb-4">Nous vous répondons sous 24h ouvrées</p>
              <a href="mailto:contact@sonorisation-83.com" className="text-gold-600 font-semibold text-lg hover:underline">
                contact@sonorisation-83.com
              </a>
            </CardContent>
          </Card>

          <Card className="hover-scale">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="bg-gold-100 p-4 rounded-full mb-4">
                <MapPin className="h-8 w-8 text-gold-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Visitez-nous</h3>
              <p className="text-sonic-700 mb-4">Showroom ouvert sur rendez-vous</p>
              <address className="text-gold-600 font-semibold text-lg not-italic">
                123 Rue de la Musique<br />83000 Toulon
              </address>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold text-sonic-900 mb-6">
              Envoyez-nous un message
            </h2>
            <p className="text-sonic-700 mb-8">
              Que vous ayez besoin d'un DJ pour votre mariage, de louer une sono pour votre événement ou d'acheter du matériel professionnel, remplissez le formulaire ci-dessous et nous vous répondrons rapidement avec une solution adaptée à vos besoins.
            </p>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nom complet</FormLabel>
                        <FormControl>
                          <Input placeholder="Jean Dupont" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="jean.dupont@exemple.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Téléphone</FormLabel>
                        <FormControl>
                          <Input placeholder="06 XX XX XX XX" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="event_type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type d'événement</FormLabel>
                        <FormControl>
                          <Input placeholder="Mariage, Festival, Soirée..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date de l'événement (si applicable)</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Votre message</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Décrivez votre projet, vos besoins ou vos questions..."
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="marketing_consent"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          J'accepte de recevoir des offres promotionnelles et actualités de sonorisation-83.com
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full md:w-auto" size="lg">
                  <Send className="mr-2 h-4 w-4" /> Envoyer le message
                </Button>
              </form>
            </Form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-sonic-900 text-white rounded-xl p-8 relative overflow-hidden h-fit"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold-600/20 rounded-full -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold-600/10 rounded-full -ml-32 -mb-32"></div>
            
            <h2 className="text-3xl font-bold mb-6 relative z-10">
              Pourquoi nous choisir ?
            </h2>
            
            <div className="space-y-6 relative z-10">
              <div className="flex items-start space-x-4">
                <div className="bg-gold-600 rounded-full p-2 mt-1">
                  <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gold-400 mb-2">Expertise professionnelle</h3>
                  <p className="text-gray-300">Plus de 15 ans d'expérience dans l'animation et la sonorisation d'événements de toutes tailles.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-gold-600 rounded-full p-2 mt-1">
                  <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gold-400 mb-2">Matériel haut de gamme</h3>
                  <p className="text-gray-300">Nous utilisons et proposons uniquement des équipements professionnels des marques les plus réputées.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-gold-600 rounded-full p-2 mt-1">
                  <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gold-400 mb-2">Service sur mesure</h3>
                  <p className="text-gray-300">Chaque prestation est personnalisée selon vos besoins spécifiques et votre budget.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-gold-600 rounded-full p-2 mt-1">
                  <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gold-400 mb-2">Disponibilité 7j/7</h3>
                  <p className="text-gray-300">Notre équipe est disponible tous les jours pour répondre à vos urgences et besoins événementiels.</p>
                </div>
              </div>
            </div>
            
            <div className="mt-10 pt-6 border-t border-gray-700 relative z-10">
              <p className="text-gold-400 font-semibold mb-2">Vous êtes en urgence ?</p>
              <a href="tel:+33612345678" className="text-2xl font-bold text-white hover:text-gold-400 transition-colors">
                06 12 34 56 78
              </a>
              <p className="text-sm text-gray-400 mt-2">Ligne d'urgence événementielle</p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactPage;
