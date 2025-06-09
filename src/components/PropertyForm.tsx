
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Property {
  id: string;
  title: string;
  description?: string;
  location: string;
  price_per_night: number;
  max_guests: number;
  bedrooms: number;
  bathrooms: number;
  amenities?: string[];
  images?: string[];
  is_active: boolean;
}

interface PropertyFormProps {
  property?: Property | null;
  onSave: () => void;
  onCancel: () => void;
}

const PropertyForm = ({ property, onSave, onCancel }: PropertyFormProps) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    price_per_night: '',
    max_guests: '',
    bedrooms: '',
    bathrooms: '',
    amenities: '',
    images: '',
    is_active: true,
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (property) {
      setFormData({
        title: property.title || '',
        description: property.description || '',
        location: property.location || '',
        price_per_night: property.price_per_night?.toString() || '',
        max_guests: property.max_guests?.toString() || '',
        bedrooms: property.bedrooms?.toString() || '',
        bathrooms: property.bathrooms?.toString() || '',
        amenities: property.amenities?.join(', ') || '',
        images: property.images?.join(', ') || '',
        is_active: property.is_active,
      });
    }
  }, [property]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const amenitiesArray = formData.amenities
        .split(',')
        .map(item => item.trim())
        .filter(item => item);

      const imagesArray = formData.images
        .split(',')
        .map(item => item.trim())
        .filter(item => item);

      const propertyData = {
        title: formData.title,
        description: formData.description,
        location: formData.location,
        price_per_night: parseFloat(formData.price_per_night),
        max_guests: parseInt(formData.max_guests),
        bedrooms: parseInt(formData.bedrooms),
        bathrooms: parseInt(formData.bathrooms),
        amenities: amenitiesArray,
        images: imagesArray,
        is_active: formData.is_active,
      };

      let error;
      if (property) {
        ({ error } = await supabase
          .from('properties')
          .update(propertyData)
          .eq('id', property.id));
      } else {
        ({ error } = await supabase
          .from('properties')
          .insert([propertyData]));
      }

      if (error) throw error;

      toast({
        title: "Sparad",
        description: `Fastigheten har ${property ? 'uppdaterats' : 'skapats'}.`,
      });
      onSave();
    } catch (error) {
      toast({
        title: "Fel",
        description: "Kunde inte spara fastigheten.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {property ? 'Redigera fastighet' : 'Ny fastighet'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Titel</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="location">Plats</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="price">Pris per natt (kr)</Label>
              <Input
                id="price"
                type="number"
                value={formData.price_per_night}
                onChange={(e) => setFormData({ ...formData, price_per_night: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="guests">Max gäster</Label>
              <Input
                id="guests"
                type="number"
                value={formData.max_guests}
                onChange={(e) => setFormData({ ...formData, max_guests: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="bedrooms">Sovrum</Label>
              <Input
                id="bedrooms"
                type="number"
                value={formData.bedrooms}
                onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="bathrooms">Badrum</Label>
              <Input
                id="bathrooms"
                type="number"
                value={formData.bathrooms}
                onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description">Beskrivning</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="amenities">Bekvämligheter (separera med komma)</Label>
            <Textarea
              id="amenities"
              value={formData.amenities}
              onChange={(e) => setFormData({ ...formData, amenities: e.target.value })}
              placeholder="WiFi, Pool, Kök, Parkering"
              rows={2}
            />
          </div>

          <div>
            <Label htmlFor="images">Bilder (separera URL:er med komma)</Label>
            <Textarea
              id="images"
              value={formData.images}
              onChange={(e) => setFormData({ ...formData, images: e.target.value })}
              placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
              rows={2}
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="active"
              checked={formData.is_active}
              onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
            />
            <Label htmlFor="active">Aktiv fastighet</Label>
          </div>

          <div className="flex space-x-4">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Sparar...' : 'Spara'}
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

export default PropertyForm;
