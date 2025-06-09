
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ImageCarouselProps {
  images: string[];
}

const ImageCarousel = ({ images }: ImageCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const previousImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative mb-8">
      {/* Main Image */}
      <div className="aspect-[16/9] md:aspect-[4/3] rounded-xl overflow-hidden relative group">
        <img 
          src={images[currentIndex]} 
          alt={`Property view ${currentIndex + 1}`}
          className="w-full h-full object-cover"
        />
        
        {/* Heart/Save Button */}
        <Button 
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 bg-white/90 hover:bg-white rounded-full shadow-sm"
        >
          <Heart className="h-5 w-5 text-gray-700" />
        </Button>
        
        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <Button 
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 hover:bg-white rounded-full shadow-sm"
              onClick={previousImage}
            >
              <ChevronLeft className="h-5 w-5 text-gray-700" />
            </Button>
            
            <Button 
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 hover:bg-white rounded-full shadow-sm"
              onClick={nextImage}
            >
              <ChevronRight className="h-5 w-5 text-gray-700" />
            </Button>
          </>
        )}
        
        {/* Dots Indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageCarousel;
