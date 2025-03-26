
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  BarChart, 
  Users, 
  ShoppingCart, 
  Calendar, 
  TrendingUp,
  TrendingDown,
  Banknote,
  Package,
  CircleDollarSign,
  ArrowRight,
  LucideIcon
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

const AdminOverview = () => {
  // Données fictives pour les KPIs
  const kpis = [
    { 
      title: "Chiffre d'affaires", 
      value: "12 450 €", 
      change: "+12%", 
      trend: "up", 
      period: "vs. mois dernier",
      icon: CircleDollarSign
    },
    { 
      title: "Commandes", 
      value: "84", 
      change: "+8%", 
      trend: "up", 
      period: "vs. mois dernier",
      icon: ShoppingCart
    },
    { 
      title: "Clients", 
      value: "422", 
      change: "+14%", 
      trend: "up", 
      period: "vs. mois dernier", 
      icon: Users
    },
    { 
      title: "Locations", 
      value: "36", 
      change: "-5%", 
      trend: "down", 
      period: "vs. mois dernier", 
      icon: Package
    }
  ];

  // Données fictives pour les graphiques
  const salesData = [
    { name: 'Jan', ventes: 4000, locations: 2400 },
    { name: 'Fév', ventes: 3000, locations: 1398 },
    { name: 'Mar', ventes: 2000, locations: 9800 },
    { name: 'Avr', ventes: 2780, locations: 3908 },
    { name: 'Mai', ventes: 1890, locations: 4800 },
    { name: 'Juin', ventes: 2390, locations: 3800 },
  ];

  const productsData = [
    { name: 'Enceintes', quantité: 12 },
    { name: 'Micros', quantité: 19 },
    { name: 'Consoles', quantité: 5 },
    { name: 'Lumières', quantité: 8 },
    { name: 'Câbles', quantité: 15 },
  ];

  // Données pour les prochaines livraisons
  const upcomingDeliveries = [
    {
      id: "CMD-001254",
      client: "Jean Dupont",
      date: "12/06/2023",
      adresse: "23 Rue du Commerce, Toulon",
      telephone: "06-12-34-56-78",
      type: "Location"
    },
    {
      id: "CMD-001255",
      client: "Marie Martin",
      date: "14/06/2023",
      adresse: "45 Avenue de la République, Nice",
      telephone: "07-65-43-21-09",
      type: "Achat"
    }
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-gray-900">Tableau de bord</h1>
        <p className="text-gray-600">Aperçu des performances et activités récentes</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        {kpis.map((kpi, i) => {
          const Icon = kpi.icon;
          return (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
                <Icon className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{kpi.value}</div>
                <div className="flex items-center mt-1">
                  <span className={`text-xs ${
                    kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  } flex items-center`}>
                    {kpi.trend === 'up' ? 
                      <TrendingUp className="h-3 w-3 mr-1" /> : 
                      <TrendingDown className="h-3 w-3 mr-1" />
                    }
                    {kpi.change}
                  </span>
                  <span className="text-xs text-gray-500 ml-1">
                    {kpi.period}
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Graphiques */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Ventes vs Locations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={salesData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorVentes" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#EC4899" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#EC4899" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorLocations" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="ventes" 
                    stroke="#EC4899" 
                    fillOpacity={1} 
                    fill="url(#colorVentes)" 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="locations" 
                    stroke="#8B5CF6" 
                    fillOpacity={1} 
                    fill="url(#colorLocations)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Produits les plus demandés</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart
                  data={productsData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="quantité" fill="#EC4899" />
                </RechartsBarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Prochaines livraisons */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold flex items-center">
            <Truck className="h-5 w-5 mr-2 text-pink-500" />
            Prochaines livraisons
          </h2>
          <Button variant="outline" size="sm" asChild>
            <a href="/admin/calendrier">
              Voir l'agenda
              <ArrowRight className="ml-1 h-4 w-4" />
            </a>
          </Button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="px-4 py-3">N° Commande</th>
                <th className="px-4 py-3">Client</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Adresse</th>
                <th className="px-4 py-3">Téléphone</th>
                <th className="px-4 py-3">Type</th>
              </tr>
            </thead>
            <tbody>
              {upcomingDeliveries.map((delivery) => (
                <tr key={delivery.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{delivery.id}</td>
                  <td className="px-4 py-3">{delivery.client}</td>
                  <td className="px-4 py-3">{delivery.date}</td>
                  <td className="px-4 py-3">{delivery.adresse}</td>
                  <td className="px-4 py-3">{delivery.telephone}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      delivery.type === 'Location' 
                        ? 'bg-pink-100 text-pink-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {delivery.type}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
