
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import SectionTitle from '@/components/ui/SectionTitle';
import { motion } from 'framer-motion';
import { Search, ShoppingCart, Star, Filter, SlidersHorizontal } from 'lucide-react';
import ProductCard from '@/components/ui/ProductCard';

const Boutique = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const products = [
    {
      id: "1",
      name: "Enceinte JBL Partybox 110",
      category: "enceintes",
      price: 349.99,
      rating: 4.7,
      image: "/placeholder.svg",
      isNew: true,
      onSale: false
    },
    {
      id: "2",
      name: "Table de mixage Pioneer DJ DJM-450",
      category: "mixage",
      price: 699,
      rating: 4.9,
      image: "/placeholder.svg",
      isNew: false,
      onSale: true,
      salePrice: 599
    },
    {
      id: "3",
      name: "Pack d'éclairage LED ADJ",
      category: "eclairage",
      price: 249.99,
      rating: 4.5,
      image: "/placeholder.svg",
      isNew: false,
      onSale: false
    },
    {
      id: "4",
      name: "Micro sans fil Sennheiser XSW 1-835",
      category: "microphones",
      price: 299,
      rating: 4.8,
      image: "/placeholder.svg",
      isNew: true,
      onSale: false
    },
    {
      id: "5",
      name: "Machine à fumée Beamz H2000",
      category: "effets",
      price: 199.99,
      rating: 4.3,
      image: "/placeholder.svg",
      isNew: false,
      onSale: true,
      salePrice: 169.99
    },
    {
      id: "6",
      name: "Câble XLR professionnel 10m",
      category: "accessoires",
      price: 29.99,
      rating: 4.6,
      image: "/placeholder.svg",
      isNew: false,
      onSale: false
    }
  ];

  const categories = [
    { id: "enceintes", label: "Enceintes" },
    { id: "mixage", label: "Tables de mixage" },
    { id: "eclairage", label: "Éclairage" },
    { id: "microphones", label: "Microphones" },
    { id: "effets", label: "Effets spéciaux" },
    { id: "accessoires", label: "Accessoires" }
  ];

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

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
              Notre Boutique
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
              Équipements professionnels pour vos événements
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row gap-6 mb-16">
          <div className="flex-grow">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Rechercher un produit..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter size={16} />
            <span>Filtres</span>
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <SlidersHorizontal size={16} />
            <span>Trier par</span>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar with filters */}
          <div className="hidden md:block">
            <div className="bg-white rounded-lg border p-6 sticky top-24">
              <h3 className="font-semibold text-lg mb-4">Catégories</h3>
              <div className="space-y-3">
                {categories.map((category) => (
                  <div key={category.id} className="flex items-center space-x-2">
                    <Checkbox id={`category-${category.id}`} />
                    <label
                      htmlFor={`category-${category.id}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {category.label}
                    </label>
                  </div>
                ))}
              </div>

              <div className="border-t my-6"></div>

              <h3 className="font-semibold text-lg mb-4">Prix</h3>
              <div className="grid grid-cols-2 gap-4">
                <Input type="number" placeholder="Min" />
                <Input type="number" placeholder="Max" />
              </div>
              <Button className="w-full mt-4 bg-purple-600 hover:bg-purple-700">
                Appliquer
              </Button>

              <div className="border-t my-6"></div>

              <h3 className="font-semibold text-lg mb-4">Promotions</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox id="sale" />
                  <label
                    htmlFor="sale"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    En promotion
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="new" />
                  <label
                    htmlFor="new"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Nouveautés
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Product grid */}
          <div className="md:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <h3 className="text-2xl font-display mb-2">Aucun résultat trouvé</h3>
                <p className="text-gray-600">Essayez d'autres termes de recherche ou filtres</p>
              </div>
            ) : (
              <>
                <SectionTitle 
                  title="Nos produits" 
                  subtitle={`${filteredProducts.length} produits disponibles`}
                />

                <motion.div 
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {filteredProducts.map((product, index) => (
                    <ProductCard
                      key={product.id}
                      id={product.id}
                      name={product.name}
                      price={product.onSale ? (product.salePrice as number) : product.price}
                      image={product.image}
                      category={categories.find(c => c.id === product.category)?.label || ''}
                      available={true}
                      isRental={false}
                      index={index}
                    />
                  ))}
                </motion.div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Boutique;
