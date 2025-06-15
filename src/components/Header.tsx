
import React, { useState } from 'react';
import { Search, Menu, User, Globe, Calendar, Users, Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { sv } from 'date-fns/locale';
import { cn } from '@/lib/utils';

interface HeaderProps {
  listingLocation?: string;
  onSearch?: (data: { checkIn: Date | undefined; checkOut: Date | undefined; guests: number }) => void;
}

const Header = ({ listingLocation = "Marbella, Spanien", onSearch }: HeaderProps) => {
  const [checkIn, setCheckIn] = useState<Date | undefined>();
  const [checkOut, setCheckOut] = useState<Date | undefined>();
  const [guests, setGuests] = useState(1);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [isGuestPickerOpen, setIsGuestPickerOpen] = useState(false);

  const handleSearch = () => {
    if (onSearch) {
      onSearch({ checkIn, checkOut, guests });
    }
  };

  const formatDateRange = () => {
    if (checkIn && checkOut) {
      return `${format(checkIn, 'd MMM', { locale: sv })} - ${format(checkOut, 'd MMM', { locale: sv })}`;
    }
    if (checkIn) {
      return `${format(checkIn, 'd MMM', { locale: sv })} - ?`;
    }
    return "Vilken vecka som helst";
  };

  return (
    <header className="fixed top-0 w-full bg-white border-b border-gray-200 z-50 shadow-sm">
      <div className="max-w-[1760px] mx-auto px-6 lg:px-20">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-[#FF385C]">airbnb</h1>
          </div>
          
          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex items-center bg-white border border-gray-300 rounded-full shadow-md hover:shadow-lg transition-shadow">
            <div className="px-6 py-3 border-r border-gray-300">
              <div className="text-sm font-medium text-gray-900">{listingLocation}</div>
            </div>
            
            {/* Date Picker */}
            <Popover open={isDatePickerOpen} onOpenChange={setIsDatePickerOpen}>
              <PopoverTrigger asChild>
                <div className="px-6 py-3 border-r border-gray-300 cursor-pointer hover:bg-gray-50 rounded-none">
                  <div className="text-sm font-medium text-gray-900">{formatDateRange()}</div>
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="center">
                <div className="p-4">
                  <div className="mb-4">
                    <h4 className="font-medium mb-2">Välj incheckning</h4>
                    <CalendarComponent
                      mode="single"
                      selected={checkIn}
                      onSelect={setCheckIn}
                      disabled={(date) => date < new Date()}
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </div>
                  {checkIn && (
                    <div>
                      <h4 className="font-medium mb-2">Välj utcheckning</h4>
                      <CalendarComponent
                        mode="single"
                        selected={checkOut}
                        onSelect={setCheckOut}
                        disabled={(date) => date <= checkIn}
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </div>
                  )}
                </div>
              </PopoverContent>
            </Popover>
            
            {/* Guest Picker */}
            <Popover open={isGuestPickerOpen} onOpenChange={setIsGuestPickerOpen}>
              <PopoverTrigger asChild>
                <div className="px-6 py-3 pr-2 cursor-pointer hover:bg-gray-50 rounded-none">
                  <div className="text-sm text-gray-600">
                    {guests === 1 ? '1 gäst' : `${guests} gäster`}
                  </div>
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-0" align="center">
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Gäster</div>
                      <div className="text-sm text-gray-600">Ålder 13 eller äldre</div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded-full"
                        onClick={() => setGuests(Math.max(1, guests - 1))}
                        disabled={guests <= 1}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center font-medium">{guests}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded-full"
                        onClick={() => setGuests(Math.min(8, guests + 1))}
                        disabled={guests >= 8}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            <Button 
              size="sm" 
              className="rounded-full mr-2 bg-[#FF385C] hover:bg-[#E31C5F] h-8 w-8 p-0"
              onClick={handleSearch}
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Right Side */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="hidden lg:flex text-sm font-medium text-gray-900 hover:bg-gray-100 rounded-full px-3 py-2">
              Airbnb ditt hem
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-gray-100 rounded-full">
              <Globe className="h-4 w-4" />
            </Button>
            <div className="flex items-center space-x-0 border border-gray-300 rounded-full p-1 hover:shadow-md transition-shadow">
              <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
                <Menu className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
                <div className="w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
