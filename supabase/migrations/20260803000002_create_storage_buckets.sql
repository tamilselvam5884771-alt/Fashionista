-- Create Supabase Storage Buckets and Security Policies
-- Created: 2026-08-03

-- 1. Create Public Storage Buckets in storage.buckets
INSERT INTO storage.buckets (id, name, public)
VALUES ('outfit-images', 'outfit-images', true)
ON CONFLICT (id) DO UPDATE SET public = true;

INSERT INTO storage.buckets (id, name, public)
VALUES ('avatars', 'avatars', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- 2. Public Read Access Policies on storage.objects
DROP POLICY IF EXISTS "Public read outfit-images" ON storage.objects;
CREATE POLICY "Public read outfit-images"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'outfit-images');

DROP POLICY IF EXISTS "Public read avatars" ON storage.objects;
CREATE POLICY "Public read avatars"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'avatars');

-- 3. Authenticated User Write Access Policies for outfit-images (User ID Folder Prefix)
DROP POLICY IF EXISTS "Authenticated user upload outfit-images" ON storage.objects;
CREATE POLICY "Authenticated user upload outfit-images"
    ON storage.objects FOR INSERT
    TO authenticated
    WITH CHECK (
        bucket_id = 'outfit-images'
        AND (storage.foldername(name))[1] = auth.uid()::text
    );

DROP POLICY IF EXISTS "Authenticated user update outfit-images" ON storage.objects;
CREATE POLICY "Authenticated user update outfit-images"
    ON storage.objects FOR UPDATE
    TO authenticated
    USING (
        bucket_id = 'outfit-images'
        AND (storage.foldername(name))[1] = auth.uid()::text
    );

DROP POLICY IF EXISTS "Authenticated user delete outfit-images" ON storage.objects;
CREATE POLICY "Authenticated user delete outfit-images"
    ON storage.objects FOR DELETE
    TO authenticated
    USING (
        bucket_id = 'outfit-images'
        AND (storage.foldername(name))[1] = auth.uid()::text
    );

-- 4. Authenticated User Write Access Policies for avatars (User ID Folder Prefix)
DROP POLICY IF EXISTS "Authenticated user upload avatars" ON storage.objects;
CREATE POLICY "Authenticated user upload avatars"
    ON storage.objects FOR INSERT
    TO authenticated
    WITH CHECK (
        bucket_id = 'avatars'
        AND (storage.foldername(name))[1] = auth.uid()::text
    );

DROP POLICY IF EXISTS "Authenticated user update avatars" ON storage.objects;
CREATE POLICY "Authenticated user update avatars"
    ON storage.objects FOR UPDATE
    TO authenticated
    USING (
        bucket_id = 'avatars'
        AND (storage.foldername(name))[1] = auth.uid()::text
    );

DROP POLICY IF EXISTS "Authenticated user delete avatars" ON storage.objects;
CREATE POLICY "Authenticated user delete avatars"
    ON storage.objects FOR DELETE
    TO authenticated
    USING (
        bucket_id = 'avatars'
        AND (storage.foldername(name))[1] = auth.uid()::text
    );
