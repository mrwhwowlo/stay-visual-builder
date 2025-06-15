import React from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import PropertiesManagerEnhanced from './PropertiesManagerEnhanced';
import BookingsManager from './BookingsManager';
import ContentManager from './ContentManager';
import ReviewsManager from './ReviewsManager';
import StatisticsOverview from './StatisticsOverview';
import ContactMessagesAdmin from "./ContactMessagesAdmin";

interface AdminDashboardEnhancedProps {
  onLogout: () => void;
}

const AdminDashboardEnhanced = ({ onLogout }: AdminDashboardEnhancedProps) => {
  const { toast } = useToast();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Utloggad",
      description: "Du har loggats ut från administratörspanelen.",
    });
    onLogout();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Administratörspanel</h1>
              <p className="text-sm text-gray-600 mt-1">Hantera fastigheter, bokningar och innehåll</p>
            </div>
            <Button onClick={handleLogout} variant="outline">
              Logga ut
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Tabs defaultValue="statistics" className="space-y-6">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="statistics">Statistik</TabsTrigger>
            <TabsTrigger value="properties">Fastigheter</TabsTrigger>
            <TabsTrigger value="bookings">Bokningar</TabsTrigger>
            <TabsTrigger value="reviews">Recensioner</TabsTrigger>
            <TabsTrigger value="content">Innehåll</TabsTrigger>
            <TabsTrigger value="contact-messages">Kontakt</TabsTrigger>
          </TabsList>

          <TabsContent value="statistics">
            <StatisticsOverview />
          </TabsContent>

          <TabsContent value="properties">
            <PropertiesManagerEnhanced />
          </TabsContent>

          <TabsContent value="bookings">
            <BookingsManager />
          </TabsContent>

          <TabsContent value="reviews">
            <ReviewsManager />
          </TabsContent>

          <TabsContent value="content">
            <ContentManager />
          </TabsContent>

          <TabsContent value="contact-messages">
            <ContactMessagesAdmin />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboardEnhanced;
