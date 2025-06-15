
-- Create the table for storing contact messages
CREATE TABLE public.contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  user_id UUID, -- Nullable, set if the user is logged in
  is_read BOOLEAN NOT NULL DEFAULT FALSE
);

-- Enable Row Level Security
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anyone (even anonymous) to insert (send a contact message)
CREATE POLICY "Anyone can insert contact message"
  ON public.contact_messages
  FOR INSERT
  WITH CHECK (true);

-- Policy: Only admin users can select (read) messages
CREATE POLICY "Only admins can select contact messages"
  ON public.contact_messages
  FOR SELECT
  USING (
    public.is_admin(auth.uid())
  );

-- Policy: Only admins can update (mark as read, etc)
CREATE POLICY "Only admins can update contact messages"
  ON public.contact_messages
  FOR UPDATE
  USING (
    public.is_admin(auth.uid())
  );

-- Policy: Only admins can delete messages
CREATE POLICY "Only admins can delete contact messages"
  ON public.contact_messages
  FOR DELETE
  USING (
    public.is_admin(auth.uid())
  );
