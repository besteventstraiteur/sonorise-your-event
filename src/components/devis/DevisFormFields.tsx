
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface DevisFormFieldsProps {
  formData: {
    nom: string;
    email: string;
    telephone: string;
    typeEvenement: string;
    typePrestation: string;
    dateEvenement: string;
    nombrePersonnes: string;
    lieu: string;
    commentaire: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
}

const DevisFormFields: React.FC<DevisFormFieldsProps> = ({
  formData,
  handleChange,
  handleSelectChange,
}) => {
  return (
    <>
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
    </>
  );
};

export default DevisFormFields;
