
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import DevisFormFields from '@/components/devis/DevisFormFields';
import TermsCheckbox from '@/components/devis/TermsCheckbox';
import LoadingSpinner from '@/components/ui/loading-spinner';
import { useDevisForm } from '@/hooks/useDevisForm';

const Devis = () => {
  const {
    formData,
    isSubmitting,
    handleChange,
    handleSelectChange,
    handleCheckboxChange,
    handleSubmit,
  } = useDevisForm();

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
                      <LoadingSpinner />
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
