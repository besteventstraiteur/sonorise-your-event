
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  TrendingDown,
  CircleDollarSign,
  Package,
  Users,
  ShoppingCart
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

const AdminOverview = () => {
  const { data: kpiData } = useQuery({
    queryKey: ['monthly_kpis'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('monthly_kpis')
        .select('*')
        .order('period');
      
      if (error) throw error;
      return data;
    }
  });

  // Simplified KPI cards data structure
  const kpis = [
    { 
      title: "Chiffre d'affaires", 
      value: `${kpiData?.[0]?.total_revenue?.toLocaleString() ?? 0} €`, 
      change: "+12%", 
      trend: "up", 
      period: "vs. mois dernier",
      icon: CircleDollarSign
    },
    { 
      title: "Locations", 
      value: kpiData?.[0]?.total_rentals?.toString() ?? "0", 
      change: "+8%", 
      trend: "up", 
      period: "vs. mois dernier",
      icon: ShoppingCart
    },
    { 
      title: "Durée moyenne", 
      value: `${kpiData?.[0]?.avg_rental_duration ?? 0} jours`, 
      change: "+14%", 
      trend: "up", 
      period: "vs. mois dernier", 
      icon: Package
    },
    { 
      title: "Satisfaction client", 
      value: `${kpiData?.[0]?.avg_satisfaction ?? 0}/5`, 
      change: "+5%", 
      trend: "up", 
      period: "vs. mois dernier", 
      icon: Users
    }
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Tableau de bord</h1>
        <p className="text-gray-600">Aperçu des performances et activités récentes</p>
      </div>

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

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Évolution des locations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={kpiData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#EC4899" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#EC4899" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorRentals" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="period"
                  tickFormatter={(date) => new Date(date).toLocaleDateString('fr-FR', { month: 'short' })}
                />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="total_revenue"
                  name="Revenus"
                  stroke="#EC4899"
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                />
                <Area
                  type="monotone"
                  dataKey="total_rentals"
                  name="Locations"
                  stroke="#8B5CF6"
                  fillOpacity={1}
                  fill="url(#colorRentals)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminOverview;
