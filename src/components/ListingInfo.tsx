
import React from 'react';
import { Star, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Host {
  name: string;
  avatar: string;
  isSuperhost: boolean;
  joinedDate: string;
}

interface ListingInfoProps {
  title: string;
  location: string;
  rating: number;
  reviewCount: number;
  host: Host;
}

const ListingInfo = ({ title, location, rating, reviewCount, host }: ListingInfoProps) => {
  return (
    <div className="space-y-4">
      {/* Title */}
      <h1 className="text-3xl font-bold text-foreground">{title}</h1>
      
      {/* Rating and Location */}
      <div className="flex items-center space-x-4 text-sm">
        <div className="flex items-center space-x-1">
          <Star className="h-4 w-4 fill-current text-yellow-500" />
          <span className="font-medium">{rating}</span>
          <span className="text-muted-foreground">({reviewCount} recensioner)</span>
        </div>
        <div className="flex items-center space-x-1 text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span className="underline cursor-pointer hover:text-foreground">{location}</span>
        </div>
      </div>
      
      {/* Host Info */}
      <div className="flex items-center space-x-4 pt-4 border-t border-border">
        <img 
          src={host.avatar} 
          alt={host.name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <div className="flex items-center space-x-2">
            <span className="font-medium">Värd: {host.name}</span>
            {host.isSuperhost && (
              <Badge variant="secondary" className="text-xs">
                Supervärd
              </Badge>
            )}
          </div>
          <div className="text-sm text-muted-foreground">
            Värd sedan {host.joinedDate}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingInfo;
