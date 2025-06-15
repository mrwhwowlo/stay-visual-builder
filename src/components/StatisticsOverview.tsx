
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

interface PropertyStats {
  property_id: string;
  property_title: string;
  views_count: number;
  bookings_count: number;
  revenue_total: number;
  average_rating: number;
  total_reviews: number;
  last_booking_date: string;
}

const StatisticsOverview = () => {
  const [stats, setStats] = useState<PropertyStats[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchStatistics();
  }, []);

  const fetchStatistics = async () => {
    try {
      const { data, error } = await supabase
        .from('property_statistics')
        .select(`
          *,
          properties (
            title
          )
        `);

      if (error) throw error;
      
      const formattedStats = data?.map(stat => ({
        property_id: stat.property_id,
        property_title: stat.properties?.title || 'Unknown Property',
        views_count: stat.views_count,
        bookings_count: stat.bookings_count,
        revenue_total: Number(stat.revenue_total),
        average_rating: Number(stat.average_rating) || 0,
        total_reviews: stat.total_reviews,
        last_booking_date: stat.last_booking_date
      })) || [];
      
      setStats(formattedStats);
    } catch (error) {
      console.error('Error fetching statistics:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const totalRevenue = stats.reduce((sum, stat) => sum + stat.revenue_total, 0);
  const totalBookings = stats.reduce((sum, stat) => sum + stat.bookings_count, 0);
  const averageRating = stats.length > 0 ? stats.reduce((sum, stat) => sum + stat.average_rating, 0) / stats.length : 0;

  if (isLoading) {
    return <div className="p-6">Laddar statistik...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Intäkter</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRevenue.toLocaleString('sv-SE')} kr</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Totala Bokningar</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalBookings}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Genomsnittligt Betyg</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageRating.toFixed(1)} ⭐</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Aktiva Fastigheter</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.length}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Intäkter per Fastighet</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="property_title" angle={-45} textAnchor="end" height={100} />
                <YAxis />
                <Tooltip formatter={(value) => [`${Number(value).toLocaleString('sv-SE')} kr`, 'Intäkter']} />
                <Bar dataKey="revenue_total" fill="#FF385C" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Bokningar per Fastighet</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={stats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="property_title" angle={-45} textAnchor="end" height={100} />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="bookings_count" stroke="#FF385C" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Detaljerad Statistik</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Fastighet</th>
                  <th className="text-left p-2">Visningar</th>
                  <th className="text-left p-2">Bokningar</th>
                  <th className="text-left p-2">Intäkter</th>
                  <th className="text-left p-2">Betyg</th>
                  <th className="text-left p-2">Recensioner</th>
                  <th className="text-left p-2">Senaste Bokning</th>
                </tr>
              </thead>
              <tbody>
                {stats.map((stat) => (
                  <tr key={stat.property_id} className="border-b">
                    <td className="p-2 font-medium">{stat.property_title}</td>
                    <td className="p-2">{stat.views_count}</td>
                    <td className="p-2">{stat.bookings_count}</td>
                    <td className="p-2">{stat.revenue_total.toLocaleString('sv-SE')} kr</td>
                    <td className="p-2">{stat.average_rating.toFixed(1)} ⭐</td>
                    <td className="p-2">{stat.total_reviews}</td>
                    <td className="p-2">{stat.last_booking_date || 'Ingen'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatisticsOverview;
