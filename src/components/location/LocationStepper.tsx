
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RentalPeriod } from '@/context/CartContext';
import DateSelectionStep from './DateSelectionStep';
import ProductSelectionStep from './ProductSelectionStep';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';

const LocationStepper: React.FC = () => {
  const navigate = useNavigate();
  const { cart } = useCart();
  
  // Étape actuelle (1: dates, 2: produits, 3: paiement, 4: confirmation)
  const [currentStep, setCurrentStep] = useState(1);
  
  // Période de location sélectionnée
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod | null>(null);
  
  // Liste des produits sélectionnés
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  const handleDateSelected = (period: RentalPeriod) => {
    setRentalPeriod(period);
    setCurrentStep(2);
  };

  const handleProductSelect = (productId: string) => {
    setSelectedProducts(prev => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId);
      } else {
        return [...prev, productId];
      }
    });
  };

  const handleBackToDateSelection = () => {
    setCurrentStep(1);
  };

  const handleContinueToPayment = () => {
    if (cart.length === 0) {
      toast.error("Veuillez ajouter au moins un produit au panier avant de continuer");
      return;
    }
    navigate('/panier');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Indicateur d'étape */}
      <div className="flex justify-center mb-12">
        <div className="flex items-center w-full max-w-3xl">
          {[1, 2, 3, 4].map((step) => (
            <React.Fragment key={step}>
              <div className="flex flex-col items-center">
                <div className={`rounded-full w-10 h-10 flex items-center justify-center border-2 ${
                  currentStep >= step 
                    ? 'bg-pink-600 border-pink-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-500'
                }`}>
                  {step}
                </div>
                <span className="text-xs mt-2 text-center">
                  {step === 1 && "Dates"}
                  {step === 2 && "Matériel"}
                  {step === 3 && "Paiement"}
                  {step === 4 && "Récupération"}
                </span>
              </div>
              
              {step < 4 && (
                <div className={`flex-1 h-0.5 mx-2 ${
                  currentStep > step ? 'bg-pink-600' : 'bg-gray-300'
                }`} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Contenu de l'étape actuelle */}
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {currentStep === 1 && (
          <DateSelectionStep 
            onDateSelected={handleDateSelected}
            initialPeriod={rentalPeriod || undefined}
          />
        )}
        
        {currentStep === 2 && rentalPeriod && (
          <ProductSelectionStep 
            rentalPeriod={rentalPeriod}
            onBack={handleBackToDateSelection}
            onContinue={handleContinueToPayment}
            selectedProducts={selectedProducts}
            onProductSelect={handleProductSelect}
          />
        )}
      </motion.div>
    </div>
  );
};

export default LocationStepper;
