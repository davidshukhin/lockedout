// src/app/blocklist/page.tsx

'use client';

import { useState, useEffect } from 'react';

export default function BlockListPage() {
  const [blockList, setBlockList] = useState<string[]>([]);
  const [newSite, setNewSite] = useState('');

  useEffect(() => {
    // Fetch the user's current block list when the page loads.
    fetch('/api/blocklist')
      .then((res) => res.json())
      .then((data) => {
        if (data.blockList) {
          setBlockList(data.blockList);
        }
      })
      .catch((err) => {
        console.error('Error fetching block list:', err);
      });
  }, []);

  const addSite = async () => {
    if (!newSite.trim()) return;
    const updatedList = [...blockList, newSite.trim()];
    const response = await fetch('/api/blocklist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ blockList: updatedList })
    });
    if (response.ok) {
      setBlockList(updatedList);
      setNewSite('');
    } else {
      console.error('Failed to update block list');
    }
  };

  const removeSite = async (siteToRemove: string) => {
    const updatedList = blockList.filter((site) => site !== siteToRemove);
    const response = await fetch('/api/blocklist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ blockList: updatedList })
    });
    if (response.ok) {
      setBlockList(updatedList);
    } else {
      console.error('Failed to update block list');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Manage Your Block List</h1>
      <ul>
        {blockList.map((site, index) => (
          <li key={index}>
            {site}
            <button onClick={() => removeSite(site)} style={{ marginLeft: '1rem' }}>
              Remove
            </button>
          </li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          placeholder="Enter website (e.g., youtube.com)"
          value={newSite}
          onChange={(e) => setNewSite(e.target.value)}
        />
        <button onClick={addSite}>Add Site</button>
      </div>
    </div>
  );
}
