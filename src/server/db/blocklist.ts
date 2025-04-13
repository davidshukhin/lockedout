// src/server/db/blocklist.ts

import { supabase } from './index';

export async function getUserBlockList(userId: string): Promise<string[]> {
  const { data, error } = await supabase
    .from('user_blocklists')
    .select('block_list')
    .eq('user_id', userId)
    .single();
  console.log("user_id", userId)
  if (error) {
    console.error('Error fetching block list:', error);
    return [];
  }

  return data?.block_list ? data.block_list : [];
}

export async function updateUserBlockList(userId: string, blockList: string[]): Promise<void> {
  // Upsert: update if record exists, otherwise insert new record.
  const { error } = await supabase
    .from('user_blocklists')
    .upsert({
      user_id: userId,
      block_list: blockList
    });

  if (error) {
    console.error('Error updating block list:', error);
    throw error;
  }
}
