// Temporary: src/pages/test-db.tsx
import { useEffect, useState } from 'react';
import { getUserBlockList } from '../server/db/blocklist';

export default function TestDB() {
  const [blockList, setBlockList] = useState<string[]>([]);
  
  useEffect(() => {
    // Replace with a test user ID or simulate a session
    getUserBlockList('test-user-id')
      .then(setBlockList)
      .catch(console.error);
  }, []);
  
  return (
    <div>
      <h1>Test Block List Data</h1>
      <pre>{JSON.stringify(blockList, null, 2)}</pre>
    </div>
  );
}
