import { create } from 'zustand';
import type { Session, User as SupabaseUser } from '@supabase/supabase-js';
import { supabase } from '../lib/supabaseClient';
import type { User } from '../types';

interface AuthState {
  user: User | null;
  supabaseUser: SupabaseUser | null;
  session: Session | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  initializeAuth: () => Promise<void>;
  setUserFromSession: (session: Session | null) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  supabaseUser: null,
  session: null,
  isAuthenticated: false,
  isLoading: true,

  setUserFromSession: async (session: Session | null) => {
    if (!session || !session.user) {
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
      set({ isLoading: false });
    }
  },

  logout: async () => {
    try {
      await supabase.auth.signOut();
    } catch (e) {
      console.error('Error signing out of Supabase:', e);
    } finally {
      set({
        user: null,
        supabaseUser: null,
        session: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  },
}));
