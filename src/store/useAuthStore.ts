import { create } from 'zustand';
import type { User } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, name?: string) => void;
  logout: () => void;
}

const getSavedUser = (): User | null => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('fashionista-user-session');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved user session', e);
      }
    }
  }
  return null;
};

const initialUser = getSavedUser();

export const useAuthStore = create<AuthState>((set) => ({
  user: initialUser,
  isAuthenticated: !!initialUser,
  login: (email: string, name?: string) => {
    const newUser: User = {
      id: Math.random().toString(36).substring(2, 9),
      name: name || email.split('@')[0].replace('.', ' '),
      email,
    };
    localStorage.setItem('fashionista-user-session', JSON.stringify(newUser));
    set({ user: newUser, isAuthenticated: true });
  },
  logout: () => {
    localStorage.removeItem('fashionista-user-session');
    set({ user: null, isAuthenticated: false });
  },
}));
