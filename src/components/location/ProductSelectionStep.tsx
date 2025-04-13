
import React from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { ShoppingCart, ArrowLeft, Calendar } from 'lucide-react';
import { RentalPeriod } from '@/context/CartContext';
import ProductCard from '@/components/ui/ProductCard';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface Category {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  availability: boolean;
  category: string;
}

interface ProductSelectionStepProps {
  rentalPeriod: RentalPeriod;
  onBack: () => void;
  onContinue: () => void;
  selectedProducts: string[];
  onProductSelect: (productId: string) => void;
}

const ProductSelectionStep: React.FC<ProductSelectionStepProps> = ({ 
  rentalPeriod, 
  onBack, 
  onContinue,
  selectedProducts,
  onProductSelect
}) => {
  // Cette fonction filtrerait normalement les produits en fonction de leur disponibilité aux dates sélectionnées
  // Pour cet exemple, nous simulons simplement en utilisant la propriété 'availability'
  const categories: Category[] = [
    { id: "son", label: "Sonorisation", icon: <Speaker className="w-10 h-10" /> },
    { id: "eclairage", label: "Éclairage", icon: <Lightbulb className="w-10 h-10" /> },
    { id: "scene", label: "Scène & Structures", icon: <Monitor className="w-10 h-10" /> },
    { id: "effets", label: "Effets Spéciaux", icon: <Package className="w-10 h-10" /> }
  ];

  const products = {
    son: [
      {
        id: "1",
        name: "JBL EON ONE Compact",
        description: "Enceinte portable avec batterie rechargeable, Bluetooth, et égalisateur",
        price: 45,
        image: "/placeholder.svg",
        availability: true,
        category: "Sonorisation"
      },
      {
        id: "2",
        name: "Système Bose L1 Pro8",
        description: "Système line array portable avec mixage intégré et connectivité Bluetooth",
        price: 120,
        image: "/placeholder.svg",
        availability: true,
        category: "Sonorisation"
      },
      {
        id: "3",
        name: "Console Yamaha MG16XU",
        description: "Table de mixage 16 canaux avec effets et interface USB",
        price: 75,
        image: "/placeholder.svg",
        availability: false,
        category: "Sonorisation"
      }
    ],
    eclairage: [
      {
        id: "4",
        name: "Projecteurs LED RGBW",
        description: "Projecteurs à LED avec télécommande et effets programmables",
        price: 35,
        image: "/placeholder.svg",
        availability: true,
        category: "Éclairage"
      },
      {
        id: "5",
        name: "Machine à fumée",
        description: "Machine à fumée 1500W avec télécommande sans fil",
        price: 40,
        image: "/placeholder.svg",
        availability: true,
        category: "Éclairage"
      }
    ],
    scene: [
      {
        id: "6",
        name: "Praticable 2m x 1m",
        description: "Praticable pour scène modulable, hauteur réglable",
        price: 25,
        image: "/placeholder.svg",
        availability: true,
        category: "Scène & Structures"
      },
      {
        id: "7",
        name: "Structure Truss 3m",
        description: "Structure aluminium pour support d'éclairage",
        price: 35,
        image: "/placeholder.svg",
        availability: true,
        category: "Scène & Structures"
      }
    ],
    effets: [
      {
        id: "8",
        name: "Machine à confettis",
        description: "Machine à confettis électrique avec télécommande",
        price: 50,
        image: "/placeholder.svg",
        availability: true,
        category: "Effets Spéciaux"
      },
      {
        id: "9",
        name: "Canon à CO2",
        description: "Canon à CO2 professionnel pour effets spéciaux",
        price: 80,
        image: "/placeholder.svg",
        availability: false,
        category: "Effets Spéciaux"
      }
    ]
  };

  const getIconForCategory = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.icon : <Package className="w-10 h-10" />;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.3 }
    }
  };

  return (
    <div className="w-full">
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

      <Tabs defaultValue="son" className="mt-8">
        <div className="mb-8">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-transparent h-auto">
            {categories.map((category) => (
              <TabsTrigger 
                key={category.id}
                value={category.id}
                className="data-[state=active]:bg-pink-100 data-[state=active]:text-pink-800 data-[state=active]:border-pink-300 border py-6"
              >
                <div className="flex flex-col items-center gap-2">
                  {getIconForCategory(category.id)}
                  <span>{category.label}</span>
                </div>
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        
        {Object.keys(products).map((category) => (
          <TabsContent key={category} value={category} className="mt-8">
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {products[category].map((product, index) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  image={product.image}
                  category={product.category}
                  available={product.availability}
                  isRental={true}
                  index={index}
                  rentalPeriod={rentalPeriod}
                />
              ))}
            </motion.div>
          </TabsContent>
        ))}
      </Tabs>

      <div className="flex justify-between mt-12 mb-8">
        <Button 
          variant="outline" 
          onClick={onBack}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Modifier les dates
        </Button>
        
        <Button 
          onClick={onContinue}
          className="bg-pink-600 hover:bg-pink-500 flex items-center gap-2"
        >
          Passer au paiement
          <ShoppingCart className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

// Export these icons to be used in the component
import { Speaker, Lightbulb, Monitor, Package } from 'lucide-react';

export default ProductSelectionStep;
