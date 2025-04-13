
'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { supabaseClient } from '~/lib/supabaseClient';
export function BlockListForm() {
  const [blockList, setBlockList] = useState<string[]>([]);
  const [newSite, setNewSite] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);
  const { data: session } = useSession();
  useEffect(() => {
    const fetchBlockList = async () => {
      try {

        const { data, error } = await supabaseClient
          .from('user_blocklists')
          .select('block_list')
          .eq('user_id', session?.user?.id)
          .single();

        if (error) {
          console.error('Error fetching block list:', error);
          return [];
        }

        setBlockList(data?.block_list);
      } catch (err) {
        console.error('Error fetching block list:', err);
      } finally {
        setLoading(false);
        setHasFetched(true); // ✅ Mark fetch complete
      }
    };

    fetchBlockList();
  }, []);

  const addSite = async () => {
    if (!newSite.trim()) return;
    setSubmitting(true);

    const response = await fetch('/api/blocklist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'add', site: newSite.trim() }),
    });

    if (response.ok) {
      const data = await response.json();
      setBlockList(data.blockList);
      setNewSite('');
    } else {
      console.error('Failed to update block list');
    }

    setSubmitting(false);
  };

  const removeSite = async (siteToRemove: string) => {
    setSubmitting(true);

    const response = await fetch('/api/blocklist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'remove', site: siteToRemove }),
    });

    if (response.ok) {
      const data = await response.json();
      setBlockList(data.blockList);
    } else {
      console.error('Failed to update block list');
    }

    setSubmitting(false);
  };

  return (
    <div>
      {!hasFetched ? (
        <p className="text-white">Loading blocked sites...</p>
      ) : (
        <>
          {blockList.length === 0 ? (
            <p className="text-white/70 mb-4">No blocked sites yet.</p>
          ) : (
            <ul className="mb-4 space-y-1">
              {blockList.map((site, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between rounded bg-white/10 px-3 py-2"
                >
                  <span>{site}</span>
                  <button
                    onClick={() => removeSite(site)}
                    disabled={submitting}
                    className="text-red-400 hover:underline text-sm disabled:opacity-50"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}

          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter website (e.g., youtube.com)"
              value={newSite}
              onChange={(e) => setNewSite(e.target.value)}
              className="w-full rounded px-3 py-2 text-black"
              disabled={submitting}
            />
            <button
              onClick={addSite}
              disabled={submitting}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
            >
              {submitting ? 'Adding...' : 'Add'}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

