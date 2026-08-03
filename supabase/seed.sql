-- Supabase Seed Data for Fashionista Atelier
-- Seeds 15 Boutiques, 10 Designers, 40 Outfits, and 5 Reviews
-- Created: 2026-08-03

-- 1. Insert Seed Users into auth.users & public.profiles
DO $$
DECLARE
    i INT;
    uid UUID;
BEGIN
    -- Insert 15 Boutique Owners
    FOR i IN 1..15 LOOP
        uid := ('a0000000-0000-0000-0000-' || lpad(i::text, 12, '0'))::uuid;
        
        INSERT INTO auth.users (id, instance_id, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at, role, aud)
        VALUES (uid, '00000000-0000-0000-0000-000000000000'::uuid, 'owner_' || i || '@fashionista.atelier', '$2a$10$abcdefghijklmnopqrstuu', NOW(), '{"provider":"email","providers":["email"]}', '{}', NOW(), NOW(), 'authenticated', 'authenticated')
        ON CONFLICT (id) DO NOTHING;

        INSERT INTO public.profiles (id, full_name, role, avatar_url)
        VALUES (uid, 'Boutique Owner ' || i, 'boutique_owner', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80')
        ON CONFLICT (id) DO NOTHING;
    END LOOP;

    -- Insert 10 Designers
    FOR i IN 1..10 LOOP
        uid := ('b0000000-0000-0000-0000-' || lpad(i::text, 12, '0'))::uuid;

        INSERT INTO auth.users (id, instance_id, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at, role, aud)
        VALUES (uid, '00000000-0000-0000-0000-000000000000'::uuid, 'designer_' || i || '@fashionista.atelier', '$2a$10$abcdefghijklmnopqrstuu', NOW(), '{"provider":"email","providers":["email"]}', '{}', NOW(), NOW(), 'authenticated', 'authenticated')
        ON CONFLICT (id) DO NOTHING;

        INSERT INTO public.profiles (id, full_name, role, avatar_url)
        VALUES (uid, 'Master Designer ' || i, 'designer', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80')
        ON CONFLICT (id) DO NOTHING;
    END LOOP;
END $$;

-- 2. Insert 15 Boutiques
INSERT INTO public.boutiques (id, owner_id, name, location, rating, portfolio)
VALUES
    ('c0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000001', 'Atelier Le Paris', 'Paris, France', 4.9, '["Bespoke Silk", "Velvet Gowns"]'::jsonb),
    ('c0000000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000002', 'Maison de Couture', 'Paris, France', 5.0, '["Royal Bridal", "Veils"]'::jsonb),
    ('c0000000-0000-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000003', 'Valenti Luxury Salon', 'Milan, Italy', 4.8, '["Italian Leather", "Pumps"]'::jsonb),
    ('c0000000-0000-0000-0000-000000000004', 'a0000000-0000-0000-0000-000000000004', 'Haute London Atelier', 'London, UK', 4.9, '["Organza Capes", "Trench Coats"]'::jsonb),
    ('c0000000-0000-0000-0000-000000000005', 'a0000000-0000-0000-0000-000000000005', 'Milan High Fashion Studio', 'Milan, Italy', 4.7, '["Double Breasted Suits"]'::jsonb),
    ('c0000000-0000-0000-0000-000000000006', 'a0000000-0000-0000-0000-000000000006', 'Roma Velvet Atelier', 'Rome, Italy', 4.8, '["Royal Velvet Sherwanis"]'::jsonb),
    ('c0000000-0000-0000-0000-000000000007', 'a0000000-0000-0000-0000-000000000007', 'Versailles Silk House', 'Versailles, France', 4.9, '["Silk Brocade", "Corsets"]'::jsonb),
    ('c0000000-0000-0000-0000-000000000008', 'a0000000-0000-0000-0000-000000000008', 'Florence Lace Studio', 'Florence, Italy', 4.6, '["Handmade French Lace"]'::jsonb),
    ('c0000000-0000-0000-0000-000000000009', 'a0000000-0000-0000-0000-000000000009', 'Monaco Evening Salon', 'Monaco', 4.9, '["Cocktail Dresses", "Galas"]'::jsonb),
    ('c0000000-0000-0000-0000-000000000010', 'a0000000-0000-0000-0000-000000000010', 'Zurich Cashmere House', 'Zurich, Switzerland', 4.8, '["Cashmere Wraps", "Outerwear"]'::jsonb),
    ('c0000000-0000-0000-0000-000000000011', 'a0000000-0000-0000-0000-000000000011', 'Tokyo Kimono Couture', 'Tokyo, Japan', 5.0, '["Silk Kimonos", "Modern Fusion"]'::jsonb),
    ('c0000000-0000-0000-0000-000000000012', 'a0000000-0000-0000-0000-000000000012', 'New York Fifth Ave Atelier', 'New York, USA', 4.9, '["Runway Essentials"]'::jsonb),
    ('c0000000-0000-0000-0000-000000000013', 'a0000000-0000-0000-0000-000000000013', 'Dubai Gold Atelier', 'Dubai, UAE', 5.0, '["Gold Thread Embroidery"]'::jsonb),
    ('c0000000-0000-0000-0000-000000000014', 'a0000000-0000-0000-0000-000000000014', 'Vienna Symphony Couture', 'Vienna, Austria', 4.7, '["Opera Gowns", "Velvet"]'::jsonb),
    ('c0000000-0000-0000-0000-000000000015', 'a0000000-0000-0000-0000-000000000015', 'Madrid Sol Salon', 'Madrid, Spain', 4.8, '["Flamenco Lace", "Silk Wraps"]'::jsonb)
ON CONFLICT (id) DO NOTHING;

-- 3. Insert 10 Designers
INSERT INTO public.designers (id, profile_id, rating, experience_years, languages, portfolio)
VALUES
    ('d0000000-0000-0000-0000-000000000001', 'b0000000-0000-0000-0000-000000000001', 4.9, 18, ARRAY['French', 'English'], '["Saint-Germain Velvet Collection"]'::jsonb),
    ('d0000000-0000-0000-0000-000000000002', 'b0000000-0000-0000-0000-000000000002', 5.0, 22, ARRAY['French', 'Italian'], '["Maison Royal Bridal"]'::jsonb),
    ('d0000000-0000-0000-0000-000000000003', 'b0000000-0000-0000-0000-000000000003', 4.8, 15, ARRAY['Italian', 'English'], '["Valenti Milan Footwear"]'::jsonb),
    ('d0000000-0000-0000-0000-000000000004', 'b0000000-0000-0000-0000-000000000004', 4.9, 12, ARRAY['English'], '["Haute London Organza"]'::jsonb),
    ('d0000000-0000-0000-0000-000000000005', 'b0000000-0000-0000-0000-000000000005', 4.7, 10, ARRAY['Italian', 'French'], '["Minimalist Luxe Suits"]'::jsonb),
    ('d0000000-0000-0000-0000-000000000006', 'b0000000-0000-0000-0000-000000000006', 4.8, 14, ARRAY['French', 'Spanish'], '["Gold Accent Line"]'::jsonb),
    ('d0000000-0000-0000-0000-000000000007', 'b0000000-0000-0000-0000-000000000007', 5.0, 20, ARRAY['Japanese', 'English'], '["Kimono Silk Fusion"]'::jsonb),
    ('d0000000-0000-0000-0000-000000000008', 'b0000000-0000-0000-0000-000000000008', 4.9, 16, ARRAY['Arabic', 'English'], '["Dubai Royal Embroidery"]'::jsonb),
    ('d0000000-0000-0000-0000-000000000009', 'b0000000-0000-0000-0000-000000000009', 4.8, 11, ARRAY['German', 'English'], '["Opulent Opera Wear"]'::jsonb),
    ('d0000000-0000-0000-0000-000000000010', 'b0000000-0000-0000-0000-000000000010', 4.7, 9, ARRAY['Spanish', 'French'], '["Mediterranean Lace"]'::jsonb)
ON CONFLICT (id) DO NOTHING;

-- 4. Insert 40 Outfits
INSERT INTO public.outfits (id, boutique_id, designer_id, title, image_url, price, category, occasion, fabric, color, rating)
VALUES
    ('e0000000-0000-0000-0000-000000000001', 'c0000000-0000-0000-0000-000000000001', 'd0000000-0000-0000-0000-000000000001', 'Royal Velvet Evening Gown', 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80', 2450.00, 'Gowns', 'Evening', 'Velvet', 'Royal Purple', 4.9),
    ('e0000000-0000-0000-0000-000000000002', 'c0000000-0000-0000-0000-000000000002', 'd0000000-0000-0000-0000-000000000002', 'Princess Cut Silk Bridal Train', 'https://images.unsplash.com/photo-1594552072238-b8a33785b261?auto=format&fit=crop&w=800&q=80', 4200.00, 'Bridal Suite', 'Wedding', 'Silk', 'Ivory White', 5.0),
    ('e0000000-0000-0000-0000-000000000003', 'c0000000-0000-0000-0000-000000000003', 'd0000000-0000-0000-0000-000000000003', 'Champagne Silk Slip Dress', 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80', 1350.00, 'Cocktail Dresses', 'Cocktail', 'Silk', 'Champagne Gold', 4.8),
    ('e0000000-0000-0000-0000-000000000004', 'c0000000-0000-0000-0000-000000000001', 'd0000000-0000-0000-0000-000000000001', 'French Lace Corset & Skirt', 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80', 1890.00, 'Gowns', 'Runway', 'Lace', 'Black', 4.7),
    ('e0000000-0000-0000-0000-000000000005', 'c0000000-0000-0000-0000-000000000004', 'd0000000-0000-0000-0000-000000000004', 'Silk Organza Layered Cape', 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80', 1620.00, 'Outerwear', 'Runway', 'Organza', 'Lavender', 4.9),
    ('e0000000-0000-0000-0000-000000000006', 'c0000000-0000-0000-0000-000000000003', 'd0000000-0000-0000-0000-000000000003', 'Satin Pleated Cocktail Dress', 'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?auto=format&fit=crop&w=800&q=80', 980.00, 'Cocktail Dresses', 'Cocktail', 'Satin', 'Rose Gold', 4.6),
    ('e0000000-0000-0000-0000-000000000007', 'c0000000-0000-0000-0000-000000000001', 'd0000000-0000-0000-0000-000000000001', 'Bespoke Double-Breasted Velvet Suit', 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80', 2780.00, 'Suits', 'Evening', 'Velvet', 'Midnight Black', 4.9),
    ('e0000000-0000-0000-0000-000000000008', 'c0000000-0000-0000-0000-000000000002', 'd0000000-0000-0000-0000-000000000002', 'Rose Gold Satin Evening Wrap', 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80', 1490.00, 'Outerwear', 'Casual Luxe', 'Satin', 'Rose Gold', 4.8),
    ('e0000000-0000-0000-0000-000000000009', 'c0000000-0000-0000-0000-000000000002', 'd0000000-0000-0000-0000-000000000002', 'Embroidered Organza Wedding Dress', 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=80', 3850.00, 'Bridal Suite', 'Wedding', 'Organza', 'White Gold', 5.0),
    ('e0000000-0000-0000-0000-000000000010', 'c0000000-0000-0000-0000-000000000005', 'd0000000-0000-0000-0000-000000000005', 'Royal Midnight Velvet Blazer', 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80', 1420.00, 'Outerwear', 'Evening', 'Velvet', 'Midnight Black', 4.9),
    ('e0000000-0000-0000-0000-000000000011', 'c0000000-0000-0000-0000-000000000006', 'd0000000-0000-0000-0000-000000000006', 'Royal Velvet Sherwani Set', 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80', 2850.00, 'Suits', 'Wedding', 'Velvet', 'Royal Purple', 4.9),
    ('e0000000-0000-0000-0000-000000000012', 'c0000000-0000-0000-0000-000000000007', 'd0000000-0000-0000-0000-000000000006', 'Brocade Silk Anarkali Gown', 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80', 1650.00, 'Gowns', 'Wedding', 'Silk', 'Rose Gold', 4.8),
    ('e0000000-0000-0000-0000-000000000013', 'c0000000-0000-0000-0000-000000000008', 'd0000000-0000-0000-0000-000000000010', 'Florence Lace Evening Cape', 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80', 1290.00, 'Outerwear', 'Evening', 'Lace', 'Black', 4.7),
    ('e0000000-0000-0000-0000-000000000014', 'c0000000-0000-0000-0000-000000000009', 'd0000000-0000-0000-0000-000000000001', 'Monaco Gala Velvet Slip', 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80', 2150.00, 'Gowns', 'Cocktail', 'Velvet', 'Emerald Green', 4.9),
    ('e0000000-0000-0000-0000-000000000015', 'c0000000-0000-0000-0000-000000000010', 'd0000000-0000-0000-0000-000000000009', 'Alpine Cashmere Double Coat', 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80', 2890.00, 'Outerwear', 'Casual Luxe', 'Organza', 'Soft Grey', 4.8),
    ('e0000000-0000-0000-0000-000000000016', 'c0000000-0000-0000-0000-000000000011', 'd0000000-0000-0000-0000-000000000007', 'Hand-Painted Kimono Silk Robe', 'https://images.unsplash.com/photo-1594552072238-b8a33785b261?auto=format&fit=crop&w=800&q=80', 3400.00, 'Gowns', 'Runway', 'Silk', 'Champagne Gold', 5.0),
    ('e0000000-0000-0000-0000-000000000017', 'c0000000-0000-0000-0000-000000000012', 'd0000000-0000-0000-0000-000000000004', 'Fifth Avenue Pleated Blazer', 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80', 1950.00, 'Suits', 'Runway', 'Satin', 'Black', 4.8),
    ('e0000000-0000-0000-0000-000000000018', 'c0000000-0000-0000-0000-000000000013', 'd0000000-0000-0000-0000-000000000008', 'Dubai Crystal Thread Lehenga', 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=80', 4800.00, 'Bridal Suite', 'Wedding', 'Silk', 'Gold', 5.0),
    ('e0000000-0000-0000-0000-000000000019', 'c0000000-0000-0000-0000-000000000014', 'd0000000-0000-0000-0000-000000000009', 'Vienna Opera Velvet Cape', 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80', 2250.00, 'Outerwear', 'Evening', 'Velvet', 'Royal Purple', 4.9),
    ('e0000000-0000-0000-0000-000000000020', 'c0000000-0000-0000-0000-000000000015', 'd0000000-0000-0000-0000-000000000010', 'Madrid Sol Satin Dress', 'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?auto=format&fit=crop&w=800&q=80', 1180.00, 'Cocktail Dresses', 'Cocktail', 'Satin', 'Rose Gold', 4.7),
    ('e0000000-0000-0000-0000-000000000021', 'c0000000-0000-0000-0000-000000000001', 'd0000000-0000-0000-0000-000000000001', 'Mulberry Silk Scarf', 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=400&q=80', 340.00, 'Accessories', 'Casual Luxe', 'Silk', 'Lavender', 4.8),
    ('e0000000-0000-0000-0000-000000000022', 'c0000000-0000-0000-0000-000000000003', 'd0000000-0000-0000-0000-000000000003', 'Champagne Leather Pump', 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=400&q=80', 780.00, 'Accessories', 'Evening', 'Satin', 'Champagne Gold', 4.9),
    ('e0000000-0000-0000-0000-000000000023', 'c0000000-0000-0000-0000-000000000004', 'd0000000-0000-0000-0000-000000000004', 'Rose Gold Aviator Frame', 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=400&q=80', 420.00, 'Accessories', 'Casual Luxe', 'Organza', 'Rose Gold', 4.7),
    ('e0000000-0000-0000-0000-000000000024', 'c0000000-0000-0000-0000-000000000005', 'd0000000-0000-0000-0000-000000000005', 'Velvet Lapel Waistcoat', 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=400&q=80', 890.00, 'Suits', 'Evening', 'Velvet', 'Midnight Black', 4.8),
    ('e0000000-0000-0000-0000-000000000025', 'c0000000-0000-0000-0000-000000000002', 'd0000000-0000-0000-0000-000000000002', 'Lavender Tulle Bridesmaid Set', 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80', 980.00, 'Bridal Suite', 'Wedding', 'Lace', 'Lavender', 4.8),
    ('e0000000-0000-0000-0000-000000000026', 'c0000000-0000-0000-0000-000000000006', 'd0000000-0000-0000-0000-000000000006', 'Champagne Gold Satin Suit', 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80', 2100.00, 'Suits', 'Wedding', 'Satin', 'Champagne Gold', 4.9),
    ('e0000000-0000-0000-0000-000000000027', 'c0000000-0000-0000-0000-000000000007', 'd0000000-0000-0000-0000-000000000001', 'Organza Pearl Layered Skirt', 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80', 1450.00, 'Gowns', 'Cocktail', 'Organza', 'White', 4.6),
    ('e0000000-0000-0000-0000-000000000028', 'c0000000-0000-0000-0000-000000000008', 'd0000000-0000-0000-0000-000000000010', 'Bespoke Satin Smoking Jacket', 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80', 2390.00, 'Suits', 'Evening', 'Satin', 'Midnight Black', 4.9),
    ('e0000000-0000-0000-0000-000000000029', 'c0000000-0000-0000-0000-000000000009', 'd0000000-0000-0000-0000-000000000003', 'Crystal Mesh Evening Clutch', 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80', 680.00, 'Accessories', 'Evening', 'Organza', 'Rose Gold', 4.9),
    ('e0000000-0000-0000-0000-000000000030', 'c0000000-0000-0000-0000-000000000010', 'd0000000-0000-0000-0000-000000000009', 'Velvet Belted Winter Trench', 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80', 3100.00, 'Outerwear', 'Casual Luxe', 'Velvet', 'Royal Purple', 4.8),
    ('e0000000-0000-0000-0000-000000000031', 'c0000000-0000-0000-0000-000000000011', 'd0000000-0000-0000-0000-000000000007', 'Pure Silk Embroidered Haori', 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80', 1850.00, 'Outerwear', 'Runway', 'Silk', 'Black', 4.9),
    ('e0000000-0000-0000-0000-000000000032', 'c0000000-0000-0000-0000-000000000012', 'd0000000-0000-0000-0000-000000000004', 'New York Modern Slip Gown', 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80', 1720.00, 'Gowns', 'Cocktail', 'Silk', 'Lavender', 4.7),
    ('e0000000-0000-0000-0000-000000000033', 'c0000000-0000-0000-0000-000000000013', 'd0000000-0000-0000-0000-000000000008', 'Royal Gold Thread Abaya Gown', 'https://images.unsplash.com/photo-1594552072238-b8a33785b261?auto=format&fit=crop&w=800&q=80', 3900.00, 'Gowns', 'Evening', 'Silk', 'Gold', 5.0),
    ('e0000000-0000-0000-0000-000000000034', 'c0000000-0000-0000-0000-000000000014', 'd0000000-0000-0000-0000-000000000009', 'Symphony Velvet Corset Dress', 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80', 2100.00, 'Gowns', 'Runway', 'Velvet', 'Midnight Black', 4.8),
    ('e0000000-0000-0000-0000-000000000035', 'c0000000-0000-0000-0000-000000000015', 'd0000000-0000-0000-0000-000000000010', 'Spanish Silk Mantilla Gown', 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80', 2650.00, 'Gowns', 'Evening', 'Silk', 'Champagne Gold', 4.8),
    ('e0000000-0000-0000-0000-000000000036', 'c0000000-0000-0000-0000-000000000001', 'd0000000-0000-0000-0000-000000000001', 'Bespoke Satin Evening Trousers', 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80', 1150.00, 'Suits', 'Casual Luxe', 'Satin', 'Royal Purple', 4.7),
    ('e0000000-0000-0000-0000-000000000037', 'c0000000-0000-0000-0000-000000000002', 'd0000000-0000-0000-0000-000000000002', 'Cathedral Lace Bridal Veil', 'https://images.unsplash.com/photo-1594552072238-b8a33785b261?auto=format&fit=crop&w=800&q=80', 1650.00, 'Bridal Suite', 'Wedding', 'Lace', 'White', 5.0),
    ('e0000000-0000-0000-0000-000000000038', 'c0000000-0000-0000-0000-000000000003', 'd0000000-0000-0000-0000-000000000003', 'Valenti Italian Leather Belt', 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=400&q=80', 490.00, 'Accessories', 'Casual Luxe', 'Satin', 'Black', 4.6),
    ('e0000000-0000-0000-0000-000000000039', 'c0000000-0000-0000-0000-000000000004', 'd0000000-0000-0000-0000-000000000004', 'Organza Sheer Evening Gloves', 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80', 380.00, 'Accessories', 'Runway', 'Organza', 'Lavender', 4.8),
    ('e0000000-0000-0000-0000-000000000040', 'c0000000-0000-0000-0000-000000000005', 'd0000000-0000-0000-0000-000000000005', 'Bespoke Double Silk Vest', 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80', 1250.00, 'Suits', 'Evening', 'Silk', 'Rose Gold', 4.9)
ON CONFLICT (id) DO NOTHING;

-- 5. Insert 5 Sample Reviews
INSERT INTO public.reviews (id, user_id, outfit_id, boutique_id, rating, comment)
VALUES
    ('f0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000001', 'e0000000-0000-0000-0000-000000000001', 'c0000000-0000-0000-0000-000000000001', 5, 'The Royal Velvet Evening Gown fits like a dream! Masterful tailoring and rich purple shade.'),
    ('f0000000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000002', 'e0000000-0000-0000-0000-000000000002', 'c0000000-0000-0000-0000-000000000002', 5, 'Exceptional bridal train experience. Maison de Couture provided flawless 3D fitting consultations.'),
    ('f0000000-0000-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000003', 'e0000000-0000-0000-0000-000000000003', 'c0000000-0000-0000-0000-000000000003', 4, 'Elegant champagne gold slip dress. High quality Italian silk.'),
    ('f0000000-0000-0000-0000-000000000004', 'a0000000-0000-0000-0000-000000000004', 'e0000000-0000-0000-0000-000000000007', 'c0000000-0000-0000-0000-000000000001', 5, 'The double-breasted velvet suit is an absolute head-turner at evening galas.'),
    ('f0000000-0000-0000-0000-000000000005', 'a0000000-0000-0000-0000-000000000005', 'e0000000-0000-0000-0000-000000000009', 'c0000000-0000-0000-0000-000000000002', 5, 'Sublime organza wedding dress with exquisite gold thread embroidery.')
ON CONFLICT (id) DO NOTHING;
