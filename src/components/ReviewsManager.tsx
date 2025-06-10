
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Trash2, Plus, Edit } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Review {
  id: string;
  userName: string;
  userAvatar: string;
  rating: number;
  date: string;
  text: string;
}

const ReviewsManager = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Load initial reviews (this would typically come from database)
    setReviews([
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
    ]);
  }, []);

  const handleSaveReview = (reviewData: Omit<Review, 'id'>) => {
    if (editingReview) {
      setReviews(reviews.map(review => 
        review.id === editingReview.id 
          ? { ...reviewData, id: editingReview.id }
          : review
      ));
      setEditingReview(null);
      toast({
        title: "Uppdaterad",
        description: "Recensionen har uppdaterats.",
      });
    } else {
      const newReview = {
        ...reviewData,
        id: Date.now().toString()
      };
      setReviews([...reviews, newReview]);
      setShowAddForm(false);
      toast({
        title: "Tillagd",
        description: "Ny recension har lagts till.",
      });
    }
  };

  const handleDeleteReview = (id: string) => {
    if (confirm('Är du säker på att du vill ta bort denna recension?')) {
      setReviews(reviews.filter(review => review.id !== id));
      toast({
        title: "Borttagen",
        description: "Recensionen har tagits bort.",
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Recensionshantering</CardTitle>
            <Button onClick={() => setShowAddForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Lägg till recension
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center space-x-3">
                    <img 
                      src={review.userAvatar} 
                      alt={review.userName}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <h4 className="font-medium">{review.userName}</h4>
                      <div className="flex items-center space-x-1">
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <span key={i} className="text-yellow-400">★</span>
                        ))}
                        <span className="text-sm text-gray-500 ml-2">{review.date}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setEditingReview(review)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDeleteReview(review.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <p className="text-gray-700">{review.text}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {(showAddForm || editingReview) && (
        <ReviewForm
          review={editingReview}
          onSave={handleSaveReview}
          onCancel={() => {
            setShowAddForm(false);
            setEditingReview(null);
          }}
        />
      )}
    </div>
  );
};

interface ReviewFormProps {
  review?: Review | null;
  onSave: (review: Omit<Review, 'id'>) => void;
  onCancel: () => void;
}

const ReviewForm = ({ review, onSave, onCancel }: ReviewFormProps) => {
  const [formData, setFormData] = useState({
    userName: review?.userName || '',
    userAvatar: review?.userAvatar || '',
    rating: review?.rating || 5,
    date: review?.date || new Date().toISOString().split('T')[0],
    text: review?.text || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{review ? 'Redigera recension' : 'Lägg till recension'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="userName">Användarnamn</Label>
            <Input
              id="userName"
              value={formData.userName}
              onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="userAvatar">Avatar URL</Label>
            <Input
              id="userAvatar"
              value={formData.userAvatar}
              onChange={(e) => setFormData({ ...formData, userAvatar: e.target.value })}
              placeholder="https://..."
              required
            />
          </div>
          
          <div>
            <Label htmlFor="rating">Betyg (1-5)</Label>
            <Input
              id="rating"
              type="number"
              min="1"
              max="5"
              value={formData.rating}
              onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="date">Datum</Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="text">Recensionstext</Label>
            <Textarea
              id="text"
              value={formData.text}
              onChange={(e) => setFormData({ ...formData, text: e.target.value })}
              rows={4}
              required
            />
          </div>
          
          <div className="flex space-x-2">
            <Button type="submit">
              {review ? 'Uppdatera' : 'Lägg till'}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Avbryt
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ReviewsManager;
