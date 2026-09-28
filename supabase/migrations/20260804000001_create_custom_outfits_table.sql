-- Supabase DDL Migration for 3D Custom Outfits & Parametric Sliders Storage
-- Created: 2026-08-04

-- 1. ENUMS FOR GARMENT SPECS
DO $$ BEGIN
    CREATE TYPE garment_category AS ENUM ('dress', 'suit', 'shirt', 'trousers', 'skirt', 'outerwear');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 2. CUSTOM OUTFITS TABLE (Tailornova-style 3D Configs)
CREATE TABLE IF NOT EXISTS public.custom_outfits (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL DEFAULT 'Untitled 3D Design',
    category garment_category NOT NULL DEFAULT 'dress',
    
    -- JSON Storage for Parametric Sliders & Materials
    measurements JSONB NOT NULL DEFAULT '{
        "height_cm": 170,
        "chest_cm": 88,
        "waist_cm": 70,
        "hips_cm": 96,
        "sleeve_length_cm": 60,
        "inseam_cm": 78
    }'::jsonb,
    
    fabric_config JSONB NOT NULL DEFAULT '{
        "primary_color": "#8B5CF6",
        "secondary_color": "#E05297",
        "roughness": 0.4,
        "metalness": 0.1,
        "texture_type": "cotton_twill"
    }'::jsonb,
    
    pattern_specs JSONB DEFAULT '{
        "seam_allowance_mm": 15,
        "cut_pieces_count": 6
    }'::jsonb,

    preview_image_url TEXT,
    is_public BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. AUTOMATIC UPDATED_AT TRIGGER
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$ BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END; $$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_custom_outfits_modtime ON public.custom_outfits;
CREATE TRIGGER update_custom_outfits_modtime
    BEFORE UPDATE ON public.custom_outfits
    FOR EACH ROW
    EXECUTE PROCEDURE update_modified_column();

-- 4. ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.custom_outfits ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Read outfits policy" ON public.custom_outfits;
CREATE POLICY "Read outfits policy"
ON public.custom_outfits FOR SELECT
USING (auth.uid() = user_id OR is_public = true);

DROP POLICY IF EXISTS "Insert outfit policy" ON public.custom_outfits;
CREATE POLICY "Insert outfit policy"
ON public.custom_outfits FOR INSERT
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Update outfit policy" ON public.custom_outfits;
CREATE POLICY "Update outfit policy"
ON public.custom_outfits FOR UPDATE
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Delete outfit policy" ON public.custom_outfits;
CREATE POLICY "Delete outfit policy"
ON public.custom_outfits FOR DELETE
USING (auth.uid() = user_id);
