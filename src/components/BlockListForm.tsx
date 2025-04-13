'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

export function BlockListForm() {
  const [blockList, setBlockList] = useState<string[]>([]);
  const [newSite, setNewSite] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const { data: session, status } = useSession();

  const standardizeDomain = (url: string): string => {
    // Remove protocol and www
    let domain = url.replace(/^(https?:\/\/)?(www\.)?/, '');
    // Remove trailing slashes and spaces
    domain = domain.replace(/\/+$/, '').trim();
    // Convert to lowercase
    return domain.toLowerCase();
  };

  useEffect(() => {
    const fetchBlockList = async () => {
      // Don't fetch if not authenticated
      if (status !== 'authenticated' || !session?.user?.id) return;
      
      try {
        const response = await fetch('/api/blocklist');
        if (!response.ok) {
          console.error('Error fetching block list:', response.statusText);
          return;
        }
        
        const data = await response.json();
        setBlockList(data.blockList ?? []);
      } catch (err) {
        console.error('Error fetching block list:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlockList();
  }, [session?.user?.id, status]);

  const addSite = async () => {
    if (!newSite.trim()) return;
    
    const standardizedDomain = standardizeDomain(newSite);
    if (!standardizedDomain) return;

    // Check if domain is already in the list
    if (blockList.includes(standardizedDomain)) {
      alert('This site is already in your block list.');
      setNewSite('');
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch('/api/blocklist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'add', site: standardizedDomain }),
      });

      if (response.ok) {
        const data = await response.json();
        setBlockList(data.blockList);
        setNewSite('');
      } else {
        console.error('Failed to update block list');
      }
    } catch (err) {
      console.error('Error adding site:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const removeSite = async (siteToRemove: string) => {
    setSubmitting(true);

    try {
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
    } catch (err) {
      console.error('Error removing site:', err);
    } finally {
      setSubmitting(false);
    }
  };

  // Show loading state while session is loading
  if (status === 'loading' || loading) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-white/10 rounded mb-4"></div>
        <div className="space-y-2">
          <div className="h-10 bg-white/10 rounded"></div>
          <div className="h-10 bg-white/10 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div>
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
          className="w-full rounded px-3 py-2 text-white bg-white/10"
          disabled={submitting}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !submitting) {
              e.preventDefault();
              addSite();
            }
          }}
        />
        <button
          onClick={addSite}
          disabled={submitting}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {submitting ? 'Adding...' : 'Add'}
        </button>
      </div>
    </div>
  );
}

