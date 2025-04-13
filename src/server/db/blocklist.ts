
// src/server/db/blocklist.ts

import { supabase } from './index';

export async function getUserBlockList(userId: string): Promise<string[]> {
  const { data, error } = await supabase
    .from('user_blocklists')
    .select('block_list')
    .eq('user_id', userId)
    .single();

  if (error) {
    console.error('Error fetching block list:', error);
    return [];
  }

  return data?.block_list ?? [];
}

export async function updateUserBlockList(userId: string, newSite: string): Promise<string[]> {
  // Fetch current list
  console.log(userId)
  const { data, error: fetchError } = await supabase
    .from('user_blocklists')
    .select('block_list')
    .eq('user_id', userId)
    .single();

  if (fetchError && fetchError.code !== "PGRST116") {
    // Not just a missing row error
    throw fetchError;
  }
  if (!data) {
    const { data, error: upsertError } = await supabase
      .from('user_blocklists')
      .insert({
        user_id: userId,
        block_list: [newSite],
      })
      .eq("user_id", userId);

    return [newSite];
  } else {
    const existing = data?.block_list ?? [];

    // Prevent duplicate entries
    if (existing.includes(newSite)) return existing;

    const updatedList = [...existing, newSite];

    const { error: upsertError } = await supabase
      .from('user_blocklists')
      .update({
        user_id: userId,
        block_list: updatedList,
      })
      .eq("user_id", userId);

    if (upsertError) {
      console.error('Error updating block list:', upsertError);
      throw upsertError;
    }
    return updatedList;
  }

}

export async function removeSiteFromBlockList(userId: string, siteToRemove: string): Promise<string[]> {
  const { data, error: fetchError } = await supabase
    .from('user_blocklists')
    .select('block_list')
    .eq('user_id', userId)
    .single();

  if (fetchError) {
    console.error('Error fetching block list for removal:', fetchError);
    throw fetchError;
  }

  const updatedList = data.block_list.filter((site: string) => site !== siteToRemove);

  const { error: updateError } = await supabase
    .from('user_blocklists')
    .update({
      block_list: updatedList,
    })
    .eq("user_id", userId)
    ;

  if (updateError) {
    console.error('Error removing site from block list:', updateError);
    throw updateError;
  }

  return updatedList;
}

