
import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const addressSchema = z.object({
  street: z.string().min(5, "L'adresse doit contenir au moins 5 caractères"),
  city: z.string().min(2, "La ville est requise"),
  postalCode: z.string().min(5, "Le code postal doit contenir 5 chiffres").max(5)
});

export type AddressFormValues = z.infer<typeof addressSchema>;

interface AddressFormProps {
  onSubmit: (data: AddressFormValues) => void;
}

const AddressForm: React.FC<AddressFormProps> = ({ onSubmit }) => {
  const form = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      street: '',
      city: '',
      postalCode: ''
    }
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 bg-purple-50 p-3 rounded-md">
        <FormField
          control={form.control}
          name="street"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm text-purple-700">Adresse</FormLabel>
              <FormControl>
                <Input placeholder="123 rue exemple" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-2 gap-3">
          <FormField
            control={form.control}
            name="postalCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm text-purple-700">Code postal</FormLabel>
                <FormControl>
                  <Input placeholder="83000" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm text-purple-700">Ville</FormLabel>
                <FormControl>
                  <Input placeholder="Toulon" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-purple-600 hover:bg-purple-700 text-white"
        >
          Calculer les frais
        </Button>
      </form>
    </Form>
  );
};

export default AddressForm;
