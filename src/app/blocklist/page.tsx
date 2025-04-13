'use client';

import { useState, useEffect } from 'react';

export default function BlockListPage() {
  const [blockList, setBlockList] = useState<string[]>([]);
  const [newSite, setNewSite] = useState('');

  useEffect(() => {
    fetch('/api/blocklist')
      .then((res) => res.json())
      .then((data) => {
        if (data.blockList) setBlockList(data.blockList);
      })
      .catch((err) => console.error('Error fetching block list:', err));
  }, []);

  const addSite = async () => {
    if (!newSite.trim()) return;

    const response = await fetch('/api/blocklist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'add',
        site: newSite.trim(),
      }),
    });
    console.log(response)
    if (response.ok) {
      const data = await response.json();
      setBlockList(data.blockList);
      setNewSite('');
    } else {
      console.error('Failed to update block list');
    }
  };

  const removeSite = async (siteToRemove: string) => {
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
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1 className="text-2xl font-bold mb-4">Manage Your Block List</h1>
      <ul className="mb-4">
        {blockList.map((site, index) => (
          <li key={index} className="flex items-center justify-between py-1">
            <span>{site}</span>
            <button
              onClick={() => removeSite(site)}
              className="text-red-500 hover:underline"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Enter website (e.g., youtube.com)"
          value={newSite}
          onChange={(e) => setNewSite(e.target.value)}
          className="border p-2 rounded"
        />
        <button
          onClick={addSite}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Site
        </button>
      </div>
    </div>
  );
}

