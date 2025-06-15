
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import AdminAuth from '@/components/AdminAuth';
import AdminDashboardEnhanced from '@/components/AdminDashboardEnhanced';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.id);
        if (session?.user) {
          // Check if user is admin using RPC
          const { data: isAdmin, error } = await supabase.rpc('is_admin', {
            user_uuid: session.user.id,
          });
          
          console.log('Admin check result:', { isAdmin, error });
          setIsAuthenticated(!!isAdmin);
        } else {
          setIsAuthenticated(false);
        }
        setIsLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      console.log('Current session:', session?.user?.id);
      
      if (session?.user) {
        // Check if user is admin using RPC
        const { data: isAdmin, error } = await supabase.rpc('is_admin', {
          user_uuid: session.user.id,
        });
        
        console.log('Initial admin check:', { isAdmin, error });
        setIsAuthenticated(!!isAdmin);
      } else {
        // If no session, user is not authenticated
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Auth check error:', error);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-lg">Laddar...</div>
      </div>
    );
  }

  return isAuthenticated ? (
    <AdminDashboardEnhanced onLogout={() => setIsAuthenticated(false)} />
  ) : (
    <AdminAuth onLogin={() => setIsAuthenticated(true)} />
  );
};

export default Admin;
