-- Enable Row Level Security (RLS) and Access Control Policies
-- Created: 2026-08-03

-- 1. Enable RLS on all 10 tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.boutiques ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.designers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.outfits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.design_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wedding_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wishlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- 2. Policies for PROFILES
DROP POLICY IF EXISTS "Public profiles read policy" ON public.profiles;
CREATE POLICY "Public profiles read policy"
    ON public.profiles FOR SELECT
    USING (true);

DROP POLICY IF EXISTS "User update own profile policy" ON public.profiles;
CREATE POLICY "User update own profile policy"
    ON public.profiles FOR UPDATE
    USING (auth.uid() = id);

DROP POLICY IF EXISTS "User insert own profile policy" ON public.profiles;
CREATE POLICY "User insert own profile policy"
    ON public.profiles FOR INSERT
    WITH CHECK (auth.uid() = id);

-- 3. Policies for DESIGN_REQUESTS (auth.uid() = user_id)
DROP POLICY IF EXISTS "User own design_requests policy" ON public.design_requests;
CREATE POLICY "User own design_requests policy"
    ON public.design_requests FOR ALL
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- 4. Policies for WEDDING_PLANS (auth.uid() = user_id)
DROP POLICY IF EXISTS "User own wedding_plans policy" ON public.wedding_plans;
CREATE POLICY "User own wedding_plans policy"
    ON public.wedding_plans FOR ALL
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- 5. Policies for CHAT_MESSAGES (auth.uid() = user_id)
DROP POLICY IF EXISTS "User own chat_messages policy" ON public.chat_messages;
CREATE POLICY "User own chat_messages policy"
    ON public.chat_messages FOR ALL
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- 6. Policies for WISHLIST (auth.uid() = user_id)
DROP POLICY IF EXISTS "User own wishlist policy" ON public.wishlist;
CREATE POLICY "User own wishlist policy"
    ON public.wishlist FOR ALL
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- 7. Policies for BOUTIQUES
DROP POLICY IF EXISTS "Public boutiques read policy" ON public.boutiques;
CREATE POLICY "Public boutiques read policy"
    ON public.boutiques FOR SELECT
    USING (true);

DROP POLICY IF EXISTS "Owner boutique write policy" ON public.boutiques;
CREATE POLICY "Owner boutique write policy"
    ON public.boutiques FOR ALL
    USING (auth.uid() = owner_id)
    WITH CHECK (auth.uid() = owner_id);

-- 8. Policies for DESIGNERS
DROP POLICY IF EXISTS "Public designers read policy" ON public.designers;
CREATE POLICY "Public designers read policy"
    ON public.designers FOR SELECT
    USING (true);

DROP POLICY IF EXISTS "Designer profile write policy" ON public.designers;
CREATE POLICY "Designer profile write policy"
    ON public.designers FOR ALL
    USING (auth.uid() = profile_id)
    WITH CHECK (auth.uid() = profile_id);

-- 9. Policies for OUTFITS
DROP POLICY IF EXISTS "Public outfits read policy" ON public.outfits;
CREATE POLICY "Public outfits read policy"
    ON public.outfits FOR SELECT
    USING (true);

DROP POLICY IF EXISTS "Boutique/Designer outfit write policy" ON public.outfits;
CREATE POLICY "Boutique/Designer outfit write policy"
    ON public.outfits FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM public.boutiques b
            WHERE b.id = outfits.boutique_id AND b.owner_id = auth.uid()
        )
        OR EXISTS (
            SELECT 1 FROM public.designers d
            WHERE d.id = outfits.designer_id AND d.profile_id = auth.uid()
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.boutiques b
            WHERE b.id = outfits.boutique_id AND b.owner_id = auth.uid()
        )
        OR EXISTS (
            SELECT 1 FROM public.designers d
            WHERE d.id = outfits.designer_id AND d.profile_id = auth.uid()
        )
    );

-- 10. Policies for ORDERS
DROP POLICY IF EXISTS "Orders read policy" ON public.orders;
CREATE POLICY "Orders read policy"
    ON public.orders FOR SELECT
    USING (
        auth.uid() = user_id
        OR EXISTS (
            SELECT 1 FROM public.outfits o
            JOIN public.boutiques b ON b.id = o.boutique_id
            WHERE o.id = orders.outfit_id AND b.owner_id = auth.uid()
        )
    );

DROP POLICY IF EXISTS "User order insert policy" ON public.orders;
CREATE POLICY "User order insert policy"
    ON public.orders FOR INSERT
    WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Orders update policy" ON public.orders;
CREATE POLICY "Orders update policy"
    ON public.orders FOR UPDATE
    USING (
        auth.uid() = user_id
        OR EXISTS (
            SELECT 1 FROM public.outfits o
            JOIN public.boutiques b ON b.id = o.boutique_id
            WHERE o.id = orders.outfit_id AND b.owner_id = auth.uid()
        )
    );

-- 11. Policies for REVIEWS
DROP POLICY IF EXISTS "Public reviews read policy" ON public.reviews;
CREATE POLICY "Public reviews read policy"
    ON public.reviews FOR SELECT
    USING (true);

DROP POLICY IF EXISTS "User own reviews write policy" ON public.reviews;
CREATE POLICY "User own reviews write policy"
    ON public.reviews FOR ALL
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);
