
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Send } from 'lucide-react';
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
import { Card } from '@/components/ui/card';

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

const ContactForm = () => {
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
  );
};

export default ContactForm;
