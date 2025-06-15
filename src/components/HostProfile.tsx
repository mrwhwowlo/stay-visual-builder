
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ShieldCheck, Star } from 'lucide-react';

interface Host {
  name: string;
  avatar: string;
  isSuperhost: boolean;
  joinedDate: string;
  reviews: number;
  rating: number;
}

interface HostProfileProps {
  host: Host;
}

const HostProfile = ({ host }: HostProfileProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Avatar className="h-24 w-24">
          <AvatarImage src={host.avatar} alt={host.name} />
          <AvatarFallback>{host.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-2xl font-bold">Värd: {host.name}</h2>
          <p className="text-sm text-gray-500">Medlem sedan {host.joinedDate}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5" />
            <span>{host.reviews} recensioner</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5" />
            <span>Identitet verifierad</span>
          </div>
          {host.isSuperhost && (
            <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-primary" />
                <span>Superhost</span>
            </div>
          )}
      </div>

      <p className="text-sm text-gray-700">
        Som en Superhost är {host.name} erfaren, har höga betyg, och är engagerad i att erbjuda fantastiska vistelser för gäster.
      </p>

      <Button variant="outline">Kontakta värden</Button>
    </div>
  );
};

export default HostProfile;
