
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '@/components/ui/SectionTitle';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Calendar } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Slider
} from "@/components/ui/slider";

const PricingCalculator = () => {
  const [eventType, setEventType] = useState('mariage');
  const [eventDuration, setEventDuration] = useState(8);
  const [guestCount, setGuestCount] = useState([100]);
  const [resultVisible, setResultVisible] = useState(false);
  const [price, setPrice] = useState(0);

  const calculatePrice = () => {
    // Base prices per type of event in euros
    const basePrices = {
      'mariage': 800,
      'anniversaire': 600,
      'entreprise': 900,
      'concert': 1200,
      'autre': 700
    };

    // Hours factor (1 for standard 8 hours, extra for more hours)
    const hoursFactor = eventDuration <= 8 ? 1 : 1 + (eventDuration - 8) * 0.1;

    // Guests factor (more guests may require more equipment)
    const guestsFactor = guestCount[0] <= 100 ? 1 : 1 + (guestCount[0] - 100) * 0.002;

    // Calculate final price
    const calculatedPrice = Math.round(basePrices[eventType] * hoursFactor * guestsFactor);
    
    setPrice(calculatedPrice);
    setResultVisible(true);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="Estimez votre budget"
          subtitle="Simulation de tarif"
          description="Obtenez une estimation rapide du tarif pour votre événement"
          centered
        />
        
        <motion.div 
          className="max-w-3xl mx-auto mt-12 bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="event-type">Type d'événement</Label>
                <Select
                  value={eventType}
                  onValueChange={(value) => {
                    setEventType(value);
                    setResultVisible(false);
                  }}
                >
                  <SelectTrigger id="event-type" className="w-full">
                    <SelectValue placeholder="Sélectionnez un type d'événement" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mariage">Mariage</SelectItem>
                    <SelectItem value="anniversaire">Anniversaire</SelectItem>
                    <SelectItem value="entreprise">Événement d'entreprise</SelectItem>
                    <SelectItem value="concert">Concert / Festival</SelectItem>
                    <SelectItem value="autre">Autre événement</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="event-duration">Durée (en heures): {eventDuration}h</Label>
                <Select
                  value={eventDuration.toString()}
                  onValueChange={(value) => {
                    setEventDuration(parseInt(value, 10));
                    setResultVisible(false);
                  }}
                >
                  <SelectTrigger id="event-duration" className="w-full">
                    <SelectValue placeholder="Sélectionnez la durée" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="4">4 heures</SelectItem>
                    <SelectItem value="6">6 heures</SelectItem>
                    <SelectItem value="8">8 heures</SelectItem>
                    <SelectItem value="10">10 heures</SelectItem>
                    <SelectItem value="12">12 heures</SelectItem>
                    <SelectItem value="24">24 heures (journée complète)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <Label htmlFor="guest-count">Nombre d'invités: {guestCount[0]}</Label>
                </div>
                <Slider
                  id="guest-count"
                  defaultValue={[100]}
                  max={500}
                  min={10}
                  step={10}
                  value={guestCount}
                  onValueChange={(value) => {
                    setGuestCount(value);
                    setResultVisible(false);
                  }}
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>10</span>
                  <span>500</span>
                </div>
              </div>

              <Button 
                onClick={calculatePrice}
                className="w-full bg-pink-600 hover:bg-pink-700 text-white"
              >
                Calculer mon estimation
              </Button>
            </div>
          </div>
          
          {resultVisible && (
            <motion.div 
              className="mt-8 p-4 bg-pink-50 border border-pink-100 rounded-lg text-center"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-2xl font-semibold text-pink-700 mb-2">Estimation : {price} €</h3>
              <p className="text-gray-600 text-sm">
                Cette estimation inclut la prestation DJ, le matériel son et lumière standard. 
                Pour un devis personnalisé et précis, n'hésitez pas à nous contacter.
              </p>
              <div className="mt-4 flex justify-center">
                <Button variant="outline" className="flex items-center gap-2 border-pink-200 text-pink-700" asChild>
                  <a href="/devis">
                    <Calendar className="w-4 h-4" />
                    Demander un devis précis
                  </a>
                </Button>
              </div>
            </motion.div>
          )}
        </motion.div>

        <div className="mt-6 text-center text-gray-500 text-sm">
          <p>* Cette estimation est donnée à titre indicatif et peut varier selon vos besoins spécifiques.</p>
        </div>
      </div>
    </section>
  );
};

export default PricingCalculator;
