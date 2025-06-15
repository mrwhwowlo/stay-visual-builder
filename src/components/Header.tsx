
import React, { useState } from 'react';
import { Search, Calendar, Users, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { sv } from 'date-fns/locale';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [guests, setGuests] = useState(1);
  const [showCalendar, setShowCalendar] = useState<'checkin' | 'checkout' | null>(null);
  const navigate = useNavigate();

  const handleGuestChange = (increment: boolean) => {
    if (increment) {
      setGuests(prev => prev + 1);
    } else if (guests > 1) {
      setGuests(prev => prev - 1);
    }
  };

  const formatDate = (date: Date | undefined) => {
    return date ? format(date, 'MMM dd', { locale: sv }) : 'Välj datum';
  };

  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <div className="text-2xl font-bold text-[#FF385C] cursor-pointer" onClick={() => navigate('/')}>
              airbnb
            </div>
          </div>
          
          <div className="hidden md:flex items-center">
            <Card className="shadow-lg border-0">
              <CardContent className="p-0">
                <div className="flex items-center divide-x">
                  <div className="px-6 py-4">
                    <div className="text-xs font-medium text-gray-900 mb-1">Var som helst</div>
                    <div className="text-sm text-gray-500">Boende • Upplevelser</div>
                  </div>
                  
                  <Popover open={showCalendar === 'checkin'} onOpenChange={(open) => setShowCalendar(open ? 'checkin' : null)}>
                    <PopoverTrigger asChild>
                      <div className="px-6 py-4 cursor-pointer hover:bg-gray-50">
                        <div className="text-xs font-medium text-gray-900 mb-1">Incheckning</div>
                        <div className="text-sm text-gray-500">{formatDate(checkIn)}</div>
                      </div>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarComponent
                        mode="single"
                        selected={checkIn}
                        onSelect={(date) => {
                          setCheckIn(date);
                          setShowCalendar('checkout');
                        }}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>

                  <Popover open={showCalendar === 'checkout'} onOpenChange={(open) => setShowCalendar(open ? 'checkout' : null)}>
                    <PopoverTrigger asChild>
                      <div className="px-6 py-4 cursor-pointer hover:bg-gray-50">
                        <div className="text-xs font-medium text-gray-900 mb-1">Utcheckning</div>
                        <div className="text-sm text-gray-500">{formatDate(checkOut)}</div>
                      </div>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarComponent
                        mode="single"
                        selected={checkOut}
                        onSelect={(date) => {
                          setCheckOut(date);
                          setShowCalendar(null);
                        }}
                        disabled={(date) => date < new Date() || (checkIn && date <= checkIn)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  
                  <Popover>
                    <PopoverTrigger asChild>
                      <div className="px-6 py-4 cursor-pointer hover:bg-gray-50">
                        <div className="text-xs font-medium text-gray-900 mb-1">Gäster</div>
                        <div className="text-sm text-gray-500">{guests} gäst{guests !== 1 ? 'er' : ''}</div>
                      </div>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">Vuxna</div>
                            <div className="text-sm text-gray-500">13 år eller äldre</div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleGuestChange(false)}
                              disabled={guests <= 1}
                              className="h-8 w-8 rounded-full p-0"
                            >
                              -
                            </Button>
                            <span className="w-8 text-center">{guests}</span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleGuestChange(true)}
                              className="h-8 w-8 rounded-full p-0"
                            >
                              +
                            </Button>
                          </div>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                  
                  <div className="px-4">
                    <Button size="icon" className="rounded-full bg-[#FF385C] hover:bg-[#E31C5F]">
                      <Search className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={() => navigate('/admin')}>
              Admin
            </Button>
            <div className="flex items-center space-x-2 border rounded-full px-3 py-2 hover:shadow-md cursor-pointer">
              <Menu className="h-4 w-4" />
              <div className="w-8 h-8 bg-gray-500 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
