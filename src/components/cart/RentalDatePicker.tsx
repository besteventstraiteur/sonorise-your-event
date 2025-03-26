
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';
import { RentalPeriod } from '@/context/CartContext';

interface RentalDatePickerProps {
  period: RentalPeriod;
  onPeriodChange: (period: RentalPeriod) => void;
  disabled?: boolean;
}

const RentalDatePicker: React.FC<RentalDatePickerProps> = ({
  period,
  onPeriodChange,
  disabled = false
}) => {
  const [isStartOpen, setIsStartOpen] = useState(false);
  const [isEndOpen, setIsEndOpen] = useState(false);

  const handleStartDateSelect = (date: Date | undefined) => {
    if (!date) return;
    
    // Make sure end date is after start date
    const newEndDate = period.endDate < date ? new Date(date.getTime() + 86400000) : period.endDate;
    
    onPeriodChange({
      startDate: date,
      endDate: newEndDate
    });
    
    setIsStartOpen(false);
    // Open end date picker after selecting start date
    setTimeout(() => setIsEndOpen(true), 100);
  };

  const handleEndDateSelect = (date: Date | undefined) => {
    if (!date) return;
    onPeriodChange({
      startDate: period.startDate,
      endDate: date
    });
    setIsEndOpen(false);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <Popover open={isStartOpen && !disabled} onOpenChange={setIsStartOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            disabled={disabled}
            className={cn(
              "justify-start text-left font-normal w-full sm:w-[180px]",
              !period.startDate && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {period.startDate ? (
              format(period.startDate, 'PPP', { locale: fr })
            ) : (
              "Date de début"
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={period.startDate}
            onSelect={handleStartDateSelect}
            initialFocus
            disabled={(date) => date < new Date()}
            className={cn("p-3 pointer-events-auto")}
          />
        </PopoverContent>
      </Popover>

      <Popover open={isEndOpen && !disabled} onOpenChange={setIsEndOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            disabled={disabled}
            className={cn(
              "justify-start text-left font-normal w-full sm:w-[180px]",
              !period.endDate && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {period.endDate ? (
              format(period.endDate, 'PPP', { locale: fr })
            ) : (
              "Date de fin"
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={period.endDate}
            onSelect={handleEndDateSelect}
            initialFocus
            disabled={(date) => date <= period.startDate}
            className={cn("p-3 pointer-events-auto")}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default RentalDatePicker;
