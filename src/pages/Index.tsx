import React from 'react';
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import Header from '../components/Header';
import ImageCarousel from '../components/ImageCarousel';
import ListingInfo from '../components/ListingInfo';
import Description from '../components/Description';
import AmenitiesGrid from '../components/AmenitiesGrid';
import BookingCard from '../components/BookingCard';
import ReviewsCarousel from '../components/ReviewsCarousel';
import Footer from '../components/Footer';

interface Property {
  id: string;
  title: string;
  description: string;
  location: string;
  price_per_night: number;
  max_guests: number;
  bedrooms: number;
  bathrooms: number;
  amenities: string[];
  images: string[];
}

interface Review {
  id: string;
  userName: string;
  userAvatar: string;
  rating: number;
  date: string;
  text: string;
}

interface SiteContent {
  [key: string]: string;
}

const Index = () => {
  const [property, setProperty] = useState<Property | null>(null);
  const [siteContent, setSiteContent] = useState<SiteContent>({});
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchProperty();
    fetchSiteContent();
    trackUserActivity('page_view', { page: 'home' });
  }, []);

  const fetchSiteContent = async () => {
    try {
      const { data, error } = await supabase
        .from('site_content')
        .select('key, content');

      if (error) throw error;
      
      const contentMap: SiteContent = {};
      data?.forEach(item => {
        contentMap[item.key] = item.content;
      });
      setSiteContent(contentMap);
    } catch (error) {
      console.error('Error fetching site content:', error);
    }
  };

  const trackUserActivity = async (activityType: string, details: any) => {
    try {
      // Get user's IP and user agent (simplified for demo)
      const userAgent = navigator.userAgent;
      
      await supabase
        .from('user_activity')
        .insert([{
          activity_type: activityType,
          details: details,
          user_agent: userAgent
        }]);
    } catch (error) {
      console.error('Error tracking activity:', error);
    }
  };

  const fetchProperty = async () => {
    try {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('is_active', true)
        .limit(1)
        .single();

      if (error) throw error;
      
      // Transform the data to match our Property interface with proper type handling
      const transformedProperty: Property = {
        id: data.id,
        title: data.title,
        description: data.description || '',
        location: data.location,
        price_per_night: data.price_per_night,
        max_guests: data.max_guests,
        bedrooms: data.bedrooms,
        bathrooms: data.bathrooms,
        amenities: Array.isArray(data.amenities) ? (data.amenities as string[]) : [],
        images: Array.isArray(data.images) ? (data.images as string[]) : []
      };
      
      setProperty(transformedProperty);
    } catch (error) {
      console.error('Error fetching property:', error);
      // Use site content if available, otherwise fallback to default
      setProperty({
        id: 'default',
        title: siteContent.site_title || 'Lyxig villa i Marbella',
        description: siteContent.site_description || 'En fantastisk villa med havsutsikt i hjärtat av Marbella. Perfekt för familjer och grupper som vill njuta av Costa del Sol. Denna vackra villa erbjuder alla bekvämligheter du behöver för en minnesvärd semester.',
        location: siteContent.site_location || 'Marbella, Spanien',
        price_per_night: parseInt(siteContent.booking_fee) || 350,
        max_guests: 8,
        bedrooms: 4,
        bathrooms: 3,
        amenities: ['Pool', 'Havsutsikt', 'WiFi', 'Luftkonditionering', 'Kök', 'Parkering', 'Terrass', 'Grill'],
        images: [
          'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&h=800',
          'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&h=800',
          'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&h=800',
          'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&h=800',
          'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=1200&h=800'
        ]
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReservation = async (dates: { checkIn: Date; checkOut: Date }, guests: number) => {
    if (!property) return;

    // Track booking attempt
    await trackUserActivity('booking_attempt', {
      property_id: property.id,
      check_in: dates.checkIn.toISOString().split('T')[0],
      check_out: dates.checkOut.toISOString().split('T')[0],
      guests: guests
    });

    const nights = Math.ceil((dates.checkOut.getTime() - dates.checkIn.getTime()) / (1000 * 60 * 60 * 24));
    const bookingFee = parseInt(siteContent.booking_fee) || 750;
    const serviceFeePercent = parseInt(siteContent.service_fee_percent) || 14;
    const totalPrice = nights * property.price_per_night + bookingFee + Math.round(nights * property.price_per_night * (serviceFeePercent / 100));

    try {
      const { error } = await supabase
        .from('bookings')
        .insert([{
          property_id: property.id,
          guest_name: 'Demo Guest',
          guest_email: 'demo@example.com',
          check_in: dates.checkIn.toISOString().split('T')[0],
          check_out: dates.checkOut.toISOString().split('T')[0],
          guests: guests,
          total_price: totalPrice,
          status: 'pending'
        }]);

      if (error) throw error;

      toast({
        title: "Bokning mottagen!",
        description: `Din bokning från ${dates.checkIn.toLocaleDateString('sv-SE')} till ${dates.checkOut.toLocaleDateString('sv-SE')} har skickats för bekräftelse.`,
      });
    } catch (error) {
      toast({
        title: "Demo bokning",
        description: `Bokning från ${dates.checkIn.toLocaleDateString('sv-SE')} till ${dates.checkOut.toLocaleDateString('sv-SE')} för ${guests} gäst${guests !== 1 ? 'er' : ''}.`,
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Laddar...</div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Ingen fastighet hittades</div>
      </div>
    );
  }

  const amenities = property.amenities.map(amenity => {
    const amenityIcons: { [key: string]: string } = {
      'Pool': '🏊‍♂️',
      'Havsutsikt': '🌊',
      'WiFi': '📶',
      'Luftkonditionering': '❄️',
      'Kök': '🍳',
      'Parkering': '🚗',
      'Terrass': '🏡',
      'Grill': '🔥',
      'Tvättmaskin': '🧺',
      'Centralvärme': '🔥'
    };
    
    return {
      icon: amenityIcons[amenity] || '✨',
      name: amenity
    };
  });

  const host = {
    name: 'Carlos',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&h=150&face',
    isSuperhost: true,
    joinedDate: 'maj 2015'
  };

  const reviews: Review[] = [
    {
      id: '1',
      userName: 'Anna',
      userAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b9c7e7ce?auto=format&fit=crop&w=150&h=150&face',
      rating: 5,
      date: '2024-01-15',
      text: 'Fantastisk villa med enastående utsikt! Carlos var en underbar värd och allt var precis som beskrevet. Vi kommer definitivt tillbaka!'
    },
    {
      id: '2', 
      userName: 'Erik',
      userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&face',
      rating: 5,
      date: '2024-01-20',
      text: 'Perfekt läge och otroligt ren villa. Poolen var ett stort plus för barnen. Rekommenderar starkt!'
    },
    {
      id: '3',
      userName: 'Maria', 
      userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&h=150&face',
      rating: 5,
      date: '2024-02-01',
      text: 'Bästa semesterupplevelsen vi haft! Villan överträffade alla förväntningar.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="pt-20">
        <div className="max-w-[1760px] mx-auto px-6 lg:px-20 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              <ImageCarousel images={property.images} />
              
              <ListingInfo
                title={property.title}
                location={property.location}
                rating={4.8}
                reviewCount={127}
                host={host}
              />
              
              <Description text={property.description} />
              
              <AmenitiesGrid amenities={amenities} />
              
              <ReviewsCarousel reviews={reviews} />
            </div>
            
            {/* Booking Card */}
            <div className="lg:col-span-1">
              <BookingCard
                price={property.price_per_night}
                rating={4.8}
                reviewCount={127}
                onReserve={handleReservation}
              />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;

</initial_code>
