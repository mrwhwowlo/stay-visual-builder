
import React from 'react';
import { Separator } from '@/components/ui/separator';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-[1760px] mx-auto px-6 lg:px-20 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold mb-4 text-gray-900">Support</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><a href="#" className="hover:text-gray-900 transition-colors">Hjälpcenter</a></li>
              <li><a href="#" className="hover:text-gray-900 transition-colors">Säkerhetsinformation</a></li>
              <li><a href="#" className="hover:text-gray-900 transition-colors">Avbokningsalternativ</a></li>
              <li><a href="#" className="hover:text-gray-900 transition-colors">Rapportera ett problem</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-gray-900">Gemenskap</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><a href="#" className="hover:text-gray-900 transition-colors">Airbnb.org</a></li>
              <li><a href="#" className="hover:text-gray-900 transition-colors">Katastrofhjälp</a></li>
              <li><a href="#" className="hover:text-gray-900 transition-colors">Stöd afghanska flyktingar</a></li>
              <li><a href="#" className="hover:text-gray-900 transition-colors">Bekämpa diskriminering</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-gray-900">Värdskap</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><a href="#" className="hover:text-gray-900 transition-colors">Prova att vara värd</a></li>
              <li><a href="#" className="hover:text-gray-900 transition-colors">AirCover för värdar</a></li>
              <li><a href="#" className="hover:text-gray-900 transition-colors">Utforska värdresurser</a></li>
              <li><a href="#" className="hover:text-gray-900 transition-colors">Besök vårt community-forum</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-gray-900">Airbnb</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><a href="#" className="hover:text-gray-900 transition-colors">Nyheter</a></li>
              <li><a href="#" className="hover:text-gray-900 transition-colors">Nya funktioner</a></li>
              <li><a href="#" className="hover:text-gray-900 transition-colors">Karriär</a></li>
              <li><a href="#" className="hover:text-gray-900 transition-colors">Investerare</a></li>
            </ul>
          </div>
        </div>
        
        <Separator className="my-8 bg-gray-200" />
        
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-sm text-gray-600">
          <div className="flex items-center space-x-4">
            <span>© 2024 Airbnb, Inc.</span>
            <a href="#" className="hover:text-gray-900 transition-colors">Integritet</a>
            <a href="#" className="hover:text-gray-900 transition-colors">Villkor</a>
            <a href="#" className="hover:text-gray-900 transition-colors">Webbplatskarta</a>
          </div>
          
          <div className="flex items-center space-x-4">
            <a href="#" className="hover:text-gray-900 transition-colors">Svenska (SE)</a>
            <a href="#" className="hover:text-gray-900 transition-colors">SEK</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
