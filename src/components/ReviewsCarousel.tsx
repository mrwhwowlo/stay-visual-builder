
import React from 'react';
import { Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface Review {
  id: string;
  userName: string;
  userAvatar: string;
  date: string;
  text: string;
  rating: number;
}

interface ReviewsCarouselProps {
  reviews: Review[];
}

const ReviewsCarousel = ({ reviews }: ReviewsCarouselProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">What guests are saying</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reviews.map((review) => (
          <Card key={review.id} className="border-border">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <img 
                  src={review.userAvatar} 
                  alt={review.userName}
                  className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                />
                <div className="space-y-2 flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">{review.userName}</h4>
                      <p className="text-sm text-muted-foreground">{review.date}</p>
                    </div>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i}
                          className={`h-4 w-4 ${i < review.rating ? 'fill-current text-yellow-500' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{review.text}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ReviewsCarousel;
