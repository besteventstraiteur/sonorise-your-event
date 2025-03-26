
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Eye, Download, ShoppingBag, Package } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const CustomerOrders = () => {
  // Données fictives pour la démo
  const orders = [
    {
      id: "CMD-001234",
      date: "15/05/2023",
      type: "location",
      items: [
        { name: "JBL EON ONE Compact", qty: 1, price: 45 },
        { name: "Micro sans fil", qty: 2, price: 25 }
      ],
      total: 95.00,
      status: "completed",
      rentDates: { start: "15/05/2023", end: "17/05/2023" }
    },
    {
      id: "CMD-001235",
      date: "28/05/2023",
      type: "purchase",
      items: [
        { name: "Câble XLR 10m", qty: 2, price: 15.50 },
        { name: "Adaptateur Jack", qty: 3, price: 3.50 }
      ],
      total: 42.50,
      status: "delivered",
      deliveryDate: "30/05/2023"
    },
    {
      id: "CMD-001236",
      date: "10/06/2023",
      type: "location",
      items: [
        { name: "Système Bose L1 Pro8", qty: 1, price: 120 },
        { name: "Machine à fumée", qty: 1, price: 40 }
      ],
      total: 160.00,
      status: "processing",
      rentDates: { start: "12/06/2023", end: "15/06/2023" }
    }
  ];

  // Fonction pour afficher le statut avec couleur appropriée
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Terminée</Badge>;
      case 'delivered':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Livrée</Badge>;
      case 'processing':
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">En cours</Badge>;
      case 'pending':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">En attente</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Annulée</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.2 }
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-display font-semibold">Mes commandes</h2>
        <p className="text-gray-600">Retrouvez toutes vos commandes d'achat et de location.</p>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="mb-6">
          <TabsTrigger value="all">Toutes</TabsTrigger>
          <TabsTrigger value="purchase">Achats</TabsTrigger>
          <TabsTrigger value="location">Locations</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <OrdersList orders={orders} />
        </TabsContent>
        
        <TabsContent value="purchase">
          <OrdersList orders={orders.filter(order => order.type === 'purchase')} />
        </TabsContent>
        
        <TabsContent value="location">
          <OrdersList orders={orders.filter(order => order.type === 'location')} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface OrdersListProps {
  orders: any[];
}

const OrdersList: React.FC<OrdersListProps> = ({ orders }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.2 }
    }
  };

  return (
    <>
      {orders.length === 0 ? (
        <div className="text-center py-10">
          <ShoppingBag className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-1">Aucune commande trouvée</h3>
          <p className="text-gray-500">Vous n'avez pas encore de commandes de ce type.</p>
          <Button className="mt-4" asChild>
            <Link to="/boutique">Explorer notre boutique</Link>
          </Button>
        </div>
      ) : (
        <motion.div 
          className="space-y-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {orders.map((order) => (
            <motion.div 
              key={order.id}
              variants={itemVariants}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium">Commande {order.id}</h3>
                    {order.type === 'location' ? (
                      <Badge variant="outline" className="text-pink-600 border-pink-200 bg-pink-50">
                        <Package className="h-3 w-3 mr-1" />
                        Location
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50">
                        <ShoppingBag className="h-3 w-3 mr-1" />
                        Achat
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">Date: {order.date}</p>
                  {order.type === 'location' && (
                    <p className="text-sm text-gray-500">
                      Période: {order.rentDates.start} au {order.rentDates.end}
                    </p>
                  )}
                  {order.deliveryDate && (
                    <p className="text-sm text-gray-500">Livré le: {order.deliveryDate}</p>
                  )}
                </div>
                <div className="flex flex-col items-end">
                  <div className="mb-2">
                    {getStatusBadge(order.status)}
                  </div>
                  <p className="font-semibold">{order.total.toFixed(2)} €</p>
                </div>
              </div>
              
              <div className="border-t pt-3 mt-3">
                <h4 className="text-sm font-medium mb-2">Produits:</h4>
                <ul className="text-sm text-gray-600 mb-4">
                  {order.items.map((item, idx) => (
                    <li key={idx} className="flex justify-between">
                      <span>{item.name} × {item.qty}</span>
                      <span>{(item.price * item.qty).toFixed(2)} €</span>
                    </li>
                  ))}
                </ul>
                
                <div className="flex justify-end gap-2">
                  <Button size="sm" variant="outline" className="text-xs">
                    <Download className="h-3 w-3 mr-1" />
                    Facture
                  </Button>
                  <Button size="sm" variant="outline" className="text-xs">
                    <Eye className="h-3 w-3 mr-1" />
                    Détails
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </>
  );
};

export default CustomerOrders;
