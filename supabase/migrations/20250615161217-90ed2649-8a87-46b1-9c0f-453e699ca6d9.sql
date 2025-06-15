
-- Drop all potentially conflicting SELECT policies on the admin_users table to ensure a clean slate
DROP POLICY IF EXISTS "Admin users can view admin users" ON public.admin_users;
DROP POLICY IF EXISTS "Users can view their own admin record" ON public.admin_users;
DROP POLICY IF EXISTS "Admins can view all admin records" ON public.admin_users;
DROP POLICY IF EXISTS "Allow users to check their own admin status" ON public.admin_users;

-- Create a single, non-recursive policy for SELECTs.
-- This allows any authenticated user to check if they have an entry in the admin_users table.
-- It's secure because they can only see the row matching their own user ID.
-- This is sufficient for the login process to verify admin status.
CREATE POLICY "Allow authenticated users to check their own admin status"
ON public.admin_users
FOR SELECT
USING (auth.uid() = user_id);
