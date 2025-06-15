
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import AvailabilityCalendar from './AvailabilityCalendar';

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
  slug?: string;
  host_name?: string;
  host_avatar?: string;
  host_is_superhost?: boolean;
  host_joined_year?: string;
  latitude?: number;
  longitude?: number;
}

interface PropertyFormEnhancedProps {
  property?: Property | null;
  onSave: () => void;
  onCancel: () => void;
}

const PropertyFormEnhanced = ({ property, onSave, onCancel }: PropertyFormEnhancedProps) => {
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
    host_name: 'Andreas',
    host_avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
    host_is_superhost: true,
    host_joined_year: '2017',
    latitude: '',
    longitude: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [generatedSlug, setGeneratedSlug] = useState('');
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
        host_name: property.host_name || 'Andreas',
        host_avatar: property.host_avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
        host_is_superhost: property.host_is_superhost || true,
        host_joined_year: property.host_joined_year || '2017',
        latitude: property.latitude?.toString() || '',
        longitude: property.longitude?.toString() || '',
      });
      setGeneratedSlug(property.slug || '');
    }
  }, [property]);

  useEffect(() => {
    if (formData.title && !property) {
      generateSlug(formData.title);
    }
  }, [formData.title, property]);

  const generateSlug = async (title: string) => {
    try {
      const { data, error } = await supabase.rpc('generate_property_slug', { title });
      if (error) throw error;
      setGeneratedSlug(data);
    } catch (error) {
      console.error('Error generating slug:', error);
    }
  };

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
        host_name: formData.host_name,
        host_avatar: formData.host_avatar,
        host_is_superhost: formData.host_is_superhost,
        host_joined_year: formData.host_joined_year,
        latitude: formData.latitude ? parseFloat(formData.latitude) : null,
        longitude: formData.longitude ? parseFloat(formData.longitude) : null,
        slug: property ? property.slug : generatedSlug,
      };

      let error;
      let propertyId = property?.id;

      if (property) {
        ({ error } = await supabase
          .from('properties')
          .update(propertyData)
          .eq('id', property.id));
      } else {
        const { data, error: insertError } = await supabase
          .from('properties')
          .insert([propertyData])
          .select()
          .single();
        
        error = insertError;
        if (data) propertyId = data.id;
      }

      if (error) throw error;

      // Update property statistics
      if (propertyId) {
        await supabase.rpc('update_property_statistics', { property_uuid: propertyId });
      }

      toast({
        title: "Sparad",
        description: `Fastigheten har ${property ? 'uppdaterats' : 'skapats'}. ${!property ? `URL: /${generatedSlug}` : ''}`,
      });
      onSave();
    } catch (error) {
      console.error('Error saving property:', error);
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
          {generatedSlug && (
            <div className="text-sm font-normal text-gray-600 mt-1">
              URL: /{generatedSlug}
            </div>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="basic" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="basic">Grundinfo</TabsTrigger>
            <TabsTrigger value="details">Detaljer</TabsTrigger>
            <TabsTrigger value="host">Värd</TabsTrigger>
            {property && <TabsTrigger value="calendar">Kalender</TabsTrigger>}
          </TabsList>

          <form onSubmit={handleSubmit}>
            <TabsContent value="basic" className="space-y-4">
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

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="active"
                  checked={formData.is_active}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                />
                <Label htmlFor="active">Aktiv fastighet</Label>
              </div>
            </TabsContent>

            <TabsContent value="details" className="space-y-4">
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
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="latitude">Latitud</Label>
                  <Input
                    id="latitude"
                    type="number"
                    step="any"
                    value={formData.latitude}
                    onChange={(e) => setFormData({ ...formData, latitude: e.target.value })}
                    placeholder="36.5108"
                  />
                </div>
                <div>
                  <Label htmlFor="longitude">Longitud</Label>
                  <Input
                    id="longitude"
                    type="number"
                    step="any"
                    value={formData.longitude}
                    onChange={(e) => setFormData({ ...formData, longitude: e.target.value })}
                    placeholder="-4.8817"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="host" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="host_name">Värdnamn</Label>
                  <Input
                    id="host_name"
                    value={formData.host_name}
                    onChange={(e) => setFormData({ ...formData, host_name: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="host_joined_year">Medlem sedan år</Label>
                  <Input
                    id="host_joined_year"
                    value={formData.host_joined_year}
                    onChange={(e) => setFormData({ ...formData, host_joined_year: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="host_avatar">Värd avatar URL</Label>
                <Input
                  id="host_avatar"
                  value={formData.host_avatar}
                  onChange={(e) => setFormData({ ...formData, host_avatar: e.target.value })}
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="superhost"
                  checked={formData.host_is_superhost}
                  onChange={(e) => setFormData({ ...formData, host_is_superhost: e.target.checked })}
                />
                <Label htmlFor="superhost">Superhost</Label>
              </div>
            </TabsContent>

            {property && (
              <TabsContent value="calendar">
                <AvailabilityCalendar 
                  propertyId={property.id}
                  basePrice={parseFloat(formData.price_per_night) || 0}
                />
              </TabsContent>
            )}

            <div className="flex space-x-4 mt-6">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Sparar...' : 'Spara'}
              </Button>
              <Button type="button" variant="outline" onClick={onCancel}>
                Avbryt
              </Button>
            </div>
          </form>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PropertyFormEnhanced;
