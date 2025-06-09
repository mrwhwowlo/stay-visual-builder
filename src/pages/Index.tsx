
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
    title: 'Stunning Ocean View Villa with Private Pool',
    location: 'Malibu, California',
    rating: 4.95,
    reviewCount: 128,
    price: 495,
    images: [
      'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1501183638710-841dd1904471?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop'
    ],
    host: {
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
      isSuperhost: true,
      joinedDate: 'March 2018'
    },
    description: 'Escape to this breathtaking oceanfront villa where luxury meets serenity. Wake up to panoramic Pacific views, unwind by your private infinity pool, and experience the ultimate coastal retreat. This meticulously designed home features floor-to-ceiling windows, premium furnishings, and every amenity you need for an unforgettable stay.',
    amenities: [
      { icon: '🏊‍♂️', name: 'Private pool' },
      { icon: '🌊', name: 'Ocean view' },
      { icon: '🍳', name: 'Full kitchen' },
      { icon: '📶', name: 'Fast wifi' },
      { icon: '🅿️', name: 'Free parking' },
      { icon: '❄️', name: 'Air conditioning' },
      { icon: '🔥', name: 'Fireplace' },
      { icon: '🧺', name: 'Washer & dryer' }
    ],
    reviews: [
      {
        id: '1',
        userName: 'Michael Chen',
        userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
        date: 'November 2024',
        text: 'Absolutely stunning property! The ocean views are even better than the photos. Sarah was an incredible host and the house had everything we needed.',
        rating: 5
      },
      {
        id: '2',
        userName: 'Emma Rodriguez',
        userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
        date: 'October 2024',
        text: 'Perfect getaway spot! The private pool was amazing and the kitchen was fully equipped. Will definitely book again.',
        rating: 5
      },
      {
        id: '3',
        userName: 'David Thompson',
        userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face',
        date: 'September 2024',
        text: 'Incredible location and beautiful home. The sunset views from the deck are unforgettable. Highly recommend!',
        rating: 5
      }
    ],
    mapCoordinates: { lat: 34.0259, lng: -118.7798 }
  };

  const handleReservation = (dates: { checkIn: Date; checkOut: Date }, guests: number) => {
    console.log('Reservation requested:', { dates, guests, listingId: listingData.id });
    // Navigate to reservation page in a real app
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        {/* Image Gallery */}
        <ImageCarousel images={listingData.images} />
        
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Left Column - Property Info */}
          <div className="lg:col-span-2 space-y-8">
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
