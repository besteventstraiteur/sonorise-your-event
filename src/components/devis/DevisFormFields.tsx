
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { DevisFormData } from '@/hooks/useDevisForm';

const DevisFormFields: React.FC = () => {
  const form = useFormContext<DevisFormData>();

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <FormField
          control={form.control}
          name="nom"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom complet*</FormLabel>
              <FormControl>
                <Input
                  placeholder="Votre nom et prénom"
                  {...field}
                />
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
              <FormLabel>Email*</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="votre@email.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="telephone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Téléphone*</FormLabel>
              <FormControl>
                <Input
                  placeholder="06 XX XX XX XX"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="dateEvenement"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date de l'événement*</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="typeEvenement"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>Type d'événement*</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                value={field.value}
                className="flex flex-wrap gap-4"
              >
                {['Mariage', 'Soirée d\'entreprise', 'Concert', 'Anniversaire', 'Autre'].map((type) => (
                  <div key={type} className="flex items-center space-x-2">
                    <RadioGroupItem value={type} id={`type-${type}`} />
                    <Label htmlFor={`type-${type}`} className="cursor-pointer">{type}</Label>
                  </div>
                ))}
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="typePrestation"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Type de prestation*</FormLabel>
            <Select
              onValueChange={field.onChange}
              value={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez une prestation" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="sonorisation">Sonorisation</SelectItem>
                <SelectItem value="dj">DJ professionnel</SelectItem>
                <SelectItem value="eclairage">Éclairage événementiel</SelectItem>
                <SelectItem value="animation">Animation complète</SelectItem>
                <SelectItem value="artistes">Artistes</SelectItem>
                <SelectItem value="autre">Autre</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <FormField
          control={form.control}
          name="nombrePersonnes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre de personnes</FormLabel>
              <FormControl>
                <Input
                  placeholder="Nombre approximatif"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="lieu"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lieu de l'événement</FormLabel>
              <FormControl>
                <Input
                  placeholder="Adresse de l'événement"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="commentaire"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Détails supplémentaires</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Décrivez vos besoins spécifiques ou toute autre information importante..."
                rows={4}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default DevisFormFields;
