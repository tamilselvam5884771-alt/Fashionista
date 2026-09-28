import { createClient } from '@supabase/supabase-js';

const DEFAULT_URL = 'https://placeholder.supabase.co';
const DEFAULT_ANON_KEY = 'placeholder-anon-key';

const envUrl = import.meta.env.VITE_SUPABASE_URL;
const envKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(
  envUrl &&
    envKey &&
    envUrl.trim() !== '' &&
    envKey.trim() !== '' &&
    !envUrl.includes('placeholder.supabase.co')
);

const supabaseUrl = envUrl && envUrl.trim() !== '' ? envUrl : DEFAULT_URL;
const supabaseAnonKey = envKey && envKey.trim() !== '' ? envKey : DEFAULT_ANON_KEY;

if (!isSupabaseConfigured) {
  console.warn(
    'Supabase configuration missing or using placeholder. Ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables are set.'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
export default supabase;


