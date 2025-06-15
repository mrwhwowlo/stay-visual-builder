
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { BedDouble } from 'lucide-react';

interface Bedroom {
  name: string;
  bedType: string;
}

interface WhereYoullSleepProps {
  bedrooms: Bedroom[];
}

const WhereYoullSleep = ({ bedrooms }: WhereYoullSleepProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Var du kommer att sova</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {bedrooms.map((bedroom, index) => (
          <Card key={index} className="border-gray-200">
            <CardContent className="p-6">
              <BedDouble className="w-7 h-7 mb-4 text-gray-700" />
              <p className="font-semibold">{bedroom.name}</p>
              <p className="text-sm text-gray-600">{bedroom.bedType}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default WhereYoullSleep;
