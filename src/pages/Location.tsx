
import React from 'react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import SectionTitle from '@/components/ui/SectionTitle';
import { motion } from 'framer-motion';
import { Calendar, Package, Headphones, Lightbulb, Speaker, Monitor } from 'lucide-react';
import ProductCard from '@/components/ui/ProductCard';

const Location = () => {
  const categories = [
    { id: "son", label: "Sonorisation" },
    { id: "eclairage", label: "Éclairage" },
    { id: "scene", label: "Scène & Structures" },
    { id: "effets", label: "Effets Spéciaux" }
  ];

  const products = {
    son: [
      {
        id: "1",
        name: "JBL EON ONE Compact",
        description: "Enceinte portable avec batterie rechargeable, Bluetooth, et égalisateur",
        price: 45,
        image: "/placeholder.svg",
        availability: true
      },
      {
        id: "2",
        name: "Système Bose L1 Pro8",
        description: "Système line array portable avec mixage intégré et connectivité Bluetooth",
        price: 120,
        image: "/placeholder.svg",
        availability: true
      },
      {
        id: "3",
        name: "Console Yamaha MG16XU",
        description: "Table de mixage 16 canaux avec effets et interface USB",
        price: 75,
        image: "/placeholder.svg",
        availability: false
      }
    ],
    eclairage: [
      {
        id: "4",
        name: "Projecteurs LED RGBW",
        description: "Projecteurs à LED avec télécommande et effets programmables",
        price: 35,
        image: "/placeholder.svg",
        availability: true
      },
      {
        id: "5",
        name: "Machine à fumée",
        description: "Machine à fumée 1500W avec télécommande sans fil",
        price: 40,
        image: "/placeholder.svg",
        availability: true
      }
    ],
    scene: [
      {
        id: "6",
        name: "Praticable 2m x 1m",
        description: "Praticable pour scène modulable, hauteur réglable",
        price: 25,
        image: "/placeholder.svg",
        availability: true
      },
      {
        id: "7",
        name: "Structure Truss 3m",
        description: "Structure aluminium pour support d'éclairage",
        price: 35,
        image: "/placeholder.svg",
        availability: true
      }
    ],
    effets: [
      {
        id: "8",
        name: "Machine à confettis",
        description: "Machine à confettis électrique avec télécommande",
        price: 50,
        image: "/placeholder.svg",
        availability: true
      },
      {
        id: "9",
        name: "Canon à CO2",
        description: "Canon à CO2 professionnel pour effets spéciaux",
        price: 80,
        image: "/placeholder.svg",
        availability: false
      }
    ]
  };

  const getIconForCategory = (category) => {
    switch(category) {
      case "son": return <Speaker className="w-10 h-10" />;
      case "eclairage": return <Lightbulb className="w-10 h-10" />;
      case "scene": return <Monitor className="w-10 h-10" />;
      case "effets": return <Package className="w-10 h-10" />;
      default: return <Package className="w-10 h-10" />;
    }
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
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-purple-700 to-purple-500 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
              Location de Matériel
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
              Équipements professionnels disponibles à la location pour vos événements
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16">
          <div className="max-w-xl">
            <SectionTitle 
              title="Comment ça marche ?" 
              subtitle="Location simple et rapide en 3 étapes"
            />

            <div className="mt-8 space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-gold-100 text-gold-600 rounded-full p-3 mt-1">
                  <Package className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">1. Choisissez votre matériel</h3>
                  <p className="text-gray-600">Parcourez notre catalogue et sélectionnez le matériel dont vous avez besoin.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-gold-100 text-gold-600 rounded-full p-3 mt-1">
                  <Calendar className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">2. Réservez vos dates</h3>
                  <p className="text-gray-600">Indiquez-nous les dates de votre événement et confirmez la disponibilité.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-gold-100 text-gold-600 rounded-full p-3 mt-1">
                  <Headphones className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">3. Récupérez et profitez</h3>
                  <p className="text-gray-600">Récupérez votre matériel à notre entrepôt ou optez pour une livraison à votre événement.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gold-50 p-8 rounded-lg border border-gold-200 max-w-md w-full">
            <h3 className="font-display text-2xl mb-4">Besoin d'aide pour choisir?</h3>
            <p className="text-gray-600 mb-6">Notre équipe d'experts est disponible pour vous conseiller sur le matériel le plus adapté à votre événement.</p>
            <Button className="w-full bg-gold-600 hover:bg-gold-500 text-purple-900">
              Demander conseil
            </Button>
          </div>
        </div>

        <SectionTitle 
          title="Catalogue de location" 
          subtitle="Équipements professionnels pour tous vos événements"
        />

        <Tabs defaultValue="son" className="mt-12">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-transparent mb-8">
            {categories.map((category) => (
              <TabsTrigger 
                key={category.id}
                value={category.id}
                className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-800 data-[state=active]:border-purple-300 border py-6"
              >
                <div className="flex flex-col items-center gap-2">
                  {getIconForCategory(category.id)}
                  <span>{category.label}</span>
                </div>
              </TabsTrigger>
            ))}
          </TabsList>
          
          {Object.keys(products).map((category) => (
            <TabsContent key={category} value={category}>
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
                    category={categories.find(c => c.id === category)?.label || ''}
                    available={product.availability}
                    isRental={true}
                    index={index}
                  />
                ))}
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default Location;
