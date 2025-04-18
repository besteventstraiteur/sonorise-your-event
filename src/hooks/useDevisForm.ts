
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

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
  dateEvenement: z.string().min(1, { message: 'Veuillez sélectionner une date' }),
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
    setIsSubmitting(true);

    try {
      const { error } = await supabase
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

      if (error) throw error;

      toast.success('Votre demande de devis a été envoyée avec succès !');
      form.reset();

    } catch (error: any) {
      console.error('Erreur lors de l\'envoi du devis:', error);
      toast.error('Une erreur est survenue lors de l\'envoi de votre demande. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    isSubmitting,
    handleSubmit: form.handleSubmit(handleSubmit),
  };
};
