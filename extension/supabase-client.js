// Import the Supabase client from CDN
importScripts('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.39.3/dist/umd/supabase.min.js');

// Export the createClient function
self.createClient = supabaseJs.createClient; 