
import React from 'react';
import { Search, Menu, User, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
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
              <div className="text-sm font-medium text-gray-900">Var som helst</div>
            </div>
            <div className="px-6 py-3 border-r border-gray-300">
              <div className="text-sm font-medium text-gray-900">Vilken vecka som helst</div>
            </div>
            <div className="px-6 py-3 pr-2">
              <div className="text-sm text-gray-600">Lägg till gäster</div>
            </div>
            <Button size="sm" className="rounded-full mr-2 bg-[#FF385C] hover:bg-[#E31C5F] h-8 w-8 p-0">
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
