
import React from 'react';

interface LocationMapProps {
  locationName: string;
}

const LocationMap = ({ locationName }: LocationMapProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Var du kommer att vara</h2>
      <div className="aspect-video rounded-xl overflow-hidden border">
        <img 
          src="https://i.imgur.com/Ug6Bv2s.png" 
          alt={`Karta över ${locationName}`}
          className="w-full h-full object-cover" 
        />
      </div>
      <p className="font-semibold text-lg">{locationName}</p>
      <p className="text-sm text-gray-600">Exakt platsinformation kommer att ges efter bokningen.</p>
    </div>
  );
};

export default LocationMap;
