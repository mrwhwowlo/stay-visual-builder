
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { format, addMonths, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';
import { sv } from 'date-fns/locale';

interface AvailabilityData {
  date: string;
  is_available: boolean;
  price_override?: number;
}

interface AvailabilityCalendarProps {
  propertyId: string;
  basePrice: number;
}

const AvailabilityCalendar = ({ propertyId, basePrice }: AvailabilityCalendarProps) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [availability, setAvailability] = useState<AvailabilityData[]>([]);
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [priceOverride, setPriceOverride] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchAvailability();
  }, [currentMonth, propertyId]);

  const fetchAvailability = async () => {
    const start = startOfMonth(currentMonth);
    const end = endOfMonth(addMonths(currentMonth, 2));

    try {
      const { data, error } = await supabase
        .from('listing_availability')
        .select('*')
        .eq('property_id', propertyId)
        .gte('date', format(start, 'yyyy-MM-dd'))
        .lte('date', format(end, 'yyyy-MM-dd'));

      if (error) throw error;
      setAvailability(data || []);
    } catch (error) {
      console.error('Error fetching availability:', error);
    }
  };

  const getDayStatus = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    const dayData = availability.find(a => a.date === dateStr);
    return dayData?.is_available !== false;
  };

  const getDayPrice = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    const dayData = availability.find(a => a.date === dateStr);
    return dayData?.price_override || basePrice;
  };

  const toggleAvailability = async (available: boolean) => {
    if (selectedDates.length === 0) {
      toast({
        title: "Välj datum",
        description: "Välj minst ett datum att uppdatera.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const updates = selectedDates.map(date => ({
        property_id: propertyId,
        date: format(date, 'yyyy-MM-dd'),
        is_available: available,
        price_override: priceOverride ? parseFloat(priceOverride) : null,
      }));

      const { error } = await supabase
        .from('listing_availability')
        .upsert(updates, { onConflict: 'property_id,date' });

      if (error) throw error;

      toast({
        title: "Uppdaterat",
        description: `${selectedDates.length} datum har uppdaterats.`,
      });

      setSelectedDates([]);
      setPriceOverride('');
      fetchAvailability();
    } catch (error) {
      console.error('Error updating availability:', error);
      toast({
        title: "Fel",
        description: "Kunde inte uppdatera tillgänglighet.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const modifiers = {
    available: (date: Date) => getDayStatus(date),
    unavailable: (date: Date) => !getDayStatus(date),
    selected: selectedDates,
  };

  const modifiersStyles = {
    available: { backgroundColor: '#dcfce7', color: '#166534' },
    unavailable: { backgroundColor: '#fecaca', color: '#dc2626' },
    selected: { backgroundColor: '#3b82f6', color: 'white' },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tillgänglighetskalender</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <Calendar
              mode="multiple"
              selected={selectedDates}
              onSelect={(dates) => setSelectedDates(dates || [])}
              locale={sv}
              modifiers={modifiers}
              modifiersStyles={modifiersStyles}
              month={currentMonth}
              onMonthChange={setCurrentMonth}
              className="rounded-md border"
            />
          </div>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Valda datum: {selectedDates.length}</h4>
              <div className="text-sm text-gray-600 max-h-32 overflow-y-auto">
                {selectedDates.map(date => (
                  <div key={date.toISOString()} className="flex justify-between">
                    <span>{format(date, 'dd MMM yyyy', { locale: sv })}</span>
                    <span>{getDayPrice(date)} kr</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Prisöverstyring (tom för standardpris: {basePrice} kr)
              </label>
              <Input
                type="number"
                value={priceOverride}
                onChange={(e) => setPriceOverride(e.target.value)}
                placeholder={`${basePrice}`}
              />
            </div>

            <div className="flex space-x-2">
              <Button
                onClick={() => toggleAvailability(true)}
                disabled={isLoading || selectedDates.length === 0}
                className="flex-1"
              >
                Markera Tillgänglig
              </Button>
              <Button
                onClick={() => toggleAvailability(false)}
                disabled={isLoading || selectedDates.length === 0}
                variant="destructive"
                className="flex-1"
              >
                Markera Otillgänglig
              </Button>
            </div>

            <div className="text-xs space-y-1">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-green-200 rounded"></div>
                <span>Tillgängligt</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-red-200 rounded"></div>
                <span>Otillgängligt</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-blue-500 rounded"></div>
                <span>Valt</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AvailabilityCalendar;
