// Load Supabase from CDN
const SUPABASE_CDN_URL = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.39.7/dist/umd/supabase.min.js';

/**
 * Initialize the Supabase client
 * @param {string} supabaseUrl - The Supabase project URL
 * @param {string} supabaseKey - The Supabase anon key
 * @returns {Promise<any>} - The Supabase client instance
 */
export async function initSupabaseClient(supabaseUrl, supabaseKey) {
  return new Promise((resolve, reject) => {
    // Create a script element to load Supabase
    const script = document.createElement('script');
    script.src = SUPABASE_CDN_URL;
    script.onload = () => {
      try {
        // @ts-ignore - Supabase is loaded globally
        const { createClient } = window.supabase;
        const client = createClient(supabaseUrl, supabaseKey);
        resolve(client);
      } catch (error) {
        reject(error);
      }
    };
    script.onerror = (error) => reject(error);
    document.head.appendChild(script);
  });
} 