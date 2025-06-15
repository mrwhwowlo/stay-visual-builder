
-- Add the admin2@admin.com user to the admin_users table
INSERT INTO public.admin_users (user_id, role) 
VALUES ('16065115-c226-4bad-8a2e-9b123dbd94c6', 'admin')
ON CONFLICT (user_id) DO NOTHING;
