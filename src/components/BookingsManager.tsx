
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
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
            title
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBookings(data || []);
    } catch (error) {
      toast({
        title: "Fel",
        description: "Kunde inte hämta bokningar.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateBookingStatus = async (id: string, status: 'confirmed' | 'cancelled') => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Uppdaterad",
        description: `Bokning ${status === 'confirmed' ? 'bekräftad' : 'avbokad'}.`,
      });
      fetchBookings();
    } catch (error) {
      toast({
        title: "Fel",
        description: "Kunde inte uppdatera bokningen.",
        variant: "destructive",
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'default';
      case 'cancelled':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'Bekräftad';
      case 'cancelled':
        return 'Avbokad';
      default:
        return 'Väntande';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bokningshantering</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="text-center py-8">Laddar...</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Fastighet</TableHead>
                <TableHead>Gäst</TableHead>
                <TableHead>E-post</TableHead>
                <TableHead>Incheckning</TableHead>
                <TableHead>Utcheckning</TableHead>
                <TableHead>Gäster</TableHead>
                <TableHead>Totalt</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Åtgärder</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell className="font-medium">
                    {booking.properties?.title}
                  </TableCell>
                  <TableCell>{booking.guest_name}</TableCell>
                  <TableCell>{booking.guest_email}</TableCell>
                  <TableCell>{new Date(booking.check_in).toLocaleDateString('sv-SE')}</TableCell>
                  <TableCell>{new Date(booking.check_out).toLocaleDateString('sv-SE')}</TableCell>
                  <TableCell>{booking.guests}</TableCell>
                  <TableCell>{booking.total_price} kr</TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(booking.status)}>
                      {getStatusText(booking.status)}
                    </Badge>
                  </TableCell>
                  <TableCell>
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
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default BookingsManager;
