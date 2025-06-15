
-- Drop the conflicting policy that causes a recursive check during login
DROP POLICY IF EXISTS "Admin users can view admin users" ON public.admin_users;

-- Create a new policy allowing any authenticated user to check if *they* are an admin.
-- This is secure because they can only see the row matching their own user ID.
CREATE POLICY "Users can view their own admin record"
ON public.admin_users
FOR SELECT
USING (auth.uid() = user_id);

-- Re-create a policy that allows existing admins to view all other admin records.
-- This is for managing admins within the admin dashboard itself.
CREATE POLICY "Admins can view all admin records"
ON public.admin_users
FOR SELECT
USING (public.is_admin(auth.uid()));
