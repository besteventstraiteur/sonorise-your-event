
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface TermsCheckboxProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

const TermsCheckbox: React.FC<TermsCheckboxProps> = ({ checked, onCheckedChange }) => {
  return (
    <div className="flex items-start space-x-2">
      <Checkbox
        id="acceptCGV"
        checked={checked}
        onCheckedChange={onCheckedChange}
      />
      <Label 
        htmlFor="acceptCGV" 
        className="text-sm leading-tight cursor-pointer"
      >
        J'accepte les <a href="/cgv" className="text-pink-600 hover:underline">conditions générales de vente</a> et la politique de confidentialité*
      </Label>
    </div>
  );
};

export default TermsCheckbox;
