
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
              <li><a href="#" className="hover:text-foreground transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Safety information</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Cancellation options</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Report a concern</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Community</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Oceanbnb.org</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Disaster relief housing</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Support Afghan refugees</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Combating discrimination</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Hosting</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Try hosting</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Oceancover for Hosts</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Explore hosting resources</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Visit our community forum</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">About</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Newsroom</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Learn about new features</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Letter from our founders</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Careers</a></li>
            </ul>
          </div>
        </div>
        
        <Separator className="my-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <span>© 2024 Oceanbnb, Inc.</span>
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            <a href="#" className="hover:text-foreground transition-colors">Sitemap</a>
          </div>
          
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">English (US)</a>
            <a href="#" className="hover:text-foreground transition-colors">$ USD</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
