
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { DevisFormData } from '@/hooks/useDevisForm';

interface DevisRecapProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  data: DevisFormData;
}

const DevisRecap: React.FC<DevisRecapProps> = ({
  isOpen,
  onClose,
  onConfirm,
  data
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Récapitulatif de votre demande</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 my-4">
          <div className="grid grid-cols-2 gap-2">
            <p className="text-gray-600">Nom :</p>
            <p className="font-medium">{data.nom}</p>
            
            <p className="text-gray-600">Email :</p>
            <p className="font-medium">{data.email}</p>
            
            <p className="text-gray-600">Téléphone :</p>
            <p className="font-medium">{data.telephone}</p>
            
            <p className="text-gray-600">Type d'événement :</p>
            <p className="font-medium">{data.typeEvenement}</p>
            
            <p className="text-gray-600">Type de prestation :</p>
            <p className="font-medium">{data.typePrestation}</p>
            
            <p className="text-gray-600">Date :</p>
            <p className="font-medium">{new Date(data.dateEvenement).toLocaleDateString()}</p>
            
            {data.nombrePersonnes && (
              <>
                <p className="text-gray-600">Nombre de personnes :</p>
                <p className="font-medium">{data.nombrePersonnes}</p>
              </>
            )}
            
            {data.lieu && (
              <>
                <p className="text-gray-600">Lieu :</p>
                <p className="font-medium">{data.lieu}</p>
              </>
            )}
          </div>
          
          {data.commentaire && (
            <div className="mt-4">
              <p className="text-gray-600">Commentaire :</p>
              <p className="font-medium mt-1">{data.commentaire}</p>
            </div>
          )}
        </div>

        <DialogFooter className="flex gap-2">
          <Button variant="outline" onClick={onClose}>
            Modifier
          </Button>
          <Button onClick={onConfirm}>
            Confirmer et envoyer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DevisRecap;
