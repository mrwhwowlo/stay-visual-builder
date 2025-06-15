
import React from 'react';

interface LocationMapProps {
  locationName: string;
  googleMapsEmbed?: string;
}

const LocationMap = ({ locationName, googleMapsEmbed }: LocationMapProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Var du kommer att vara</h2>
      <div className="aspect-video rounded-xl overflow-hidden border bg-gray-100 flex items-center justify-center">
        {googleMapsEmbed ? (
          <iframe
            src={googleMapsEmbed}
            title={`Karta över ${locationName}`}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full border-0"
          />
        ) : (
          <span className="text-gray-400 text-center w-full">Ingen karta tillgänglig</span>
        )}
      </div>
      <p className="font-semibold text-lg">{locationName}</p>
      <p className="text-sm text-gray-600">Exakt platsinformation kommer att ges efter bokningen.</p>
    </div>
  );
};

export default LocationMap;
