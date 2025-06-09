
import React, { useState } from 'react';
import { Calendar, Users, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface BookingCardProps {
  price: number;
  rating: number;
  reviewCount: number;
  onReserve: (dates: { checkIn: Date; checkOut: Date }, guests: number) => void;
}

const BookingCard = ({ price, rating, reviewCount, onReserve }: BookingCardProps) => {
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [guests, setGuests] = useState(2);
  const [showGuestSelector, setShowGuestSelector] = useState(false);

  const nights = checkIn && checkOut ? Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)) : 0;
  const totalBeforeFees = nights * price;
  const cleaningFee = 75;
  const serviceFee = Math.round(totalBeforeFees * 0.14);
  const total = totalBeforeFees + cleaningFee + serviceFee;

  const handleReserve = () => {
    if (checkIn && checkOut) {
      onReserve({ checkIn, checkOut }, guests);
    }
  };

  const formatDate = (date: Date | null) => {
    if (!date) return 'Add date';
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <Card className="sticky top-24">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-baseline space-x-1">
            <span className="text-2xl font-bold">${price}</span>
            <span className="text-muted-foreground">night</span>
          </div>
          <div className="flex items-center space-x-1 text-sm">
            <Star className="h-4 w-4 fill-current text-yellow-500" />
            <span className="font-medium">{rating}</span>
            <span className="text-muted-foreground">({reviewCount})</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Date Selection */}
        <div className="grid grid-cols-2 border border-border rounded-lg overflow-hidden">
          <button 
            className="p-3 text-left border-r border-border hover:bg-accent transition-colors"
            onClick={() => {/* Open date picker */}}
          >
            <div className="text-xs font-medium text-muted-foreground">CHECK-IN</div>
            <div className="text-sm">{formatDate(checkIn)}</div>
          </button>
          <button 
            className="p-3 text-left hover:bg-accent transition-colors"
            onClick={() => {/* Open date picker */}}
          >
            <div className="text-xs font-medium text-muted-foreground">CHECKOUT</div>
            <div className="text-sm">{formatDate(checkOut)}</div>
          </button>
        </div>

        {/* Guest Selection */}
        <div className="relative">
          <button 
            className="w-full p-3 text-left border border-border rounded-lg hover:bg-accent transition-colors"
            onClick={() => setShowGuestSelector(!showGuestSelector)}
          >
            <div className="text-xs font-medium text-muted-foreground">GUESTS</div>
            <div className="text-sm flex items-center justify-between">
              <span>{guests} guest{guests !== 1 ? 's' : ''}</span>
              <Users className="h-4 w-4" />
            </div>
          </button>

          {showGuestSelector && (
            <Card className="absolute top-full mt-2 w-full z-10 border border-border">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <span>Guests</span>
                  <div className="flex items-center space-x-3">
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => setGuests(Math.max(1, guests - 1))}
                      disabled={guests <= 1}
                      className="h-8 w-8 rounded-full"
                    >
                      -
                    </Button>
                    <span className="w-8 text-center">{guests}</span>
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => setGuests(guests + 1)}
                      className="h-8 w-8 rounded-full"
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
          className="w-full h-12 text-base font-medium"
          onClick={handleReserve}
          disabled={!checkIn || !checkOut}
        >
          Reserve
        </Button>

        <p className="text-center text-sm text-muted-foreground">
          You won't be charged yet
        </p>

        {/* Price Breakdown */}
        {nights > 0 && (
          <div className="space-y-3">
            <Separator />
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="underline">${price} x {nights} nights</span>
                <span>${totalBeforeFees}</span>
              </div>
              <div className="flex justify-between">
                <span className="underline">Cleaning fee</span>
                <span>${cleaningFee}</span>
              </div>
              <div className="flex justify-between">
                <span className="underline">Service fee</span>
                <span>${serviceFee}</span>
              </div>
            </div>
            <Separator />
            <div className="flex justify-between font-medium text-base">
              <span>Total before taxes</span>
              <span>${total}</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BookingCard;
