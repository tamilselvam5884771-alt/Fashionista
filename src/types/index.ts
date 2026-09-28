// Global TypeScript definitions for Fashionista
export interface User {
  id: string;
  name: string;
  email: string;
  role?: 'customer' | 'boutique_owner' | 'designer' | 'admin';
  avatar_url?: string;
}

export type ThemeMode = 'light' | 'dark';

export interface Consultation {
  id: string;
  user_id: string;
  boutique_id?: string | null;
  designer_name: string;
  designer_avatar?: string | null;
  scheduled_at: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string | null;
  created_at?: string;
  updated_at?: string;
}
export type GarmentCategory = 'dress' | 'suit' | 'shirt' | 'trousers' | 'skirt' | 'outerwear';

export interface CustomOutfit {
  id: string;
  user_id: string;
  title: string;
  category: GarmentCategory;
  measurements: {
    height_cm: number;
    chest_cm: number;
    waist_cm: number;
    hips_cm: number;
    sleeve_length_cm: number;
    inseam_cm: number;
    [key: string]: any;
  };
  fabric_config: {
    primary_color: string;
    secondary_color: string;
    roughness: number;
    metalness: number;
    texture_type: string;
    [key: string]: any;
  };
  pattern_specs?: {
    seam_allowance_mm: number;
    cut_pieces_count: number;
    [key: string]: any;
  };
  preview_image_url?: string | null;
  is_public?: boolean;
  created_at?: string;
  updated_at?: string;
}
