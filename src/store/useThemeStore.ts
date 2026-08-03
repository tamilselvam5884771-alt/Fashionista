import { create } from 'zustand';
import type { ThemeMode } from '../types';

interface ThemeState {
  theme: ThemeMode;
  toggleTheme: () => void;
  setTheme: (theme: ThemeMode) => void;
}

const getInitialTheme = (): ThemeMode => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('fashionista-theme') as ThemeMode | null;
    if (saved === 'dark' || saved === 'light') {
      if (saved === 'dark') document.documentElement.classList.add('dark');
      else document.documentElement.classList.remove('dark');
      return saved;
    }
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('dark');
      return 'dark';
    }
  }
  return 'light';
};

const initialTheme = getInitialTheme();

export const useThemeStore = create<ThemeState>((set) => ({
  theme: initialTheme,
  toggleTheme: () =>
    set((state) => {
      const nextTheme = state.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('fashionista-theme', nextTheme);
      if (nextTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return { theme: nextTheme };
    }),
  setTheme: (theme) => {
    localStorage.setItem('fashionista-theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    set({ theme });
  },
}));
