
-- Add availability calendar table for listing dates
CREATE TABLE public.listing_availability (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE NOT NULL,
  date DATE NOT NULL,
  is_available BOOLEAN NOT NULL DEFAULT true,
  price_override NUMERIC,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(property_id, date)
);

-- Add reviews table
CREATE TABLE public.reviews (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE NOT NULL,
  user_name TEXT NOT NULL,
  user_avatar TEXT,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT NOT NULL,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add property statistics table
CREATE TABLE public.property_statistics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE NOT NULL,
  views_count INTEGER NOT NULL DEFAULT 0,
  bookings_count INTEGER NOT NULL DEFAULT 0,
  revenue_total NUMERIC NOT NULL DEFAULT 0,
  last_booking_date DATE,
  average_rating DECIMAL(3,2),
  total_reviews INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(property_id)
);

-- Add unique slug column to properties for custom URLs
ALTER TABLE public.properties ADD COLUMN slug TEXT UNIQUE;

-- Add host information to properties
ALTER TABLE public.properties ADD COLUMN host_name TEXT DEFAULT 'Andreas';
ALTER TABLE public.properties ADD COLUMN host_avatar TEXT DEFAULT 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face';
ALTER TABLE public.properties ADD COLUMN host_is_superhost BOOLEAN DEFAULT true;
ALTER TABLE public.properties ADD COLUMN host_joined_year TEXT DEFAULT '2017';

-- Add map coordinates
ALTER TABLE public.properties ADD COLUMN latitude DECIMAL(10, 8);
ALTER TABLE public.properties ADD COLUMN longitude DECIMAL(11, 8);

-- Create indexes for performance
CREATE INDEX idx_listing_availability_property_date ON public.listing_availability(property_id, date);
CREATE INDEX idx_reviews_property_id ON public.reviews(property_id);
CREATE INDEX idx_property_statistics_property_id ON public.property_statistics(property_id);
CREATE INDEX idx_properties_slug ON public.properties(slug);

-- Enable RLS on new tables
ALTER TABLE public.listing_availability ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.property_statistics ENABLE ROW LEVEL SECURITY;

-- Create RLS policies (public read access, admin write access)
CREATE POLICY "Public can view availability" ON public.listing_availability FOR SELECT USING (true);
CREATE POLICY "Public can view reviews" ON public.reviews FOR SELECT USING (is_active = true);
CREATE POLICY "Public can view statistics" ON public.property_statistics FOR SELECT USING (true);

-- Function to generate unique slug from title
CREATE OR REPLACE FUNCTION public.generate_property_slug(title TEXT)
RETURNS TEXT
LANGUAGE plpgsql
AS $$
DECLARE
  base_slug TEXT;
  final_slug TEXT;
  counter INTEGER := 1;
BEGIN
  -- Convert title to lowercase, replace spaces with hyphens, remove special characters
  base_slug := lower(regexp_replace(regexp_replace(title, '[^a-zA-Z0-9\s]', '', 'g'), '\s+', '-', 'g'));
  final_slug := base_slug;
  
  -- Check if slug exists and increment counter if needed
  WHILE EXISTS (SELECT 1 FROM public.properties WHERE slug = final_slug) LOOP
    final_slug := base_slug || '-' || counter;
    counter := counter + 1;
  END LOOP;
  
  RETURN final_slug;
END;
$$;

-- Function to update property statistics
CREATE OR REPLACE FUNCTION public.update_property_statistics(property_uuid UUID)
RETURNS VOID
LANGUAGE plpgsql
AS $$
DECLARE
  booking_count INTEGER;
  total_revenue NUMERIC;
  last_booking DATE;
  avg_rating DECIMAL(3,2);
  review_count INTEGER;
BEGIN
  -- Calculate statistics
  SELECT COUNT(*), COALESCE(SUM(total_price), 0), MAX(created_at::date)
  INTO booking_count, total_revenue, last_booking
  FROM public.bookings
  WHERE property_id = property_uuid;

  SELECT AVG(rating), COUNT(*)
  INTO avg_rating, review_count
  FROM public.reviews
  WHERE property_id = property_uuid AND is_active = true;

  -- Insert or update statistics
  INSERT INTO public.property_statistics (
    property_id, bookings_count, revenue_total, last_booking_date, 
    average_rating, total_reviews
  )
  VALUES (
    property_uuid, booking_count, total_revenue, last_booking_date,
    avg_rating, review_count
  )
  ON CONFLICT (property_id) DO UPDATE SET
    bookings_count = EXCLUDED.bookings_count,
    revenue_total = EXCLUDED.revenue_total,
    last_booking_date = EXCLUDED.last_booking_date,
    average_rating = EXCLUDED.average_rating,
    total_reviews = EXCLUDED.total_reviews,
    updated_at = now();
END;
$$;
