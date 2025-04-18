
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

// Fonction utilitaire pour vérifier que la date est dans le futur
const isFutureDate = (date: string) => {
  const selectedDate = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return selectedDate >= today;
};

// Définition du schéma de validation avec Zod
const devisFormSchema = z.object({
  nom: z.string().min(2, { message: 'Le nom doit contenir au moins 2 caractères' }),
  email: z.string().email({ message: 'Adresse email invalide' }),
  telephone: z
    .string()
    .min(10, { message: 'Numéro de téléphone invalide' })
    .regex(/^[0-9+ ]+$/, { message: 'Format de téléphone invalide' }),
  typeEvenement: z.string().min(1, { message: 'Veuillez sélectionner un type d\'événement' }),
  typePrestation: z.string().min(1, { message: 'Veuillez sélectionner un type de prestation' }),
  dateEvenement: z.string()
    .min(1, { message: 'Veuillez sélectionner une date' })
    .refine(isFutureDate, { message: 'La date doit être dans le futur' }),
  nombrePersonnes: z.string().optional(),
  lieu: z.string().optional(),
  commentaire: z.string().optional(),
  acceptCGV: z.boolean().refine(val => val === true, {
    message: 'Vous devez accepter les conditions générales de vente',
  }),
});

export type DevisFormData = z.infer<typeof devisFormSchema>;

export const useDevisForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showRecap, setShowRecap] = useState(false);

  const form = useForm<DevisFormData>({
    resolver: zodResolver(devisFormSchema),
    defaultValues: {
      nom: '',
      email: '',
      telephone: '',
      typeEvenement: '',
      typePrestation: '',
      dateEvenement: '',
      nombrePersonnes: '',
      lieu: '',
      commentaire: '',
      acceptCGV: false,
    },
  });

  const handleSubmit = async (data: DevisFormData) => {
    setShowRecap(true);
  };

  const handleConfirmSubmit = async () => {
    setIsSubmitting(true);
    const data = form.getValues();

    try {
      // 1. Save to database
      const { error: dbError } = await supabase
        .from('devis_requests')
        .insert([
          {
            nom: data.nom,
            email: data.email,
            telephone: data.telephone,
            type_evenement: data.typeEvenement,
            type_prestation: data.typePrestation,
            date_evenement: data.dateEvenement,
            nombre_personnes: data.nombrePersonnes,
            lieu: data.lieu,
            commentaire: data.commentaire,
            accept_cgv: data.acceptCGV,
          },
        ]);

      if (dbError) throw dbError;

      // 2. Send emails
      const emailResponse = await fetch('/functions/v1/send-devis-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`
        },
        body: JSON.stringify(data),
      });

      if (!emailResponse.ok) {
        throw new Error('Erreur lors de l\'envoi des emails');
      }

      toast.success('Demande de devis envoyée ! Vous recevrez une confirmation par email dans quelques instants.');
      form.reset();
      setShowRecap(false);

    } catch (error: any) {
      console.error('Erreur lors de l\'envoi du devis:', error);
      toast.error(
        error.message === 'Erreur lors de l\'envoi des emails'
          ? 'Une erreur est survenue lors de l\'envoi des emails. Votre demande a été enregistrée et nous vous contacterons rapidement.'
          : 'Une erreur est survenue lors de l\'envoi de votre demande. Veuillez réessayer.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    isSubmitting,
    showRecap,
    setShowRecap,
    handleSubmit: form.handleSubmit(handleSubmit),
    handleConfirmSubmit,
  };
};
