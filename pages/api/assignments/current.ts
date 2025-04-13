import type { NextApiRequest, NextApiResponse } from 'next';
import { createServerClient, type CookieOptions } from '@supabase/ssr';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Create authenticated Supabase client
    const cookieStore = {
      get: (name: string) => req.cookies[name],
      set: (name: string, value: string, options: CookieOptions) => {
        res.setHeader('Set-Cookie', `${name}=${value}; Path=${options.path || '/'}`);
      },
      remove: (name: string, options: CookieOptions) => {
        res.setHeader('Set-Cookie', `${name}=; Path=${options.path || '/'}; Max-Age=0`);
      },
    };

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      { cookies: cookieStore }
    );

    // Get user session
    const {
      data: { session },
    } = await supabase.auth.getSession();

    // Check if user is authenticated
    if (!session) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    // Get current assignments for the user
    const { data: assignments, error } = await supabase
      .from('current_assignments')
      .select('*')
      .eq('user_id', session.user.id);

    if (error) {
      console.error('Error fetching assignments:', error);
      return res.status(500).json({ error: 'Failed to fetch assignments' });
    }

    // Return the assignments
    return res.status(200).json({ assignments: assignments || [] });

  } catch (error) {
    console.error('Error in current assignments endpoint:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
} 