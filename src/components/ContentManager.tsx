import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface SiteContent {
  id: string;
  key: string;
  content: string;
  content_type: string;
}

const ContentManager = () => {
  const [content, setContent] = useState<SiteContent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const { data, error } = await supabase
        .from('site_content')
        .select('*')
        .order('key');

      if (error) throw error;
      let siteContent = data || [];
      // If google_maps_embed does not exist, add a blank entry for editing.
      if (!siteContent.some(c => c.key === 'google_maps_embed')) {
        siteContent.push({
          id: `temp-google-maps-embed`,
          key: 'google_maps_embed',
          content: '',
          content_type: 'text',
        });
      }
      setContent(siteContent);
    } catch (error) {
      console.error('Error fetching content:', error);
      toast({
        title: "Fel",
        description: "Kunde inte hämta innehåll.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateContent = async (id: string, newContent: string, key?: string) => {
    let targetKey = key;
    if (!id.startsWith('temp') && !key) {
      const item = content.find((c) => c.id === id);
      if (item) targetKey = item.key;
    }
    try {
      if (id.startsWith('temp') && targetKey) {
        // Insert new key (google_maps_embed)
        const { error } = await supabase
          .from('site_content')
          .insert([
            {
              key: targetKey,
              content: newContent,
              content_type: 'text',
            },
          ]);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('site_content')
          .update({ content: newContent, updated_at: new Date().toISOString() })
          .eq('id', id);

        if (error) throw error;
      }

      fetchContent();
      toast({
        title: "Uppdaterat",
        description: "Innehållet har uppdaterats.",
      });
    } catch (error) {
      console.error('Error updating content:', error);
      toast({
        title: "Fel",
        description: "Kunde inte uppdatera innehållet.",
        variant: "destructive",
      });
    }
  };

  const handleContentChange = (id: string, value: string) => {
    setContent(content.map(item =>
      item.id === id ? { ...item, content: value } : item
    ));
  };

  const getContentLabel = (key: string) => {
    const labels: { [key: string]: string } = {
      'site_title': 'Sidans titel',
      'site_description': 'Beskrivning',
      'site_location': 'Plats',
      'booking_fee': 'Bokningsavgift (kr)',
      'service_fee_percent': 'Serviceavgift (%)',
      'google_maps_embed': 'Google Maps Embed (iframe src)',
    };
    return labels[key] || key;
  };

  if (isLoading) {
    return <div className="p-6">Laddar innehåll...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Innehållshantering</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {content.map((item) => (
          <div key={item.id} className="space-y-2">
            <Label htmlFor={item.key}>{getContentLabel(item.key)}</Label>
            <Input
              id={item.key}
              type={item.key === 'google_maps_embed' ? 'text' : (item.content_type === 'number' ? 'number' : 'text')}
              placeholder={item.key === 'google_maps_embed' ? "Klistra in hela Google Maps iframe 'src'" : ''}
              value={item.content}
              onChange={(e) => handleContentChange(item.id, e.target.value)}
            />
            <Button
              onClick={() => updateContent(item.id, item.content, item.key)}
              size="sm"
            >
              Uppdatera
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default ContentManager;
