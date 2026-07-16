import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Faltan las credenciales de Supabase en las variables de entorno (se requiere VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY o VITE_SUPABASE_PUBLISHABLE_KEY).');
}

export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');

