
-- Add the admin user to the admin_users table
INSERT INTO public.admin_users (user_id, role) 
VALUES ('c8cbcca2-32a8-41d5-bc9e-200c2b38f871', 'admin')
ON CONFLICT (user_id) DO NOTHING;
