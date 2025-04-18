
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import DevisFormFields from '@/components/devis/DevisFormFields';
import TermsCheckbox from '@/components/devis/TermsCheckbox';

const Devis = () => {
  const [formData, setFormData] = useState({
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

    } catch (error: any) {
      console.error('Erreur lors de l\'envoi du devis:', error);
      toast.error('Une erreur est survenue lors de l\'envoi de votre demande. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-3xl md:text-4xl font-display font-bold text-pink-600 mb-2 text-center">
            Demande de devis
          </h1>
          <p className="text-gray-600 text-center mb-8 md:text-lg">
            Remplissez le formulaire ci-dessous pour recevoir un devis personnalisé pour votre événement
          </p>

          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-800">
                Informations de contact
              </CardTitle>
              <CardDescription>
                Nous vous contacterons rapidement pour finaliser votre devis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <DevisFormFields 
                  formData={formData}
                  handleChange={handleChange}
                  handleSelectChange={handleSelectChange}
                />

                <TermsCheckbox 
                  checked={formData.acceptCGV}
                  onCheckedChange={handleCheckboxChange}
                />

                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isSubmitting || !formData.acceptCGV}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Envoi en cours...
                    </span>
                  ) : (
                    "Demander un devis gratuit"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Devis;
