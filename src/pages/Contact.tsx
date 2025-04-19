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
  project_type: z.enum(['mariage', 'evenement', 'location', 'autre'], {
    required_error: 'Veuillez sélectionner un type de projet',
  }),
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
      project_type: 'autre',
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
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-sonic-900 mb-4">
            Transformez votre<span className="text-pink-600"> événement</span>
          </h1>
          <div className="text-lg text-sonic-700 max-w-2xl mx-auto space-y-4">
            <p className="font-medium">
              Experts en sonorisation et animation depuis 15 ans dans le Var
            </p>
            <ul className="inline-flex flex-wrap justify-center gap-4 text-sm font-medium">
              <li className="bg-pink-50 text-pink-700 px-4 py-2 rounded-full">✓ Devis gratuit sous 24h</li>
              <li className="bg-pink-50 text-pink-700 px-4 py-2 rounded-full">✓ Matériel haut de gamme</li>
              <li className="bg-pink-50 text-pink-700 px-4 py-2 rounded-full">✓ Installation incluse</li>
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="bg-pink-100 p-4 rounded-full mb-4">
                <Phone className="h-6 w-6 text-pink-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Appelez-nous</h3>
              <p className="text-sm text-sonic-600 mb-3">Réponse immédiate du lundi au samedi</p>
              <a href="tel:+33494XXXXXX" className="text-pink-600 hover:underline font-medium">
                04 94 XX XX XX
              </a>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="bg-pink-100 p-4 rounded-full mb-4">
                <Mail className="h-6 w-6 text-pink-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Écrivez-nous</h3>
              <p className="text-sm text-sonic-600 mb-3">Réponse garantie sous 24h</p>
              <a href="mailto:contact@sonorisation-83.fr" className="text-pink-600 hover:underline font-medium">
                contact@sonorisation-83.fr
              </a>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="bg-pink-100 p-4 rounded-full mb-4">
                <MapPin className="h-6 w-6 text-pink-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Zone d'intervention</h3>
              <p className="text-sm text-sonic-600 mb-3">Tout le Var et PACA</p>
              <p className="text-sonic-700 font-medium">Toulon, Var (83)</p>
            </CardContent>
          </Card>
        </div>

        <Card className="p-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-sonic-900 mb-3">
              Parlons de votre projet
            </h2>
            <p className="text-sonic-600">
              Décrivez-nous vos besoins, nous vous recontactons en moins de 24h avec une solution adaptée
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom complet*</FormLabel>
                      <FormControl>
                        <Input placeholder="Votre nom" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="project_type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type de projet*</FormLabel>
                      <FormControl>
                        <select
                          {...field}
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <option value="mariage">Mariage</option>
                          <option value="evenement">Événement</option>
                          <option value="location">Location</option>
                          <option value="autre">Autre</option>
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email*</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="votre@email.fr" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Téléphone*</FormLabel>
                      <FormControl>
                        <Input placeholder="06 XX XX XX XX" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Votre message*</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Décrivez votre projet ou posez-nous vos questions..."
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full md:w-auto">
                <Send className="mr-2 h-4 w-4" /> Envoyer le message
              </Button>
            </form>
          </Form>
        </Card>
      </motion.div>
    </div>
  );
};

export default ContactPage;
