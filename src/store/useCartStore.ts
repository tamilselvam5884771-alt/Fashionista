import { create } from 'zustand';
import { supabase } from '../lib/supabaseClient';

export interface CartItem {
  id: string;
  outfit_id?: string;
  title: string;
  price: number;
  image_url: string;
  quantity: number;
  designer?: string;
}

interface CartStore {
  cartItems: CartItem[];
  isLoading: boolean;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  fetchCart: (userId?: string) => Promise<void>;
  addToCart: (item: Omit<CartItem, 'id' | 'quantity'> & { id?: string }, userId?: string) => Promise<void>;
  updateQuantity: (id: string, quantity: number, userId?: string) => Promise<void>;
  removeItem: (id: string, userId?: string) => Promise<void>;
  clearCart: (userId?: string) => Promise<void>;
  getTotalPrice: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  cartItems: [
    {
      id: 'cart-demo-1',
      title: 'Kanjivaram Pure Silk Zari Saree - Royal Blue',
      price: 4999,
      image_url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
      quantity: 1,
      designer: 'Kanchi Weaves',
    },
  ],
  isLoading: false,
  isOpen: false,

  setIsOpen: (isOpen) => set({ isOpen }),

  fetchCart: async (userId) => {
    if (!userId) return;
    set({ isLoading: true });
    try {
      const { data, error } = await supabase
        .from('cart_items')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        const loaded: CartItem[] = data.map((d: any) => ({
          id: d.id,
          outfit_id: d.outfit_id,
          title: d.title,
          price: Number(d.price),
          image_url: d.image_url || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
          quantity: d.quantity || 1,
          designer: 'Atelier Artisan',
        }));
        set({ cartItems: loaded });
      }
    } catch (err) {
      console.warn('Error fetching cart items:', err);
    } finally {
      set({ isLoading: false });
    }
  },

  addToCart: async (item, userId) => {
    const { cartItems } = get();
    const existingIndex = cartItems.findIndex(
      (c) => c.title.toLowerCase() === item.title.toLowerCase() || (item.id && c.id === item.id)
    );

    if (existingIndex > -1) {
      const existing = cartItems[existingIndex];
      const newQty = existing.quantity + 1;
      await get().updateQuantity(existing.id, newQty, userId);
    } else {
      const newItemId = item.id || `cart-${Date.now()}`;
      const newCartItem: CartItem = {
        id: newItemId,
        outfit_id: item.outfit_id,
        title: item.title,
        price: item.price,
        image_url: item.image_url,
        quantity: 1,
        designer: item.designer || 'Kanchi Weaves',
      };

      set({ cartItems: [newCartItem, ...cartItems] });

      if (userId) {
        try {
          const { data } = await supabase
            .from('cart_items')
            .insert({
              user_id: userId,
              outfit_id: item.outfit_id || null,
              title: item.title,
              price: item.price,
              image_url: item.image_url,
              quantity: 1,
            })
            .select()
            .single();

          if (data) {
            set((state) => ({
              cartItems: state.cartItems.map((c) => (c.id === newItemId ? { ...c, id: data.id } : c)),
            }));
          }
        } catch (dbErr) {
          console.warn('Background cart insert error:', dbErr);
        }
      }
    }
  },

  updateQuantity: async (id, quantity, userId) => {
    if (quantity <= 0) {
      await get().removeItem(id, userId);
      return;
    }

    set((state) => ({
      cartItems: state.cartItems.map((item) => (item.id === id ? { ...item, quantity } : item)),
    }));

    if (userId && !id.startsWith('cart-demo')) {
      try {
        await supabase.from('cart_items').update({ quantity }).eq('id', id);
      } catch (err) {
        console.warn('Error updating cart quantity in DB:', err);
      }
    }
  },

  removeItem: async (id, userId) => {
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.id !== id),
    }));

    if (userId && !id.startsWith('cart-demo')) {
      try {
        await supabase.from('cart_items').delete().eq('id', id);
      } catch (err) {
        console.warn('Error removing cart item from DB:', err);
      }
    }
  },

  clearCart: async (userId) => {
    set({ cartItems: [] });
    if (userId) {
      try {
        await supabase.from('cart_items').delete().eq('user_id', userId);
      } catch (err) {
        console.warn('Error clearing cart in DB:', err);
      }
    }
  },

  getTotalPrice: () => {
    return get().cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  },

  getItemCount: () => {
    return get().cartItems.reduce((acc, item) => acc + item.quantity, 0);
  },
}));
