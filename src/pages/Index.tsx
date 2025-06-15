
import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import ImageCarousel from '@/components/ImageCarousel';
import ListingInfo from '@/components/ListingInfo';
import Description from '@/components/Description';
import AmenitiesGrid from '@/components/AmenitiesGrid';
import BookingCard from '@/components/BookingCard';
import ReviewsCarousel from '@/components/ReviewsCarousel';
import Footer from '@/components/Footer';
import { supabase } from '@/integrations/supabase/client';

interface SiteContent {
  site_title: string;
  site_description: string;
  site_location: string;
  booking_fee: string;
  service_fee_percent: string;
}

const Index = () => {
  const [siteContent, setSiteContent] = useState<SiteContent | null>(null);

  useEffect(() => {
    fetchSiteContent();
    trackPageView();
  }, []);

  const fetchSiteContent = async () => {
    try {
      const { data, error } = await supabase
        .from('site_content')
        .select('key, content');

      if (error) throw error;

      const contentMap = data.reduce((acc, item) => {
        acc[item.key] = item.content;
        return acc;
      }, {} as Record<string, string>);

      setSiteContent(contentMap as SiteContent);
    } catch (error) {
      console.error('Error fetching site content:', error);
    }
  };

  const trackPageView = async () => {
    try {
      await supabase
        .from('user_activity')
        .insert({
          activity_type: 'page_view',
          details: { page: '/', timestamp: new Date().toISOString() }
        });
    } catch (error) {
      console.error('Error tracking page view:', error);
    }
  };

  const defaultContent = {
    site_title: 'Lyxig villa i Marbella',
    site_description: 'En fantastisk villa med havsutsikt i hjärtat av Marbella. Perfekt för familjer och grupper som vill njuta av Costa del Sol. Denna vackra villa erbjuder alla bekvämligheter du behöver för en minnesvärd semester.',
    site_location: 'Marbella, Spanien',
    booking_fee: '750',
    service_fee_percent: '14'
  };

  const content = siteContent || defaultContent;

  const images = [
    "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=2000&h=1200",
    "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=2000&h=1200",
    "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=2000&h=1200",
    "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=2000&h=1200",
    "https://images.unsplash.com/photo-1631049421450-348db85ed7cd?auto=format&fit=crop&w=2000&h=1200"
  ];

  const amenities = [
    'Pool',
    'WiFi',
    'Kök',
    'Parkering',
    'Luftkonditionering',
    'Terrass',
    'Havsutsikt',
    'Grillplats'
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <ImageCarousel images={images} />
            
            <ListingInfo 
              title={content.site_title}
              location={content.site_location}
              guests={8}
              bedrooms={4}
              bathrooms={3}
              rating={4.9}
              reviewCount={127}
            />
            
            <Description text={content.site_description} />
            
            <AmenitiesGrid amenities={amenities} />
            
            <ReviewsCarousel />
          </div>
          
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <BookingCard 
                pricePerNight={2500}
                serviceFeePercent={parseInt(content.service_fee_percent)}
                bookingFee={parseInt(content.booking_fee)}
              />
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;
