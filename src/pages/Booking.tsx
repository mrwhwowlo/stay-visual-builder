
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { sv } from 'date-fns/locale';
import { ArrowLeft, Star } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const Booking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    checkIn,
    checkOut,
    guests,
    price,
    title,
    image,
    rating,
    reviewCount,
    cleaningFee,
    serviceFeePercent,
  } = location.state || {};

  if (!location.state) {
    React.useEffect(() => {
      navigate('/');
    }, [navigate]);
    return null;
  }
    
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);

  const nights = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));
  const totalBeforeFees = nights * price;
  const serviceFee = Math.round(totalBeforeFees * (serviceFeePercent / 100));
  const total = totalBeforeFees + cleaningFee + serviceFee;

  const formatDateRange = (start: Date, end: Date) => {
    const startMonth = format(start, 'MMM', { locale: sv });
    const endMonth = format(end, 'MMM', { locale: sv });

    if (startMonth === endMonth) {
      return `${format(start, 'd')}–${format(end, 'd')} ${endMonth} ${format(end, 'yyyy')}`;
    } else {
      return `${format(start, 'd MMM', { locale: sv })} – ${format(end, 'd MMM yyyy', { locale: sv })}`;
    }
  };
  
  const handlePayment = () => {
    console.log('Proceeding to payment...');
    alert('Betalningsfunktionen är inte implementerad än.');
  };
  
  const handleEdit = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-white animate-slide-in-right">
      <header className="p-4 max-w-5xl mx-auto">
        <Button variant="ghost" onClick={() => navigate(-1)} className="p-0 h-auto hover:bg-transparent">
          <ArrowLeft className="w-6 h-6" />
        </Button>
      </header>

      <main className="max-w-5xl mx-auto px-4 pb-16">
        <h1 className="text-3xl font-bold mb-8">Bekräfta och betala</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-24 gap-y-12">
          {/* Left column */}
          <div className="space-y-8">
            <Card className="border-0 shadow-none">
              <CardContent className="p-0">
                <h2 className="text-xl font-semibold mb-4">Din resa</h2>
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <p className="font-semibold">Datum</p>
                    <p className="text-gray-600">{formatDateRange(checkInDate, checkOutDate)}</p>
                  </div>
                  <Button variant="link" onClick={handleEdit} className="underline p-0 h-auto text-base font-semibold">Redigera</Button>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold">Gäster</p>
                    <p className="text-gray-600">{guests} gäst{guests > 1 ? 'er' : ''}</p>
                  </div>
                  <Button variant="link" onClick={handleEdit} className="underline p-0 h-auto text-base font-semibold">Redigera</Button>
                </div>
              </CardContent>
            </Card>

            <Separator />
            
            <Card className="border-0 shadow-none">
                <CardContent className="p-0">
                    <h2 className="text-xl font-semibold mb-4">Välj hur du vill betala</h2>
                    <div className="border-2 border-black rounded-lg p-4 flex justify-between items-center">
                        <div>
                            <p className="font-semibold">Betala {total.toLocaleString('sv-SE')} kr nu</p>
                        </div>
                        <div className="w-5 h-5 rounded-full border-2 border-black flex items-center justify-center">
                            <div className="w-2.5 h-2.5 bg-black rounded-full"></div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Separator />

            <Button onClick={handlePayment} className="w-full h-12 text-lg bg-gradient-to-r from-[#E61E4D] to-[#E31C5F] hover:from-[#D70466] hover:to-[#BD1E59] text-white rounded-lg font-semibold">
              Fortsätt
            </Button>
          </div>

          {/* Right column (sticky) */}
          <div>
            <div className="sticky top-8">
                <Card className="p-6 border rounded-xl shadow-none border-gray-300">
                    <CardContent className="p-0">
                        <div className="flex space-x-4 mb-4">
                            <img src={image} alt={title} className="w-28 h-24 object-cover rounded-lg" />
                            <div>
                                <p className="text-sm text-gray-500">Hela boendet (ägenlägenhet)</p>
                                <p className="font-semibold">{title}</p>
                                <div className="flex items-center space-x-1 text-sm mt-1">
                                    <Star className="h-4 w-4 fill-current text-black" />
                                    <span className="font-medium text-gray-900">{rating}</span>
                                    <span className="text-gray-600">({reviewCount} omdömen) • </span>
                                    <Star className="h-4 w-4 fill-current text-primary" /> 
                                    <span className="font-medium">Superhost</span>
                                </div>
                            </div>
                        </div>

                        <Separator className="my-6"/>

                        <h3 className="text-xl font-semibold mb-4">Prisuppgifter</h3>
                        <div className="space-y-2 text-gray-800">
                            <div className="flex justify-between">
                                <span className="underline">{price.toLocaleString('sv-SE')} kr x {nights} nätter</span>
                                <span>{totalBeforeFees.toLocaleString('sv-SE')} kr</span>
                            </div>
                             <div className="flex justify-between">
                                <span className="underline">Städavgift</span>
                                <span>{cleaningFee.toLocaleString('sv-SE')} kr</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="underline">Serviceavgift</span>
                                <span>{serviceFee.toLocaleString('sv-SE')} kr</span>
                            </div>
                        </div>

                        <Separator className="my-6" />

                        <div className="flex justify-between font-bold text-lg">
                            <span>Totalt (SEK)</span>
                            <span>{total.toLocaleString('sv-SE')} kr</span>
                        </div>
                    </CardContent>
                </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Booking;
