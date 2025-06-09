
import React from 'react';

interface Amenity {
  icon: string;
  name: string;
}

interface AmenitiesGridProps {
  amenities: Amenity[];
}

const AmenitiesGrid = ({ amenities }: AmenitiesGridProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900">Vad det här boendet erbjuder</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {amenities.map((amenity, index) => (
          <div key={index} className="flex items-center space-x-4 py-3">
            <span className="text-2xl">{amenity.icon}</span>
            <span className="text-gray-700">{amenity.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AmenitiesGrid;
