
-- Step 1: Delete all existing (and duplicate) entries for the user
DELETE FROM public.admin_users WHERE user_id = '16065115-c226-4bad-8a2e-9b123dbd94c6';

-- Step 2: Insert a single, correct admin record for the user
INSERT INTO public.admin_users (user_id, role) 
VALUES ('16065115-c226-4bad-8a2e-9b123dbd94c6', 'admin');

-- Step 3: Add a unique constraint to prevent future duplicates. This will fail if the constraint already exists, which is okay.
ALTER TABLE public.admin_users ADD CONSTRAINT admin_users_user_id_key UNIQUE (user_id);
