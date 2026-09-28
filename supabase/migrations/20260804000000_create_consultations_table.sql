-- Create consultations table and enable RLS policies
-- Migration: 20260804000000_create_consultations_table.sql

-- 1. Create Consultations Table
CREATE TABLE IF NOT EXISTS public.consultations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    boutique_id UUID REFERENCES public.boutiques(id) ON DELETE SET NULL,
    designer_name TEXT NOT NULL,
    designer_avatar TEXT,
    scheduled_at TIMESTAMPTZ NOT NULL,
    status TEXT NOT NULL DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'completed', 'cancelled')),
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Create Index for Performance
CREATE INDEX IF NOT EXISTS idx_consultations_user_id ON public.consultations(user_id);
CREATE INDEX IF NOT EXISTS idx_consultations_status ON public.consultations(status);
CREATE INDEX IF NOT EXISTS idx_consultations_scheduled_at ON public.consultations(scheduled_at);

-- 3. Attach Updated_at Trigger
DROP TRIGGER IF EXISTS trigger_consultations_updated_at ON public.consultations;
CREATE TRIGGER trigger_consultations_updated_at
    BEFORE UPDATE ON public.consultations
    FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

-- 4. Enable Row Level Security (RLS)
ALTER TABLE public.consultations ENABLE ROW LEVEL SECURITY;

-- 5. RLS Policies
DROP POLICY IF EXISTS "User own consultations read policy" ON public.consultations;
CREATE POLICY "User own consultations read policy"
    ON public.consultations FOR SELECT
    USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "User own consultations insert policy" ON public.consultations;
CREATE POLICY "User own consultations insert policy"
    ON public.consultations FOR INSERT
    WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "User own consultations update policy" ON public.consultations;
CREATE POLICY "User own consultations update policy"
    ON public.consultations FOR UPDATE
    USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "User own consultations delete policy" ON public.consultations;
CREATE POLICY "User own consultations delete policy"
    ON public.consultations FOR DELETE
    USING (auth.uid() = user_id);

-- 6. Enable Realtime on Consultations Table
ALTER PUBLICATION supabase_realtime ADD TABLE public.consultations;
