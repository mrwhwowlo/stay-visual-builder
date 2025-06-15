
import React from 'react';
import { Clock, Users, XCircle, Sparkles } from 'lucide-react';

const HouseRules = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Saker att veta</h2>
      <div className="grid md:grid-cols-3 gap-8">
        <div>
          <h3 className="font-semibold mb-2">Husregler</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start gap-2"><Users size={16} className="mt-1 flex-shrink-0" /> <span>Lämplig för barn och spädbarn</span></li>
            <li className="flex items-start gap-2"><Clock size={16} className="mt-1 flex-shrink-0" /> <span>Incheckning: Efter 15:00</span></li>
            <li className="flex items-start gap-2"><Clock size={16} className="mt-1 flex-shrink-0" /> <span>Utcheckning: Före 11:00</span></li>
            <li className="flex items-start gap-2"><XCircle size={16} className="mt-1 flex-shrink-0" /> <span>Rökning och fester är inte tillåtna</span></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Säkerhet & egendom</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start gap-2"><Sparkles size={16} className="mt-1 flex-shrink-0" /> <span>Kolmonoxidvarnare finns inte i fastigheten</span></li>
            <li className="flex items-start gap-2"><Sparkles size={16} className="mt-1 flex-shrink-0" /> <span>Brandvarnare finns i fastigheten</span></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Avbokningspolicy</h3>
          <p className="text-sm text-gray-600">Avboka före 14:00 den 10 juni för full återbetalning. Efter det, avboka före 14:00 den 14 juni för 50% återbetalning, minus serviceavgiften.</p>
        </div>
      </div>
    </div>
  )
}

export default HouseRules;
