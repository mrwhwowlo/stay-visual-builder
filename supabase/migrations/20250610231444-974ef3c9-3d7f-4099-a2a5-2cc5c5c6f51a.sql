
-- Fix the infinite recursion issue in admin_users policies
DROP POLICY IF EXISTS "Admin users can view admin users" ON public.admin_users;
DROP POLICY IF EXISTS "Admin users can insert admin users" ON public.admin_users;
DROP POLICY IF EXISTS "Admin users can update admin users" ON public.admin_users;

-- Create a security definer function to check admin status
CREATE OR REPLACE FUNCTION public.is_admin(user_uuid uuid)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE user_id = user_uuid
  );
$$;

-- Create new policies using the security definer function
CREATE POLICY "Admin users can view admin users" 
  ON public.admin_users 
  FOR SELECT 
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Admin users can insert admin users" 
  ON public.admin_users 
  FOR INSERT 
  WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Admin users can update admin users" 
  ON public.admin_users 
  FOR UPDATE 
  USING (public.is_admin(auth.uid()));

-- Add a table for tracking site content/text
CREATE TABLE public.site_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  content_type TEXT DEFAULT 'text',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on site_content
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

-- Create policies for site_content
CREATE POLICY "Anyone can read site content" 
  ON public.site_content 
  FOR SELECT 
  USING (true);

CREATE POLICY "Admin users can manage site content" 
  ON public.site_content 
  FOR ALL 
  USING (public.is_admin(auth.uid()));

-- Add a user_activity table for tracking users
CREATE TABLE public.user_activity (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  activity_type TEXT NOT NULL,
  details JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on user_activity
ALTER TABLE public.user_activity ENABLE ROW LEVEL SECURITY;

-- Create policies for user_activity
CREATE POLICY "Admin users can view user activity" 
  ON public.user_activity 
  FOR SELECT 
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Admin users can insert user activity" 
  ON public.user_activity 
  FOR INSERT 
  WITH CHECK (public.is_admin(auth.uid()));

-- Insert default site content
INSERT INTO public.site_content (key, content, content_type) VALUES
  ('site_title', 'Lyxig villa i Marbella', 'text'),
  ('site_description', 'En fantastisk villa med havsutsikt i hjärtat av Marbella. Perfekt för familjer och grupper som vill njuta av Costa del Sol. Denna vackra villa erbjuder alla bekvämligheter du behöver för en minnesvärd semester.', 'textarea'),
  ('site_location', 'Marbella, Spanien', 'text'),
  ('booking_fee', '750', 'number'),
  ('service_fee_percent', '14', 'number');
