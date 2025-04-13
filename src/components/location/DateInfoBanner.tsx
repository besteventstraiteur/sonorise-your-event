
import React from 'react';
import { Calendar } from 'lucide-react';
import { RentalPeriod } from '@/context/CartContext';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface DateInfoBannerProps {
  rentalPeriod: RentalPeriod;
}

const DateInfoBanner: React.FC<DateInfoBannerProps> = ({ rentalPeriod }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-display font-semibold">Étape 2: Choisissez votre matériel</h2>
        <div className="flex items-center gap-2 bg-pink-50 text-pink-700 px-3 py-1 rounded-full">
          <Calendar className="h-4 w-4" />
          <span className="text-sm font-medium">
            {format(rentalPeriod.startDate, 'dd/MM', { locale: fr })} - {format(rentalPeriod.endDate, 'dd/MM', { locale: fr })}
          </span>
        </div>
      </div>
      
      <p className="text-gray-600 mb-4">
        Sélectionnez le matériel que vous souhaitez louer pour la période du {' '}
        <span className="font-medium">{format(rentalPeriod.startDate, 'PPPP', { locale: fr })}</span> au {' '}
        <span className="font-medium">{format(rentalPeriod.endDate, 'PPPP', { locale: fr })}</span>
      </p>
    </div>
  );
};

export default DateInfoBanner;
