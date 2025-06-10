
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Booking {
  id: string;
  property_id: string;
  guest_name: string;
  guest_email: string;
  check_in: string;
  check_out: string;
  guests: number;
  total_price: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  created_at: string;
  properties: {
    title: string;
    location: string;
  };
}

const BookingsManager = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          properties (
            title,
            location
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Type assertion to handle the join data
      setBookings(data as Booking[]);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      toast({
        title: "Fel",
        description: "Kunde inte hämta bokningar.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateBookingStatus = async (bookingId: string, status: 'confirmed' | 'cancelled') => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status })
        .eq('id', bookingId);

      if (error) throw error;

      setBookings(bookings.map(booking => 
        booking.id === bookingId ? { ...booking, status } : booking
      ));

      toast({
        title: "Bokning uppdaterad",
        description: `Bokningen har ${status === 'confirmed' ? 'bekräftats' : 'avbokats'}.`,
      });
    } catch (error) {
      console.error('Error updating booking:', error);
      toast({
        title: "Fel",
        description: "Kunde inte uppdatera bokningen.",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: 'default' as const,
      confirmed: 'default' as const,
      cancelled: 'destructive' as const,
    };
    
    const labels = {
      pending: 'Väntande',
      confirmed: 'Bekräftad',
      cancelled: 'Avbokad',
    };

    return (
      <Badge variant={variants[status as keyof typeof variants] || 'default'}>
        {labels[status as keyof typeof labels] || status}
      </Badge>
    );
  };

  if (isLoading) {
    return <div className="p-6">Laddar bokningar...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Bokningar</h2>
      </div>

      <div className="grid gap-4">
        {bookings.map((booking) => (
          <Card key={booking.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{booking.properties.title}</CardTitle>
                  <p className="text-sm text-gray-600">{booking.properties.location}</p>
                </div>
                {getStatusBadge(booking.status)}
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-sm font-medium">Gäst</p>
                  <p className="text-sm text-gray-600">{booking.guest_name}</p>
                  <p className="text-sm text-gray-600">{booking.guest_email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Datum</p>
                  <p className="text-sm text-gray-600">
                    {new Date(booking.check_in).toLocaleDateString('sv-SE')} - {new Date(booking.check_out).toLocaleDateString('sv-SE')}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium">Gäster</p>
                  <p className="text-sm text-gray-600">{booking.guests} st</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Totalpris</p>
                  <p className="text-sm text-gray-600">{booking.total_price.toLocaleString('sv-SE')} kr</p>
                </div>
              </div>
              
              {booking.status === 'pending' && (
                <div className="flex space-x-2">
                  <Button 
                    size="sm" 
                    onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                  >
                    Bekräfta
                  </Button>
                  <Button 
                    size="sm" 
                    variant="destructive"
                    onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                  >
                    Avboka
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
        
        {bookings.length === 0 && (
          <Card>
            <CardContent className="p-6 text-center text-gray-500">
              Inga bokningar hittades.
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default BookingsManager;
