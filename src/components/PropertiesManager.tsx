
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2 } from 'lucide-react';
import PropertyForm from './PropertyForm';

interface Property {
  id: string;
  title: string;
  location: string;
  price_per_night: number;
  max_guests: number;
  bedrooms: number;
  bathrooms: number;
  is_active: boolean;
  created_at: string;
}

const PropertiesManager = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProperties(data || []);
    } catch (error) {
      toast({
        title: "Fel",
        description: "Kunde inte hämta fastigheter.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const deleteProperty = async (id: string) => {
    if (!confirm('Är du säker på att du vill ta bort denna fastighet?')) return;

    try {
      const { error } = await supabase
        .from('properties')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Raderad",
        description: "Fastigheten har tagits bort.",
      });
      fetchProperties();
    } catch (error) {
      toast({
        title: "Fel",
        description: "Kunde inte ta bort fastigheten.",
        variant: "destructive",
      });
    }
  };

  const toggleStatus = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('properties')
        .update({ is_active: !currentStatus })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Uppdaterad",
        description: "Fastighetsstatus har ändrats.",
      });
      fetchProperties();
    } catch (error) {
      toast({
        title: "Fel",
        description: "Kunde inte uppdatera fastigheten.",
        variant: "destructive",
      });
    }
  };

  if (showForm) {
    return (
      <PropertyForm
        property={editingProperty}
        onSave={() => {
          setShowForm(false);
          setEditingProperty(null);
          fetchProperties();
        }}
        onCancel={() => {
          setShowForm(false);
          setEditingProperty(null);
        }}
      />
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Fastighetshantering</CardTitle>
          <Button onClick={() => setShowForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Lägg till fastighet
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="text-center py-8">Laddar...</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Titel</TableHead>
                <TableHead>Plats</TableHead>
                <TableHead>Pris/natt</TableHead>
                <TableHead>Gäster</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Åtgärder</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {properties.map((property) => (
                <TableRow key={property.id}>
                  <TableCell className="font-medium">{property.title}</TableCell>
                  <TableCell>{property.location}</TableCell>
                  <TableCell>{property.price_per_night} kr</TableCell>
                  <TableCell>{property.max_guests}</TableCell>
                  <TableCell>
                    <Badge
                      variant={property.is_active ? "default" : "secondary"}
                      className="cursor-pointer"
                      onClick={() => toggleStatus(property.id, property.is_active)}
                    >
                      {property.is_active ? 'Aktiv' : 'Inaktiv'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setEditingProperty(property);
                          setShowForm(true);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => deleteProperty(property.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default PropertiesManager;
