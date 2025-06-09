
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
    <div className="space-y-6">
      {/* Title */}
      <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 leading-tight">{title}</h1>
      
      {/* Rating and Location */}
      <div className="flex items-center space-x-4 text-sm">
        <div className="flex items-center space-x-1">
          <Star className="h-4 w-4 fill-current text-black" />
          <span className="font-medium text-gray-900">{rating}</span>
          <span className="text-gray-600">({reviewCount} recensioner)</span>
        </div>
        <span className="text-gray-300">·</span>
        <div className="flex items-center space-x-1 text-gray-600">
          <span className="underline cursor-pointer hover:text-gray-900">{location}</span>
        </div>
      </div>
      
      {/* Host Info */}
      <div className="flex items-center space-x-4 pt-6 border-t border-gray-200">
        <img 
          src={host.avatar} 
          alt={host.name}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <div className="flex items-center space-x-2">
            <span className="font-medium text-gray-900">Värd: {host.name}</span>
            {host.isSuperhost && (
              <Badge className="text-xs bg-gray-100 text-gray-700 hover:bg-gray-100">
                Supervärd
              </Badge>
            )}
          </div>
          <div className="text-sm text-gray-600">
            Värd sedan {host.joinedDate}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingInfo;
