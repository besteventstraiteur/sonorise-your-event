
import { Package, Speaker, Lightbulb, Monitor } from 'lucide-react';
import React from 'react';

export interface Category {
  id: string;
  label: string;
  icon: React.ReactNode;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  availability: boolean;
  category: string;
}

export const categories: Category[] = [
  { id: "son", label: "Sonorisation", icon: <Speaker className="w-10 h-10" /> },
  { id: "eclairage", label: "Éclairage", icon: <Lightbulb className="w-10 h-10" /> },
  { id: "scene", label: "Scène & Structures", icon: <Monitor className="w-10 h-10" /> },
  { id: "effets", label: "Effets Spéciaux", icon: <Package className="w-10 h-10" /> }
];

export const products: Record<string, Product[]> = {
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
