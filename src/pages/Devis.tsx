import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';

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

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Enregistrer dans Supabase
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
      
      // Réinitialiser le formulaire
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
                {/* Informations personnelles */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="nom">Nom complet*</Label>
                    <Input
                      id="nom"
                      name="nom"
                      placeholder="Votre nom et prénom"
                      value={formData.nom}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email*</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="votre@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="telephone">Téléphone*</Label>
                    <Input
                      id="telephone"
                      name="telephone"
                      placeholder="06 XX XX XX XX"
                      value={formData.telephone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="dateEvenement">Date de l'événement*</Label>
                    <Input
                      id="dateEvenement"
                      name="dateEvenement"
                      type="date"
                      value={formData.dateEvenement}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* Type d'événement */}
                <div className="space-y-3">
                  <Label>Type d'événement*</Label>
                  <RadioGroup 
                    value={formData.typeEvenement}
                    onValueChange={(value) => handleSelectChange('typeEvenement', value)}
                    className="flex flex-wrap gap-4"
                  >
                    {['Mariage', 'Soirée d\'entreprise', 'Concert', 'Anniversaire', 'Autre'].map((type) => (
                      <div key={type} className="flex items-center space-x-2">
                        <RadioGroupItem value={type} id={`type-${type}`} />
                        <Label htmlFor={`type-${type}`} className="cursor-pointer">{type}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                {/* Type de prestation */}
                <div className="space-y-2">
                  <Label htmlFor="typePrestation">Type de prestation*</Label>
                  <Select 
                    value={formData.typePrestation}
                    onValueChange={(value) => handleSelectChange('typePrestation', value)}
                  >
                    <SelectTrigger id="typePrestation">
                      <SelectValue placeholder="Sélectionnez une prestation" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sonorisation">Sonorisation</SelectItem>
                      <SelectItem value="dj">DJ professionnel</SelectItem>
                      <SelectItem value="eclairage">Éclairage événementiel</SelectItem>
                      <SelectItem value="animation">Animation complète</SelectItem>
                      <SelectItem value="artistes">Artistes</SelectItem>
                      <SelectItem value="autre">Autre</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="nombrePersonnes">Nombre de personnes</Label>
                    <Input
                      id="nombrePersonnes"
                      name="nombrePersonnes"
                      placeholder="Nombre approximatif"
                      value={formData.nombrePersonnes}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="lieu">Lieu de l'événement</Label>
                    <Input
                      id="lieu"
                      name="lieu"
                      placeholder="Adresse de l'événement"
                      value={formData.lieu}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="commentaire">Détails supplémentaires</Label>
                  <Textarea
                    id="commentaire"
                    name="commentaire"
                    placeholder="Décrivez vos besoins spécifiques ou toute autre information importante..."
                    value={formData.commentaire}
                    onChange={handleChange}
                    rows={4}
                  />
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="acceptCGV"
                    checked={formData.acceptCGV}
                    onCheckedChange={(checked) => handleCheckboxChange('acceptCGV', checked as boolean)}
                  />
                  <Label 
                    htmlFor="acceptCGV" 
                    className="text-sm leading-tight cursor-pointer"
                  >
                    J'accepte les <a href="/cgv" className="text-pink-600 hover:underline">conditions générales de vente</a> et la politique de confidentialité*
                  </Label>
                </div>

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
