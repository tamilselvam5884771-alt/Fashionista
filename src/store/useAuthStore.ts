import { create } from 'zustand';
import type { Session, User as SupabaseUser } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';
import type { User } from '../types';

const DEMO_STORAGE_KEY = 'fashionista_demo_user';

export const DEFAULT_DEMO_USER: User = {
  id: 'demo-user-101',
  name: 'Sophia Laurent',
  email: 'sophia@fashionista-atelier.com',
  role: 'customer',
  avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
};

interface AuthState {
  user: User | null;
  supabaseUser: SupabaseUser | null;
  session: Session | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  initializeAuth: () => Promise<void>;
  setUserFromSession: (session: Session | null) => Promise<void>;
  loginAsDemo: (customName?: string, customEmail?: string) => void;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  supabaseUser: null,
  session: null,
  isAuthenticated: false,
  isLoading: true,

  loginAsDemo: (customName?: string, customEmail?: string) => {
    const demoUser: User = {
      ...DEFAULT_DEMO_USER,
      name: customName || DEFAULT_DEMO_USER.name,
      email: customEmail || DEFAULT_DEMO_USER.email,
    };
    try {
      localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(demoUser));
    } catch (e) {
      console.warn('Unable to save demo user to localStorage', e);
    }
    set({
      user: demoUser,
      supabaseUser: null,
      session: null,
      isAuthenticated: true,
      isLoading: false,
    });
  },

  setUserFromSession: async (session: Session | null) => {
    if (!session || !session.user) {
      try {
        const savedDemo = localStorage.getItem(DEMO_STORAGE_KEY);
        if (savedDemo) {
          const parsed = JSON.parse(savedDemo);
          set({
            user: parsed,
            supabaseUser: null,
            session: null,
            isAuthenticated: true,
            isLoading: false,
          });
          return;
        }
      } catch (e) {}

      set({
        user: null,
        supabaseUser: null,
        session: null,
        isAuthenticated: false,
        isLoading: false,
      });
      return;
    }

    const sbUser = session.user;
    let fullName = sbUser.user_metadata?.full_name || sbUser.email?.split('@')[0] || 'User';
    let role = sbUser.user_metadata?.role || 'customer';
    let avatarUrl = sbUser.user_metadata?.avatar_url;

    try {
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', sbUser.id)
        .maybeSingle();

      if (profile) {
        if (profile.full_name) fullName = profile.full_name;
        if (profile.role) role = profile.role;
        if (profile.avatar_url) avatarUrl = profile.avatar_url;
      }
    } catch (e) {
      console.error('Error fetching user profile from database:', e);
    }

    const appUser: User = {
      id: sbUser.id,
      name: fullName,
      email: sbUser.email || '',
      role: role as any,
      avatar_url: avatarUrl,
    };

    set({
      user: appUser,
      supabaseUser: sbUser,
      session,
      isAuthenticated: true,
      isLoading: false,
    });
  },

  initializeAuth: async () => {
    if (!isSupabaseConfigured) {
      try {
        const savedDemo = localStorage.getItem(DEMO_STORAGE_KEY);
        if (savedDemo) {
          const parsed = JSON.parse(savedDemo);
          set({
            user: parsed,
            supabaseUser: null,
            session: null,
            isAuthenticated: true,
            isLoading: false,
          });
          return;
        }
      } catch (e) {}

      set({ isLoading: false });
      return;
    }

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      await get().setUserFromSession(session);

      supabase.auth.onAuthStateChange(async (_event, session) => {
        await get().setUserFromSession(session);
      });
    } catch (e) {
      console.error('Failed to initialize Supabase Auth:', e);
      try {
        const savedDemo = localStorage.getItem(DEMO_STORAGE_KEY);
        if (savedDemo) {
          set({
            user: JSON.parse(savedDemo),
            isAuthenticated: true,
            isLoading: false,
          });
          return;
        }
      } catch (_) {}
      set({ isLoading: false });
    }
  },

  logout: async () => {
    try {
      localStorage.removeItem(DEMO_STORAGE_KEY);
    } catch (e) {}

    if (isSupabaseConfigured) {
      try {
        await supabase.auth.signOut();
      } catch (e) {
        console.error('Error signing out of Supabase:', e);
      }
    }

    set({
      user: null,
      supabaseUser: null,
      session: null,
      isAuthenticated: false,
      isLoading: false,
    });
  },
}));

