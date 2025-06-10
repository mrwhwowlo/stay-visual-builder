
import React, { useState } from 'react';
import { Calendar, Users, Star, CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { sv } from 'date-fns/locale';

interface BookingCardProps {
  price: number;
  rating: number;
  reviewCount: number;
  onReserve: (dates: { checkIn: Date; checkOut: Date }, guests: number) => void;
}

const BookingCard = ({ price, rating, reviewCount, onReserve }: BookingCardProps) => {
  const [checkIn, setCheckIn] = useState<Date | undefined>();
  const [checkOut, setCheckOut] = useState<Date | undefined>();
  const [guests, setGuests] = useState(2);
  const [showGuestSelector, setShowGuestSelector] = useState(false);
  const [showCheckInCalendar, setShowCheckInCalendar] = useState(false);
  const [showCheckOutCalendar, setShowCheckOutCalendar] = useState(false);

  const nights = checkIn && checkOut ? Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)) : 0;
  const totalBeforeFees = nights * price;
  const cleaningFee = 750;
  const serviceFee = Math.round(totalBeforeFees * 0.14);
  const total = totalBeforeFees + cleaningFee + serviceFee;

  const handleReserve = () => {
    if (checkIn && checkOut) {
      onReserve({ checkIn, checkOut }, guests);
    }
  };

  const handleCheckInSelect = (date: Date | undefined) => {
    setCheckIn(date);
    setShowCheckInCalendar(false);
    // If check-out is before check-in, reset it
    if (date && checkOut && checkOut <= date) {
      setCheckOut(undefined);
    }
  };

  const handleCheckOutSelect = (date: Date | undefined) => {
    setCheckOut(date);
    setShowCheckOutCalendar(false);
  };

  const formatDate = (date: Date | undefined) => {
    if (!date) return 'Lägg till datum';
    return format(date, 'd MMM', { locale: sv });
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <Card className="sticky top-32 border border-gray-200 shadow-xl rounded-xl">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-baseline space-x-1">
            <span className="text-2xl font-semibold text-gray-900">{price.toLocaleString('sv-SE')} kr</span>
            <span className="text-gray-600"> natt</span>
          </div>
          <div className="flex items-center space-x-1 text-sm">
            <Star className="h-4 w-4 fill-current text-black" />
            <span className="font-medium text-gray-900">{rating}</span>
            <span className="text-gray-600">({reviewCount})</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Date Selection */}
        <div className="grid grid-cols-2 border border-gray-300 rounded-lg overflow-hidden">
          <Popover open={showCheckInCalendar} onOpenChange={setShowCheckInCalendar}>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                className="p-3 h-auto justify-start text-left border-r border-gray-300 rounded-none hover:bg-gray-50"
              >
                <div className="w-full">
                  <div className="text-xs font-semibold text-gray-900 uppercase">Incheckning</div>
                  <div className="text-sm text-gray-600">{formatDate(checkIn)}</div>
                </div>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                mode="single"
                selected={checkIn}
                onSelect={handleCheckInSelect}
                disabled={(date) => date < today}
                initialFocus
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>

          <Popover open={showCheckOutCalendar} onOpenChange={setShowCheckOutCalendar}>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                className="p-3 h-auto justify-start text-left rounded-none hover:bg-gray-50"
              >
                <div className="w-full">
                  <div className="text-xs font-semibold text-gray-900 uppercase">Utcheckning</div>
                  <div className="text-sm text-gray-600">{formatDate(checkOut)}</div>
                </div>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                mode="single"
                selected={checkOut}
                onSelect={handleCheckOutSelect}
                disabled={(date) => {
                  if (date < today) return true;
                  if (checkIn) return date <= checkIn;
                  return false;
                }}
                initialFocus
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Guest Selection */}
        <div className="relative">
          <button 
            className="w-full p-3 text-left border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            onClick={() => setShowGuestSelector(!showGuestSelector)}
          >
            <div className="text-xs font-semibold text-gray-900 uppercase">Gäster</div>
            <div className="text-sm flex items-center justify-between text-gray-600">
              <span>{guests} gäst{guests !== 1 ? 'er' : ''}</span>
              <Users className="h-4 w-4" />
            </div>
          </button>

          {showGuestSelector && (
            <Card className="absolute top-full mt-2 w-full z-10 border border-gray-200 shadow-lg">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-900">Gäster</span>
                  <div className="flex items-center space-x-3">
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => setGuests(Math.max(1, guests - 1))}
                      disabled={guests <= 1}
                      className="h-8 w-8 rounded-full border-gray-300"
                    >
                      -
                    </Button>
                    <span className="w-8 text-center text-gray-900">{guests}</span>
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => setGuests(guests + 1)}
                      className="h-8 w-8 rounded-full border-gray-300"
                    >
                      +
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Reserve Button */}
        <Button 
          className="w-full h-12 text-base font-semibold bg-gradient-to-r from-[#E61E4D] to-[#E31C5F] hover:from-[#D70466] hover:to-[#BD1E59] text-white rounded-lg"
          onClick={handleReserve}
          disabled={!checkIn || !checkOut}
        >
          Reservera
        </Button>

        <p className="text-center text-sm text-gray-600">
          Du debiteras inte ännu
        </p>

        {/* Price Breakdown */}
        {nights > 0 && (
          <div className="space-y-3">
            <Separator className="bg-gray-200" />
            <div className="space-y-2">
              <div className="flex justify-between text-gray-900">
                <span className="underline">{price.toLocaleString('sv-SE')} kr × {nights} nätter</span>
                <span>{totalBeforeFees.toLocaleString('sv-SE')} kr</span>
              </div>
              <div className="flex justify-between text-gray-900">
                <span className="underline">Städavgift</span>
                <span>{cleaningFee.toLocaleString('sv-SE')} kr</span>
              </div>
              <div className="flex justify-between text-gray-900">
                <span className="underline">Serviceavgift</span>
                <span>{serviceFee.toLocaleString('sv-SE')} kr</span>
              </div>
            </div>
            <Separator className="bg-gray-200" />
            <div className="flex justify-between font-semibold text-base text-gray-900">
              <span>Totalt före skatter</span>
              <span>{total.toLocaleString('sv-SE')} kr</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BookingCard;
