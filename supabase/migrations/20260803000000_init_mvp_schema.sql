-- Supabase MVP Schema Migration for Fashionista Atelier
-- Created: 2026-08-03

-- 1. Create Custom ENUM Types
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('customer', 'boutique_owner', 'designer', 'admin');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE design_request_status AS ENUM ('pending', 'analyzed', 'ordered');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE order_status AS ENUM (
        'design_approval',
        'fabric',
        'tailoring',
        'embroidery',
        'quality_check',
        'packaging',
        'shipping',
        'delivered'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE chat_role AS ENUM ('user', 'assistant');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 2. Updated_at Trigger Function
CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 3. Profiles Table (extends auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT,
    role user_role NOT NULL DEFAULT 'customer',
    avatar_url TEXT,
    measurements JSONB DEFAULT '{}'::jsonb,
    preferences JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. Boutiques Table
CREATE TABLE IF NOT EXISTS public.boutiques (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    owner_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    location TEXT,
    rating NUMERIC(3, 2) DEFAULT 5.00,
    portfolio JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. Designers Table
CREATE TABLE IF NOT EXISTS public.designers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    portfolio JSONB DEFAULT '[]'::jsonb,
    rating NUMERIC(3, 2) DEFAULT 5.00,
    experience_years INTEGER DEFAULT 0,
    languages TEXT[] DEFAULT '{}'::text[]
);

-- 6. Outfits Table
CREATE TABLE IF NOT EXISTS public.outfits (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    boutique_id UUID REFERENCES public.boutiques(id) ON DELETE CASCADE,
    designer_id UUID REFERENCES public.designers(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    image_url TEXT,
    price NUMERIC(10, 2) NOT NULL,
    category TEXT,
    occasion TEXT,
    fabric TEXT,
    color TEXT,
    rating NUMERIC(3, 2) DEFAULT 5.00,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 7. Design Requests Table
CREATE TABLE IF NOT EXISTS public.design_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    uploaded_image_url TEXT,
    ai_attributes JSONB DEFAULT '{}'::jsonb,
    price_estimate NUMERIC(10, 2),
    status design_request_status NOT NULL DEFAULT 'pending',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 8. Wedding Plans Table
CREATE TABLE IF NOT EXISTS public.wedding_plans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    wedding_date DATE,
    events JSONB DEFAULT '[]'::jsonb,
    budget NUMERIC(10, 2),
    timeline JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 9. Orders Table
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    outfit_id UUID REFERENCES public.outfits(id) ON DELETE SET NULL,
    design_request_id UUID REFERENCES public.design_requests(id) ON DELETE SET NULL,
    status order_status NOT NULL DEFAULT 'design_approval',
    total NUMERIC(10, 2) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 10. Chat Messages Table
CREATE TABLE IF NOT EXISTS public.chat_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    role chat_role NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 11. Wishlist Table
CREATE TABLE IF NOT EXISTS public.wishlist (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    outfit_id UUID NOT NULL REFERENCES public.outfits(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT wishlist_user_outfit_unique UNIQUE(user_id, outfit_id)
);

-- 12. Reviews Table
CREATE TABLE IF NOT EXISTS public.reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    outfit_id UUID REFERENCES public.outfits(id) ON DELETE SET NULL,
    boutique_id UUID REFERENCES public.boutiques(id) ON DELETE SET NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 13. Create Indexes for Performance
CREATE INDEX IF NOT EXISTS idx_boutiques_owner_id ON public.boutiques(owner_id);
CREATE INDEX IF NOT EXISTS idx_designers_profile_id ON public.designers(profile_id);

CREATE INDEX IF NOT EXISTS idx_outfits_boutique_id ON public.outfits(boutique_id);
CREATE INDEX IF NOT EXISTS idx_outfits_designer_id ON public.outfits(designer_id);
CREATE INDEX IF NOT EXISTS idx_outfits_category ON public.outfits(category);
CREATE INDEX IF NOT EXISTS idx_outfits_occasion ON public.outfits(occasion);
CREATE INDEX IF NOT EXISTS idx_outfits_price ON public.outfits(price);

CREATE INDEX IF NOT EXISTS idx_design_requests_user_id ON public.design_requests(user_id);
CREATE INDEX IF NOT EXISTS idx_wedding_plans_user_id ON public.wedding_plans(user_id);

CREATE INDEX IF NOT EXISTS idx_orders_user_id ON public.orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders(status);

CREATE INDEX IF NOT EXISTS idx_chat_messages_user_id ON public.chat_messages(user_id);
CREATE INDEX IF NOT EXISTS idx_wishlist_user_id ON public.wishlist(user_id);

CREATE INDEX IF NOT EXISTS idx_reviews_outfit_id ON public.reviews(outfit_id);
CREATE INDEX IF NOT EXISTS idx_reviews_boutique_id ON public.boutiques(id);

-- 14. Attach Updated_at Triggers
DROP TRIGGER IF EXISTS trigger_profiles_updated_at ON public.profiles;
CREATE TRIGGER trigger_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

DROP TRIGGER IF EXISTS trigger_boutiques_updated_at ON public.boutiques;
CREATE TRIGGER trigger_boutiques_updated_at
    BEFORE UPDATE ON public.boutiques
    FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

DROP TRIGGER IF EXISTS trigger_outfits_updated_at ON public.outfits;
CREATE TRIGGER trigger_outfits_updated_at
    BEFORE UPDATE ON public.outfits
    FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

DROP TRIGGER IF EXISTS trigger_design_requests_updated_at ON public.design_requests;
CREATE TRIGGER trigger_design_requests_updated_at
    BEFORE UPDATE ON public.design_requests
    FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

DROP TRIGGER IF EXISTS trigger_wedding_plans_updated_at ON public.wedding_plans;
CREATE TRIGGER trigger_wedding_plans_updated_at
    BEFORE UPDATE ON public.wedding_plans
    FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

DROP TRIGGER IF EXISTS trigger_orders_updated_at ON public.orders;
CREATE TRIGGER trigger_orders_updated_at
    BEFORE UPDATE ON public.orders
    FOR EACH ROW EXECUTE FUNCTION handle_updated_at();
