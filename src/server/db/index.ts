// src/server/db/index.ts

import { createClient } from '@supabase/supabase-js';

// Your Supabase URL and Service Role Key must be set in your environment variables.
// For local development, create a .env.local file at the root of your project and add:
//
 // NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
 // SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
//
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  throw new Error('Missing Supabase configuration. Check your environment variables.');
}

// Create a singleton instance of the Supabase client.
export const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);
