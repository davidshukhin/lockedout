import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { createClient } from '@supabase/supabase-js';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });
  
  if (!session) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  // Create Supabase client
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // Get or create Supabase session
  const { data, error } = await supabase.auth.signInWithIdToken({
    provider: 'google',
    token: session.accessToken
  });

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  // Return the session to the extension
  res.json({ session: data.session });
} 