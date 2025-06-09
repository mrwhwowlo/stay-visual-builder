
import React from 'react';
import { Separator } from '@/components/ui/separator';

const Footer = () => {
  return (
    <footer className="bg-muted/50 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Hjälpcenter</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Säkerhetsinformation</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Avbokningsalternativ</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Rapportera ett problem</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Gemenskap</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Oceanbnb.org</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Katastrofhjälp</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Stöd afghanska flyktingar</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Bekämpa diskriminering</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Värdskap</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Prova att vara värd</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Oceancover för värdar</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Utforska värdresurser</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Besök vårt community-forum</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Om oss</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Nyheter</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Lär dig om nya funktioner</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Brev från våra grundare</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Karriär</a></li>
            </ul>
          </div>
        </div>
        
        <Separator className="my-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <span>© 2024 Oceanbnb, Inc.</span>
            <a href="#" className="hover:text-foreground transition-colors">Integritet</a>
            <a href="#" className="hover:text-foreground transition-colors">Villkor</a>
            <a href="#" className="hover:text-foreground transition-colors">Webbplatskarta</a>
          </div>
          
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Svenska (SE)</a>
            <a href="#" className="hover:text-foreground transition-colors">SEK</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
