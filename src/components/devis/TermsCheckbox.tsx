
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Checkbox } from '@/components/ui/checkbox';
import { FormField, FormItem, FormControl, FormMessage } from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { DevisFormData } from '@/hooks/useDevisForm';

const TermsCheckbox: React.FC = () => {
  const form = useFormContext<DevisFormData>();

  return (
    <FormField
      control={form.control}
      name="acceptCGV"
      render={({ field }) => (
        <FormItem className="flex flex-row items-start space-x-2 space-y-0">
          <FormControl>
            <Checkbox
              checked={field.value}
              onCheckedChange={field.onChange}
              id="acceptCGV"
            />
          </FormControl>
          <div className="space-y-1 leading-none">
            <Label 
              htmlFor="acceptCGV" 
              className="text-sm leading-tight cursor-pointer"
            >
              J'accepte les <a href="/cgv" className="text-pink-600 hover:underline">conditions générales de vente</a> et la politique de confidentialité*
            </Label>
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
};

export default TermsCheckbox;
