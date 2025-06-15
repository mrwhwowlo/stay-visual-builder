import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import ImageCarousel from '@/components/ImageCarousel';
import ListingInfo from '@/components/ListingInfo';
import Description from '@/components/Description';
import AmenitiesGrid from '@/components/AmenitiesGrid';
import BookingCard from '@/components/BookingCard';
import ReviewsCarousel from '@/components/ReviewsCarousel';
import Footer from '@/components/Footer';
import { supabase } from '@/integrations/supabase/client';
import WhereYoullSleep from '@/components/WhereYoullSleep';
import LocationMap from '@/components/LocationMap';
import HostProfile from '@/components/HostProfile';
import HouseRules from '@/components/HouseRules';

interface SiteContent {
  site_title: string;
  site_description: string;
  site_location: string;
  booking_fee: string;
  service_fee_percent: string;
}

const Index = () => {
  const [siteContent, setSiteContent] = useState<SiteContent | null>(null);
  const navigate = useNavigate();

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

      // Ensure all required properties exist with proper type safety
      const siteContentData: SiteContent = {
        site_title: contentMap.site_title || '',
        site_description: contentMap.site_description || '',
        site_location: contentMap.site_location || '',
        booking_fee: contentMap.booking_fee || '',
        service_fee_percent: contentMap.service_fee_percent || ''
      };

      setSiteContent(siteContentData);
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
    { name: 'Pool', icon: '🏊' },
    { name: 'WiFi', icon: '📶' },
    { name: 'Kök', icon: '🍳' },
    { name: 'Parkering', icon: '🚗' },
    { name: 'Luftkonditionering', icon: '❄️' },
    { name: 'Terrass', icon: '🌿' },
    { name: 'Havsutsikt', icon: '🌊' },
    { name: 'Grillplats', icon: '🔥' }
  ];

  const reviews = [
    {
      id: '1',
      userName: 'Anna Svensson',
      userAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
      rating: 5,
      text: 'Fantastisk villa med otrolig utsikt! Perfekt för vår familjesemester.',
      date: '2024-03-15'
    },
    {
      id: '2', 
      userName: 'Erik Johansson',
      userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
      rating: 5,
      text: 'Bästa stället vi någonsin bott på. Kommer definitivt tillbaka!',
      date: '2024-03-10'
    }
  ];

  const bedrooms = [
    { name: 'Sovrum 1', bedType: '1 dubbelsäng' },
    { name: 'Sovrum 2', bedType: '1 dubbelsäng' },
    { name: 'Vardagsrum', bedType: '1 bäddsoffa' },
  ];

  const host = {
    name: 'Andreas',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
    isSuperhost: true,
    joinedDate: '2017',
    reviews: 253,
    rating: 5.0,
  };

  const handleReservation = (dates: { checkIn: Date; checkOut: Date }, guests: number) => {
    navigate('/booking', {
      state: {
        checkIn: dates.checkIn.toISOString(),
        checkOut: dates.checkOut.toISOString(),
        guests: guests,
        price: 2500,
        title: content.site_title,
        image: images[0],
        rating: 4.9,
        reviewCount: 127,
        cleaningFee: Number(content.booking_fee) || 750,
        serviceFeePercent: Number(content.service_fee_percent) || 14
      }
    });
  };

  const handleHeaderSearch = (searchData: { checkIn: Date | undefined; checkOut: Date | undefined; guests: number }) => {
    console.log('Header search:', searchData);
    // You can implement search functionality here if needed
    // For now, it just logs the search data
  };

  return (
    <div className="min-h-screen bg-white">
      <Header 
        listingLocation={content.site_location}
        onSearch={handleHeaderSearch}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-12 gap-y-12">
          <div className="lg:col-span-2 space-y-10">
            <ImageCarousel images={images} />
            
            <ListingInfo 
              title={content.site_title}
              location={content.site_location}
              rating={4.9}
              reviewCount={127}
              host={host}
            />
            
            <hr className="border-gray-200" />
            
            <Description text={content.site_description} />

            <hr className="border-gray-200" />
            
            <WhereYoullSleep bedrooms={bedrooms} />
            
            <hr className="border-gray-200" />
            
            <AmenitiesGrid amenities={amenities} />
            
            <hr className="border-gray-200" />
            
            <ReviewsCarousel reviews={reviews} />

            <hr className="border-gray-200" />

            <LocationMap locationName={content.site_location} />

            <hr className="border-gray-200" />

            <HostProfile host={host} />
            
            <hr className="border-gray-200" />

            <HouseRules />
          </div>
          
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <BookingCard 
                price={2500}
                rating={4.9}
                reviewCount={127}
                onReserve={handleReservation}
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
