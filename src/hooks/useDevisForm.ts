
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface DevisFormData {
  nom: string;
  email: string;
  telephone: string;
  typeEvenement: string;
  typePrestation: string;
  dateEvenement: string;
  nombrePersonnes: string;
  lieu: string;
  commentaire: string;
  acceptCGV: boolean;
}

export const useDevisForm = () => {
  const [formData, setFormData] = useState<DevisFormData>({
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
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, acceptCGV: checked }));
  };

  const resetForm = () => {
    setFormData({
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
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('devis_requests')
        .insert([
          {
            nom: formData.nom,
            email: formData.email,
            telephone: formData.telephone,
            type_evenement: formData.typeEvenement,
            type_prestation: formData.typePrestation,
            date_evenement: formData.dateEvenement,
            nombre_personnes: formData.nombrePersonnes,
            lieu: formData.lieu,
            commentaire: formData.commentaire,
            accept_cgv: formData.acceptCGV,
          },
        ]);

      if (error) throw error;

      toast.success('Votre demande de devis a été envoyée avec succès !');
      resetForm();

    } catch (error: any) {
      console.error('Erreur lors de l\'envoi du devis:', error);
      toast.error('Une erreur est survenue lors de l\'envoi de votre demande. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    isSubmitting,
    handleChange,
    handleSelectChange,
    handleCheckboxChange,
    handleSubmit,
  };
};
