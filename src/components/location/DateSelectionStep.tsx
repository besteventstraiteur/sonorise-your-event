
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarIcon } from 'lucide-react';
import { addDays } from 'date-fns';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { RentalPeriod } from '@/context/CartContext';
import RentalDatePicker from '../cart/RentalDatePicker';

interface DateSelectionStepProps {
  onDateSelected: (period: RentalPeriod) => void;
  initialPeriod?: RentalPeriod;
}

const DateSelectionStep: React.FC<DateSelectionStepProps> = ({ onDateSelected, initialPeriod }) => {
  // Par défaut, aujourd'hui et demain
  const today = new Date();
  const tomorrow = addDays(today, 1);
  
  const [period, setPeriod] = useState<RentalPeriod>(initialPeriod || {
    startDate: today,
    endDate: tomorrow
  });

  const handleContinue = () => {
    onDateSelected(period);
  };

  const getDuration = () => {
    const days = Math.ceil(
      (period.endDate.getTime() - period.startDate.getTime()) / 
      (1000 * 60 * 60 * 24)
    );
    return days;
  };

  return (
    <Card className="w-full max-w-4xl mx-auto bg-white shadow-md">
      <CardContent className="p-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-display font-semibold mb-2">Étape 1: Choisissez vos dates de location</h2>
          <p className="text-gray-600">Sélectionnez les dates auxquelles vous souhaitez louer le matériel</p>
        </div>

        <div className="flex flex-col items-center max-w-xl mx-auto gap-6">
          <div className="w-full">
            <RentalDatePicker 
              period={period}
              onPeriodChange={setPeriod}
            />
          </div>

          <div className="bg-gold-50 p-4 rounded-lg border border-gold-100 w-full text-center">
            <p className="text-gold-800 font-medium">
              Durée de location: <span className="text-pink-600 font-semibold">{getDuration()} jour{getDuration() > 1 ? 's' : ''}</span>
            </p>
            <p className="text-sm text-gray-600 mt-1">
              Du {format(period.startDate, 'PPPP', { locale: fr })} au {format(period.endDate, 'PPPP', { locale: fr })}
            </p>
          </div>

          <Button 
            onClick={handleContinue}
            size="lg" 
            className="mt-4 bg-pink-600 hover:bg-pink-500 text-white font-medium px-8"
          >
            Continuer pour choisir votre matériel
            <CalendarIcon className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DateSelectionStep;
