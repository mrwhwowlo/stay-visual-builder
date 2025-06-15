
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface UserActivity {
  id: string;
  user_id: string | null;
  activity_type: string;
  details: any;
  ip_address: string | null;
  user_agent: string | null;
  created_at: string;
}

const UserActivityManager = () => {
  const [activities, setActivities] = useState<UserActivity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchActivities();
    
    // Set up real-time subscription for new activities
    const channel = supabase
      .channel('user_activity_changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'user_activity'
        },
        (payload) => {
          const newActivity = payload.new as any;
          const typedActivity: UserActivity = {
            ...newActivity,
            ip_address: newActivity.ip_address ? String(newActivity.ip_address) : null,
            user_agent: newActivity.user_agent || null,
            user_id: newActivity.user_id || null
          };
          setActivities(prev => [typedActivity, ...prev]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchActivities = async () => {
    try {
      const { data, error } = await supabase
        .from('user_activity')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);

      if (error) throw error;
      
      // Type cast the data to match our interface
      const typedData: UserActivity[] = (data || []).map(item => ({
        ...item,
        ip_address: item.ip_address ? String(item.ip_address) : null,
        user_agent: item.user_agent || null,
        user_id: item.user_id || null
      }));
      
      setActivities(typedData);
    } catch (error) {
      console.error('Error fetching activities:', error);
      toast({
        title: "Fel",
        description: "Kunde inte hämta användaraktivitet.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getActivityBadge = (type: string) => {
    const variants: { [key: string]: 'default' | 'secondary' | 'destructive' } = {
      'page_view': 'default',
      'booking_attempt': 'secondary',
      'error': 'destructive',
    };
    
    return (
      <Badge variant={variants[type] || 'default'}>
        {type}
      </Badge>
    );
  };

  if (isLoading) {
    return <div className="p-6">Laddar användaraktivitet...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Användaraktivitet</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Aktivitet</TableHead>
              <TableHead>Användare</TableHead>
              <TableHead>IP-adress</TableHead>
              <TableHead>Detaljer</TableHead>
              <TableHead>Tid</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {activities.map((activity) => (
              <TableRow key={activity.id}>
                <TableCell>
                  {getActivityBadge(activity.activity_type)}
                </TableCell>
                <TableCell>
                  {activity.user_id || 'Anonym'}
                </TableCell>
                <TableCell>
                  {activity.ip_address || '-'}
                </TableCell>
                <TableCell>
                  {activity.details ? JSON.stringify(activity.details).substring(0, 50) + '...' : '-'}
                </TableCell>
                <TableCell>
                  {new Date(activity.created_at).toLocaleString('sv-SE')}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        {activities.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            Ingen aktivitet hittades.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UserActivityManager;
