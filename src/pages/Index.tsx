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

const Index = () => {
  const [property, setProperty] = useState<Property | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchProperty();
  }, []);

  const fetchProperty = async () => {
    try {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('is_active', true)
        .limit(1)
        .single();

      if (error) throw error;
      setProperty(data);
    } catch (error) {
      console.error('Error fetching property:', error);
      // Fallback to default data if no properties in database
      setProperty({
        id: 'default',
        title: 'Lyxig villa i Marbella',
        description: 'En fantastisk villa med havsutsikt i hjärtat av Marbella. Perfekt för familjer och grupper som vill njuta av Costa del Sol. Denna vackra villa erbjuder alla bekvämligheter du behöver för en minnesvärd semester.',
        location: 'Marbella, Spanien',
        price_per_night: 350,
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

    // For now, just show a toast. In a real app, you'd collect guest details
    const nights = Math.ceil((dates.checkOut.getTime() - dates.checkIn.getTime()) / (1000 * 60 * 60 * 24));
    const totalPrice = nights * property.price_per_night + 750 + Math.round(nights * property.price_per_night * 0.14);

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

  const reviews = [
    {
      id: '1',
      author: 'Anna',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b9c7e7ce?auto=format&fit=crop&w=150&h=150&face',
      rating: 5,
      date: '2024-01-15',
      comment: 'Fantastisk villa med enastående utsikt! Carlos var en underbar värd och allt var precis som beskrevet. Vi kommer definitivt tillbaka!'
    },
    {
      id: '2', 
      author: 'Erik',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&face',
      rating: 5,
      date: '2024-01-20',
      comment: 'Perfekt läge och otroligt ren villa. Poolen var ett stort plus för barnen. Rekommenderar starkt!'
    },
    {
      id: '3',
      author: 'Maria', 
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&h=150&face',
      rating: 5,
      date: '2024-02-01',
      comment: 'Bästa semesterupplevelsen vi haft! Villan överträffade alla förväntningar.'
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
