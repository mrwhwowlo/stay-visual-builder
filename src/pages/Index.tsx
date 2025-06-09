
import React from 'react';
import Header from '../components/Header';
import ImageCarousel from '../components/ImageCarousel';
import ListingInfo from '../components/ListingInfo';
import BookingCard from '../components/BookingCard';
import Description from '../components/Description';
import AmenitiesGrid from '../components/AmenitiesGrid';
import ReviewsCarousel from '../components/ReviewsCarousel';
import Footer from '../components/Footer';

const Index = () => {
  const listingData = {
    id: '1',
    title: 'Fantastisk havsutsikt villa med privat pool',
    location: 'Marbella, Spanien',
    rating: 4.95,
    reviewCount: 128,
    price: 4950,
    images: [
      'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1501183638710-841dd1904471?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop'
    ],
    host: {
      name: 'Andreas',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
      isSuperhost: true,
      joinedDate: 'mars 2018'
    },
    description: 'Fly till denna fantastiska havsnära villa där lyx möter lugn. Vakna till panoramautsikt över Medelhavet, koppla av vid din privata infinitypool och upplev den ultimata kustretreaten. Detta noggrant designade hem har fönster från golv till tak, förstklassig inredning och alla bekvämligheter du behöver för en oförglömlig vistelse.',
    amenities: [
      { icon: '🏊‍♂️', name: 'Privat pool' },
      { icon: '🌊', name: 'Havsutsikt' },
      { icon: '🍳', name: 'Fullt utrustat kök' },
      { icon: '📶', name: 'Snabbt wifi' },
      { icon: '🅿️', name: 'Gratis parkering' },
      { icon: '❄️', name: 'Luftkonditionering' },
      { icon: '🔥', name: 'Öppen spis' },
      { icon: '🧺', name: 'Tvättmaskin och torktumlare' }
    ],
    reviews: [
      {
        id: '1',
        userName: 'Marcus',
        userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
        date: 'november 2024',
        text: 'Helt fantastisk boende! Havsutsikten var ännu bättre än bilderna. Andreas var en otrolig värd och huset hade allt vi behövde.',
        rating: 5
      },
      {
        id: '2',
        userName: 'Emma',
        userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
        date: 'oktober 2024',
        text: 'Perfekt semesterplats! Den privata poolen var fantastisk och köket var fullt utrustat. Kommer definitivt att boka igen.',
        rating: 5
      },
      {
        id: '3',
        userName: 'David',
        userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face',
        date: 'september 2024',
        text: 'Otroligt läge och vackert hem. Solnedgångarna från terrassen är oförglömliga. Rekommenderar starkt!',
        rating: 5
      }
    ],
    mapCoordinates: { lat: 36.5108, lng: -4.8839 }
  };

  const handleReservation = (dates: { checkIn: Date; checkOut: Date }, guests: number) => {
    console.log('Bokning begärd:', { dates, guests, listingId: listingData.id });
    // Navigate to reservation page in a real app
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="max-w-[1760px] mx-auto px-6 lg:px-20 pt-24 pb-16">
        {/* Image Gallery */}
        <ImageCarousel images={listingData.images} />
        
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Left Column - Property Info */}
          <div className="lg:col-span-2 space-y-12">
            <ListingInfo 
              title={listingData.title}
              location={listingData.location}
              rating={listingData.rating}
              reviewCount={listingData.reviewCount}
              host={listingData.host}
            />
            
            <Description text={listingData.description} />
            
            <AmenitiesGrid amenities={listingData.amenities} />
            
            <ReviewsCarousel reviews={listingData.reviews} />
          </div>
          
          {/* Right Column - Booking Card */}
          <div className="lg:col-span-1">
            <BookingCard 
              price={listingData.price}
              rating={listingData.rating}
              reviewCount={listingData.reviewCount}
              onReserve={handleReservation}
            />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
