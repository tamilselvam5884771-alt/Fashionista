// Global TypeScript definitions for Fashionista
export interface User {
  id: string;
  name: string;
  email: string;
  role?: 'customer' | 'boutique_owner' | 'designer' | 'admin';
  avatar_url?: string;
}

export type ThemeMode = 'light' | 'dark';
