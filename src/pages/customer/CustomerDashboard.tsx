
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Package, ShoppingCart, Calendar, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const CustomerDashboard = () => {
  const { currentUser } = useAuth();

  const customerStats = [
    { 
      label: "Commandes passées", 
      value: 12, 
      icon: <ShoppingCart className="h-5 w-5" />,
      color: "bg-blue-100 text-blue-600",
      link: "/mon-compte/commandes"
    },
    { 
      label: "En cours de livraison", 
      value: 2, 
      icon: <Package className="h-5 w-5" />,
      color: "bg-amber-100 text-amber-600",
      link: "/mon-compte/commandes"
    },
    { 
      label: "Prochaine location", 
      value: "12/06/2023", 
      icon: <Calendar className="h-5 w-5" />,
      color: "bg-pink-100 text-pink-600",
      link: "/mon-compte/commandes"
    },
    { 
      label: "Demandes SAV", 
      value: 1, 
      icon: <Check className="h-5 w-5" />,
      color: "bg-green-100 text-green-600",
      link: "/mon-compte/service-client"
    }
  ];

  const recentOrders = [
    {
      id: "CMD-001234",
      date: "15/05/2023",
      type: "Location",
      items: ["JBL EON ONE Compact", "Micro sans fil"],
      total: 120.00,
      status: "Terminée"
    },
    {
      id: "CMD-001235",
      date: "28/05/2023",
      type: "Achat",
      items: ["Câble XLR 10m", "Adaptateur Jack"],
      total: 42.50,
      status: "Livrée"
    }
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

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-display font-semibold">Bonjour, {currentUser?.name}</h2>
        <p className="text-gray-600">Bienvenue sur votre tableau de bord personnel.</p>
      </div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {customerStats.map((stat, index) => (
          <motion.div key={index} variants={itemVariants}>
            <Link to={stat.link}>
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <div className={`${stat.color} p-2 rounded-full`}>
                      {stat.icon}
                    </div>
                    <ArrowRight className="h-4 w-4 text-gray-400" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-semibold">{stat.value}</div>
                  <p className="text-gray-500 text-sm">{stat.label}</p>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Commandes récentes</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="px-4 py-3">N° Commande</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Produits</th>
                <th className="px-4 py-3">Total</th>
                <th className="px-4 py-3">Statut</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{order.id}</td>
                  <td className="px-4 py-3">{order.date}</td>
                  <td className="px-4 py-3">{order.type}</td>
                  <td className="px-4 py-3">{order.items.join(", ")}</td>
                  <td className="px-4 py-3">{order.total.toFixed(2)} €</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/mon-compte/commandes/${order.id}`}>Détails</Link>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Besoin d'aide ?</h3>
        <Button asChild>
          <Link to="/mon-compte/service-client">
            Contacter le support
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default CustomerDashboard;
