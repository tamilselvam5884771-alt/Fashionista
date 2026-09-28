import { create } from 'zustand';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';

export interface WishlistItem {
  id: string;
  outfit_id?: string;
  title: string;
  price: number;
  image_url: string;
  category?: string;
  designer?: string;
}

interface WishlistStore {
  wishlist: WishlistItem[];
  isLoading: boolean;
  fetchWishlist: (userId?: string) => Promise<void>;
  addToWishlist: (item: Omit<WishlistItem, 'id'> & { id?: string }, userId?: string) => Promise<void>;
  removeFromWishlist: (id: string, userId?: string) => Promise<void>;
  clearWishlist: (userId?: string) => Promise<void>;
}

export const FALLBACK_WISHLIST_IMAGE =
  'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80';

export const useWishlistStore = create<WishlistStore>((set, get) => ({
  wishlist: [
    {
      id: 'wish-demo-1',
      title: 'Kanjivaram Pure Silk Zari Saree - Royal Blue',
      price: 4999,
      image_url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
      category: 'Saree',
      designer: 'Kanchi Weaves',
    },
    {
      id: 'wish-demo-2',
      title: 'Floral Printed Cotton Anarkali Kurta Set',
      price: 1499,
      image_url: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
      category: 'Kurti / Suit',
      designer: 'Ethnic Elegance',
    },
    {
      id: 'wish-demo-3',
      title: 'Traditional Soft Silk Chanderi Dupatta Suit',
      price: 2299,
      image_url: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
      category: 'Salwar Kameez',
      designer: 'South Vogue',
    },
  ],
  isLoading: false,

  fetchWishlist: async (userId) => {
    if (!userId || !isSupabaseConfigured) return;
    set({ isLoading: true });
    try {
      const { data, error } = await supabase
        .from('wishlists')
        .select('id, outfit_id, outfits(title, price, image_url, category)')
        .eq('user_id', userId);

      if (!error && data && data.length > 0) {
        const loaded: WishlistItem[] = data.map((d: any) => ({
          id: d.id,
          outfit_id: d.outfit_id,
          title: d.outfits?.title || 'Kanjivaram Pure Silk Zari Saree',
          price: Number(d.outfits?.price) || 4999,
          image_url: d.outfits?.image_url || FALLBACK_WISHLIST_IMAGE,
          category: d.outfits?.category || 'Saree',
          designer: 'Atelier Artisan',
        }));
        set({ wishlist: loaded });
      }
    } catch (err) {
      console.warn('Error fetching wishlist from Supabase:', err);
    } finally {
      set({ isLoading: false });
    }
  },

  addToWishlist: async (item, userId) => {
    const { wishlist } = get();
    if (wishlist.some((w) => w.title.toLowerCase() === item.title.toLowerCase())) return;

    const newItemId = item.id || `wish-${Date.now()}`;
    const newWishlistItem: WishlistItem = {
      id: newItemId,
      outfit_id: item.outfit_id,
      title: item.title,
      price: item.price,
      image_url: item.image_url || FALLBACK_WISHLIST_IMAGE,
      category: item.category || 'Apparel',
      designer: item.designer || 'Atelier Artisan',
    };

    set({ wishlist: [newWishlistItem, ...wishlist] });

    if (userId && isSupabaseConfigured) {
      try {
        const { data } = await supabase
          .from('wishlists')
          .insert({
            user_id: userId,
            outfit_id: item.outfit_id || null,
          })
          .select()
          .single();

        if (data) {
          set((state) => ({
            wishlist: state.wishlist.map((w) => (w.id === newItemId ? { ...w, id: data.id } : w)),
          }));
        }
      } catch (dbErr) {
        console.warn('Background wishlist DB insert error:', dbErr);
      }
    }
  },

  removeFromWishlist: async (id, userId) => {
    set((state) => ({
      wishlist: state.wishlist.filter((item) => item.id !== id),
    }));

    if (userId && isSupabaseConfigured && !id.startsWith('wish-demo')) {
      try {
        await supabase.from('wishlists').delete().eq('id', id);
      } catch (err) {
        console.warn('Error removing wishlist item from DB:', err);
      }
    }
  },

  clearWishlist: async (userId) => {
    set({ wishlist: [] });
    if (userId && isSupabaseConfigured) {
      try {
        await supabase.from('wishlists').delete().eq('user_id', userId);
      } catch (err) {
        console.warn('Error clearing wishlist in DB:', err);
      }
    }
  },
}));
