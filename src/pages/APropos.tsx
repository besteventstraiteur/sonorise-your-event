
import React from 'react';
import { Button } from "@/components/ui/button";
import SectionTitle from '@/components/ui/SectionTitle';
import { motion } from 'framer-motion';
import { MapPin, Mail, Phone, Clock, Users, Award, Heart, Sparkles } from 'lucide-react';

const APropos = () => {
  const stats = [
    { icon: <Users className="h-6 w-6" />, value: "500+", label: "Clients satisfaits" },
    { icon: <Clock className="h-6 w-6" />, value: "15", label: "Années d'expérience" },
    { icon: <Sparkles className="h-6 w-6" />, value: "2000+", label: "Événements réalisés" },
    { icon: <Award className="h-6 w-6" />, value: "50+", label: "Partenaires professionnels" }
  ];

  const values = [
    {
      icon: <Award className="h-10 w-10 text-gold-600" />,
      title: "Excellence",
      description: "Nous ne nous contentons pas du minimum. Notre équipe vise l'excellence dans chaque aspect de notre service."
    },
    {
      icon: <Heart className="h-10 w-10 text-gold-600" />,
      title: "Passion",
      description: "La musique et l'événementiel sont notre passion. Nous mettons notre cœur dans chaque projet que nous réalisons."
    },
    {
      icon: <Users className="h-10 w-10 text-gold-600" />,
      title: "Service client",
      description: "Votre satisfaction est notre priorité. Nous sommes à l'écoute et réactifs à tous vos besoins."
    }
  ];

  const team = [
    {
      name: "Alexandre Martin",
      role: "Fondateur & DJ",
      bio: "Expert en sonorisation avec plus de 15 ans d'expérience dans l'événementiel.",
      image: "/placeholder.svg"
    },
    {
      name: "Sophie Durand",
      role: "Responsable Technique",
      bio: "Spécialiste en équipement audio et lumière, passionnée par les nouvelles technologies.",
      image: "/placeholder.svg"
    },
    {
      name: "Thomas Legrand",
      role: "Directeur Commercial",
      bio: "Créatif et dynamique, il conçoit des solutions sur mesure pour vos événements.",
      image: "/placeholder.svg"
    }
  ];

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-r from-sonic-900 to-sonic-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
              À Propos de Nous
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
              Découvrez notre histoire, notre équipe et notre passion pour l'événementiel
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              Notre Histoire
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>Fondée en 2008 par Alexandre Martin, DJ passionné et expert en sonorisation, <span className="font-semibold">sonorisation-83.com</span> est née d'une vision simple : rendre accessible à tous un service événementiel de qualité professionnelle.</p>
              
              <p>Débutant avec une petite collection d'équipements audio et quelques contrats locaux, notre entreprise s'est rapidement développée pour devenir une référence dans le Var et sur toute la Côte d'Azur.</p>
              
              <p>Aujourd'hui, nous sommes fiers de proposer une gamme complète de services événementiels, des prestations DJ aux solutions de sonorisation sur mesure, en passant par la vente et location de matériel professionnel.</p>
              
              <p>Notre philosophie reste inchangée : allier expertise technique, créativité artistique et service personnalisé pour faire de chaque événement un moment mémorable.</p>
            </div>
            
            <Button className="mt-8 bg-gold-600 hover:bg-gold-500 text-sonic-900">
              Découvrir nos services
            </Button>
          </motion.div>
          
          <motion.div
            className="relative aspect-square max-w-lg mx-auto"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="absolute inset-0 rounded-xl overflow-hidden">
              <img 
                src="/placeholder.svg" 
                alt="Notre histoire" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-gold-600 text-white p-6 rounded-xl w-32 h-32 flex items-center justify-center text-center">
              <div>
                <div className="text-3xl font-bold">15</div>
                <div className="text-sm font-medium">années d'expérience</div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="bg-gray-50 py-16 px-6 rounded-2xl mb-24">
          <SectionTitle 
            title="Nos Valeurs" 
            subtitle="Ce qui nous définit et guide notre travail au quotidien"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-16">
            {values.map((value, index) => (
              <motion.div 
                key={index}
                className="bg-white p-8 rounded-xl shadow-sm hover-lift"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
              >
                <div className="bg-gold-50 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <SectionTitle 
          title="Notre Équipe" 
          subtitle="Des passionnés à votre service"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-16 mb-24">
          {team.map((member, index) => (
            <motion.div 
              key={index}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover-lift"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
            >
              <div className="h-64 relative">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <p className="text-gold-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600">{member.bio}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-24">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="bg-sonic-900 text-white rounded-xl p-6 text-center hover-lift"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="flex justify-center mb-4 text-gold-500">
                {stat.icon}
              </div>
              <div className="text-3xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm opacity-80">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="bg-gold-50 rounded-2xl p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-display font-bold mb-6">
                Venez nous rencontrer
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gold-600 mt-1" />
                  <div>
                    <h4 className="font-medium">Adresse</h4>
                    <p className="text-gray-600">123 Rue de la Musique, 83000 Toulon</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-gold-600 mt-1" />
                  <div>
                    <h4 className="font-medium">Email</h4>
                    <p className="text-gray-600">contact@sonorisation-83.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-gold-600 mt-1" />
                  <div>
                    <h4 className="font-medium">Téléphone</h4>
                    <p className="text-gray-600">+33 4 94 XX XX XX</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-gold-600 mt-1" />
                  <div>
                    <h4 className="font-medium">Horaires</h4>
                    <p className="text-gray-600">Lun-Ven: 9h-18h | Sam: 10h-16h</p>
                  </div>
                </div>
              </div>
              <Button className="mt-8 bg-sonic-900 hover:bg-sonic-800">
                Nous contacter
              </Button>
            </div>
            <div className="h-64 md:h-80 rounded-xl overflow-hidden">
              <img 
                src="/placeholder.svg" 
                alt="Nos locaux" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default APropos;
