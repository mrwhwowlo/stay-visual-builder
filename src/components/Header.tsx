
import React from 'react';
import { Search, Menu, User, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  return (
    <header className="fixed top-0 w-full bg-background border-b border-border z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-primary">Oceanbnb</h1>
          </div>
          
          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex items-center bg-background border border-border rounded-full shadow-sm hover:shadow-md transition-shadow">
            <div className="px-6 py-2 border-r border-border">
              <div className="text-sm font-medium">Anywhere</div>
            </div>
            <div className="px-6 py-2 border-r border-border">
              <div className="text-sm font-medium">Any week</div>
            </div>
            <div className="px-6 py-2">
              <div className="text-sm text-muted-foreground">Add guests</div>
            </div>
            <Button size="sm" className="rounded-full mr-2">
              <Search className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Right Side */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="hidden md:flex">
              Become a host
            </Button>
            <Button variant="ghost" size="icon">
              <Globe className="h-4 w-4" />
            </Button>
            <div className="flex items-center space-x-2 border border-border rounded-full p-1 hover:shadow-md transition-shadow">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Menu className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <User className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
